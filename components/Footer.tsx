import { mulish } from '@/utils/font'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
        <div className={`${mulish.className } bg-zinc-800 text-white md:px-[5rem] p-4 md:py-10 mt-10`}>
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
                <div className='md:col-span-2 flex flex-col gap-5'>
                    <div className='flex gap-2 items-center'>
                    <Image src={"/logo.jpg"} alt='SANAIRA' width={100} height={100}  className='h-[3rem] w-[3rem] object-cover shrink-0'/>                    
                    <p className='text-gray-200 text-lg font-semibold mb-1'>ANAIRA</p>
                    </div>
                    <p className='text-[0.7rem] text-gray-200 leading-6 grow-1 md:mr-4'>
                    Anaira is more than just a clothing brand—it&apos;s a statement of style, confidence, and individuality. Rooted in a passion for fashion and quality craftsmanship, we bring you a collection that blends modern aesthetics with timeless elegance.
                    We believe in making fashion accessible without compromising on quality. Every piece is designed with attention to detail, ensuring comfort and durability. Whether you&apos;re looking for everyday essentials or standout pieces, Anaira has something for everyone.
                    Join us on this journey as we redefine fashion, one outfit at a time.
                    Anaira – Wear Your Confidence.
                    </p>
                </div>
                <div>
                    <h4 className='text-gray-200 text-lg font-semibold mb-4 h-[3rem] flex items-center'>Quick Links</h4>
                    <ul className='flex flex-col gap-1'>
                        <li>
                            <Link className='text-gray-200 text-sm mb-2 hover:text-gray-400 cursor-pointer' href={"/privacy-policy"}>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link className='text-gray-200 text-sm mb-2 hover:text-gray-400 cursor-pointer' href={"/terms-and-conditions-policy"}>Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link className='text-gray-200 text-sm mb-2 hover:text-gray-400 cursor-pointer' href={"/shipping-policy"}>Shipping Policy</Link>
                        </li>
                        <li>
                            <Link className='text-gray-200 text-sm mb-2 hover:text-gray-400 cursor-pointer' href={"/return-and-exchange-policy"}>Returns and Exchanges</Link>
                        </li>
                    </ul>
                </div>
                <div className='md:col-span-2'>
                    <h4 className='text-gray-200 text-lg font-semibold mb-2 h-[3rem] flex items-center'>Subscribe to our newsletter</h4>
                    <form className='flex gap-2 mb-6'>
                        <input type='email' placeholder='Enter your email' className='w-full p-2 py-4  border border-zinc-200/10 text-[0.8rem]' />
                        <button type='submit' className='bg-zinc-900 text-white p-6 text-[0.8rem] py-4'>Subscribe</button>
                    </form>
                    <h4 className='text-gray-200 text-lg font-semibold mb-2 h-[3rem] flex items-center'>Follow us</h4>
                    <div className='flex gap-2'>
                        <Link href={"/facebook"} className='text-gray-200 text-sm mb-2 hover:text-gray-400 cursor-pointer'>Facebook</Link>
                        <Link href={"/instagram"} className='text-gray-200 text-sm mb-2 hover:text-gray-400 cursor-pointer'>Instagram</Link>
                        <Link href={"/twitter"} className='text-gray-200 text-sm mb-2 hover:text-gray-400 cursor-pointer'>Twitter</Link>
                    </div>
                </div>
            </div>
            <hr className='border-zinc-700 my-6'/>
            <div className='text-gray-200 text-sm text-center py-5'>
                &copy; 2025 Anaira. All rights reserved.
            </div>
    </div>
  )
}
