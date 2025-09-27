"use client"
import Link from 'next/link'
import React from 'react'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
function navbar() {
  const user  = useAuth();
  return (
    <nav className='flex justify-between items-center fixed z-50 w-full px-6 py-4 lg:px-4 bg-[#0d1221]'>
      <Link href={"/"} className='flex items-center gap-1 text-2xl font-mono font-bold'>
        <img src="https://img.icons8.com/?size=100&id=hCvhdugyicF1&format=png&color=000000" alt="" className='h-10 w-10' />
        VidMeet
      </Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
            
    
  )
}

export default navbar