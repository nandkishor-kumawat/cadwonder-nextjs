import { getModels, getUsersBy } from '@/actions';
import Await from '@/components/await';
import SearchBar from '@/components/form/SearchBar';
import ModelList from '@/components/model/model-list';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { validateRequest } from '@/lib/auth';
import Link from 'next/link';
import React, { Suspense } from 'react'

interface Props {
  searchParams?: Record<string, string>;
  params: { username: string };
}

const Page = async ({ searchParams }: Props) => {
  const { user } = await validateRequest();
  if (!user) return null;

  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams ?? {}).filter(([key, value]) => value !== undefined)
  );

  const params = new URLSearchParams({ ...filteredSearchParams, userId: user.id });
  const queryString = params.toString();
  const promise = getModels(queryString);

  return (
    <div className="container max-w-4xl mx-auto px-2 py-4 space-y-6">

      <div className="flex items-center justify-between">
        <h1 className='text-3xl font-semibold'>Models</h1>
        <Button size={'sm'} className='rounded-none' asChild>
          <Link href={'/library/new'}>
            Post Model
          </Link>
        </Button>
      </div>
      <SearchBar />

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

    </div>
  )
}

export default Page