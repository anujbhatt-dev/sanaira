
import React from 'react'
import Form from 'next/form'
import { Search } from 'lucide-react'

export default function SearchBar({solid}:{solid:boolean}) {
  return (
    <Form action="/search" className='border-b items-center overflow-hidden grow-1 max-w-[50vw] h-full hidden lg:flex'>
        <input type="text" name='query' className={`pl-[1rem] grow-1 py-2 outline-0 ${solid?"text-white":"text-black"}  focus:bg-transparent`} placeholder='Search product'/>
        <button type='submit' className='mr-2'>
          <Search  className={`text-white ${solid?"md:text-white":"md:text-black"}  cursor-pointer`}/>
        </button>
    </Form>
  )
}
