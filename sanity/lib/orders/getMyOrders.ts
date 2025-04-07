// lib/orders.ts
import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getMyOrders = async (clerkUserId: string) => {
    const MY_ORDERS_QUERY = defineQuery(`
        *[_type == "order" && clerkUserId == $clerkUserId] | order(orderDate desc) {
          _id,
          orderNumber,
          stripeCheckoutSessionId,
          stripeCustomerId,
          clerkUserId,
          customerName,
          email,
          stripePaymentIntentId,
          products[] {
            product-> {
              _id,
              title,
              "slug": slug.current,
              variants[]{
                variantImages[]{
                    asset->{
                        url
                    }
                },
                color  
              },
            },
            quantity,
            sku,
            color,
            price
          },
          totalPrice,
          currency,
          amountDiscount,
          status,
          orderDate,
          refundStatus,
          refundAmount,
          returnReason,
          refundDate,
          shippingDetails {
            name,
            phone,
            address {
              line1,
              line2,
              city,
              state,
              postal_code,
              country
            }
          }
        }
      `);
      

  try {
    const response = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { clerkUserId },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
};