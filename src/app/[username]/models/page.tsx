import Await from '@/components/await';
import ModelList from '@/components/model/model-list';
import { Skeleton } from '@/components/ui/skeleton';
import { getData, getUserBy } from '@/lib/functions';
import { Model } from '@prisma/client';
import React, { Suspense } from 'react'

const Page = async ({ params: { username } }: { params: { username: string } }) => {

  const user = await getUserBy("username", username);

  if (!user) return null;

  const promise = getData({
    coll: "models",
    key: "user_id",
    value: user.id,
    order: "desc"
  });

  return (
    <div className="grid gap-2 pb-2" style={{
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    }}>
      <Suspense fallback={<>
        <Skeleton className="w-full h-[300px] rounded" />
        <Skeleton className="w-full h-[300px] rounded" />
        <Skeleton className="w-full h-[300px] rounded" />
      </>}>
        <Await promise={promise}>
          {models => <ModelList models={models} />}
        </Await>
      </Suspense>
    </div>
  )
}

export default Page