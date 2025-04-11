"use client"
import { useBasketStore } from '@/store/useBasketStore'
import React, { useEffect, useState } from 'react'

export default function TotalItemCount() {
const [isClient, setIsClient] = useState(false)
const {getItemCount} = useBasketStore()

useEffect(()=>{
  setIsClient(true)
},[])
  return (
    <span className="absolute -top-3 -right-1 text-[0.8rem] text-white bg-accent px-1 py-0 rounded-full translate-x-1/2 -translate-y-1/ h-6 w-6 flex justify-center items-center">{isClient ? getItemCount() : 0}</span>
  )
}
