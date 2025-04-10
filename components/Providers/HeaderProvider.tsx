"use client"
import React, { ReactNode } from 'react'
import HeaderWrapper from '../Header/HeaderWrapper'

export default function HeaderProvider({children}:{children:ReactNode}) {
  return (
    <>
        <HeaderWrapper/>
        {children}
    </>
  )
}
