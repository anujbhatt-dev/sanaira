import Product from '@/components/Product'
import Reviews from '@/components/Reviews'
import SimilarProduct from '@/components/SimilarProduct'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { cinzel } from '@/utils/font'
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
        <div className='flex items-center gap-2 text-[0.7rem] md:text-[0.8rem] font-thin text-black mt-6 uppercase'>
            <span className='cursor-pointer'>{topCategory.replaceAll("-"," ")}</span> 
            <span>{">"}</span>
            <span className='cursor-pointer'>{subCategory.replaceAll("-"," ")}</span>
            <span>{">"}</span>
            <span className='cursor-pointer'>{baseCategory.replaceAll("-"," ")}</span>
            <span>{">"}</span>
        </div>
          <h1 className={`${cinzel.className} uppercase text-xl lg:text-2xl text-accent mt-6`}>
            <span className='cursor-pointer'>{productSlug.replaceAll("-"," ")}</span>
          </h1>
        {product &&
           <Product product={product} v={v}/>
        }        
        <Reviews />
        <SimilarProduct products={product?.youMayAlsoLike ?? []}/> 
    </div>
  )
}
