
import React from 'react'
import Form from 'next/form'
import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <Form action="/search" className='md:bg-white flex items-center rounded overflow-hidden'>
        <input type="text" name='query' className={`pl-[1rem] hidden md:flex lg:w-[20rem] py-2 outline-0 text-black focus:bg-transparent`} placeholder='Search product'/>
        <button type='submit' className='mr-2'>
          <Search  className='text-black cursor-pointer'/>
        </button>
    </Form>
  )
}
