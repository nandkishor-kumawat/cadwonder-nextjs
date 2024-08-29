import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton';
import Await from '@/components/await';
import QuestionList from '@/components/questions/question-list';
import { getQuestions, getUsersBy } from '@/actions';

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
  const promise = getQuestions(queryString);

  return (
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
  )
}

export default Page