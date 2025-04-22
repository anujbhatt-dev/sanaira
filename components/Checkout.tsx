"use client";
import React, { useEffect, useState } from "react";
import { useBasketStore } from "@/store/useBasketStore";
import { IndianRupee } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { cinzel, mulish } from "@/utils/font";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import Heading from "./Heading";
import {load} from "@cashfreepayments/cashfree-js"

type PaymentMethod = "cod" | "cashfree";

interface ShippingAddress {
  name: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export default function Checkout() {
  const { items, clearBasket } = useBasketStore();
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let cashfree: {
        checkout: (options: {
          paymentSessionId: string;
          redirectTarget: string;
          returnUrl?: string;
        }) => void;
      };

    const initializeSDK = async () => {
        cashfree = await load({
            mode:"production"
        })
    }

    initializeSDK();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: user?.fullName || "",
    phone: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "India",
    },
  });


  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCharge = totalPrice > 1000 ? 0 : 100;
  const grandTotal = totalPrice + shippingCharge;

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes("address.")) {
      const fieldName = name.split(".")[1];
      setShippingAddress(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [fieldName]: value
        }
      }));
    } else {
      setShippingAddress(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    const fetchShippingAddress = async () => {
      if (!user?.id) return;
  
      try {
        const res = await fetch(`/api/user/shipping-address?clerkUserId=${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch shipping address");
  
        const data = await res.json();
  
        if (data?.shippingDetails) {
          setShippingAddress({
            name: data.shippingDetails.name || user.fullName || "",
            phone: data.shippingDetails.phone || "",
            address: {
              line1: data.shippingDetails.address?.line1 || "",
              line2: data.shippingDetails.address?.line2 || "",
              city: data.shippingDetails.address?.city || "",
              state: data.shippingDetails.address?.state || "",
              postal_code: data.shippingDetails.address?.postal_code || "",
              country: data.shippingDetails.address?.country || "India",
            },
          });
        }
      } catch (error) {
        console.error("Error loading shipping address:", error);
        toast.error("Failed to load your shipping details");
      }
    };
  
    fetchShippingAddress();
  }, [user]);


  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(()=>{
        setIsSubmitting(false)
    }, 1000)
    try {
        const cart_items = items.map((item)=>{
                const matchingSize = item.product?.variants?.flatMap(variant => variant.sizes || [])
          .find(size => size.sku === item.sku);

        const discount = matchingSize?.discount || 0;
        return {
          item_id:item.product._id,
          item_name:item.product.title,
          item_discounted_unit_price: item.price ,
          itme_original_unit_price: discount ? Math.round((item.price * 100) / (100 - discount)) : item.price,
          item_quantity:item.quantity,
          item_tags:[item.product._id, item.color, item.price, item.quantity,item.size,item.sku, discount]
        }
      })
      const orderData = {
        paymentProvider: paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "pending", // Will update after payment
        clerkUserId: user?.id,
        customerName: shippingAddress.name,
        email: user?.emailAddresses[0].emailAddress,
        products: items.map(item => ({
          product: {
            _type: "reference",
            _ref: item.product._id
          },
          quantity: item.quantity,
          color: item.color,
          price: item.price,
          sku: `${item.product._id}-${item.color}-${item.size}`
        })),
        totalPrice: grandTotal,
        currency: "INR",
        orderDate: new Date().toISOString(),
        shippingDetails: shippingAddress,
        shipmentStatus: "pending",
        cart_details:{
          cart_name:"My Cart",
          cart_items
        }
      };

      if (paymentMethod === "cod") {
        // Directly create COD order
        const response = await axios.post("/cashfree-checkout/payment", orderData);
        
        if (response.data.success) {
          toast.success("COD order placed successfully!");
          console.log(response.data);
          if(0){
            clearBasket();
            router.push(`/order-confirmation/${response.data.order._id}`);
          }
        } else {
          toast.error("Failed to place COD order. Please try again.");
        }
      } else {
        // Create temporary order for Cashfree payment
        // const tempOrderResponse = await axios.post("/api/orders/temp", {
        //   ...orderData,
        //   paymentStatus: "pending"
        // });
        
        // if (tempOrderResponse.data.success) {
        //   // Initiate Cashfree payment
        //   const paymentResponse = await axios.post("/api/cashfree/payment", {
        //     orderId: tempOrderResponse.data.order._id,
        //     amount: grandTotal,
        //     customerDetails: {
        //       name: shippingAddress.name,
        //       phone: shippingAddress.phone,
        //       email: user?.emailAddresses[0].emailAddress
        //     }
        //   });
          
        //   if (paymentResponse.data.paymentLink) {
        //     window.location.href = paymentResponse.data.paymentLink;
        //   } else {
        //     toast.error("Failed to initiate payment. Please try again.");
        //   }
        // }

        // setLoading(true);
        try {
            const res = await axios.post("/cashfree-checkout/payment", orderData);
            const sessionId = res.data
            const checkoutOptions = {
                paymentSessionId:sessionId as string,
                redirectTarget:"_modal" as string
            }
            const paymentInitialize = await cashfree.checkout(checkoutOptions)
            console.log("payment initialize" , paymentInitialize);
        } catch (error) {
            console.log(error);
            
        } finally{
            // setLoading(false);
        }
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("An error occurred while placing your order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${mulish.className} px-4 md:px-8 max-w-6xl mx-auto py-8`}>
        <div className={`${cinzel.className} text-xl md:text-4xl flex items-center justify-center gap-x-4`}>
            <Heading text="Complete Your Order"/>
        </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping Address and Payment Method */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address Form */}
          <div className="bg-white p-6  shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="[0-9]{10}"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
              </div>
              
              <div>
                <label htmlFor="address.line1" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  id="address.line1"
                  name="address.line1"
                  value={shippingAddress.address.line1}
                  onChange={handleAddressChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              <div>
                <label htmlFor="address.line2" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2 (Optional)
                </label>
                <input
                  id="address.line2"
                  name="address.line2"
                  value={shippingAddress.address.line2}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="address.city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    id="address.city"
                    name="address.city"
                    value={shippingAddress.address.city}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="address.state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    id="address.state"
                    name="address.state"
                    value={shippingAddress.address.state}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    <option value="">Select State / UT</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>

                    {/* Union Territories */}
                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>

                </div>
                <div>
                  <label htmlFor="address.postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    id="address.postal_code"
                    name="address.postal_code"
                    value={shippingAddress.address.postal_code}
                    onChange={handleAddressChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address.country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  id="address.country"
                  name="address.country"
                  value={shippingAddress.address.country}
                  onChange={handleAddressChange}
                  required
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="bg-white p-6  shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="h-4 w-4 text-black focus:ring-black"
                />
                <label htmlFor="cod" className="ml-2 block text-sm font-medium text-gray-700">
                  Cash on Delivery
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cashfree"
                  name="paymentMethod"
                  value="cashfree"
                  checked={paymentMethod === "cashfree"}
                  onChange={() => setPaymentMethod("cashfree")}
                  className="h-4 w-4 text-black focus:ring-black"
                  required
                />
                <label htmlFor="cashfree" className="ml-2 block text-sm font-medium text-gray-700">
                  Online Payment (Cashfree)
                </label>
              </div>
              
              {paymentMethod === "cashfree" && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="text-sm mb-2">You&apaos;ll be redirected to Cashfree for secure payment after submitting your order.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6  shadow-sm border border-gray-200 sticky top-[5rem]">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.product._id}-${item.size}-${item.color}`} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.title}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × <IndianRupee className="inline w-3 h-3" />{item.price}
                      {item.size && ` • ${item.size}`}
                      {item.color && ` • ${item.color}`}
                    </p>
                  </div>
                  <p className="font-medium flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />{item.price * item.quantity}
                  </p>
                </div>
              ))}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />{totalPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="flex items-center">
                    {shippingCharge === 0 ? (
                      "Free"
                    ) : (
                      <>
                        <IndianRupee className="w-4 h-4 mr-1" />{shippingCharge}
                      </>
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />{grandTotal}
                  </span>
                </div>
              </div>
              
              <button
                type="submit"                
                disabled={isSubmitting}
                className={`w-full mt-6 px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  "Processing..."
                ) : paymentMethod === "cod" ? (
                  "Place COD Order"
                ) : (
                  "Proceed to Payment"
                )}
              </button>
              
              <p className="text-xs text-gray-500 mt-2">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}