import UserInfo from '@/components/dashboard/user-info'
import ModelItem from '@/components/model/ModelItem'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { getUserByEmail } from './action'

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
