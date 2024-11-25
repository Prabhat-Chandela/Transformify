import { SignIn } from '@clerk/nextjs';
import bg from '@/Assets/auth-page-bg.png';
import Image from 'next/image';

export default function Page() {
  return (
    <main className='min-h-screen w-full grid place-items-center'>
      <div className='rounded-lg overflow-hidden'>

        <div className=''>
          <SignIn />
        </div>

      </div>
    </main>
  )
}