import React, { Suspense } from 'react'
import { getData, getUserBy } from '@/lib/functions';
import { Skeleton } from '@/components/ui/skeleton';
import Await from '@/components/await';
import QuestionList from '@/components/questions/question-list';
import { Question } from '@prisma/client';
import { getQuestions } from '@/actions';

const Page = async ({ params: { username } }: { params: { username: string } }) => {
  //TODO: Implement this function
  const user = await getUserBy("username", username);

  if (!user) return null;
  const queryString = `userId=${user.id}`;
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