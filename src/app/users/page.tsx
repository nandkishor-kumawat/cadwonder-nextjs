import UserCard from '@/components/users/user-card';
import { getUsers } from '@/lib/functions';
import { User } from '@/lib/types/types';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'CadWonder - Users',
}

export default async function Users() {

  const users = await getUsers();

  return (
      <div className="container max-w-2xl">
        <h1 className="text-2xl mt-4 mb-2 font-bold">Users</h1>
        <div className="flex flex-col gap-1">
          {users?.map(user => (
              <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
  )
}
