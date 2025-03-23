import React from 'react'
import Heading from './Heading'
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import ProductGrid from './ProductGrid';


export default async function SimilarProduct() {
    const products = await getAllProducts();
  return (
    <div className='mt-12'>     
        <div className="text-xl md:text-3xl flex items-center justify-center gap-x-4">
            <Heading text="Similar" />
            <Heading text="Products" />
        </div>
        <ProductGrid products={products.slice(0,4)} />
    </div>
  )
}
