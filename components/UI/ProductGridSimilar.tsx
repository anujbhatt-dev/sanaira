"use client"
import React, { useEffect } from 'react'
// import ProductThumbnail from '../ProductThumbnail'
import { usePreferenceStore } from '@/store/usePreferenceStore'
import { ws } from '@/utils/font'
// import { ProductMini, ProductPageType } from '@/types'
import { SIMILAR_PRODUCT_BY_SLUG_QUERYResult } from '@/sanity.types'
import Image from 'next/image'
import { imageUrl } from '@/lib/imageUrl'
import { useRouter } from 'next/navigation'

export default function ProductGridSimilar({ similarProduct }: { similarProduct: SIMILAR_PRODUCT_BY_SLUG_QUERYResult  }) {
  const { productGridCols, setProductGridCols } = usePreferenceStore()
  const router = useRouter();

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

  const handleClick = (path:string) => {
    router.push(path);    
    
  };

  if(similarProduct?.youMayAlsoLike && similarProduct?.youMayAlsoLike?.length < 1){
    return null
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

        {similarProduct?.youMayAlsoLike && similarProduct.youMayAlsoLike.map((product, i) => (
          // <ProductThumbnail key={product._id} product={product} index={i} />
          <div key={product._id} onClick={()=>handleClick(`/${product.productPath.join("/")}/${product.slug?.current}`)}>

            { product.variants &&  product.variants[0].sizes && 
              <div
                className="relative aspect-[9/13] w-full overflow-hidden"
                
              >
                <div className="absolute inset-0">
                  <Image
                      className="object-cover"
                      src={imageUrl(product.variants[0].variantImages?.[0] || '').url()}
                      alt={'Product Image'}
                      fill
                      sizes="(max-width:760px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />                  
                </div>
              </div>}

                {
                  
                  product.variants &&  product.variants[0].sizes && 

                  <div className=''>
                    <h3 className="text-[12px] lg:text-[12px] uppercase truncate pt-2 tracking-wide font-medium" title={product.title || 'Untitled Product'}>
                    {product.title || 'Untitled Product'}
                  </h3>
                    <p className="text-[10px] lg:text-[14px] flex items-center tracking-widest">                  
                      Rs. {(product.variants[0].sizes[0].price ?? 0) - ((product.variants[0].sizes[0].price ?? 0) * (product.variants[0].sizes[0].discount ?? 0)) / 100}
                    </p>
                </div>
                }
          </div>
        ))}
      </div>
    </div>
  )
}
