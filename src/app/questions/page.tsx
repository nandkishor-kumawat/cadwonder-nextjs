import SearchBar from '@/components/form/SearchBar';
import Questions from '@/components/questions/question-list';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import React, { Suspense } from 'react'

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const { questions } = await fetch(`${process.env.API_URL}/api/questions?query=${searchParams?.query ?? ""}`).then(res => res.json())

  return (
    <div className="h-full">
      <div className="container max-w-3xl mx-auto px-2 mb-2 h-full">
        <div className="h-full">

          <Link href={'/questions/new'}>
            <Button className="text-lg my-4 bg-orange-400 hover:bg-orange-500">Ask Question</Button>
          </Link>

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
          {questions.length === 0 && <p className="text-center text-gray-500">No questions found</p>}
        </div>

      </div>
    </div>
  )
}
