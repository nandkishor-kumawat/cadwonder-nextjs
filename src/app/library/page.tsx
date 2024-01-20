import React, { Suspense } from 'react'
import SearchBar from '@/components/form/SearchBar'
import ModelList from '@/components/model/model-list'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CadWonder - Models',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const data = await fetch(`${process.env.API_URL}/api/models?query=${searchParams?.query ?? ""}`).then(res => res.json())

  const { models } = data;


  return (
    <div className="container max-w-4xl mx-auto px-2 mb-2">
      <Link href={'/library/new'}>
        <Button className="text-lg my-4 bg-orange-400 hover:bg-orange-500">New Model</Button>
      </Link>

      <SearchBar />


      {models.length === 0 ? <p className="text-center text-gray-500">No models found</p> : (

        <div className="grid gap-2 pb-2" style={{
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
      )}
    </div>
  )
}