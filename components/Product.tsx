"use client"
import { imageUrl } from '@/lib/imageUrl';
import { ProductPageType } from '@/types'
import { IndianRupeeIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'



function Product({product,v}:{product:ProductPageType,v: string}) {  
  let currentVariant = product.variants?.find((variant)=>variant._key===v);
  const [selectedMedia,setSelectedMedia] = useState<number>(0);

  if(!currentVariant){
    currentVariant = product.variants && product.variants[0];
  }  
  return (
    <div className='grid grid-cols-1 md:grid-cols-3  gap-x-12 my-6 mt-14'>
        <div className='flex justify-between gap-x-4 col-span-2'> 
          <div className='flex flex-col gap-y-4'>
            <video onClick={()=>setSelectedMedia(-1)} className='w-[8rem] h-auto' src={product.video} autoPlay muted loop playsInline/>
            {currentVariant?.variantImages?.map((image,index)=>(
              <Image key={image._key} src={imageUrl(image).url()} alt={image.alt || 'Product Image'} className='w-[8rem] h-auto' width={100} height={100} onClick={()=>setSelectedMedia(index)}/>
            ))}
          </div>
          <div className='relative flex-1'>
              {
                selectedMedia===-1?
                <video className='w-full h-auto' src={product.video} autoPlay muted loop playsInline/>
                :
                <div className='relative'>
                  {currentVariant && currentVariant.variantImages && currentVariant.variantImages.length>0 &&
                    <Image src={imageUrl(currentVariant.variantImages[selectedMedia]).url()} alt={currentVariant.variantImages[selectedMedia].alt || 'Product Image'} className='w-full h-auto' width={1500} height={1500}/>
                  }
                </div>
                
              }
          </div>
          {/* <div className='flex flex-col gap-y-2'>
            <span>{currentVariant?.name}</span>  
            <span>Rs{currentVariant?.price}</span>
            <span>{currentVariant?.color}</span>
            <span>{currentVariant?.size}</span>
            <span>{currentVariant?.stock}</span>  
          </div> */}
        </div>
        <div className='flex flex-col gap-y-2 sticky top-[5rem] tracking-widest'>
        <h1 className='text-2xl font-thin uppercase'>{product.title}</h1>  
        <p className='flex gap-y-1'>
            <span className='flex gap-x-1 font-semibold text-xl'><IndianRupeeIcon className='w-3 h-3'/>{currentVariant?.price}</span> <span className='flex items-center gap-x-1 font-semibold text-sm ml-4'>{currentVariant?.price}</span>
            
        </p>
        {product.variants && product.variants.map((variant)=>(
            <div>
                <h1></h1>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Product