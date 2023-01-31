import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function Header() {
  //TODO: use useSession() to check if user is logged in
  const session = true;
  if (session) {
    return (
      <header className='sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm'>
        <div className='flex space-x-2 items-center'>
          <Image 
            src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png" 
            alt="Logo"
            height={10}
            width={50}
          />
          <div>
            <p className='text-blue-400'> Logged in as:</p>
            <p className='font-bold text-lg text-black'> User Name</p>
          </div>
        </div>
        <LogoutButton/>
      </header>
    )
  }
  return (
    <header className='sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm'>
      <div className='flex flex-col items-center space-y-5'>
        <div className='flex space-x-2 items-center'>
          <Image 
            src="https://1000logos.net/wp-content/uploads/2021/10/logo-Meta.png" 
            alt="Logo"
            height={10}
            width={50}
          />
          <p className='text-blue-400'> Weclome to Meta Messenager</p>  
        </div>

        <Link 
          href="/auth/signin" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In
        </Link>
      </div>
    </header>
  )
}

