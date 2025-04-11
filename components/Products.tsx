import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import React from 'react'
import ProductGrid from './ProductGrid';
import Heading from './Heading';
import { cinzel } from '@/utils/font';

export default async function Products() {
  const productsData = await getAllProducts();
  
  return (
    <div className='px-[0.2rem] md:px-[2rem] '>        
        <div className={`${cinzel.className} text-xl md:text-4xl flex items-center justify-center gap-x-4`}>
            <Heading text="All Products"/>
        </div>
        <div className='mx-auto'>
        <ProductGrid products={productsData}/>
        </div>
    </div>
  )
}
