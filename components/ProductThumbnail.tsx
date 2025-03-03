"use client"
import { Product } from '@/sanity.types'
import React, { useState } from 'react'
import { Circle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import AddToBasketButton from './AddToBasketButton';

export default function ProductThumbnail({ product, index }: { product: Product, index: number }) {
  const [hoverState,setHoverState] = useState<number>(0)
  return (
    <motion.div
      key={product._id}
      className={`relative overflow-hidden bg-white shadow-lg ${index % 2 === 0 ? 'translate-x-4' : '-translate-x-4'} cursor-pointer`}
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 50 }}
      onMouseOver={()=>setHoverState(1)}
      onMouseOut={()=>setHoverState(0)}
    >
      { product.mainImages && product.mainImages?.length > 0 && (
        <div className="relative w-full h-[500px]"> {/* Ensure defined height */}
          <Image
            className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            src={imageUrl(product.mainImages![hoverState]).url()}
            fill
            sizes="(max-width:760px) 100vw, (max-width:1200px) 50vw, 33vw"
            alt={product.title || 'Product Image'}
          />
        </div>
       )}

      <div className="absolute bottom-0 left-0 p-3 bg-white/80 backdrop-blur-sm text-black w-full">
        <h3 className="text-xl  capitalize">{product.title || "Untitled Product"}</h3>
        <div className="flex gap-4 justify-between items-baseline">
          <p className="mt-2 text-xs font-bold font-sans">
            <span className="text-lg">₹{product.price ?? 'N/A'}</span>
            {product.price && <span className="line-through text-[#497D74] ml-2"> ₹{product.price * 2}</span>}
          </p>
          <div className="gap-x-2 p-2 px-4 bg-[beige] text-[0.8rem] uppercase font-bold font-sans tracking-widest flex items-center cursor-pointer">
            {/* <Plus className="font-semibold h-5 w-5   " /> quick add */}
            <AddToBasketButton product={product}/>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 p-2 flex items-center bg-black/10 backdrop-blur-sm">
        {Array(5).fill(0).map((_, i) => (
          <Star key={i} className="fill-[#B9B28A] text-[#B9B28A] h-3 w-3" />
        ))}
        <span className="ml-2 text-xs font-sans font-semibold">(10)</span>
      </div>

      <div className="absolute top-0 left-0 p-2 flex items-center bg-black/10 backdrop-blur-sm gap-x-1">
        {product.variants!.map((variant)=>(
            <Circle style={{ fill: variant.color }} key={variant._key} className={`h-3 w-3`} />        
        ))}
        <span className="ml-2 font-sans font-semibold text-xs">+3</span>
      </div>
    </motion.div>
  );
}
