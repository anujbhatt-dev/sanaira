"use client"
import { imageUrl } from '@/lib/imageUrl'
import { ProductPageType } from '@/types'
import { Plus, Star, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

export default function QuickAdd({product}:{product:ProductPageType}) {
  const [variantNumber,setVariantNumber] = useState<number>(0)
  const [variantImage,setVariantImage] = useState<number>(0)  
  return (
    <div className='fixed bottom-0 right-0 m-2 border border-black bg-emerald-700 shadow-sm h-[25rem] w-[25rem] rounded overflow-hidden'>
       <X className='absolute top-0 right-0 m-2'/>
       <div className='flex justify-between items-center'>
       { product.variants && product.variants?.length>0 && product.variants[variantNumber].variantImages && product.variants[variantNumber].variantImages.length>0 &&  (
          <div className="relative h-[200px] lg:w-full lg:h-[500px]"> {/* Ensure defined height */}
            {
              product.variants && product.variants[variantNumber].variantImages &&
            <Image
              className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              src={imageUrl(product.variants[variantNumber].variantImages[variantImage]).url()}
              fill
              sizes="(max-width:760px) 100vw, (max-width:1200px) 50vw, 33vw"
              alt={product.variants![variantNumber].variantImages![variantImage].alt|| 'Product Image'}
              />
            }
              <div className="absolute top-0 right-0 p-2 hidden lg:flex items-center bg-black/10 backdrop-blur-sm ">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="fill-[#B9B28A] text-[#B9B28A] h-3 w-3" />
                ))}
                <span className="ml-2 text-xs font-sans font-semibold">(10)</span>
              </div>
              
          </div>
          )}
       <div className="p-1 bg-white/80 backdrop-blur-sm text-black w-full">
          <div className='p-2 flex items-center  gap-x-1 justify-center'>
            {product.variants && product.variants[variantNumber].variantImages && product.variants[variantNumber]?.variantImages.map((image,i)=>(
              <div onClick={()=>setVariantImage(i)} key={image._key} className={`h-3 w-3 border border-black/50 bg-black ${variantImage!=i && "opacity-20"} relative rounded-full`}>
                    
              </div>              
            ))}
          </div>
          <h3 className="text-md lg:text-xl  capitalize">{product.title || "Untitled Product"}</h3>
          <div className="flex gap-4 justify-between items-baseline ">
            {
                product.variants &&
                <p className="mt-2 text-[0.7rem] md:text-xs font-bold font-sans">
                <span className="text-sm lg:text-lg">₹{product.variants[0].price ?? 'N/A'}</span>
              {product.variants[0].price && <span className="line-through text-[#497D74] ml-2"> ₹{product.variants[0].price * 2}</span>}
              </p>
            }
           <div className="lg:gap-x-2 p-2 lg:px-4 bg-[beige] text-[0.8rem] uppercase font-bold font-sans tracking-widest flex items-center cursor-pointer" title='Quick Add'>
             <Plus className="font-semibold h-3 w-3 lg:h-5 lg:w-5 "  /> <span className='hidden lg:flex'>quick add</span>
           </div>
          </div>
          </div>
        </div> 
    </div>
  )
}
