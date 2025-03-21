"use client"
import { ProductPageType } from '@/types'
import Link from 'next/link';
import React from 'react'



function Product({product,v}:{product:ProductPageType,v: string}) {  
  let currentVariant = product.variants?.find((variant)=>variant._key===v);
  if(!currentVariant){
    currentVariant = product.variants && product.variants[0];
  }  
  return (
    <div className='flex flex-col gap-y-4'>
        <div className=''>
            selected variant  
            {currentVariant ? 
              <div className='flex flex-col gap-y-2'>
                <span>{currentVariant.name}</span>  
                <span>Rs{currentVariant.price}</span>
                <span>{currentVariant.color}</span>
                <span>{currentVariant.size}</span>
                <span>{currentVariant.stock}</span>  
              </div>    
              :
              <div>
                
              </div>
        }
        </div>
        {product.variants && product.variants.map((variant)=>(
            <Link href={`?v=${variant._key}`} key={variant._key}>
                {variant.name}---{variant.price}---{variant.color}---{variant.size}---{variant.stock}
            </Link>
        ))}
    </div>
  )
}

export default Product