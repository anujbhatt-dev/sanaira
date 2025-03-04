import Product from '@/components/Product'
import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { ArrowRight } from 'lucide-react'
import React from 'react'

type ProductPageParamsType = {
    topCategory:string
    subCategory:string
    baseCategory:string
    productSlug:string
}

export default async function ProductPage({params}:{params:Promise<ProductPageParamsType>}) {
    const {topCategory,subCategory,baseCategory,productSlug} = await params;
    const product = await getProductBySlug(productSlug);
    console.log(product);
    
  return (
    <div>
        
        {topCategory+"/"+subCategory+"/"+baseCategory+"/"+productSlug} 
        <div className='flex items-center gap-10'>
            <span className='capitalize'>{topCategory.replaceAll("-"," ")}</span>
            <span><ArrowRight/></span>
            <span className='capitalize'>{subCategory.replaceAll("-"," ")}</span>
            <span><ArrowRight/></span>
            <span className='capitalize'>{baseCategory.replaceAll("-"," ")}</span>
            <span><ArrowRight/></span>
            <span className='capitalize'>{productSlug.replaceAll("-"," ")}</span>
        </div>
        {product &&
        <Product product={product}/>
        }
    </div>
  )
}
