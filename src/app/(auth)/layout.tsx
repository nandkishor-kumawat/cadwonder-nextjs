import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {

 return getServerSession().then((session) => {
    if (session?.user) redirect('/');
    return children
  });
}
