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
    <span className="absolute top-0 right-[0rem] text-xs text-white bg-black px-2 py-1 rounded-full translate-x-1/2 -translate-y-1/2">{isClient ? getItemCount() : 0}</span>
  )
}
