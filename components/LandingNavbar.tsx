"use client"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X, Menu } from 'lucide-react'
import { Orbitron } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['600']
})

const LandingNavbar = () => {

    const [open, setOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (menuRef.current && !menuRef.current.contains(target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuRef]);

    return (
        <nav className="absolute w-screen flex items-center justify-between p-4 bg-black/20 shadow-white/5 shadow-sm">
            <div className="flex items-center z-50">
                <Image src={'/eyeicon.png'} alt='logo' width={65} height={65} />
                <div className={cn(`text-2xl flex flex-col font-bold text-white hover:text-teal-400 transition-all tracking-wider`, orbitron.className)}>
                    <div className='border w-12'></div>
                    Infinity Ai
                </div>
            </div>

            <div className='hidden sm:flex items-center justify-center gap-4 z-50'>
                <Link href={'/sign-in'}>
                    <button>
                        Login
                    </button>
                </Link>
                <Link href={'/sign-up'} className='bg-teal-800 p-2 rounded-lg'>
                    <button>
                        Register
                    </button>
                </Link>
            </div>

            <div className='sm:hidden z-50' ref={menuRef}>
                <div className='flex flex-col sm:hidden items-center'>
                    <button onClick={() => setOpen(!open)}>
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
                <div className={`${open ? "flex" : "hidden"} flex-col absolute right-3 top-[5rem]  w-28 bg-white`}>
                    <Link href="/sign-in" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">Login</Link>
                    <Link href="/sign-up" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300">Register</Link>
                </div>
            </div>
        </nav>
    )
}

export default LandingNavbar