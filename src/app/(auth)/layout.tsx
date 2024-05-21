"use client"
import { loginUser } from '@/actions';
import { useSession } from 'next-auth/react';
import React, { Suspense, useLayoutEffect, useTransition } from 'react'


export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition();

  // useLayoutEffect(() => {
  //   if (session?.user) {
  //     startTransition(() => {
  //       loginUser('/');
  //     })
  //   }
  // }, [session])

  return <Suspense>{children}</Suspense>
}
