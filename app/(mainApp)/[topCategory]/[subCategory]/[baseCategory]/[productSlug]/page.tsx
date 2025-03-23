import Product from '@/components/Product'
import Reviews from '@/components/Reviews'
import SimilarProduct from '@/components/SimilarProduct'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import {  ChevronRight } from 'lucide-react'
import React from 'react'

type ProductPageParamsType = {
    topCategory:string
    subCategory:string
    baseCategory:string
    productSlug:string
}

export default async function ProductPage({params,searchParams}:{params:Promise<ProductPageParamsType>,searchParams:Promise<{ v?:string }>}) {
    const {topCategory,subCategory,baseCategory,productSlug} = await params;
    const {v=""} = await searchParams 
    const product = await getProductBySlug(productSlug);
    
  return (
    <div className='px-4 lg:px-[5rem]'>
        
        {/* {topCategory+"/"+subCategory+"/"+baseCategory+"/"+productSlug}  */}
        <div className='flex items-center gap-2 text-[0.6rem] md:text-[0.8rem] font-thin text-zinc-500 mt-6 md:uppercase'>
            <span className='cursor-pointer'>{topCategory.replaceAll("-"," ")}</span> 
            <span><ChevronRight className='w-3 h-3'/></span>
            <span className='cursor-pointer'>{subCategory.replaceAll("-"," ")}</span>
            <span><ChevronRight className='w-3 h-3'/></span>
            <span className='cursor-pointer'>{baseCategory.replaceAll("-"," ")}</span>
            <span><ChevronRight className='w-3 h-3'/></span>
            <span className='cursor-pointer'>{productSlug.replaceAll("-"," ")}</span>
        </div>
        {product &&
           <Product product={product} v={v}/>
        }        
        <Reviews />
        <SimilarProduct /> 
    </div>
  )
}
