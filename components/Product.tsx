"use client"
import { imageUrl } from '@/lib/imageUrl';
import { Metadata, ProductPageType } from '@/types'
import { montserrat, mulish} from '@/utils/font';
import { useGSAP } from '@gsap/react';
import { IndianRupeeIcon, Minus, Plus } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import ProductSkeleton from './Skeletons/ProductSkeleton';
import useHasMounted from '@/hooks/useHasMounted';
import { useBasketStore } from '@/store/useBasketStore';
import { motion, AnimatePresence } from 'framer-motion';
import AddToCartPopup from './AddToCartPopup';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';


function Product({product,v}:{product:ProductPageType,v: string}) {  
  const hasMounted = useHasMounted();
  const {addItem} = useBasketStore();
  let currentVariant = product.variants?.find((variant)=>variant._key===v);
  if(!currentVariant){
    currentVariant = product.variants && product.variants[0];
  }  

  const [selectedMedia,setSelectedMedia] = useState<number>(0);
  const [showShippingPolicy,setShowShippingPolicy] = useState<boolean>(true);
  const [showExchangeReturnPolicy,setShowExchangeReturnPolicy] = useState<boolean>(false);
  const shippingPolicyRef = useRef<HTMLDivElement>(null);
  const exchangeReturnPolicyRef = useRef<HTMLDivElement>(null);
  const customizationRef = useRef<HTMLDivElement>(null);
  const [showCustomization,setShowCustomization] = useState<boolean>(false);
  const [showProductDetails,setShowProductDetails] = useState<boolean>(false);  
  const productDetailsRef = useRef<HTMLDivElement>(null);
  const [quantity,setQuantity] = useState<number>(1);
  const [selectedSize,setSelectedSize] = useState<string>(currentVariant?.sizes?.[0].size || '');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showPopup, setShowPopup] = useState(false)
  const {user, isSignedIn} = useUser()

  const [addedProduct, setAddedProduct] = useState<{
    item: ProductPageType
    size: string
    color: string
    quantity: number
    price: number
  } | null>(null)




  const handleAddToCart = () => {
    setIsAddingToCart(true)
    const price = (currentVariant?.sizes?.find((size) => size.size === selectedSize)?.price || 0) - 
      ((currentVariant?.sizes?.find((size) => size.size === selectedSize)?.price || 0) * 
      (currentVariant?.sizes?.find((size) => size.size === selectedSize)?.discount || 0) / 100)
    
    addItem(product, selectedSize, currentVariant?.color || '', quantity, price, 
      (currentVariant?.sizes?.find(size => size.size === selectedSize)?.sku || ""))
    
    // Set the added product for the popup
    setAddedProduct({
      item: product,
      size: selectedSize,
      color: currentVariant?.color || '',
      quantity,
      price
    })
    setShowPopup(true)
    
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 500)
  }


  const handleBuyNow = async () => {
    if (!user || !isSignedIn) return;
  
    const selectedVariant = currentVariant;
    const sizeData = selectedVariant?.sizes?.find((size) => size.size === selectedSize);
    if (!sizeData) return;
    if(!sizeData.price) return;
    const price = sizeData.price - (sizeData.price * (sizeData.discount || 0) / 100);
    const buyNowItem = [{
      product,
      size: selectedSize,
      color: selectedVariant?.color,
      quantity,
      price,
      sku: sizeData.sku
    }];
  
    const metadata: Metadata = {
      orderNumber: crypto.randomUUID(),
      customerName: user.fullName ?? "Unknown",
      customerEmail: user.emailAddresses[0].emailAddress ?? "Unknown",
      clerkUserId: user.id
    };
  
    try {
      const res = await axios.post("/stripe-checkout", {
        items: buyNowItem,
        metadata
      });
  
      const checkoutUrl = res.data;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.error("Error in Buy Now:", err);
    }
  };
  

  useEffect(()=>{
    setQuantity(1);
    setSelectedSize(currentVariant?.sizes?.[0].size || '');
  },[currentVariant]);

  useEffect(()=>{
    setQuantity(1);
  },[selectedSize]);
  
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

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    const currentSizeStock = currentVariant?.sizes?.find(size => size.size === selectedSize)?.stock || 0; 
    if(type === 'increment'){
      if(currentSizeStock && quantity < currentSizeStock){
        setQuantity(quantity + 1);
      }
    }else{
      if(quantity > 1){
        setQuantity(quantity - 1);
      }
    }
  }

  if(!hasMounted) return <ProductSkeleton/>;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-12 my-6'
    >
        <div className='flex justify-between gap-y-4 gap-x-4 col-span-2 flex-col-reverse md:flex-row my-4 mt-0'> 
          <div className='flex flex-row md:flex-col gap-4'>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <video 
                onClick={()=>setSelectedMedia(-1)} 
                className={`w-[4rem] h-[5rem] md:w-[8rem] md:h-auto object-contain cursor-pointer transition-all duration-200 ${selectedMedia === -1 ? 'ring-1 ring-black/10' : 'hover:ring-1 hover:ring-gray-300'}`} 
                src={product.video} 
                autoPlay 
                muted 
                loop 
                playsInline
              />
            </motion.div>
            {currentVariant?.variantImages?.map((image,index)=>(
              <motion.div
                key={image._key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image 
                  src={imageUrl(image).url()} 
                  alt={image.alt || 'Product Image'} 
                  className={`w-[4rem] md:w-[8rem] h-auto object-contain cursor-pointer transition-all duration-200 ${selectedMedia === index ? 'ring-1 ring-black/10' : 'hover:ring-1 hover:ring-gray-300'}`} 
                  width={100} 
                  height={100} 
                  onClick={()=>setSelectedMedia(index)}
                />
              </motion.div>
            ))}
          </div>
          <div className='relative flex-1'>
              <AnimatePresence mode='wait'>
                {selectedMedia === -1 ? (
                  <motion.video
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='w-full h-[50vh] md:h-auto object-contain'
                    src={product.video} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  />
                ) : (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='relative'
                  >
                    {currentVariant && currentVariant.variantImages && currentVariant.variantImages.length>0 &&
                      <Image 
                        src={imageUrl(currentVariant.variantImages[selectedMedia]).url()} 
                        alt={currentVariant.variantImages[selectedMedia].alt || 'Product Image'} 
                        className='w-full h-[50vh] md:h-auto object-contain' 
                        width={1500} 
                        height={1500}
                      />
                    }
                  </motion.div>
                )}
              </AnimatePresence>
          </div>
        </div>

        {/* Product Details */}
        <div className={`${mulish.className} flex flex-col gap-2 tracking-widest mx-auto md:mx-0`}>
          <motion.p 
            whileHover={{ x: 2 }}
            className='text-sm text-gray-600 uppercase text-[0.8rem] hover:text-gray-800 transition-colors duration-200'
          >
            Anaira
          </motion.p>  
          
          <motion.h1 
            whileHover={{ x: 2 }}
            className={`text-xl font-[400] uppercase ${montserrat.className} hover:text-gray-700 transition-colors duration-200`}
          >
            {product.title}
          </motion.h1>  
          
          <motion.p 
            whileHover={{ x: 2 }}
            className={`flex gap-y-1 font-thin items-baseline transition-colors duration-200 hover:text-gray-700`}
          >
            <span className='flex items-baseline text-xl'><IndianRupeeIcon className='w-4 h-4'/>{(currentVariant?.sizes?.find((size)=>size.size===selectedSize)?.price || 0) - ((currentVariant?.sizes?.find((size)=>size.size===selectedSize)?.price || 0) * (currentVariant?.sizes?.find((size)=>size.size===selectedSize)?.discount || 0)/100) }</span> <span className='flex items-baseline text-sm ml-1 text-red-500 line-through'><IndianRupeeIcon className='w-3 h-3'/>{(currentVariant?.sizes?.find((size)=>size.size===selectedSize)?.price || 1000)}</span>            
          </motion.p>
          
          <motion.hr 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className='border-t border-gray-300 my-4'
          />
          
          <h4 className={`${montserrat.className} text-[0.8rem] font-[500] uppercase`}>Color</h4>
          <div className='flex gap-2 uppercase flex-wrap text-[0.7rem]'>
            {product.variants && product.variants.map((variant)=>(
              <motion.div
                key={variant._key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={`?v=${variant._key}`} 
                  className={`${variant.color===currentVariant?.color ? 'border-black border-2' : 'border-gray-300'} text-gray-600 flex gap-x-2 border p-3 px-6 w-[4rem] justify-center items-center cursor-pointer transition-all duration-200 hover:border-gray-500`} 
                >
                  {variant.color}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <h4 className={`${montserrat.className} text-[0.8rem] font-[500] uppercase mt-4`}>Size</h4>
          <div className='flex gap-2 uppercase flex-wrap text-[0.7rem]'>
            {currentVariant?.sizes?.map((item)=>(
              <motion.div
                key={item._key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className={`${item.size===selectedSize ? 'border-black border-2' : 'border-gray-300'} text-gray-600 flex gap-x-2 border p-3 px-6 w-[4rem] justify-center items-center cursor-pointer transition-all duration-200 hover:border-gray-500`} 
                  onClick={()=>setSelectedSize(item?.size || '')}
                >
                  {item.size}
                </div>
              </motion.div>
            ))}        
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className='flex gap-2 drop-shadow-lg drop-shadow-amber-600 my-4 text-[0.7rem]'
          >
            {(() => {
              const sizeData = currentVariant?.sizes?.find(size => size.size === selectedSize);
              return sizeData?.stock && sizeData.stock > 0 ? (
                <span className="text-amber-600 transition-colors duration-200 hover:text-amber-700">
                  {sizeData.stock} in stock
                </span>
              ) : (
                <span className="text-red-500 transition-colors duration-200 hover:text-red-600">
                  Out of Stock
                </span>
              );
            })()}
          </motion.div>
          
          <h4 className={`${montserrat.className} text-[0.8rem] font-[500] uppercase`}>Quantity</h4>
          <div className='flex gap-2'>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${quantity===1 ? 'opacity-50 cursor-not-allowed' : ''} border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-200 hover:text-black hover:border-gray-600`} 
              onClick={()=>handleQuantityChange('decrement')}
            >
              -
            </motion.button>
            
            <motion.span 
              whileTap={{ scale: 0.95 }}
              className='border border-gray-300 px-4 py-2 rounded-sm transition-colors duration-200 hover:border-gray-400'
            >
              {quantity}
            </motion.span>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${(() => {
                const sizeData = currentVariant?.sizes?.find(size => size.size === selectedSize);
                return sizeData?.stock !== undefined && sizeData.stock <= quantity
                  ? 'opacity-50 cursor-not-allowed'
                  : '';
              })()} border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-200 hover:text-black hover:border-gray-600`}               
              onClick={()=>handleQuantityChange('increment')}
            >
              +
            </motion.button>
          </div>
          
          <div className='flex flex-col gap-2 my-8'>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!currentVariant?.sizes?.find(size => size.size === selectedSize)?.stock || 
                        (currentVariant?.sizes?.find(size => size.size === selectedSize)?.stock ?? 0) <= 0 || isAddingToCart} 
              className={`border border-gray-300 bg-black/80 text-white px-4 py-4 rounded-sm cursor-pointer transition-all duration-300 hover:bg-black hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed ${isAddingToCart ? 'animate-pulse' : ''}`} 
              onClick={handleAddToCart}
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!currentVariant?.sizes?.find(size => size.size === selectedSize)?.stock || 
                        (currentVariant?.sizes?.find(size => size.size === selectedSize)?.stock ?? 0) <= 0} 
              className={`border border-gray-300 text-gray-600 px-4 py-4 rounded-sm cursor-pointer transition-all duration-200 hover:text-black hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed`}
              onClick={handleBuyNow}
            >
              Buy Now
            </motion.button>
          </div>
          
          <div>
            <motion.div 
              whileHover={{ x: 2 }}
              className={`${montserrat.className} text-[0.8rem] font-[500] my-2 uppercase flex justify-between cursor-pointer hover:text-gray-700 transition-colors duration-200`} 
              onClick={()=>setShowProductDetails(!showProductDetails)}
            >
              <span>Product Details</span>
              <span>{showProductDetails ? <Minus className='w-4 h-4'/> : <Plus className='w-4 h-4'/>}</span>
            </motion.div>
            
            <AnimatePresence>
              {showProductDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${montserrat.className} prose max-w-none mb-6 mt-4 overflow-hidden`}
                  ref={productDetailsRef}
                >
                  {Array.isArray(product.description) && product.description.length > 0 && (
                    <PortableText value={product.description}/>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.hr 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className='border-t border-gray-300 my-4'
          />
          
          <div>
            <motion.div 
              whileHover={{ x: 2 }}
              className={`${montserrat.className} text-[0.8rem] font-[500] my-2 uppercase flex justify-between cursor-pointer hover:text-gray-700 transition-colors duration-200`} 
              onClick={()=>setShowShippingPolicy(!showShippingPolicy)}
            >
              <span>Shipping Policy</span>
              <span>{showShippingPolicy ? <Minus className='w-4 h-4'/> : <Plus className='w-4 h-4'/>}</span>
            </motion.div>
            
            <AnimatePresence>
              {showShippingPolicy && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${montserrat.className} text-[0.8rem] text-gray-600 font-thin overflow-hidden`}
                  ref={shippingPolicyRef}
                >
                  We offer free <Link href='/shipping-policy' className='text-blue-600 underline hover:text-blue-700 transition-colors duration-200'>shipping</Link> on all orders over ₹1500. For orders under ₹1500, shipping is a flat rate of ₹100.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <motion.hr 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className='border-t border-gray-300 my-4'
          />
          
          <div>
            <motion.div 
              whileHover={{ x: 2 }}
              className={`${montserrat.className} text-[0.8rem] font-[500] my-2 uppercase flex justify-between cursor-pointer hover:text-gray-700 transition-colors duration-200`} 
              onClick={()=>setShowExchangeReturnPolicy(!showExchangeReturnPolicy)}
            >
              <span>Exchange and Return Policy</span>
              <span>{showExchangeReturnPolicy ? <Minus className='w-4 h-4'/> : <Plus className='w-4 h-4'/>}</span>
            </motion.div>
            
            <AnimatePresence>
              {showExchangeReturnPolicy && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${montserrat.className} text-[0.8rem] text-gray-600 font-thin overflow-hidden`}
                  ref={exchangeReturnPolicyRef}
                >
                  We offer free exchange and return on all orders.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          <motion.hr 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            className='border-t border-gray-300 my-4'
          />
          
          <div>
            <motion.div 
              whileHover={{ x: 2 }}
              className={`${montserrat.className} text-[0.8rem] font-[500] my-2 uppercase flex justify-between cursor-pointer hover:text-gray-700 transition-colors duration-200`} 
              onClick={()=>setShowCustomization(!showCustomization)}
            >
              <span>Customization</span>
              <span>{showCustomization ? <Minus className='w-4 h-4'/> : <Plus className='w-4 h-4'/>}</span>
            </motion.div>
            
            <AnimatePresence>
              {showCustomization && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${montserrat.className} text-[0.8rem] text-gray-600 font-thin overflow-hidden`}
                  ref={customizationRef}
                >
                  email us at <Link href='mailto:customization@gmail.com' className='hover:text-blue-600 transition-colors duration-200'>customize@anira.shop</Link> to customize your product.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <AddToCartPopup
          isOpen={showPopup} 
          onClose={() => setShowPopup(false)} 
          product={addedProduct} 
        />
    </motion.div>
  )
}

export default Product