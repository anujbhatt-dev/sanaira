import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text();
    const headersList = await headers();
    const sig = headersList.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "No Signature" }, { status: 400 });
    }

    const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webHookSecret) {
        console.log("Stripe webhook secret is not set.");
        return NextResponse.json(
            { error: "Stripe webhook secret is not set." },
            { status: 400 }
        );
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webHookSecret);
    } catch (error) {
        console.log("Webhook signature verification failed:", error);
        return NextResponse.json(
            { error: "Webhook error " + error },
            { status: 400 }
        );
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Webhook received - Checkout session completed:", session);

        try {
            const order = await createOrderInSanity(session);
            console.log("Order created in Sanity:", order);
        } catch (error) {
            console.log("Error creating order in Sanity:", error);
            return NextResponse.json(
                { error: "Error creating order: " + error },
                { status: 400 }
            );
        }
    }

    return NextResponse.json({ received: true });
}


async function createOrderInSanity(session: Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        // amount_subtotal,
        currency,
        metadata,
        payment_intent,
        customer,
        customer_details,
        shipping_details,
        total_details,
        // discounts,
        payment_status,
        
    } = session;

    if (!metadata) {
        throw new Error("Session metadata is missing.");
    }

    const { orderNumber, customerName, customerEmail, clerkUserId } = metadata as Metadata;

    if (amount_total === null) {
        throw new Error("amount_total is missing in the session.");
    }

    // Fallback for amount_subtotal if it is null
    // const subtotal = amount_subtotal !== null ? amount_subtotal : 0;

    // Fallback for total_details if it is null
    const totalDetails = total_details ?? { amount_discount: 0, amount_shipping: 0, amount_tax: 0 };

    // Retrieve line items from Stripe
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ["data.price.product"],
        }
    );

    const sanityProducts = lineItemsWithProduct.data.map((item) => {
        const productRef = (item.price?.product as Stripe.Product)?.metadata?.id;
        const sku = (item.price?.product as Stripe.Product)?.metadata?.sku;

        if (!productRef) {
            throw new Error(
                `Product ID missing for item: ${JSON.stringify(item)}`
            );
        }

        return {
            _key: crypto.randomUUID(),
            product: {
                _type: "reference",
                _ref: productRef,
            },
            sku,
            quantity: item.quantity || 0,
            price: item.amount_total ? item.amount_total / 100 : 0,
        };
    });

    // Extract shipping details from Stripe's response
    const shippingDetails = shipping_details
        ? {
              name: shipping_details.name ?? "",
              phone: customer_details?.phone ?? "",
              address: {
                  line1: shipping_details.address?.line1 ?? "",
                  line2: shipping_details.address?.line2 ?? "",
                  city: shipping_details.address?.city ?? "",
                  state: shipping_details.address?.state ?? "",
                  postal_code: shipping_details.address?.postal_code ?? "",
                  country: shipping_details.address?.country ?? "",
              },
          }
        : null;

    // Create order in Sanity
    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripeCustomerId: customer,
        clerkUserId,
        customerName,
        email: customerEmail,
        stripePaymentIntentId: payment_intent,
        products: sanityProducts,
        totalPrice: amount_total / 100,
        currency,
        amountDiscount: totalDetails.amount_discount / 100,
        status: payment_status === "paid" ? "paid" : "pending",
        orderDate: new Date().toISOString(),
        refundStatus: "not_requested",
        refundAmount: 0,
        returnReason: "",
        refundDate: null,
        shippingDetails, // Add shipping details
        
    });

    return order;
}
