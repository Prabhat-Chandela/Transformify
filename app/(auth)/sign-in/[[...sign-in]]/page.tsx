import { SignIn } from '@clerk/nextjs';
import signInBg from '@/Assets/Transformify-signIn.webp';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='min-h-screen w-full grid place-items-center'>
      <div className='rounded-lg overflow-hidden lg:grid lg:grid-cols-12 lg:w-[50rem] max-h-[450px]'>

      <div className='hidden lg:flex lg:col-span-6 overflow-hidden shadow-lg'>
        <Image className='w-full object-cover' src={signInBg} alt='SignIn-image'/>
      </div>
        <div className='lg:col-span-6'>
          <SignIn />
        </div>

      </div>
    </main>
  )
}