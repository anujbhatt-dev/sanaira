"use client"
import React, { useEffect, useState } from 'react'

interface TotalItemCountI {
  total:number
}

export default function TotalItemCount({total}:TotalItemCountI) {
const [isClient, setIsClient] = useState(false)


useEffect(()=>{
  setIsClient(true)
},[])
  return (
    <span className="absolute -top-3 -right-1 text-[0.8rem] text-white bg-accent px-1 py-0 rounded-full translate-x-1/2 -translate-y-1/ h-6 w-6 flex justify-center items-center">{isClient ? total : 0}</span>
  )
}
