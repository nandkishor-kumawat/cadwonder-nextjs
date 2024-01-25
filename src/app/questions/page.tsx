import React, { Suspense } from 'react'
import SearchBar from '@/components/form/SearchBar';
import Questions from '@/components/questions/question-list';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Questions',
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Record<string, string>;
}) {

  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams ?? {}).filter(([key, value]) => value !== undefined)
  );

  const params = new URLSearchParams(filteredSearchParams);
  const queryString = params.toString();

  const { questions } = await fetch(`${process.env.API_URL}/api/questions?${queryString}`).then(res => res.json())

  return (
    <div className="container max-w-3xl mx-auto px-2 mb-2 h-full">

      <div className="flex items-center justify-between">
        <h1 className='text-3xl font-semibold'>Questions</h1>
        <Link href={'/questions/new'}>
          <Button size={'sm'} className="text-base text-white my-4 bg-orange-400 hover:bg-orange-500 rounded-sm">Ask Question</Button>
        </Link>
      </div>

      <SearchBar />

      <Suspense fallback={
        <div className='flex flex-col gap-2'>
          <Skeleton className="w-full h-[100px] rounded" />
          <Skeleton className="w-full h-[100px] rounded" />
          <Skeleton className="w-full h-[100px] rounded" />
        </div>
      }>
        <Questions questions={questions} />
      </Suspense>
    </div>
  )
}
