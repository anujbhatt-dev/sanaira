import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req:NextRequest) {
    const body = await req.text();
    const headersList = await headers()
    const sig = headersList.get("stripe-signature");

    if(!sig){
        return NextResponse.json({error:"No Signature"},{status:400})
    }
    
    const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if(!webHookSecret){
        console.log("stripe webhook secret is not set.");
        return NextResponse.json({error:"stripe webhook secret is not set."},{status:400})        
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body,sig,webHookSecret);
    } catch (error) {
        console.log("webhook signature verification failed:", error);
        return NextResponse.json(
            {error:"webhook error "+error},
            {status:400}
        )        
    }

    if(event.type === "checkout.session.completed"){
        const session = event.data.object as Stripe.Checkout.Session
        console.log("backend hit", session);
        
        // try {
        //     const order = await createOrderInSanity(session);
        //     console.log("Order created in Sanity ", order);
        // } catch (error) {
        //     console.log("Error Creating Order in sanity:", error);
        // return NextResponse.json(
        //     {error:"Error Creating order "+error},
        //     {status:400}
        // )    
        // }
    }




    return NextResponse.json({recieved:true})
}



async function createOrderInSanity(session:Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details
    } = session;

    const {orderNumber,customerName, customerEmail, clerkUserId} = metadata as Metadata

    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand:["data.price.product"]
        }
    )

    const sanityProducts = lineItemsWithProduct.data.map((item)=>({
        _key:crypto.randomUUID(),
        product:{
            _type:"reference",
            _ref:(item.price?.product as Stripe.Product)?.metadata?.id
        },
        quantity:item.quantity || 0
    }))


    const order = await backendClient.create({
        _type:"order",
        orderNumber,
        // stripe
    })
}
