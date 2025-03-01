import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import React from 'react'
import ProductGrid from './ProductGrid';
import Heading from './Heading';

export default async function Products() {
  const productsData = await getAllProducts();
  return (
    <div className='pb-[50rem] px-[1rem] md:px-[10rem]'>
        <Heading text="New Arrivals"/>
        <ProductGrid products={productsData}/>
    </div>
  )
}
