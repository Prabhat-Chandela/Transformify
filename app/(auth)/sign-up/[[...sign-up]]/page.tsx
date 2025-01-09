import { SignUp } from '@clerk/nextjs';
import signUpBg from '@/Assets/Transformify-signUp.webp';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='min-h-screen w-full grid place-items-center'>
      <div className='rounded-md overflow-hidden lg:grid lg:grid-cols-12 lg:w-[51rem] p-2 bg-base-200 shadow-lg'>

        <div className='hidden lg:flex lg:col-span-6 overflow-hidden shadow-lg '>
          <Image className='object-cover w-full h-full' src={signUpBg} alt='SignUp-image'/>
        </div>
        <div className='lg:col-span-6'>
          <SignUp />
        </div>

      </div>
    </main>
  )
}