'use client'


import { useWishlistStore } from '@/store/useWishlistStore'
import { cinzel } from '@/utils/font'
import Heading from '../Heading'
import ProductGrid from './ProductGrid'

export default function Wishlist() {
  const wishlistItems = useWishlistStore((state) => state.getWishlist())

  if (wishlistItems.length === 0) return null

  return (
    <div className="px-[0.2rem] md:px-[2rem]">
      <div
        className={`${cinzel.className} text-xl md:text-4xl flex items-center justify-center gap-x-4`}
      >
        <Heading text="Your Wishlist" />
      </div>
      <div className="mx-auto">
        <ProductGrid products={wishlistItems} />
      </div>
    </div>
  )
}
