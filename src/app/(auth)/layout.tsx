import { redirect } from 'next/navigation';
import React from 'react'
import { getAuth } from '../api/auth/[...nextauth]/options';

export default function Layout({ children }: { children: React.ReactNode }) {

 return getAuth().then((session) => {
    if (session?.user) redirect('/');
    return children
  });
}
