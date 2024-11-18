import React from 'react';
import Link from 'next/link';
import { LayoutGrid, ImageUp, Film, ArrowBigRightDash } from 'lucide-react';


const navItems = [
    {
        href: "/home",
        label: "Home Page",
        icon: <LayoutGrid />
    },
    {
        href: "/social-share",
        label: "Image Transform",
        icon: <ImageUp />
    },
    {
        href: "/video-upload",
        label: "Video Compression",
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
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">TransFormer - AI SAAS</a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal gap-3 px-1">
                            {navItems.map((item) => (
                                <li key={item.label} className='hidden lg:flex text-primary font-medium text-xs hover:text-base-content rounded-lg'><Link href={item.href}>{item.icon}<span>{item.label}</span></Link></li>
                            ))}
                            <li><button className='hidden lg:flex bg-primary text-base-100 font-medium text-xs rounded-lg hover:bg-primary hover:text-base-content '>Logout <span><ArrowBigRightDash /></span></button></li>
                            <li className='lg:hidden'>
                                <details>
                                    <summary>Menu</summary>
                                    <ul className="bg-primary rounded-t-none p-2">
                                        {navItems.map((item) => (
                                            <li key={item.label} className='hidden lg:flex text-primary font-semibold hover:text-base-content rounded-lg'><Link href={item.href}>{item.icon}<span>{item.label}</span></Link></li>
                                        ))}
                                    </ul>
                                </details>
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