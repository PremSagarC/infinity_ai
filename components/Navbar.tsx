import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './MobileSidebar'

const Navbar = () => {
    return (
        <div className='flex md:hidden items-center p-4'>
            <MobileSidebar />
        </div>
    )
}

export default Navbar