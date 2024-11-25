import { SignUp } from '@clerk/nextjs';
import bg from '@/Assets/auth-page-bg.png';

export default function Page() {
  return (
    <main className='min-h-screen w-full grid place-items-center'>
      <div className='rounded-lg overflow-hidden sm:grid sm:grid-cols-12'>

        <div className='sm:col-span-6'>

        </div>
        <div className='sm:col-span-6'>
          <SignUp />
        </div>

      </div>
    </main>
  )
}