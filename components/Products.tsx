import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import React from 'react'
import ProductGrid from './ProductGrid';
import Heading from './Heading';

export default async function Products() {
  const productsData = await getAllProducts();
  
  return (
    <div className='px-[0.2rem] md:px-[2rem] '>        
        <div className="text-xl md:text-3xl flex items-center justify-center gap-x-4">
            <Heading text="All Products"/>
        </div>
        <div className='mx-auto'>
        <ProductGrid products={productsData}/>
        </div>
    </div>
  )
}
