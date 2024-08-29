import { getModels, getUsersBy } from '@/actions';
import Await from '@/components/await';
import ModelList from '@/components/model/model-list';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react'

interface Props {
  searchParams?: Record<string, string>;
  params: { username: string };
}

const Page = async ({ searchParams, params: { username } }: Props) => {
  const user = await getUsersBy("username", username);

  if (!user) return null;

  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams ?? {}).filter(([key, value]) => value !== undefined)
  );

  const params = new URLSearchParams({ ...filteredSearchParams, userId: user.id });
  const queryString = params.toString();
  const promise = getModels(queryString);

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