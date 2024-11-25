'use client'

import Image from 'next/image';
import logo from '@/Assets/Transformify (500 x 100 px).svg';
import { UserPen, User } from 'lucide-react';
import { useRouter } from 'next/navigation';


function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) {

    const router = useRouter();

    return (
        <div className='w-full flex flex-col min-h-screen'>

            <header className='w-full'>
                <div className='py-4'>
                    <div className="w-full bg-transparent flex justify-between px-3">
                        <div className='cursor-pointer' onClick={()=>router.push('/')}>
                            <Image src={logo} className='sm:hidden' alt="Transformify Logo" width={160} height={30} />
                            <Image src={logo} className='hidden sm:inline-flex' alt="Transformify Logo" width={200} height={40} />
                        </div>

                        <div className='flex gap-2'>
                            <button onClick={() => router.push('/sign-up')} className="w-fit rounded-lg flex items-center font-medium py-2 px-3 sm:px-4 bg-base-100 text-accent-content hover:bg-base-content hover:text-base-100 shadow-lg transition-all ease-in duration-200 text-xs"><span className='hidden sm:inline-flex'>Sign-Up</span> <span className='inline-flex sm:ml-2'><UserPen size={18} /></span></button>
                            <button onClick={() => router.push('/sign-in')} className="w-fit rounded-lg flex items-center font-medium py-2 px-3 sm:px-4 bg-base-100 text-accent-content hover:bg-base-content hover:text-base-100 shadow-lg transition-all ease-in duration-200 text-xs"><span className='hidden sm:inline-flex'>Sign-In </span><span className='inline-flex sm:ml-2'><User size={18} /></span></button>
                        </div>
                    </div>

                    <div className="divider before:bg-zinc-400 before:h-[1px] after:bg-zinc-400  after:h-[1px] mt-2 text-primary text-xs">TRANSFORMIFY</div>
                </div>
            </header>

            <main className='w-full flex-1'>
                {children}
            </main>

        </div>
    )
}

export default AppLayout