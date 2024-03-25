"use client"
import LandingNavbar from '@/components/LandingNavbar'
import { Orbitron } from 'next/font/google'
import React, { useState } from 'react'

import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['600']
})


const LandingPage = () => {

  return (
    <div className="h-full relative w-full overflow-hidden bg-slate-900 flex flex-col rounded-lg">
      <LandingNavbar />
      <Boxes />
      <div className={cn('flex flex-col items-center justify-center h-screen', orbitron.className)}>
        <div className='flex items-center justify-center'>
          <Image src={'/eyeicon.png'} alt='logo' width={65} height={65} className='z-20 rounded-full' />
          <h1 className={cn("md:text-4xl text-3xl text-teal-500 relative z-20 tracking-wide")}>
            <div className='border w-12'></div>
            Infinity AI
          </h1>
        </div>
        <p className="text-center mt-2 text-white/60 relative z-20 px-2">
          Discover {"AI's"} potential through our smart chatbot,
          image and video generators, and code crafting tools, all
          designed for seamless creativity and efficiency.
        </p>
        <Link href={'sign-in'} className='z-50 flex items-center justify-center gap-1 mt-5 border p-3 rounded-lg bg-teal-800'>
          Get Started
          <ArrowRight />
        </Link>
      </div>
    </div>
  )
}

export default LandingPage