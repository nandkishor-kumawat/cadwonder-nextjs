import UserCard from '@/components/users/user-card';
import { User } from '@/lib/types';
import React from 'react'

export default async function Users() {

  const data = await fetch('http://localhost:3001/api/users').then(res => res.json());

  if(data.error) return <div>Error</div>;

  const { users } = data as {
    users : User[]
  };

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
