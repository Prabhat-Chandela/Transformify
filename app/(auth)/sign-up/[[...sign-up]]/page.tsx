import { SignUp } from '@clerk/nextjs';
import signUpBg from '@/Assets/Transformify-signUp.webp';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='min-h-screen w-full grid place-items-center'>
      <div className='rounded-lg overflow-hidden lg:grid lg:grid-cols-12 lg:w-[50rem]'>

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