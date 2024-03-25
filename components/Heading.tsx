import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react'

interface HeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

const Heading = ({
    title,
    description,
    icon: Icon,
    iconColor,
    bgColor,
}: HeadingProps) => {
    return (
        <div className='px-4 lg:px-8 flex items-center gap-x-3 mb-6 border-b-[1px] border-[#5b5b5b] pb-2'>
            <div className={cn('p-2 w-fit rounded-md', bgColor)}>
                <Icon className={cn('w-8 h-8', iconColor)} />
            </div>
            <div>
                <h2 className='text-xl sm:text-2xl font-bold'>
                    {title}
                </h2>
                <p className={cn('text-xs sm:text-sm', iconColor)}>
                    {description}
                </p>
            </div>
        </div>

    )
}

export default Heading