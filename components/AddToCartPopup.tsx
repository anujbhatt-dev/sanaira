"use client"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { IndianRupee } from "lucide-react"
import { ProductPageType } from "@/types"
import Image from "next/image"
import { imageUrl } from "@/lib/imageUrl"

export default function AddToCartPopup({
  isOpen,
  onClose,
  product
}: {
  isOpen: boolean
  onClose: () => void
  product: {
    item: ProductPageType
    size: string
    color: string
    quantity: number
    price: number
  } | null
}) {
  // Find the correct variant based on the selected color
  const selectedVariant = product?.item.variants?.find(v => v.color === product.color)

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 right-0 m-2 md:bottom-4 md:right-4 z-50 md:w-full md:max-w-md p-4 bg-white shadow-xl border border-gray-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {selectedVariant?.variantImages?.[0] && (
                <div className="relative h-16 w-16">
                  <Image
                    src={imageUrl(selectedVariant.variantImages[0]).url()}
                    alt={product.item.title || "Product image"}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <div>
                <p className="font-medium">Added to your cart</p>
                <p className="text-sm text-gray-600">{product.item.title}</p>
                <div className="flex items-center mt-1">
                  <IndianRupee className="w-3 h-3" />
                  <span className="text-sm">{product.price}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-sm text-gray-600">Qty: {product.quantity}</span>
                  <span className="mx-2 text-gray-400">|</span>
                  <span className="text-sm text-gray-600">{product.color}</span>
                </div>
                <div className="flex gap-2 mt-3 text-center">
                  <button
                    onClick={onClose}
                    className="px-3 py-1 text-[0.7rem] md:text-sm border border-black rounded hover:bg-gray-100 transition"
                  >
                    Continue Shopping
                  </button>
                  <Link
                    href="/my-basket"
                    className="px-3 py-1 text-[0.7rem] md:text-sm bg-black text-white rounded hover:bg-gray-800 transition"
                    onClick={onClose}
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 transition"
            >
              &times;
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}