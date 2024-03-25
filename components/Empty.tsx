import Image from 'next/image';
import React from 'react'

interface EmptyProps {
    label: string;
    imageSrc: string;
}


const Empty = ({
    label,
    imageSrc
}: EmptyProps) => {
    return (
        <div className='h-full p-20 flex flex-col items-center justify-center'>
            <div className='relative h-72 w-72 flex flex-col-reverse'>
                <Image
                    alt='Empty'
                    fill
                    src={imageSrc}
                    className='object-contain'
                />
                <p className='text-center text-[#787878]'>
                    {label}
                </p>
            </div>
        </div>
    )
}

export default Empty