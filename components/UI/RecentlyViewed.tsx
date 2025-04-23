'use client'
import React from 'react'
import { cinzel } from '@/utils/font'
import Heading from '../Heading'
import { useRecentlyViewedStore } from '@/store/useRecentlyViewed'
import ProductGrid from './ProductGrid'

export default function RecentlyViewed() {
  const viewedItems = useRecentlyViewedStore((state) => state.getViewedItems())

  if (viewedItems.length === 0) return null // Optional: hide if nothing to show

  return (
    <div className="px-[0.2rem] md:px-[2rem]">
      <div
        className={`${cinzel.className} text-xl md:text-4xl flex items-center justify-center gap-x-4`}
      >
        <Heading text="Recently Viewed" />
      </div>
      <div className="mx-auto">
        <ProductGrid products={viewedItems} />
      </div>
    </div>
  )
}
