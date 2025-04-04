"use client"
import React, { useEffect, useState } from 'react'
import { IndianRupeeIcon, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { ProductPageType } from '@/types';
import { useRouter } from 'next/navigation';
import { montserrat, mulish } from '@/utils/font';

export default function ProductThumbnail({ product, index }: { product: ProductPageType, index: number }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [variantNumber,setVariantNumber] = useState<number>(0)
  const [variantImage,setVariantImage] = useState<number>(0) 
  const [isVideovisble, setIsVideoVisible] = useState(false) 

  const handleClick = () => {
    router.push(`/${product.productPath && product.productPath[0]}/${product.productPath && product.productPath[1]}/${product.productPath && product.productPath[2]}/${product.slug?.current}`);
  }


  useEffect(()=>{
    setIsClient(true);
  },[])

  if(!isClient) return null;

  return (
    <motion.div
      key={product._id}
      className={`relative overflow-hidden bg-white cursor-pointer ${montserrat.className}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 50 }}
    >
      <div className=' aspect-[9/13]'>
          {product.variants && product.variants?.length>0 && product.variants[variantNumber].variantImages && product.variants[variantNumber].variantImages.length>0 &&  (
          <div onClick={handleClick} onMouseEnter={()=>setIsVideoVisible(true)} onMouseLeave={()=>setIsVideoVisible(false)} className="relative  aspect-[9/13]"> {/* Ensure defined height */}
            {
              !isVideovisble && product.variants && product.variants[variantNumber].variantImages &&
              <Image
                className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                src={imageUrl(product.variants[variantNumber].variantImages[variantImage]).url()}
                fill
                sizes="(max-width:760px) 100vw, (max-width:1200px) 50vw, 33vw"
                alt={product.variants![variantNumber].variantImages![variantImage].alt|| 'Product Image'}
                />
            }
            {
              isVideovisble && product.video && 
              <video className='aspect-[9/13] object-cover' src={product.video} autoPlay loop playsInline muted/>
            }
              {/* <div className="absolute top-0 right-0 p-2 hidden lg:flex items-center bg-black/10 backdrop-blur-sm ">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} className="fill-[#B9B28A] text-[#B9B28A] h-3 w-3" />
                ))}
                <span className="ml-2 text-xs font-sans font-semibold">(10)</span>
              </div> */}
              
          </div>
          )}

          
          <div className="lg:absolute bottom-0 left-0 p-1 bg-white/80 backdrop-blur-sm text-black w-full px-2 py-2 min-h-[7rem]">
          <div className='p-2 flex items-center gap-x-1 justify-end'>
            {product.variants && product.variants[variantNumber].variantImages && product.variants[variantNumber]?.variantImages.map((image,i)=>(
              <div onClick={()=>setVariantImage(i)} key={image._key} className={`h-3 w-3 border border-black/50 bg-black ${variantImage!=i && "opacity-20"} relative`}>
                    
              </div>              
            ))}
          </div>
          <h3 className="text-md lg:text-lg uppercase truncate" title={product.title || "Untitled Product"} >{product.title || "Untitled Product"}</h3>
          <div className={` flex gap-4 justify-between items-baseline `}>
            {
              product.variants &&
              <p className={`${mulish.className} mt-2 text-[0.7rem] md:text-xs flex items-end`}>
              {product.variants[0].sizes?.[0].price && product.variants[0].sizes?.[0].discount && <span className=" text-sm lg:text-2xl font-semibold flex items-center leading-0"> <IndianRupeeIcon className='w-4 h-4'/>{product.variants[0].sizes?.[0].price - (product.variants[0].sizes?.[0].price * product.variants[0].sizes?.[0].discount / 100)}</span>}
                <span className="ml-2 flex items-center leading-0 text-red-800"><IndianRupeeIcon className='w-4 h-4'/>{product.variants[0].sizes?.[0].price ?? 'N/A'}</span>
              </p>
            }
           <div className="lg:gap-x-2 p-2 lg:px-4 bg-[beige] text-[0.8rem] uppercase font-bold font-sans tracking-widest flex items-center cursor-pointer" title='Quick Add'>
             <Plus className="font-semibold h-3 w-3 lg:h-5 lg:w-5 "  /> <span className='hidden lg:flex'>quick add</span>
           </div>
          </div>
          </div>
      </div>
      <div className={`${mulish.className} ${product?.variants?.[0].sizes?.[0].discount===0 && "hidden" } absolute top-0 left-0 p-1 px-2 text-sm items-center  gap-x-1 text-white bg-black m-2`}>
              {product?.variants?.[0].sizes?.[0].discount}%
      </div>
      <div className='absolute top-0 left-0 p-2  items-center  gap-x-1 hidden'>
        {product.variants?.map((variant,i)=>(
          <div onClick={()=>{setVariantNumber(i); setVariantImage(0);}} title={variant.name} key={variant._key} className='h-4 w-4 border border-black/20 hover:border-black transition-all duration-150 relative backdrop-blur-sm rounded-full ' style={{backgroundColor:variant.color}}>
                
          </div>              
        ))}
      </div>
      
    </motion.div>
  );
}
