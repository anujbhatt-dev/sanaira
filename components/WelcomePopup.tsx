"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useClerk, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import { cinzel } from "@/utils/font"

export default function ElegantWelcomePopup() {
  const { isSignedIn } = useUser()
  const { openSignUp } = useClerk()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasDismissed = localStorage.getItem("elegantPopupDismissed")
    if (!isSignedIn && !hasDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSignedIn])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("elegantPopupDismissed", "true")
  }

  if (isSignedIn) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${cinzel.className} fixed inset-0 z-50 bg-black/40 backdrop-blur-md`}
          />
          
          {/* Main popup - now larger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            className={`${cinzel.className} fixed inset-0 z-50 flex items-center justify-center p-4`}
          >
            <div className="relative w-full max-w-4xl h-[70vh] max-h-[700px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
              {/* Close button */}
              <button 
                onClick={handleClose}
                className="absolute top-6 right-6 z-20 p-2 rounded-full bg-white/90 hover:bg-gray-100 transition"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Text content - now with more padding */}
                <div className="flex flex-col justify-center p-12 lg:p-16">
                  <h3 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
                    Welcome to Anaira Store
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Create an account to enjoy a <span className="font-medium">10% introductory discount</span> and 
                    early access to our seasonal collections.
                  </p>

                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        openSignUp()
                        handleClose()
                      }}
                      className="w-full bg-accent text-white py-4 px-8 rounded-md hover:bg-gray-800 transition text-base font-medium tracking-wide"
                    >
                      Join Now
                    </button>
                    
                    <button
                      onClick={handleClose}
                      className="w-full border border-accent py-4 px-8 rounded-md hover:bg-gray-50 transition text-base"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>

                {/* Larger image section */}
                <div className="hidden lg:block relative bg-gray-50">
                  <Image
                    src="/welcome.webp"
                    alt="Elegant shopping experience"
                    fill
                    className="object-cover grayscale-[15%]"
                    quality={100}
                    style={{ objectPosition: 'center center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-white/20 via-white/60 to-white/90" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}