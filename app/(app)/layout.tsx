import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutGrid, ImageUp, Film, ArrowBigRightDash, AlignJustify } from 'lucide-react';
import logo from '@/Assets/Transformify (500 x 100 px).svg'


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
    return (
        <div className='w-full flex flex-col min-h-screen bg-base-200'>

            <header className='w-full shadow-md'>
                <div className="navbar bg-base-100 rounded-b-lg">
                    <div className="flex-1 flex items-center">
                    <Image src={logo} alt="Transformify Logo" width={200} height={40} />
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal gap-3 px-1">
                            {navItems.map((item) => (
                                <li key={item.label} className='hidden lg:flex text-primary font-medium text-xs hover:text-base-content rounded-lg'><Link href={item.href}>{item.icon}<span>{item.label}</span></Link></li>
                            ))}
                            <li><button className='hidden lg:flex bg-base-content text-base-100 font-medium text-xs rounded-lg hover:text-primary hover:bg-base-content '>Logout <span><ArrowBigRightDash /></span></button></li>
                            <li className='lg:hidden'>
                               <button className='bg-transparent text-base-content'><AlignJustify /></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <main className='w-full flex-1'>
                {children}
            </main>

        </div>
    )
}

export default AppLayout