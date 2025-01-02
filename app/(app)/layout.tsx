'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, ImageUp, Film, ArrowBigRightDash, AlignJustify, AlignRight, ChevronsRight } from 'lucide-react';
import logo from '@/Assets/Transformify (500 x 100 px).svg';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { useState } from 'react';


const navItems = [
    {
        href: "/home",
        label: "Home Page",
        icon: <LayoutGrid size={20} />
    },
    {
        href: "/socialImage-transform",
        label: "Image Transform",
        icon: <ImageUp size={20} />
    },
    {
        href: "/video-upload",
        label: "Video Amelioration",
        icon: <Film size={20} />
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

    const handleSignout = async () => {
        await signOut();
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const closeMenu = () => {
        setShowMenu(false);
    }

    return (
        <div className='w-full flex flex-col min-h-screen overflow-x-hidden'>

            <header className='w-full border-b border-b-zinc-400 lg:border-none'>

                <div className="flex items-center justify-between bg-transparent py-4 lg:py-0 lg:px-2">

                    <div className="flex items-center">
                        <Image src={logo} alt="Transformify Logo" width={200} height={40} />
                    </div>

                    <div className="flex-none relative">

                        <button onClick={toggleMenu} className={`lg:hidden bg-transparent ${showMenu ? 'text-warning' : 'text-white'} mr-2`}>{showMenu ? <AlignRight /> : <AlignJustify />}</button>

                        <ul className={`absolute right-0 top-16 z-50 bg-base-100 flex flex-col rounded-lg p-5 ${showMenu ? "translate-x-0 h-screen w-screen lg:h-fit lg:w-fit" : "translate-x-[200%] lg:translate-x-0"} lg:static lg:flex-row lg:bg-transparent lg:rounded-none gap-5 lg:gap-0 lg:px-1 transition-all ease-in duration-200`}>
                            {navItems.map((item) => (
                                <li key={item.label} onClick={closeMenu} className={` flex justify-between lg:justify-normal font-medium text-xs rounded-lg hover:text-warning border lg:border-x-0 lg:border-t-0 lg:rounded-none lg:border-b-2 p-2 lg:px-4 lg:py-4 ${pathName === item.href ? "text-warning border-current " : "text-white border-zinc-400"}`}><Link className='flex gap-2 items-center justify-center' href={item.href}>{item.icon}<span>{item.label}</span></Link> <span className='lg:hidden'><ChevronsRight /></span></li>
                            ))}
                            <li><button onClick={handleSignout} className='flex lg:hidden items-center justify-center gap-2 py-2 px-3 bg-white text-base-100 font-medium text-xs rounded-lg hover:bg-warning shadow-lg transition-all ease-in duration-200'>Logout <span><ArrowBigRightDash /></span></button></li>
                        </ul>

                    </div>

                    <button onClick={handleSignout} className='hidden lg:flex mr-4 items-center justify-center gap-2 py-2 px-3 bg-white text-base-100 font-medium text-xs rounded-lg hover:bg-warning shadow-lg transition-all ease-in duration-200'>Logout <span><ArrowBigRightDash /></span></button>

                </div>

            </header>

            <main className='w-full flex-1 grid place-items-center py-4'>
                {children}
            </main>

        </div>
    )
}

export default AppLayout