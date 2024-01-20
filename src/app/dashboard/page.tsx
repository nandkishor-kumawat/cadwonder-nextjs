import UserInfo from '@/components/dashboard/user-info'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Metadata } from 'next'
import { getUserByEmail } from '@/lib/functions'

export const metadata: Metadata = {
  title: 'CadWonder - Dashboard',
}

async function Dashboard() {

  const session = await getServerSession();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <div className="h-full overflow-hidden">
      <div className="top h-full overflow-hidden">

        <UserInfo />


      </div>
    </div>
  )
}

export default Dashboard
