'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, ImageUp, Film, ArrowBigRightDash, AlignJustify, AlignRight } from 'lucide-react';
import logo from '@/Assets/Transformify (500 x 100 px).svg';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useState } from 'react';


const navItems = [
    {
        href: "/home",
        label: "Home Page",
        icon: <LayoutGrid />
    },
    {
        href: "/socialImage-transform",
        label: "Image Transform",
        icon: <ImageUp />
    },
    {
        href: "/video-upload",
        label: "Video Amelioration",
        icon: <Film />
    }
];

function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) {
    const pathName = usePathname();
    const { signOut } = useClerk();
    const [showMenu, setShowMenu] = useState(false);

    const handleSignout = async()=>{
        await signOut();
    }

    const toggleMenu = ()=>{
        setShowMenu(!showMenu);
    }

    const closeMenu = ()=>{
        setShowMenu(false);
    }

    return (
        <div className='w-full flex flex-col min-h-screen overflow-x-hidden'>

            <header className='w-full'>
                <div className="navbar bg-transparent">
                    <div className="flex-1 flex items-center">
                    <Image src={logo} alt="Transformify Logo" width={200} height={40} />
                    </div>
                    <div className="flex-none relative">
                    <button onClick={toggleMenu} className='lg:hidden bg-transparent text-white mr-2'>{showMenu ? <AlignRight />: <AlignJustify />}</button>
                        <ul className={`menu menu-dropdown absolute right-0 top-16 z-50 bg-white rounded-lg px-5 ${showMenu ? "translate-x-0 h-screen w-[96vw] sm:w-[98vw] lg:h-fit lg:w-fit" : "translate-x-[200%] lg:translate-x-0"} lg:static lg:bg-transparent lg:rounded-none lg:menu-horizontal gap-3 lg:px-1 transition-all ease-in duration-200`}>
                            {navItems.map((item) => (
                                <li key={item.label} onClick={closeMenu} className={` lg:flex font-medium text-xs hover:text-base-content rounded-lg ${pathName === item.href ? "text-base-content bg-base-100 lg:bg-transparent" : "text-base-100 lg:text-primary"}`}><Link href={item.href}>{item.icon}<span>{item.label}</span></Link></li>
                            ))}
                            <li><button onClick={handleSignout} className='lg:flex bg-base-100 lg:bg-white text-white lg:text-base-100 font-medium text-xs rounded-lg hover:text-base-100 hover:bg-secondary-content shadow-lg transition-all ease-in duration-200'>Logout <span><ArrowBigRightDash /></span></button></li>
                        </ul>
                    </div>
                </div>
                <div className="divider mt-0 text-xs">TRANSFORMIFY</div>
            </header>

            <main className='w-full flex-1'>
                {children}
            </main>

        </div>
    )
}

export default AppLayout