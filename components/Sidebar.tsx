"use client"
import { cn } from '@/lib/utils'
import { UserButton, useUser } from '@clerk/nextjs'
import { Camera, Code, ImageIcon, LayoutDashboard, MessageSquare, Music2Icon, Settings, Video, VideoIcon } from 'lucide-react'
import { Montserrat, Orbitron } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['600']
})

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-[#55ffe1]',
        hover: 'hover:text-[#55ffe1]'
    },
    {
        label: 'ChatBot',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-[#a6fd29]',
        hover: 'hover:text-[#a6fd29]'
    },
    {
        label: 'Image Generator',
        icon: ImageIcon,
        href: '/image',
        color: 'text-[#ff3b94]',
        hover: 'hover:text-[#ff3b94]'
    },
    {
        label: 'Video Generator',
        icon: Video,
        href: '/video',
        color: 'text-[#ff3800]',
        hover: 'hover:text-[#ff3800]'
    },
    {
        label: 'Music Generator',
        icon: Music2Icon,
        href: '/music',
        color: 'text-emerald-400',
        hover: 'hover:text-emerald-400'
    },
    {
        label: 'Code Generator',
        icon: Code,
        href: '/code',
        color: 'text-[#578fff]',
        hover: 'hover:text-[#578fff]'
    },
]

const Sidebar = () => {

    const { user } = useUser()

    const pathname = usePathname()

    return (
        <div className='space-y-4 py-4 flex text-sm flex-col h-full bg-[#282828] border-r-[2px] border-[#5d5d5d]'>
            <div className='px-3 py-2 flex-1'>
                <Link href={'/dashboard'} className='flex items-center justify-center mb-6'>
                    <Image src={'/eyeicon.png'} alt='logo' width={65} height={65} />
                    <div className={cn(`text-2xl flex flex-col font-bold text-white hover:text-teal-400 transition-all tracking-wider`, orbitron.className)}>
                        <div className='border w-12'></div>
                        Infinity Ai
                    </div>
                </Link>
                <div className='space-y-1 mx-3'>
                    {
                        routes.map((route) => (
                            <>
                                <Link href={route.href} key={route.href}>
                                    <div className={`${route.hover} flex items-center py-3 hover:bg-white/5 rounded-lg transition-all px-2 mb-2
                                    ${pathname === route.href ? `${route.color} bg-white/10` : 'text-zinc-400'}
                                    `}>
                                        <route.icon className={cn(`h-5 w-5 mr-3 ${route.color}`)} />
                                        <p>{route.label}</p>
                                    </div>
                                </Link>
                            </>
                        ))
                    }
                </div>
                <div className='absolute bottom-10 mx-3 py-3'>
                    <Link href={'/settings'}>
                        <div className='flex items-center py-3 w-60 hover:bg-white/5 rounded-lg transition-all px-2'>
                            <Settings className='mr-3' />
                            Settings
                        </div>
                    </Link>
                    <div className='flex items-center gap-3 mt-2 border border-[#414141] hover:bg-white/10 px-3 py-2 rounded-lg'>
                        <span className='border-2 rounded-full hover:border-blue-500 transition-all'>
                            <UserButton afterSignOutUrl='/' />
                        </span>
                        {user?.fullName}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar