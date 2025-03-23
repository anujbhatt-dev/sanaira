"use client";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { useBasketStore } from "@/store/useBasketStore";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import Link from "next/link";
import { mulish } from "@/utils/font";

export default function MyBasket() {
    const [isClient, setIsClient] = useState(false);
    const { items } = useBasketStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        // Custom loading skeleton
        return (
            <div className={`${mulish.className} px-[0.2rem] md:px-[2rem]`}>
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
        <div className={`${mulish.className} px-[0.2rem] md:px-[2rem]`}>
            {items.length > 0 ? (
                <div className="mt-6 min-h-[calc(100vh-4rem)]">
                    <div className="flex items-center justify-center gap-2 text-2xl">
                        <Heading text="My" />
                        <Heading text="Basket" />
                    </div>
                    <div className="flex flex-col gap-4 mt-6">
                        {items.map((item, i) => (
                            <div
                                key={item.product._id + i}
                                className="flex flex-row gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                {item.product.variants?.map(
                                    (variant, j) =>
                                        variant.color === item.color && (
                                            <Image
                                                key={j}
                                                src={imageUrl(variant.variantImages?.[0] || "").url()}
                                                alt={item.product.title || ""}
                                                width={100}
                                                height={100}
                                                className="w-[100px] h-auto object-contain"
                                            />
                                        )
                                )}
                                <div className="flex flex-col justify-center">
                                    <p className="text-lg font-semibold">{item.product.title}</p>
                                    <p className="text-sm text-gray-600">{item.color}</p>
                                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
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