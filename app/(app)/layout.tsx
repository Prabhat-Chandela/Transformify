import React from 'react';
import Link from 'next/link';


const navItems=[
    {
        href:"/home",
        label:"Home Page"
    },
    {
        href:"/social-share",
        label:"Image Transform"
    },
    {
        href:"/video-upload",
        label:"Video Compression"
    }
];

function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) {
    return (
        <div className='w-full'>
            <header className='w-full'>
                <div className="navbar bg-primary rounded-b-lg">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">TransFormer - AI SAAS</a>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal gap-3 px-1">
                            {navItems.map((item)=>(
                                <li key={item.label} className='hidden lg:flex text-base-100 font-semibold hover:text-base-content rounded-lg'><Link href={item.href}>{item.label}</Link></li>
                            ))}
                            <li><button className='bg-base-100 rounded-lg hover:bg-base-100 hover:text-primary '>Logout</button></li>
                            <li className='lg:hidden'>
                                <details>
                                    <summary>Menu</summary>
                                    <ul className="bg-primary rounded-t-none p-2">
                                        <li><a>Link 1</a></li>
                                        <li><a>Link 2</a></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export default AppLayout