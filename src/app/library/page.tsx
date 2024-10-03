import React, { Suspense } from 'react'
import SearchBar from '@/components/form/SearchBar'
import ModelList from '@/components/model/model-list'
import { Skeleton } from '@/components/ui/skeleton'
import { Metadata } from 'next'
import { modelActions } from '@/actions'
import Await from '@/components/await'

export const metadata: Metadata = {
  title: 'Models',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams ?? {}).filter(([key, value]) => value !== undefined)
  );

  const params = new URLSearchParams(filteredSearchParams);
  const queryString = params.toString();

  const promise = modelActions.getModels(queryString);

  return (
    <div className="container max-w-4xl mx-auto px-2 py-4 space-y-6">

      <div className="flex items-center justify-between">
        <h1 className='text-3xl font-semibold'>Models</h1>
        {/* <Link href={'/library/new'}>
          <Button size={'sm'}>Upload New Model</Button>
        </Link> */}
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