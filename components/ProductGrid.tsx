
import { ALL_PRODUCTS_QUERYResult } from '@/sanity.types'
import React from 'react'
import ProductThumbnail from './ProductThumbnail'

export default function ProductGrid({products}:{products:ALL_PRODUCTS_QUERYResult}) {
  return (
    <div className='grid grid-cols-4 gap-[2rem]'>
        {products.map((product,i)=>(
            <ProductThumbnail key={product._id} product={product} index={i}/>
        ))}
    </div>
  )
}
