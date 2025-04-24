import React from 'react'
import Heading from './Heading'
// import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import ProductGrid from './UI/ProductGrid';
import { ProductMini, ProductPageType } from '@/types';
import { SIMILAR_PRODUCT_BY_SLUG_QUERYResult } from '@/sanity.types';


export default async function SimilarProduct({products}:{products:SIMILAR_PRODUCT_BY_SLUG_QUERYResult}) {
  const youMayAlsoLike = products?.youMayAlsoLike
  return (
    <div className='mt-12'>     
        <div className="text-xl md:text-3xl flex items-center justify-center gap-x-4">
            <Heading text="Similar" />
            <Heading text="Products" />
        </div>
        {youMayAlsoLike &&
        <ProductGrid similarProduct={youMayAlsoLike}  />
        }
    </div>
  )
}
