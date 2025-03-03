"use client"
import { createCheckoutSession, Metadata } from '@/actions/createCheckoutSession';
import AddToBasketButton from '@/components/AddToBasketButton';
import { imageUrl } from '@/lib/imageUrl';
import { useBasketStore } from '@/store/useBasketStore';
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


function MyBasketPage() {
  const groupedItems = useBasketStore((state)=>state.getGroupedItems());
  const {isSignedIn} = useAuth();
  const {user} = useUser();
  const router = useRouter();  
  const [isClient,setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
      setIsClient(true)
  })

  if(groupedItems.length === 0 ){
    return (
        <div className='container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]'>
            <h1 className='text-2xl font-bold mb-6 text-gray-800'>Your Basket</h1>
            <p className='text-gray-600 text-lg'>Your Basket is Empty</p>
        </div>
    )
  }


  const handleCheckout =async ()=>{
    if(!isSignedIn) return;
    setIsLoading(true);
    try {
        const metadata:Metadata ={
            orderNumber : crypto.randomUUID(),
            customerName : user?.fullName ?? "unknown",
            customerEmail : user?.emailAddresses[0].emailAddress ?? "Unknown",
            clerkUserId:user!.id
        }
        const checkoutUrl = await createCheckoutSession(groupedItems,metadata);

        if(checkoutUrl){
            window.location.href = checkoutUrl
        }
    } catch (error) {
        console.log("Error during Checkout ",error);
        
    } finally{
        setIsLoading(false);
    }
}

  if(!isClient) return null
  return (
    <div className='container mx-auto p-4 max-w-6xl'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>Your Basket</h1>
        <div className='flex flex-col lg:flex-row gap-8'>
            <div className='flex-grow'>
                {
                    groupedItems?.map((item)=>(
                        <div onClick={()=>router.push(`/product/${item.product.slug?.current}`)} className='mb-4 p-4 border rounded flex items-center justify-between relative gap-4 cursor-pointer' key={item.product._id}>
                            <div>
                            {
                              item.product.mainImages && item.product.mainImages?.length > 0 &&
                              <Image src={
                                item.product.mainImages[0]
                                ? imageUrl(item.product.mainImages[0]).url(): '/placeholder.jpg'}
                                alt={item.product.title ?? "Product Image"}
                                width={70} height={100}
                                className='h-full w-auto object-cover rounded-lg'
                                />
                              }  
                        </div>
                        <div className='flex-grow capitalize'>
                        <div className=' font-bold'>{item.product.title}</div>
                        <div className='text-xs'>
                            Rs {item.product.price}
                        </div>
                        </div>
                        <div className=''>
                            <AddToBasketButton product={item.product}/>
                        </div>
                    </div>
                    ))
                }
            </div>

            <div className='w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto'>
                    <h3 className='text-xl font-semibold'>Order summary</h3>
                    <div className='mt-4 space-y-2'>
                        <p className='flex justify-between'>
                            <span>Itmes:</span>
                            <span>
                                {groupedItems.reduce((total,item)=>total + item.quantity,0)}
                            </span>
                        </p>
                        <p className='flex justify-between text-2xl font-bold border-t pt-2'>
                            <span>Total: </span>
                            <span>
                                Rs {useBasketStore.getState().getTotalPrice().toFixed(2)}
                            </span>
                        </p>
                    </div>
            {isSignedIn? (
                <button
                onClick={handleCheckout}
                disabled={isLoading}
                className='mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400'
                >
                    {isLoading? "Processing..." : "Checkout"}
                </button>
            ):(
                <SignInButton mode="modal">
                <button
                className='mt-4 w-full bg-zinc-800 text-white px-4 py-2 rounded hover:bg-zinc-900 transition-colors duration-75'
                >
                    Sign In to Checkout
                </button>
                </SignInButton>
            )}
            </div>


            <div className='h-64 lg:h-0'></div>
        </div>
    </div>
  )
}

export default MyBasketPage