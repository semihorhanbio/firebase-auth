// src/app/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/Button";
import Image from "next/image";

export default function Home() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (err) {
      setError("Failed to sign in. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      setError(null);
      await signOut();
    } catch (err) {
      setError("Failed to sign out. Please try again.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg'>
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4'>
            {error}
          </div>
        )}

        {user ? (
          <div className='space-y-6'>
            <div className='text-center'>
              <Image
                src={user.photoURL || ""}
                alt={user.displayName || "User"}
                className='h-24 w-24 rounded-full mx-auto'
                width={96}
                height={96}
              />
              <h2 className='mt-4 text-2xl font-bold'>{user.displayName}</h2>
              <p className='text-gray-600'>{user.email}</p>
            </div>

            <div className='space-y-4'>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-semibold text-gray-700'>Server Response</h3>
                <pre className='mt-2 text-sm text-gray-600 overflow-auto'>
                  {JSON.stringify(user.serverData, null, 2)}
                </pre>
              </div>

              <Button
                onClick={handleSignOut}
                variant='secondary'
                className='w-full'
              >
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>Welcome</h2>
              <p className='mt-2 text-gray-600'>Please sign in to continue</p>
            </div>

            <Button
              onClick={handleSignIn}
              className='w-full flex items-center justify-center space-x-2'
            >
              <svg className='w-5 h-5' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='currentColor'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='currentColor'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                />
                <path
                  fill='currentColor'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                />
              </svg>
              <span>Sign in with Google</span>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
