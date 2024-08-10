import React, { Suspense } from 'react'
import { getData, getUserBy } from '@/lib/functions';
import { Question } from '@/types/types';
import { Skeleton } from '@/components/ui/skeleton';
import Await from '@/components/await';
import QuestionList from '@/components/questions/question-list';

const Page = async ({ params: { username } }: { params: { username: string } }) => {

  const user = await getUserBy("username", username);

  if (!user) return null;

  const promise = getData({
    coll: "questions",
    key: "user_id",
    value: user.id,
    order: "desc"
  }) as Promise<Question[]>;

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