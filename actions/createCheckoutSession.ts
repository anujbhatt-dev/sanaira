"use server"

import stripe from "../lib/stripe";
import { IBasketItem  } from "@/store/useBasketStore";
import { imageUrl } from "@/lib/imageUrl";

export type Metadata = {
    orderNumber:string;
    customerName:string,
    customerEmail:string,
    clerkUserId:string
}



export async function createCheckoutSession(items:IBasketItem[], metadata:Metadata) {
  console.log("In the Cage");
    
  
    try {
      const itemsWithoutPrice = items.filter((item)=>!item.price) 
      if(itemsWithoutPrice.length>0) throw new Error("Some items do not have a price")


      const customers = await stripe.customers.list({
        email:metadata.customerEmail,
        limit:1
      })

      let customerId:string | undefined;
      if(customers.data.length>0){
        customerId = customers.data[0].id;
      }

      const base_url = process.env.NODE_ENV === "production" ?
        `https://${process.env.VERCEL_URL}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}`;

      const successUrl = `${base_url}/success??session_id=(CHECKOUT_SESSION_ID)&orderNumber=${metadata.orderNumber}`

      const cancelUrl = `${base_url}/basket`

      
      const session = await stripe.checkout.sessions.create({
        customer:customerId,
        customer_creation: customerId?undefined:"always",
        metadata,
        mode:"payment",
        allow_promotion_codes:true,
        success_url:successUrl,
        cancel_url:cancelUrl,
        shipping_address_collection: {
            allowed_countries: ["IN"],
        },
        phone_number_collection: {
            enabled: true, // Enable phone number collection
        },
        line_items: items.map((item)=>({
            price_data:{
                currency:"inr",
                unit_amount:Math.round(item.price * 100),
                product_data:{
                    name:item.product.title || "Unnamed Product",
                    description:`Product ID: ${item.product._id}\nSIZE: ${item.size}`,
                    metadata:{
                        id:item.product._id
                    },
                    images: item.product?.variants
                    ?.filter((v) => v.color === item.color)
                    ?.flatMap((v2) => v2.variantImages?.[0] ? [imageUrl(v2.variantImages[0]).url()] : [])
                    ?? []
                            
                            
                }
            },
            quantity:item.quantity
        }))
      })
      console.log("createCheckoutSession:" + session.url);
      
      return session.url;
      
    } catch (error) {
        console.log("Error creting checkot session", error );
        
    }
}