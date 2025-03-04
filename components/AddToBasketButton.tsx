"use client"
import { useBasketStore } from '@/store/useBasketStore'
import { ProductPageType } from '@/types'
import React, { useEffect, useState } from 'react'



interface IAddToBasketButtonProps{
    product:ProductPageType
    disabled?:boolean
}


export default function AddToBasketButton({product,disabled}:IAddToBasketButtonProps) {
    const {addItem, removeItem,getSingleItemCount} = useBasketStore()
    const itemCount = getSingleItemCount(product._id)

    const [isClient,setIsClient] = useState(false);

    useEffect(()=>{
        setIsClient(true)
    },[])

    if(!isClient) return null

  return (
    <div className='flex justify-center'>
            <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${itemCount==0 ?"bg-gray-100 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`} onClick={()=>removeItem(product._id)} disabled={itemCount===0 || disabled}>
                <span className={`text-xl font-bold ${itemCount===0?"text-gray-400":"text-gray-600"}`}>-</span>
            </button>
            <span className='w-8 text-center font-semibold flex justify-center items-center'>{itemCount}</span>
            <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${disabled ?"bg-gray-100 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} onClick={()=>addItem(product)} disabled={disabled}>
                <span className={`text-xl font-bold text-white`}>+</span>
            </button>
    </div>
  )
}
