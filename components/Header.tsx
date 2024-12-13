'use client';

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';

function Header() {
  const { user } = useUser();

  const createClerkPasskey = async () => {};
  return (
    <header className='flex flex-wrap justify-between items-center px-4 py-2'>
      {/* Top row  */}
      <div className='flex w-full flex-wrap justify-between items-center'>
        <Link
          href='/'
          className='text-2xl font-bold text-green-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'
        >
          EmpWear
        </Link>

        <Form action='/search'>
          <input
            type='text'
            name='query'
            placeholder='Search for products'
            className='bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border w-full max-w-4xl'
          />
        </Form>

        <div className='flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none'>
          <Link
            href='/basket'
            className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded'
          >
            <TrolleyIcon className='w-6 h-6' />
            <span>My Basket</span>
          </Link>

          {/* User area  */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href='/orders'
                className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded'
              >
                <PackageIcon className='w-6 h-6' />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className='flex items-center space-x-2'>
                <UserButton />
                <div className='hidden sm:block text-xs'>
                  <p className='text-gray-400'>Welcome Back</p>
                  <p className='font-bold'>{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode='modal' />
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className='bg-white hover:bg-green-700 hover:text-white text-green-500 px-4 py-2 rounded font-bold animate-pulse border border-green-300'
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;
