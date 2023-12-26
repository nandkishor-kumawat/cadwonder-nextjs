import React, { Suspense } from 'react'
import SearchBar from '@/components/form/SearchBar'
import ModelList from '@/components/model/model-list'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Model } from '@/lib/types/types'
import Link from 'next/link'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const data = await fetch(`http://localhost:3001/api/models?query=${searchParams?.query ?? ""}`).then(res => res.json())

  const { models } = data;


  return (
    <div className="container max-w-4xl mx-auto px-2 mb-2">
      <Link href={'/library/new'}>
        <Button className="text-lg my-4 bg-orange-400 hover:bg-orange-500">New Model</Button>
      </Link>

      <SearchBar />


      <div className="grid gap-2" style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}>
        <Suspense fallback={<>
          <Skeleton className="w-full h-[300px] rounded" />
          <Skeleton className="w-full h-[300px] rounded" />
          <Skeleton className="w-full h-[300px] rounded" />
        </>}>
          {/* <Skeleton className="w-full h-[300px] rounded" /> */}
          <ModelList models={models} />
        </Suspense>
      </div>

    </div>
  )
}