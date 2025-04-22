import { backendClient } from "@/sanity/lib/backendClient";
import { Cashfree } from "cashfree-pg"; 


Cashfree.XClientId = process.env.PROD_CASHFREE_CLIENT_ID
Cashfree.XClientSecret = process.env.PROD_CASHFREE_CLIENT_SECRET
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

export async function POST(req:Request) {
    const body = await req.json()
    console.log(body);    
    // try {
    //     const request = {
    //         "order_amount": 1,
    //         "order_currency": "INR",
    //         "order_id": `order_${crypto.randomUUID()}`, // ✅ Unique with crypto
    //         "customer_details": {
    //             "customer_id": "aj",
    //             "customer_phone": "7895339580"
    //         }
    //     };

    //     const order = await Cashfree.PGCreateOrder("2023-08-01", request)

    //     if(order){
    //         console.log('Order Created successfully:',order.data)
    //         console.log("session id ", order.data.payment_session_id);            
    //         return new Response(order.data.payment_session_id,{status:201,headers:{'Content-Type':"application/json"}})
    //     }  
    //     return new Response("Not successs", {status:400})   

    // }catch (error) {
    //     if(error instanceof Error){
    //         console.log("cashfree error", error);
    //         return new Response("Cashfree order error", { status: 500 });
    //     }
    // } 

    
    return Response.json("grt")
}
