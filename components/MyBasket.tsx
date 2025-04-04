"use client";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { useBasketStore } from "@/store/useBasketStore";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import { mulish } from "@/utils/font";
import { IndianRupee, Trash2 } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, useAuth, useUser } from "@clerk/nextjs";
import axios from 'axios'
import {Metadata} from "@/types"

export default function MyBasket() {
    const [isClient, setIsClient] = useState(false);
    const { items, incrementQuantity, decrementQuantity, removeGroupedItem } = useBasketStore();
    const [loading,setLoading] = useState(false);
    const  {user} = useUser()
    const {isSignedIn} = useAuth()
    
    const handleCheckout = async () => {
        if(!isSignedIn){
            return 
        }
        setLoading(true)
        try {
            const metadata:Metadata = {
                orderNumber: crypto.randomUUID(),
                customerName: user?.fullName ?? "Unknown",
                customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
                clerkUserId: user!.id
            }       
            
            axios.post('/stripe-checkout',{items,metadata}).then((res)=>{
                const checkoutUrl = res.data
                if(checkoutUrl){
                    window.location.href = checkoutUrl;
                }
            }).catch((err)=>{
                console.error(err);
            })
            
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || loading) {
        return (
            <div className={`${mulish.className} px-[0.2rem] md:px-[2rem] max-w-[1200px] mx-auto`}>
                <div className="mt-6 min-h-[calc(100vh-4rem)]">
                    <div className="flex items-center justify-center gap-2 text-2xl">
                        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-row gap-4">
                                <div className="w-[100px] h-[100px] bg-gray-200 rounded animate-pulse"></div>
                                <div className="flex flex-col gap-2 flex-1">
                                    <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-1/2 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-1/4 h-5 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className={`${mulish.className} px-[0.5rem] md:px-[2rem] max-w-[1400px] mx-auto tracking-wide pb-24 md:pb-0`}>
            {items.length > 0 ? (
                <div className="mt-6 min-h-[calc(100vh-4rem)]">
                    <div className="flex items-center justify-center gap-2 text-2xl">                        
                        <Heading text="My Basket" />
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <div className="flex-1">
                            <div className="hidden md:grid grid-cols-8 gap-4 uppercase text-gray-600 text-sm mt-4 px-2 mb-4">
                                <p>Image</p>
                                <p className="col-span-3">Details</p>
                                <p className="col-span-3">Quantity</p>
                                <p className="col-span-1">Total Price</p>
                            </div>
                            
                            {items.map((item, i) => (
                                <div
                                    key={item.product._id + i}
                                    className="grid grid-cols-8 gap-4 transition-shadow items-start py-2 pt-4 bg-zinc-50 relative mb-4"
                                >
                                    <div className="absolute bottom-0 right-0 m-2 cursor-pointer">
                                        <button className="text-gray-600 hover:text-black transition-colors" onClick={() => removeGroupedItem(item.product._id, item.size, item.color)}>
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    
                                    {/* Image - col-span-1 on desktop, full width on mobile */}
                                    <div className="col-span-3 md:col-span-1">
                                        {item.product.variants
                                        ?.filter((variant) => variant.color === item.color)
                                        .map((variant, j) => (
                                            <Image
                                            key={j}
                                            src={imageUrl(variant.variantImages?.[0] || "").url()}
                                            alt={item.product.title || ""}
                                            width={1000}
                                            height={1000}
                                            className="w-[200px] h-auto object-contain md:p-2"
                                            />
                                        ))}
                                    </div>
                                    
                                    {/* Details - col-span-3 on desktop, col-span-7 on mobile */}
                                    <div className="col-span-5 md:col-span-3 flex flex-col justify-center self-start uppercase">
                                        <p className="text-sm font-semibold mb-2 truncate">{item.product.title}</p>
                                        <p className="text-sm text-gray-600 flex items-center truncate"><IndianRupee className="w-3 h-3" /> {item.price}</p>
                                        <p className="text-sm text-gray-600 mb-1 truncate">{item.color}</p>
                                        <p className="text-sm text-gray-600 truncate">{item.size}</p>
                                    </div>
                                    {/* to give quantity buttons space */}
                                    <div className="col-span-3 md:hidden"></div>
                                    {/* Quantity - col-span-3 on desktop, col-span-7 on mobile */}
                                    <div className="col-span-4 md:col-span-3 flex gap-2 items-center">
                                        <div className="flex gap-2 w-full">
                                            <button 
                                                onClick={() => decrementQuantity(item.product?.title || "", item.size, item.color)} 
                                                className={`${item.quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''} border border-gray-600 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:text-black hover:border-gray-600 scale-90 md:hover:scale-100`}
                                            >
                                                -
                                            </button>
                                            <span className='border border-gray-600 px-4 py-2 rounded-sm text-center'>{item.quantity}</span>
                                            <button 
                                                onClick={() => {
                                                    const variant = item.product.variants?.find(v => v.color === item.color);
                                                    const sizeStock = variant?.sizes?.find(s => s.size === item.size)?.stock || 0;
                                                    
                                                    if (item.quantity < sizeStock) {
                                                        incrementQuantity(item.product?.title || "", item.size, item.color);
                                                    }
                                                }} 
                                                className={`${
                                                    (() => {
                                                        const variant = item.product.variants?.find(v => v.color === item.color);
                                                        const sizeStock = variant?.sizes?.find(s => s.size === item.size)?.stock || 0;
                                                        return item.quantity >= sizeStock ? 'opacity-50 cursor-not-allowed' : ''
                                                    })()
                                                } border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:text-black hover:border-gray-600 scale-90 md:hover:scale-100`}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Price - col-span-1 on desktop, hidden on mobile (shown in details) */}
                                    <div className="hidden md:flex flex-col justify-center col-span-1">
                                        <p className="text-black font-semibold text-md flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Checkout section - fixed at bottom on mobile, normal position on desktop */}
                        <div className="fixed bottom-0 left-0 right-0 md:static md:w-80 bg-white shadow-lg md:shadow-none z-10 p-2 md:p-0">
                            <div className="max-w-[1200px] mx-auto md:mx-0 md:sticky md:top-[5rem]">
                                <div className="flex flex-col gap-4 bg-zinc-100 p-4">
                                    <p className="text-gray-600 text-sm uppercase">Total Price</p>
                                    <p className="text-black font-semibold text-md flex items-center gap-1">
                                        <IndianRupee className="w-4 h-4" /> {totalPrice}
                                    </p>
                                    <SignedIn>
                                        <button 
                                            onClick={handleCheckout} 
                                            className="bg-black text-white px-4 py-3 md:py-2 rounded-sm hover:bg-gray-800 transition-all duration-300 cursor-pointer w-full"
                                        >
                                            Checkout
                                        </button>
                                    </SignedIn>
                                    <SignedOut>
                                        <SignInButton mode="modal">
                                            <button className="bg-black text-white px-4 py-3 md:py-2 rounded-sm hover:bg-gray-800 transition-all duration-300 cursor-pointer w-full text-nowrap">
                                                Sign in to Checkout
                                            </button>
                                        </SignInButton>
                                    </SignedOut>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4 h-[calc(100vh-10rem)] justify-center items-center">
                    <p className="text-3xl md:text-5xl capitalize text-center px-4">Your basket is empty</p>
                    <Link href="/" className="text-blue-500 hover:text-blue-700 transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}