'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { useBasketStore } from '@/store/useBasketStore'
// import { useRouter } from 'next/navigation'
export default function Success() {
  const {clearBasket} = useBasketStore()
  useEffect(()=>{
    clearBasket()
  },[clearBasket])
  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Thank you for your order!</h1>
            <p className='text-gray-500'>Your order has been placed successfully.</p>
            <p className='text-gray-500'>Your order number is <span className='font-bold'>{"order.id"}</span>.</p>
            <p className='text-gray-500'>Your order will be delivered in 3-5 business days.</p>
            <p className='text-gray-500'>You can track your order <Link href={`/orders/${"order.id"}`}>here</Link>.</p>
            <button className='bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-all duration-300 cursor-pointer'>Continue Shopping</button>
            <button  className='bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-all duration-300 cursor-pointer'>View Order</button>
            <button className='bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition-all duration-300 cursor-pointer'>Download Invoice</button>            
        </div>
    </div>
  )
}
