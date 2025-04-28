import React from 'react'
import Heading from './Heading'
import { getSimilarProductBySlug } from '@/sanity/lib/products/getSimilarProductsBySlug';
import ProductGridSimilar from './UI/ProductGridSimilar';


export default async function SimilarProduct({productSlug}:{productSlug:string}) {
  const similarProducts = await getSimilarProductBySlug(productSlug)
  const youMayAlsoLike = similarProducts?.youMayAlsoLike
  if(youMayAlsoLike && youMayAlsoLike.length < 1){
    return null
  }
  return (
    <div className='mt-12'>     
        <div className="text-xl md:text-3xl flex items-center justify-center gap-x-4">
            <Heading text="Similar" />
            <Heading text="Products" />
        </div>
        {youMayAlsoLike &&
        <ProductGridSimilar similarProduct={similarProducts}  />
        }
    </div>
  )
}
