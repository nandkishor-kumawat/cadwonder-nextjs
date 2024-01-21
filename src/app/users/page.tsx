import React from 'react'
import UserCard from '@/components/users/user-card';
import { getUsers } from '@/lib/functions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CadWonder - Users',
}

export default async function Users() {

  const users = await getUsers();

  return (
    <div className="h-full overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar">
        <div className="container max-w-2xl py-3">
          <h1 className="text-2xl font-bold">Users</h1>
          <div className="flex flex-col gap-1">
            {users?.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
