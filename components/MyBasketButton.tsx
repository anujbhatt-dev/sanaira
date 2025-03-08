// "use client"
// import { useBasketStore } from '@/store/useBasketStore'
// import { ShoppingBagIcon } from 'lucide-react'
// import Link from 'next/link'
// import React, { useEffect, useState } from 'react'

// export default function MyBasketButton() {
//   const {getItemCount} = useBasketStore()  
//   const itemsCount = getItemCount()
//   const [isClient,setIsClient] = useState(false);
  
//       useEffect(()=>{
//           setIsClient(true)
//       },[])
  
//       if(!isClient) return null
//   return (
//     <Link href="/my-basket" className='relative'>
//         <ShoppingBagIcon className='lg:h-8 lg:w-8 h-6 w-6'/>
//         {itemsCount!= 0 && 
//         <div className='h-5 w-5 absolute -top-2 -right-2 bg-rose-200 rounded-full flex justify-center items-center '>
//             {itemsCount}
//         </div>
//         }
//     </Link>
//   )
// }
