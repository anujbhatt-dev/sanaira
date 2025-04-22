import { backendClient } from "@/sanity/lib/backendClient";
import { CartItem } from "@/types";
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.PROD_CASHFREE_CLIENT_ID!;
Cashfree.XClientSecret = process.env.PROD_CASHFREE_CLIENT_SECRET!;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

export async function POST(req: Request) {
  const body = await req.json();
  const cartItems = body.cart_details.cart_items as CartItem[]
  const shippingDetails = body.shippingDetails
  
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
        sku:sku as string,
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
     await updateProductStocks(sanityProducts)
     return Response.json({ success: true, order });
  }else{
    const cashfreeCartItems = cartItems.map((item)=>{
        return {
            "item_id":item.item_id,
            "item_name":item.item_name,
            "item_original_unit_price":item.item_discounted_unit_price,
            "item_discounted_unit_price":item.item_original_unit_price,
            "item_quantity":item.item_quantity,
            "item_tags":item.item_tags as string[]
        }
    })

    try {
            const request = {
                "order_amount": orderData.totalPrice,
                "order_currency": "INR",
                "order_id": orderData.orderNumber, // ✅ Unique with crypto
                "customer_details": {
                    "customer_id": orderData.customerName,
                    "customer_phone": orderData.shippingDetails.phone,
                    "customer_shipping_address":{
                        "full_name":shippingDetails.name,
                        "country":shippingDetails.address.country,
                        "city":shippingDetails.address.city,
                        "state":shippingDetails.address.state,
                        "pincode":shippingDetails.address.postal_code,
                        "address_1":shippingDetails.address.line1,
                        "address_2":shippingDetails.address.line_2
                    }
                },
                "cart_details":{
                    "cart_items":cashfreeCartItems
                    
                }
            };

            const orderCashfree = await Cashfree.PGCreateOrder("2023-08-01", request)

            if(orderCashfree){
                console.log('Order Created successfully:',orderCashfree.data)
                console.log("session id ", orderCashfree.data.payment_session_id);            
                return new Response(orderCashfree.data.payment_session_id,{status:201,headers:{'Content-Type':"application/json"}})
            }  
            return new Response("Not successs", {status:400})   

        }catch (error) {
            if(error instanceof Error){
                console.log("cashfree error", error);
                return new Response("Cashfree order error " + error , { status: 500 });
            }
        } 
  }

  return Response.json({ success: true, updatedUser: patchResponse });
}





async function updateProductStocks(products: {
    product: { _ref: string };
    sku?: string;
    quantity: number;
  }[]) {
    for (const item of products) {
      const { _ref } = item.product;
      const sku = item.sku;
      const quantity = item.quantity;
  
      if (!sku || !quantity) continue;
  
      const product = await backendClient.fetch(
        `*[_type == "product" && _id == $id][0]`,
        { id: _ref }
      );
  
      if (!product || !product.variants) continue;
  
      let updated = false;
  
      for (const [variantIndex, variant] of product.variants.entries()) {
        for (const [sizeIndex, size] of (variant.sizes ?? []).entries()) {
          if (size.sku === sku) {
            const newStock = Math.max(0, (size.stock ?? 0) - quantity);
  
            await backendClient.patch(product._id)
              .set({
                [`variants[${variantIndex}].sizes[${sizeIndex}].stock`]: newStock
              })
              .commit();
  
            console.log(`Stock updated for SKU ${sku}: ${size.stock} → ${newStock}`);
            updated = true;
            break;
          }
        }
        if (updated) break;
      }
  
      if (!updated) {
        console.warn(`SKU ${sku} not found in product ${_ref}`);
      }
    }
  }





