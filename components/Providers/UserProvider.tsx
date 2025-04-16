// components/WishlistProvider.tsx
'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useUserStore } from '@/store/useUserStore'


export const WishlistProvider = () => {
  const { user, isSignedIn } = useUser()
  

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!isSignedIn) return

      const res = await fetch(`/api/wishlist`, {
        headers: {
          'Authorization': `Bearer ${await user.getToken()}`, // optional if you use Clerk auth middleware
        },
      })
      const data = await res.json()
      setWishlist(data.productIds) // assuming it returns { productIds: [...] }
    }

    fetchWishlist()
  }, [isSignedIn, user, ])

  return null
}
