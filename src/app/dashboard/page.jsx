'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const page = () => {
  const { data: session, status } = useSession();
  if (!session) {
    console.log('session fail');
    redirect('/login');
  }

  console.log(session);
  return <div>this is dashboard</div>;
};

export default page;
