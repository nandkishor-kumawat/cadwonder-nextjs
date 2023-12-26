import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { InputElement, InputGroup, InputItem } from '@/components/ui/input-group'
import Link from 'next/link'
import React from 'react'

function Dashboard() {
  return (
    <div>
      Dashboard
      <Link href='/dashboard/edit-profile'>Edit Profile</Link>
      <div className="my-6 px-5">



      </div>
    </div>
  )
}

export default Dashboard
