import React, { Suspense } from 'react'
import SearchBar from '@/components/form/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import { Metadata } from 'next';
import QuestionList from '@/components/questions/question-list';
import Await from '@/components/await';
import { questionActions } from '@/actions';


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

  const promise = questionActions.getQuestions(queryString);

  return (
    <div className="container max-w-4xl mx-auto px-2 py-4 h-full space-y-6">

      <div className="flex items-center justify-between">
        <h1 className='text-3xl font-semibold'>Questions</h1>
        {/* <Link href={'/questions/new'}>
          <Button size={'sm'}>Ask Question</Button>
        </Link> */}
      </div>

      <SearchBar />

      <Suspense fallback={
        <div className='flex flex-col gap-2'>
          <Skeleton className="w-full h-[100px] rounded" />
          <Skeleton className="w-full h-[100px] rounded" />
          <Skeleton className="w-full h-[100px] rounded" />
        </div>
      }>
        <Await promise={promise}>
          {questions => <QuestionList questions={questions} />}
        </Await>
      </Suspense>
    </div>
  )
}
