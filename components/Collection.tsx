import { getCollectionBySlug } from '@/sanity/lib/collections/getCollectionBySlug';
import Heading from './Heading'
import React from 'react'
import ProductGrid from './ProductGrid';
import { ALL_PRODUCTS_QUERYResult } from '@/sanity.types';
import { cinzel } from '@/utils/font';
export default async function Collection({slug}:{slug:string}) {
  const collection = await getCollectionBySlug(slug);
  const products = collection?.products;
  return (
        <div className='px-[0.2rem] md:px-[2rem] py-[1rem]'>
        {
            collection && (
                <div>
                <div className='flex items-center justify-center gap-x-4'>
                    <div className={`${cinzel.className} text-xl md:text-4xl flex items-center justify-center gap-x-4`}>
                    <Heading text={collection?.title || ""}/>
                    </div>
                </div>
                <ProductGrid products={products as ALL_PRODUCTS_QUERYResult}/>            
                </div>
            )
        }        
        </div>
  )
}
