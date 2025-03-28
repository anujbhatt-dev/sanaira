import { Mulish, Gruppo, Poppins, Montserrat } from 'next/font/google'
 
export const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
})

export const gruppo = Gruppo({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
})

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
})

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
})
