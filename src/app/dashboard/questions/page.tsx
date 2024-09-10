import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import Await from '@/components/await';
import QuestionList from '@/components/questions/question-list';
import { getQuestions, getUsersBy } from '@/actions';
import { validateRequest } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SearchBar from '@/components/form/SearchBar';

interface Props {
  searchParams?: Record<string, string>;
}

const Page = async ({ searchParams }: Props) => {
  const { user } = await validateRequest();
  if (!user) return null;

  const filteredSearchParams = Object.fromEntries(
    Object.entries(searchParams ?? {}).filter(([key, value]) => value !== undefined)
  );

  const params = new URLSearchParams({ ...filteredSearchParams, userId: user.id });
  const queryString = params.toString();
  const promise = getQuestions(queryString);

  return (
    <div className="container max-w-4xl mx-auto px-2 py-4 h-full space-y-6">

      <div className="flex items-center justify-between">
        <h1 className='text-3xl font-semibold'>Questions</h1>
        <Button size={'sm'} className='rounded-none' asChild>
          <Link href={'/questions/new'}>
            Post Question
          </Link>
        </Button>
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

export default Page