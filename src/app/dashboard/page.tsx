import Link from 'next/link'
import React from 'react'

function Dashboard() {
  return (
    <div>
      Dashboard
      <Link href='/dashboard/edit-profile'>Edit Profile</Link>
    </div>
  )
}

export default Dashboard
