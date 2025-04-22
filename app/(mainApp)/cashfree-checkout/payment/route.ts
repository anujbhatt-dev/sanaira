import { backendClient } from "@/sanity/lib/backendClient";
import { CartItem } from "@/types";
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.PROD_CASHFREE_CLIENT_ID!;
Cashfree.XClientSecret = process.env.PROD_CASHFREE_CLIENT_SECRET!;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

export async function POST(req: Request) {
  const body = await req.json();
  const cartItems = body.cart_details.cart_items as CartItem[]
  console.log(body.cart_details.cart_items);

  if(cartItems.length===0){
    return Response.json({ success: false, message: "No Itmes in Cart" }, { status: 404 });
  }

  // -------------------------------------------
  // Find the existing user by Clerk User ID
  const existingUser = await backendClient.fetch(
    `*[_type == "user" && clerkUserId == $clerkUserId][0]`,
    { clerkUserId: body.clerkUserId }
  );

  if (!existingUser) {
    return Response.json({ success: false, message: "User not found." }, { status: 404 });
  }

  // Update the user's shipping address
  const patchResponse = await backendClient
    .patch(existingUser._id)
    .set({ shippingDetails: body.shippingDetails })
    .commit();
 // --------------------------------------------------


  // create order 
  // -------------------------------------------------
  const sanityProducts = cartItems.map((item) => {
    const productRef = item.item_id;
    const sku = item.item_tags[5];
    const color = item.item_tags[1];

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
        color,
        quantity: item.item_quantity,
        price: item.item_discounted_unit_price,
    };
  });
  
  const orderData = {
    paymentProvider: body.paymentProvider,
    paymentStatus: "pending",
    notes: "Customer requested fast delivery.",
    orderNumber: crypto.randomUUID(),
    clerkUserId: body.clerkUserId,
    customerName: body.shippingDetails.name,
    email: body.email,
    products: cartItems.map((item)=>{
        return {
            _key: crypto.randomUUID(),
            product: {
                _type: "reference",
                _ref: item.item_id,
              },
              quantity: item.item_quantity,
              sku: item.item_tags[5],
              color: item.item_tags[1],
              price: item.item_discounted_unit_price, 
          }
    }),
    totalPrice: body.totalPrice,
    currency: "INR",
    orderDate: new Date().toISOString(),
    shippingDetails: body.shippingDetails
  };

  if(body.paymentProvider==="cod"){
     const order = await backendClient.create({
        _type:"order",
        ...orderData
     })
     return Response.json({ success: true, orderData });
  }else{

  }

  return Response.json({ success: true, updatedUser: patchResponse });
}






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
