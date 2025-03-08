
import React from 'react'
import Form from 'next/form'
import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <Form action="/search" className='lg:bg-white p-2 h-full flex items-center'>
        <input type="text" name='query' className={`pl-[1rem] hidden lg:flex lg:w-[20rem] py-2`}/>
        <button type='submit'>
          <Search />
        </button>
    </Form>
  )
}
