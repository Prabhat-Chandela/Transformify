'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, ImageUp, Film, ArrowBigRightDash, AlignJustify } from 'lucide-react';
import logo from '@/Assets/Transformify (500 x 100 px).svg';
import { usePathname } from 'next/navigation';
import { useClerk } from '@clerk/nextjs'


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

    const handleSignout = async()=>{
        await signOut();
    }

    return (
        <div className='w-full flex flex-col min-h-screen bg-primary-content'>

            <header className='w-full'>
                <div className="navbar bg-transparent">
                    <div className="flex-1 flex items-center">
                    <Image src={logo} alt="Transformify Logo" width={200} height={40} />
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal gap-3 px-1">
                            {navItems.map((item) => (
                                <li key={item.label} className={`hidden lg:flex font-medium text-xs hover:text-base-content rounded-lg ${pathName === item.href ? "text-base-content" : "text-primary"}`}><Link href={item.href}>{item.icon}<span>{item.label}</span></Link></li>
                            ))}
                            <li><button onClick={handleSignout} className='hidden lg:flex bg-base-100 text-primary font-medium text-xs rounded-lg hover:text-base-100 hover:bg-base-content shadow-lg transition-all ease-in duration-200'>Logout <span><ArrowBigRightDash /></span></button></li>
                            <li className='lg:hidden'>
                               <button className='bg-transparent text-base-content'><AlignJustify /></button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="divider before:bg-zinc-400 before:h-[1px] after:bg-zinc-400  after:h-[1px] mt-0 text-primary text-xs">TRANSFORMIFY</div>
            </header>

            <main className='w-full flex-1'>
                {children}
            </main>

        </div>
    )
}

export default AppLayout