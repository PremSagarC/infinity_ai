"use client"
import React from 'react'

// Icons
import { CircleChevronRight, Code, ImageIcon, MessageSquare, Music2Icon, VideoIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const tools = [
    {
        label: "ChatBot",
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-[#a6fd29]',
        bg: 'bg-[#a6fd29]/20',
    },
    {
        label: 'Image Generator',
        icon: ImageIcon,
        href: '/image',
        color: 'text-[#ff3b94]',
        bg: 'bg-[#ff3b94]/20'
    },
    {
        label: 'Video Generator',
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-500',
        bg: 'bg-orange-500/20'
    },
    {
        label: 'Music Generator',
        icon: Music2Icon,
        href: '/music',
        color: 'text-emerald-400',
        bg: 'bg-emerald-400/20'
    },
    {
        label: 'Code Generator',
        icon: Code,
        href: '/code',
        color: 'text-[#578fff]',
        bg: 'bg-[#578fff]/20'
    },
]

const DashboardPage = () => {
    const router = useRouter()
    return (
        <div className='p-4'>
            <div className='mb-8 space-y-4'>
                <h2 className='text-2xl md:text-3xl font-bold text-center'>
                    Discover AI: Shaping the Future
                </h2>
                <p className='text-sm text-center text-[#989898]'>
                    Unlock the future with AI: Enhancing creativity, efficiency, and innovation at every step.
                </p>
            </div>
            <div className='px-4 md:px-20 lg:px-32 space-y-4'>
                {
                    tools.map((tool) => (
                        <Card key={tool.href}
                            onClick={() => router.push(tool.href)}
                            className='p-4 flex items-center justify-between hover:shadow-md hover:shadow-white/20 transition-all cursor-pointer bg-black border-[#3d3d3d]'
                        >
                            <div className='flex items-center gap-x-4'>
                                <div className={cn("p-2 w-fit rounded-md", tool.color, tool.bg)}>
                                    <tool.icon />
                                </div>
                                <div className='font-semibold text-white'>
                                    {tool.label}
                                </div>
                            </div>
                            <CircleChevronRight className="w-5 h-5 text-white" />
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}

export default DashboardPage