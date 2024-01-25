import UserInfo from '@/components/dashboard/user-info'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Metadata } from 'next'
import { getUserBy } from '@/lib/functions'
import { checkProtected } from '@/actions'

export const metadata: Metadata = {
  title: 'Dashboard',
}

async function Dashboard() {
  await checkProtected("/dashboard");
  const session = await getServerSession();
  const user = await getUserBy("email", session?.user?.email as string);

  if (!session || !user) return null;
  return (
    <div className="h-full">
      <UserInfo />
    </div>
  )
}

export default Dashboard
