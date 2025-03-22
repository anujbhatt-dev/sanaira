import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-12 my-6 animate-pulse min-h-[100vh]'>
      <div className='flex justify-between gap-y-4 gap-x-4 col-span-2 flex-col-reverse md:flex-row my-4'>
        <div className='flex flex-row md:flex-col gap-4'>
          <div className='w-[4rem] h-[5rem] md:w-[8rem] md:h-auto bg-gray-300 rounded-md'></div>
          <div className='w-[4rem] md:w-[8rem] h-auto bg-gray-300 rounded-md'></div>
          <div className='w-[4rem] md:w-[8rem] h-auto bg-gray-300 rounded-md'></div>
        </div>
        <div className='relative flex-1 bg-gray-300 h-[50vh] md:h-auto rounded-md'></div>
      </div>
      <div className='flex flex-col gap-2 tracking-widest mx-auto md:mx-0'>
        <div className='h-6 bg-gray-300 w-3/4 rounded-md'></div>
        <div className='h-6 bg-gray-300 w-1/4 rounded-md'></div>
        <hr className='border-t border-gray-300 my-4'/>
        <div className='h-4 bg-gray-300 w-1/6 rounded-md'></div>
        <div className='flex gap-2 uppercase flex-wrap text-[0.7rem]'>
          <div className='w-[4rem] h-8 bg-gray-300 rounded-md'></div>
          <div className='w-[4rem] h-8 bg-gray-300 rounded-md'></div>
          <div className='w-[4rem] h-8 bg-gray-300 rounded-md'></div>
        </div>
        <div className='h-6 bg-gray-300 w-1/3 rounded-md my-4'></div>
        <div className='flex gap-2'>
          <div className='w-10 h-10 bg-gray-300 rounded-md'></div>
          <div className='w-10 h-10 bg-gray-300 rounded-md'></div>
          <div className='w-10 h-10 bg-gray-300 rounded-md'></div>
        </div>
        <div className='flex flex-col gap-2 my-8'>
          <div className='w-full h-12 bg-gray-300 rounded-md'></div>
          <div className='w-full h-12 bg-gray-300 rounded-md'></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
