"use client"
import { ProductPageType } from '@/types'
import { Plus, Star, StarHalf } from 'lucide-react'
import React from 'react'



function Product({product}:{product:ProductPageType}) {
  return (
    <div><div className='flex mt-[2rem] mb-[10rem]'>
    <div className='w-[50%] grid grid-cols-5  gap-[2rem]  overflow-hidden  flex-shrink-0'>
        {
         product.mainImages && product.mainImages.map((image,i)=>(
             <img key={image._key+i} src={"/1.jpeg"} alt="" className='w-full' />
         ))   
        }
        <div className='col-span-4'>
            <img src={"/1.jpeg"} alt="" className='' />
        </div>
    </div>
    <div className='bg-zinc-950 w-[50%] flex-shrink-0 p-[5rem] '>
            <h2 className='text-[3.5rem] mb-[0.5rem]'>
                {product.title}
            </h2>
            <p className='opacity-70 leading-7 ml-[1rem]'>
            Experience timeless elegance with our luxury coat, <br /> crafted from the finest wool and tailored to perfection. <br /> Designed for sophistication and warmth. 
            </p>
            <div className='my-[1rem] flex items-center ml-[1rem]'>
                <span className='flex items-center gap-x-1 text-yellow-400 font-sans'> 4.5 <Star className='fill-yellow-400'/> <Star className='fill-yellow-400'/> <Star className='fill-yellow-400'/> <Star className='fill-yellow-400'/> <StarHalf className='fill-yellow-400'/></span><span className='opacity-100'> (Ratings)</span>
            </div>
            <div className='my-[2rem] ml-[1rem]'>
                <h4 className='uppercase text-[1.2rem] inline-block my-[0.5rem]'>Colors</h4>
                <div className='flex items-center my-[1rem] gap-x-[1.2rem] '>
                    <div className='outline h-[2.5rem] w-[2.5rem] rounded-full bg-[#afaf87] outline-offset-4 hover:outline-offset-0 transition-all duration-75'></div>
                    <div className='outline h-[2.5rem] w-[2.5rem] rounded-full bg-blue-400 outline-offset-4 hover:outline-offset-0 transition-all duration-75'></div>
                    <div className='outline h-[2.5rem] w-[2.5rem] rounded-full bg-yellow-900 outline-offset-4 hover:outline-offset-0 transition-all duration-75'></div>
                    <div className='outline h-[2.5rem] w-[2.5rem] rounded-full bg-[beige] outline-offset-4 hover:outline-offset-0 transition-all duration-75'></div>
                </div>
            </div>

            <button className='flex justify-center items-center w-[18rem] my-[2rem] mt-[4rem] bg-[beige] p-4 text-black uppercase font-bold font-sans tracking-widest gap-x-4 ml-[1rem]'>
                <Plus/>
                Add to Cart
            </button>
    </div>

</div></div>
  )
}

export default Product