import React, { Suspense } from 'react'
import UserCard from '@/components/users/user-card';
import { getUsers } from '@/lib/functions';
import { Metadata } from 'next';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Users',
}

const UserList = async () => {
  const users = await getUsers();
  return users?.map(user => <UserCard key={user.id} user={user} />)
}

export default async function Users() {
  return (
    <div className="container max-w-2xl py-3">
      <h1 className="text-2xl font-bold my-2">Users</h1>
      <div className="flex flex-col gap-1">
        <Suspense fallback={<>
          {new Array(3).fill(0).map((_, index) => (
            <Skeleton key={index} className="w-full h-[100px] rounded my-2 py-2 px-4" />
          ))}</>}>
          <UserList />
        </Suspense>
      </div>
    </div>
  )
}
