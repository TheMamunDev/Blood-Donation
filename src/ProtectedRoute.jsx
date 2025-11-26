'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import SessionLoader from './component/loader/SessionLoader';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status !== 'loading' && !session) {
      router.push('/login');
    }
  }, [router, session, status]);
  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen">
        <SessionLoader></SessionLoader>
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
