import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {
  ClerkProvider
} from '@clerk/nextjs'
import { SanityLive } from "@/sanity/lib/live";
// import QuickAddWrapper from "@/components/QuickAddWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[white] `}
        >
          <Header/>
          <div className="h-[4rem]"></div>
          {children}
          {/* <QuickAddWrapper/> */}
          <SanityLive/>
        </body>
      </html>
    </ClerkProvider>
  );
}
