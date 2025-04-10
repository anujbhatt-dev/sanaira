'use client';

import React, { useEffect, useState } from 'react';
import { IndianRupeeIcon, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { ProductPageType } from '@/types';
import { useRouter } from 'next/navigation';
import { poppins, ws, cinzel } from '@/utils/font';
import Head from 'next/head';
import { useAuth, useUser, SignInButton } from '@clerk/nextjs';
import axios from 'axios';

export default function ProductThumbnail({ product, index }: { product: ProductPageType; index: number }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [variantNumber, setVariantNumber] = useState<number>(0);
  const [variantImage, setVariantImage] = useState<number>(0);
  const [isVideovisble, setIsVideoVisible] = useState(false);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const [quickBuySize, setQuickBuySize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const currentVariant = product.variants?.[variantNumber];
  const currentSize = currentVariant?.sizes?.[0];
  const selectedImage = currentVariant?.variantImages?.[variantImage];

  const handleClick = () => {
    const path = product.productPath?.slice(0, 3).join('/');
    if (path && product.slug?.current && currentVariant?._key) {
      router.push(`/${path}/${product.slug.current}?v=${currentVariant._key}`);
    }
  };

  const handleQuickBuyCheckout = async () => {
    if (!user || !isSignedIn || !quickBuySize || !currentVariant) return;
    const selectedSize = currentVariant.sizes?.find(s => s.size === quickBuySize);
    if (!selectedSize) return;

    setIsLoading(true);

    const price = (selectedSize.price ?? 0) - ((selectedSize.price ?? 0) * (selectedSize.discount ?? 0)) / 100;

    const payload = {
      items: [
        {
          product,
          size: selectedSize.size ?? '',
          color: currentVariant.color ?? '',
          quantity,
          price,
          sku: selectedSize.sku ?? '',
        },
      ],
      metadata: {
        orderNumber: crypto.randomUUID(),
        customerName: user.fullName ?? 'Unknown',
        customerEmail: user.emailAddresses[0].emailAddress ?? 'Unknown',
        clerkUserId: user.id,
      },
    };

    try {
      const res = await axios.post('/stripe-checkout', payload);
      const checkoutUrl = res.data;
      if (checkoutUrl) window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Quick Buy error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !currentVariant || !currentVariant.sizes || currentVariant.sizes.length === 0) return null;

  return (
    <motion.div
      key={product._id}
      className={`relative overflow-hidden bg-white cursor-pointer ${cinzel.className}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 50 }}
    >
      {product.video && (
        <Head>
          <link rel="preload" as="video" href={product.video} type="video/mp4" />
        </Head>
      )}

      <div
        className="relative aspect-[9/13] w-full overflow-hidden"
        onClick={handleClick}
        onMouseEnter={() => setIsVideoVisible(true)}
        onMouseLeave={() => setIsVideoVisible(false)}
      >
        <div className="absolute inset-0">
          {!isVideovisble && selectedImage ? (
            <Image
              className="object-cover"
              src={imageUrl(selectedImage).url()}
              alt={selectedImage.alt || 'Product Image'}
              fill
              sizes="(max-width:760px) 100vw, (max-width:1200px) 50vw, 33vw"
            />
          ) : (
            product.video && (
              <video
                className="w-full h-full object-cover"
                src={product.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            )
          )}
        </div>
      </div>

      <div className="p-1 bg-white backdrop-blur-sm text-black w-full ">        
        <h3 className="text-[12px] lg:text-[14px] uppercase truncate mt-2" title={product.title || 'Untitled Product'}>
          {product.title || 'Untitled Product'}
        </h3>

        {/* hidden for now */}
        <div className="items-center justify-between hidden">
            <div className="flex items-center gap-x-1">
              {product.variants?.map((variant, i) => (
                <div
                  key={variant._key}
                  title={variant.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVariantNumber(i);
                    setVariantImage(0);
                  }}
                  className="h-3 w-3 border border-white/60 hover:border-white transition-all duration-150 rounded-full "
                  style={{ backgroundColor: variant.color ?? '#ccc' }}
                />
              ))}
            </div>

            <div className="flex items-center gap-x-1 justify-end mt-1">
              {currentVariant.variantImages?.map((image, i) => (
                <div
                  key={image._key}
                  onClick={(e) => {
                    e.stopPropagation();
                    setVariantImage(i);
                  }}
                  className={`h-3 w-3 border border-black/50 bg-black ${variantImage !== i ? 'opacity-20' : ''}`}
                />
              ))}
            </div>
          </div>

        <div className="flex gap-4 justify-between items-baseline">
          <p className={`text-[0.7rem] md:text-xs flex items-end `}>
            <span className="text-sm lg:text-[14px] flex items-center leading-0 tracking-widest">
              {/* <IndianRupeeIcon className="w-4 h-4 " /> */}
              Rs. {(currentSize?.price ?? 0) - ((currentSize?.price ?? 0) * (currentSize?.discount ?? 0)) / 100}
            </span>

            {/* hidden */}
            <span className="ml-2 items-center leading-0 text-red-800 line-through hidden">
              <IndianRupeeIcon className="w-4 h-4" />
              {currentSize?.price ?? 0}
            </span>
          </p>

          {isSignedIn ? (
            <button
              onClick={() => setShowQuickBuy(true)}
              className={`${ws.className} lg:gap-x-2 p-2 lg:px-4 bg-[#fcfcf1] hover:bg-[#ffffa2] text-[0.8rem] uppercase  tracking-widest flex items-center cursor-pointer hover:bg-beige/90 transition-all duration-200`}
              title="Quick Buy"
            >
              <Plus className="font-semibold h-3 w-3 lg:hidden" /> <span className="hidden lg:flex">Quick Buy</span>
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className={`${ws.className} lg:gap-x-2 p-2 lg:px-4 bg-[#fcfcf1] hover:bg-[#ffffa2] text-[0.8rem] uppercase  tracking-widest flex items-center cursor-pointer hover:bg-beige/90 transition-all duration-200`}>
                <Plus className="font-semibold h-3 w-3 lg:hidden" /> <span className="hidden lg:flex">Quick Buy</span>
              </button>
            </SignInButton>
          )}
        </div>
        
      </div>


      {currentSize?.discount && currentSize.discount > 0 && (
        <div className={`${poppins.className} absolute top-0 left-0 p-1 px-2 text-sm text-white bg-black m-2`}>
          {currentSize.discount}%
        </div>
      )}
      <AnimatePresence>
        {showQuickBuy && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 flex items-center justify-end"
          >
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-l-xl shadow-lg w-full sm:w-[24rem] h-full overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                <div className="relative aspect-[9/13] w-full h-auto overflow-hidden">
                  <Image
                    src={imageUrl(selectedImage).url()}
                    alt={selectedImage.alt || product.title || 'Product Image'}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between gap-4 p-4 flex-1">
                  <div>
                    <h2 className="text-sm font-bold uppercase mb-1">{product.title}</h2>
                    <p className="text-xs text-gray-600 mb-2">Color: {currentVariant?.color}</p>

                    {quickBuySize && (() => {
                      const size = currentVariant?.sizes?.find(s => s.size === quickBuySize);
                      const original = size?.price ?? 0;
                      const discount = size?.discount ?? 0;
                      const final = original - (original * discount) / 100;
                      return (
                        <div className="text-xs mb-2">
                          <p className="text-black font-semibold">
                            ₹{final.toFixed(0)}{' '}
                            {discount > 0 && (
                              <span className="line-through text-red-600 ml-2">₹{original}</span>
                            )}
                          </p>
                          {discount > 0 && (
                            <p className="text-[10px] text-green-600 font-semibold">({discount}% OFF)</p>
                          )}
                        </div>
                      );
                    })()}

                    <div className='flex gap-2 uppercase flex-wrap text-[0.7rem] mb-3'>
                      {currentVariant?.sizes?.map((item) => {
                        const isOutOfStock = item.stock === 0;
                        return (
                          <motion.div
                            key={item._key}
                            whileHover={{ scale: isOutOfStock ? 1 : 1.05 }}
                            whileTap={{ scale: isOutOfStock ? 1 : 0.95 }}
                          >
                            <div
                              className={`${item.size === quickBuySize ? 'border-black border-2' : 'border-gray-300'} text-gray-600 flex gap-x-2 border p-3 px-6 w-[4rem] justify-center items-center transition-all duration-200 hover:border-gray-500 ${isOutOfStock ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                              onClick={() => !isOutOfStock && setQuickBuySize(item?.size || '')}
                            >
                              {item.size}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className='flex gap-2'>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${quantity === 1 ? 'opacity-50 cursor-not-allowed' : ''} border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-200 hover:text-black hover:border-gray-600`} 
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
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
                          const selected = currentVariant?.sizes?.find(s => s.size === quickBuySize);
                          return selected && selected.stock !== undefined && quantity >= selected.stock ? 'opacity-50 cursor-not-allowed' : ''
                        })()} border border-gray-300 text-gray-600 px-4 py-2 rounded-sm cursor-pointer transition-all duration-200 hover:text-black hover:border-gray-600`}                
                        onClick={() => {
                          const selected = currentVariant?.sizes?.find(s => s.size === quickBuySize);
                          if (selected && quantity < (selected.stock ?? 0)) {
                            setQuantity(q => q + 1);
                          }
                        }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button onClick={() => setShowQuickBuy(false)} className="text-xs text-gray-500 hover:underline">
                      Cancel
                    </button>
                    <button
                      disabled={!quickBuySize || isLoading || (() => {
                        const selected = currentVariant?.sizes?.find(s => s.size === quickBuySize);
                        return selected && quantity > (selected.stock ?? 0);
                      })()}
                      onClick={handleQuickBuyCheckout}
                      className="bg-black text-white text-xs px-4 py-2 rounded disabled:opacity-50 flex items-center gap-2"
                    >
                      {isLoading && <span className="inline-block h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />}
                      {isLoading ? 'Processing' : 'Checkout'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



    </motion.div>
  );
}