"use client"
import React, { useEffect } from 'react'
import ProductThumbnail from '../ProductThumbnail'
import { usePreferenceStore } from '@/store/usePreferenceStore'
import { ws } from '@/utils/font'
import { ProductMini, ProductPageType } from '@/types'

export default function ProductGrid({ products }: { products: ProductPageType[]  }) {
  const { productGridCols, setProductGridCols } = usePreferenceStore()

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 1024) {
        if (productGridCols > 2) {
          setProductGridCols(2)
        }
      } else {
        if (productGridCols === 1) {
          setProductGridCols(3)
        }
      }
    }

    // Run once on mount
    handleResize()

    // Optional: update on resize
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [productGridCols, setProductGridCols])

  const gridStyle = {
    gridTemplateColumns: `repeat(${productGridCols}, minmax(0, 1fr))`
  }

  

  return (
    <div>
      <div className='flex items-center justify-end text-[0.8rem] md:text-lg'>
        <div className='hidden'>
          <span>FILTER</span>
        </div>
        <div className='flex items-center gap-3 p-2'>
          <span className='text-black/50'>VIEW</span>
          <span>|</span>
          <div className='hidden lg:flex gap-3'>
            {[2, 3, 4, 5, 6].map((val) => (
              <span
                className={`${val === productGridCols ? "text-black" : "text-black/50"} cursor-pointer hover:scale-105 transition-all duration-75 font-semibold ${ws.className}`}
                key={"ProdctGridKey" + val}
                onClick={() => setProductGridCols(val || 4)}
              >
                {val}
              </span>
            ))}
          </div>
          <div className='lg:hidden flex gap-3'>
            {[1, 2, 3].map((val) => (
              <span
                className={`${val === productGridCols ? "text-black" : "text-black/50"} cursor-pointer hover:scale-105 transition-all duration-75 font-semibold ${ws.className}`}
                key={"ProdctGridKey" + val}
                onClick={() => setProductGridCols(val || 4)}
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-2 gap-2`} style={gridStyle}>
        {products && products.map((product, i) => (
          <ProductThumbnail key={product._id} product={product} index={i} />
        ))}
      </div>
    </div>
  )
}
