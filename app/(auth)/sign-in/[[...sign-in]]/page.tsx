import { SignIn } from '@clerk/nextjs';
import signInBg from '@/Assets/Transformify-signIn.webp';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='min-h-screen w-full grid place-items-center '>
      <div className='p-2 bg-base-200 rounded-md overflow-hidden lg:grid lg:grid-cols-12 lg:w-[51rem] shadow-lg'>

      <div className='hidden lg:flex lg:col-span-6 overflow-hidden  max-h-[455px]'>
        <Image className='w-full object-cover' src={signInBg} alt='SignIn-image'/>
      </div>
        <div className='lg:col-span-6'>
          <SignIn />
        </div>

      </div>
    </main>
  )
}