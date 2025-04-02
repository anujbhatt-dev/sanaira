
import { ALL_PRODUCTS_QUERYResult } from '@/sanity.types'
import React from 'react'
import ProductThumbnail from './ProductThumbnail'

export default function ProductGrid({products}:{products:ALL_PRODUCTS_QUERYResult}) {
  console.log("Products",products.length);
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 lg:gap-[2rem] gap-2'>
        {products.map((product,i)=>(
            <ProductThumbnail key={product._id} product={product} index={i}/>
        ))}
    </div>
  )
}
