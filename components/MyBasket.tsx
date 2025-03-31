"use client";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { useBasketStore } from "@/store/useBasketStore";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import { mulish } from "@/utils/font";
import { IndianRupee, Trash2 } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function MyBasket() {
    const [isClient, setIsClient] = useState(false);
    const { items, incrementQuantity, decrementQuantity, removeGroupedItem } = useBasketStore();
    
    

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Custom loading skeleton
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

    return (
        <div className={`${mulish.className} px-[0.2rem] md:px-[2rem] max-w-[1200px] mx-auto tracking-wide`}>
            {items.length > 0 ? (
                <div className="mt-6 min-h-[calc(100vh-4rem)]">
                    <div className="flex items-center justify-center gap-2 text-2xl">
                        <Heading text="My" />
                        <Heading text="Basket" />
                    </div>
                    <div className="flex gap-4">                    
                    <div className="flex flex-col gap-4 mt-4 ">
                    <div className="grid grid-cols-8 gap-4 uppercase text-gray-600 text-sm mt-4">
                        <p>
                            Image
                        </p>
                        <p className="col-span-3">
                            Details
                        </p>
                        <p className="col-span-3">
                            Quantity
                        </p>
                        <p className="col-span-1">
                            Total Price
                        </p>
                    </div>
                        {items.map((item, i) => (
                            <div
                                key={item.product._id + i}
                                className="grid grid-cols-8 gap-4 transition-shadow items-start py-2 pt-4 bg-zinc-50 relative"
                            >
                                <div className="absolute bottom-0 right-0 m-2 cursor-pointer">
                                    <button className="text-gray-600 hover:text-black transition-colors" onClick={() => removeGroupedItem(item.product._id, item.size, item.color)}>
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                {item.product.variants?.map(
                                    (variant, j) =>
                                        variant.color === item.color && (
                                            <Image
                                                key={j}
                                                src={imageUrl(variant.variantImages?.[0] || "").url()}
                                                alt={item.product.title || ""}
                                                width={100}
                                                height={100}
                                                className="w-[100px] h-auto object-contain p-2"
                                            />
                                        )
                                )}
                                <div className="flex flex-col justify-center col-span-3 self-start uppercase">
                                    <p className="text-sm font-semibold mb-2 truncate">{item.product.title}</p>
                                    <p className="text-sm text-gray-600 flex items-center truncate"><IndianRupee className="w-3 h-3" /> {item.price}</p>
                                    <p className="text-sm text-gray-600 mb-1 truncate">{item.color}</p>
                                    <p className="text-sm text-gray-600 truncate">{item.size}</p>
                                </div>
                                <div className='flex gap-2 col-span-3'>
                                    <button onClick={() => decrementQuantity(item.product?.title || "", item.size, item.color)} className={`${item.quantity===1 ? 'opacity-50 cursor-not-allowed' : ''} border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:text-black hover:border-gray-600`}>-</button>
                                    <span className='border border-gray-300 px-4 py-2 rounded-sm'>{item.quantity}</span>
                                    <button onClick={() => incrementQuantity(item.product?.title || "", item.size, item.color)} className={`${item.product.variants?.[0].sizes?.[0].stock && item.product.variants?.[0].sizes?.[0].stock <= item.quantity ? 'opacity-50 cursor-not-allowed' : ''} border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:text-black hover:border-gray-600`}>+</button>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-black font-semibold text-md flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {item.price * item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex mt-4 items-start gap-4 flex-col grow-1 bg-zinc-100 p-4 justify-start self-start">
                        <p className="text-gray-600 text-sm uppercase">Total Price</p>
                        <p className="text-black font-semibold text-md flex items-center gap-1"><IndianRupee className="w-4 h-4" /> {items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                        <SignedIn>
                        <button className="bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-all duration-300 cursor-pointer w-full">Checkout</button>
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                            <button className="bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-all duration-300 cursor-pointer w-full text-nowrap">Sign in to Checkout</button>
                            </SignInButton>
                        </SignedOut>
                    </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4 h-[calc(100vh-10rem)] justify-center items-center">
                    <p className="text-5xl capitalize">Your basket is empty</p>
                    <Link href="/" className="text-blue-500 hover:text-blue-700 transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}