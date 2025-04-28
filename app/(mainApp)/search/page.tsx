import Heading from '@/components/Heading';
// import ProductGrid from '@/components/UI/ProductGrid';
import { getSearchedProducts } from '@/sanity/lib/products/getSearchProducts';
// import { ProductPageType } from '@/types';
import React from 'react'

export default async function SearchPage({
    searchParams
}:{
    searchParams:Promise<{
        query : string;
    }>
}) {

  const q = await searchParams
  const products = await getSearchedProducts(q.query)
  console.log(products);
  
  return (
    <div className='pb-[50rem] px-[0.2rem] md:px-[2rem]'>
        <div className='flex justify-center gap-x-4'>
          <Heading text="Results"/>
        </div>
        <div className='mx-auto'>
        {/* <ProductGrid products={products}/> */}
        </div>
    </div>
  )
}
