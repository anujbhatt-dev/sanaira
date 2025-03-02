
import { Product } from '@/sanity.types'
import React from 'react'
import ProductThumbnail from './ProductThumbnail'

export default function ProductGrid({products}:{products:Product[]}) {
  return (
    <div className='grid grid-cols-3 gap-4'>
        {products.map((product,i)=>(
            <ProductThumbnail key={product._id} product={product} index={i}/>
        ))}
    </div>
  )
}
