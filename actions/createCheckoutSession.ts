// "use server"

// import stripe from "../lib/stripe";
// import { IBasketItem as BasketItem } from "@/store/useBasketStore";
// import { imageUrl } from "@/lib/imageUrl";

// export type Metadata = {
//     orderNumber:string;
//     customerName:string,
//     customerEmail:string,
//     clerkUserId:string
// }

// export type GroupedBasketItem = {
//     product:BasketItem["product"];
//     quantity:number
// }

// export async function createCheckoutSession(items:GroupedBasketItem[], metadata:Metadata) {
//   console.log("In  the   Cage");
  
//     try {
//       const itemsWithoutPrice = items.filter((item)=>!item.product.price) 
//       if(itemsWithoutPrice.length>0) throw new Error("Some items do not have a price")


//       const customers = await stripe.customers.list({
//         email:metadata.customerEmail,
//         limit:1
//       })

//       let customerId:string | undefined;
//       if(customers.data.length>0){
//         customerId = customers.data[0].id;
//       }

//       const base_url = process.env.NODE_ENV === "production" ?
//         `https://${process.env.VERCEL_URL}`
//       : `${process.env.NEXT_PUBLIC_BASE_URL}`;

//       const successUrl = `${base_url}/success??session_id=(CHECKOUT_SESSION_ID)&orderNumber=${metadata.orderNumber}`

//       const cancelUrl = `${base_url}/basket`
//       const session = await stripe.checkout.sessions.create({
//         customer:customerId,
//         customer_creation: customerId?undefined:"always",
//         metadata,
//         mode:"payment",
//         allow_promotion_codes:true,
//         success_url:successUrl,
//         cancel_url:cancelUrl,
//         line_items: items.map((item)=>({
//             price_data:{
//                 currency:"inr",
//                 unit_amount:Math.round(item.product.price!*100),
//                 product_data:{
//                     name:item.product.title || "Unnamed Product",
//                     description:`Product ID: ${item.product._id}`,
//                     metadata:{
//                         id:item.product._id
//                     },
//                     images:item.product.mainImages && item.product.mainImages?.length > 0 && item.product.mainImages[0] ? [imageUrl(item.product.mainImages[0]).url()]: undefined
//                 }
//             },
//             quantity:item.quantity
//         }))
//       })
//       console.log("createCheckoutSession:" + session.url);
      
//       return session.url;
      
//     } catch (error) {
//         console.log("Error creting checkot session", error );
        
//     }
// }