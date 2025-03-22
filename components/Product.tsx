"use client"
import { imageUrl } from '@/lib/imageUrl';
import { ProductPageType } from '@/types'
import { montserrat, mulish} from '@/utils/font';
import { useGSAP } from '@gsap/react';
import { IndianRupeeIcon, Plus } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';




function Product({product,v}:{product:ProductPageType,v: string}) {  
  const [isClient,setIsClient] = useState<boolean>(false);
  let currentVariant = product.variants?.find((variant)=>variant._key===v);
  const [selectedMedia,setSelectedMedia] = useState<number>(0);
  const [showShippingPolicy,setShowShippingPolicy] = useState<boolean>(true);
  const [showExchangeReturnPolicy,setShowExchangeReturnPolicy] = useState<boolean>(false);
  const shippingPolicyRef = useRef<HTMLDivElement>(null);
  const exchangeReturnPolicyRef = useRef<HTMLDivElement>(null);
  const customizationRef = useRef<HTMLDivElement>(null);
  const [showCustomization,setShowCustomization] = useState<boolean>(false);
  const [showProductDetails,setShowProductDetails] = useState<boolean>(false);  
  const productDetailsRef = useRef<HTMLDivElement>(null);

  useGSAP(()=>{
     gsap.from(shippingPolicyRef.current, {
      duration: 0.5,
      ease: 'power2.inOut',
      opacity: 0
    })
    gsap.from(exchangeReturnPolicyRef.current, {
      duration: 0.5,
      ease: 'power2.inOut',
      opacity: 0
    })
    gsap.from(customizationRef.current, {
      duration: 0.5,
      ease: 'power2.inOut',
      opacity: 0
    })
    gsap.from(productDetailsRef.current, {
      duration: 0.5,
      ease: 'power2.inOut',
      opacity: 0
    })
    
  })

  useEffect(()=>{
    setIsClient(true);
  },[])

  if(!isClient){
    return <div>Loading...</div>
  }

  if(!currentVariant){
    currentVariant = product.variants && product.variants[0];
  }  
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-12 my-6'>
        <div className='flex justify-between gap-y-4 gap-x-4 col-span-2 flex-col-reverse md:flex-row my-4'> 
          <div className='flex flex-row md:flex-col gap-4 '>
            <video onClick={()=>setSelectedMedia(-1)} className='w-[4rem] h-[5rem] md:w-[8rem] md:h-auto object-contain' src={product.video} autoPlay muted loop playsInline/>
            {currentVariant?.variantImages?.map((image,index)=>(
              <Image key={image._key} src={imageUrl(image).url()} alt={image.alt || 'Product Image'} className='w-[4rem] md:w-[8rem] h-auto object-contain' width={100} height={100} onClick={()=>setSelectedMedia(index)}/>
            ))}
          </div>
          <div className='relative flex-1'>
              {
                selectedMedia===-1?
                <video className='w-full h-[50vh] md:h-auto object-contain' src={product.video} autoPlay muted loop playsInline/>
                :
                <div className='relative'>
                  {currentVariant && currentVariant.variantImages && currentVariant.variantImages.length>0 &&
                    <Image src={imageUrl(currentVariant.variantImages[selectedMedia]).url()} alt={currentVariant.variantImages[selectedMedia].alt || 'Product Image'} className='w-full h-[50vh] md:h-auto object-contain' width={1500} height={1500}/>
                  }
                </div>
                
              }
          </div>
          {/* <div className='flex flex-col gap-y-2'>
            <span>{currentVariant?.name}</span>  
            <span>Rs{currentVariant?.price}</span>
            <span>{currentVariant?.color}</span>
            <span>{currentVariant?.size}</span>
            <span>{currentVariant?.stock}</span>  
          </div> */}
        </div>
        <div className={`${mulish.className} flex flex-col gap-2 tracking-widest mx-auto md:mx-0`}>
        <h1 className={`text-xl font-[400] uppercase ${montserrat.className}`}>{product.title}</h1>  
        <p className={`flex gap-y-1 font-thin items-baseline`}>
            <span className='flex items-baseline text-xl'><IndianRupeeIcon className='w-4 h-4'/>{currentVariant?.price}</span> <span className='flex items-baseline text-sm ml-1 text-red-500 line-through'><IndianRupeeIcon className='w-3 h-3'/>{(currentVariant?.price || 1000) *3 }</span>            
        </p>
        <hr className='border-t border-gray-300 my-4'/>
        <h4 className={`${montserrat.className} text-[0.8rem] font-[500] uppercase`}>Size</h4>
        <div className='flex gap-2 uppercase flex-wrap text-[0.7rem]'>
          {product.variants && product.variants.map((variant,i)=>(
              <div key={variant._key} className={`${i==0 ? 'border-black border-2' : 'border-gray-300'} text-gray-600 flex gap-x-2 border p-3 px-6 w-[4rem] justify-center items-center cursor-pointer`} >
                  {variant.size}
              </div>
          ))}        
        </div>
        <div className='flex gap-2 drop-shadow-lg drop-shadow-amber-600 my-4 text-[0.7rem]'>
          {currentVariant?.stock && currentVariant?.stock > 0 ? <span className='text-amber-600 '>{currentVariant?.stock} in stock</span> : <span className='text-red-500'>Out of Stock</span>}
        </div>
         
         <div className='flex gap-2'>
            <button className='border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:text-black hover:border-gray-600'>-</button>
            <span className='border border-gray-300 px-4 py-2 rounded-sm'>1</span>
            <button className='border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-300 hover:text-black hover:border-gray-600'>+</button>
          </div>
          <div className='flex flex-col gap-2 my-8'>
            <button className='border border-gray-300 bg-black/80 text-white px-4 py-4 rounded-sm cursor-pointer transition-all duration-300 hover:bg-black hover:border-gray-600'>Add to Cart</button>
            <button className='border border-gray-300 text-gray-600 px-4 py-4 rounded-sm cursor-pointer transition-all duration-300 hover:text-black hover:border-gray-600'>Buy Now</button>
          </div>
          <div>
          <h4 className={`${montserrat.className} text-[0.8rem] font-[500] my-2 uppercase flex justify-between`} onClick={()=>setShowProductDetails(!showProductDetails)}> <span className=''>Product Details</span><span><Plus className='w-4 h-4'/></span></h4>
            <div className={`${montserrat.className} prose max-w-noe mb-6 ${showProductDetails ? 'block' : 'hidden'} mt-4`} ref={productDetailsRef}>
              {
                Array.isArray(product.description) && product.description.length > 0 && (
                  <PortableText value={product.description}/>
                )
              }
              </div>
          </div>
          <hr className='border-t border-gray-300 my-4'/>
          <div className=''>             
              <h4 className={`${montserrat.className} text-[0.8rem] font-[500] my-2 uppercase flex justify-between`} onClick={()=>setShowShippingPolicy(!showShippingPolicy)}> <span className=''>Shipping Policy</span><span><Plus className='w-4 h-4'/></span></h4>
              <p className={`${montserrat.className} text-[0.8rem] text-gray-600 font-thin ${showShippingPolicy ? 'block' : 'hidden'}`} ref={shippingPolicyRef}>
                We offer free shipping on all orders over ₹1500. For orders under ₹1500, shipping is a flat rate of ₹100.
              </p>             
          </div>
          <hr className='border-t border-gray-300 my-4'/>
          <div className=''>             
              <h4 className={`${montserrat.className} text-[0.8rem] font-[500] my-2 uppercase flex justify-between`} onClick={()=>setShowExchangeReturnPolicy(!showExchangeReturnPolicy)}> <span className=''>Exchange and Return Policy</span><span><Plus className='w-4 h-4'/></span></h4>
              <p className={`${montserrat.className} text-[0.8rem] text-gray-600 font-thin ${showExchangeReturnPolicy ? 'block' : 'hidden'}`} ref={exchangeReturnPolicyRef}>
                We offer free exchange and return on all orders.
              </p>
          </div>
          <hr className='border-t border-gray-300 my-4'/>
          <div className=''>
            <h4  className={`${montserrat.className} text-[0.8rem] font-[500] my-2 uppercase flex justify-between`} onClick={()=>setShowCustomization(!showCustomization)}> <span className=''>Customization</span><span><Plus className='w-4 h-4'/></span></h4>
            <p className={`${montserrat.className} text-[0.8rem] text-gray-600 font-thin ${showCustomization ? 'block' : 'hidden'}`} ref={customizationRef}>
              email us at <Link href='mailto:customization@gmail.com'>customization@anira.shop</Link> to customize your product.
            </p>
          </div>
        </div>
    </div>
  )
}

export default Product