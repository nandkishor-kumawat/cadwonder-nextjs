import UserInfo from '@/components/dashboard/user-info'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Metadata } from 'next'
import { getUserByEmail } from '@/lib/functions'
import { checkProtected } from '@/actions'

export const metadata: Metadata = {
  title: 'CadWonder - Dashboard',
}

async function Dashboard() {
  await checkProtected("/dashboard");
  const session = await getServerSession();
  const user = await getUserByEmail(session?.user?.email as string);

  if (!session || !user) return null;
  return (
    <div className="h-full overflow-hidden">
      <div className="top h-full overflow-hidden">

        <UserInfo />


      </div>
    </div>
  )
}

export default Dashboard
