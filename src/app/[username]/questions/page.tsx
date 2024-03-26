import React from 'react'
import QuestionList from '@/components/questions/question-list';
import { getData, getUserBy } from '@/lib/functions';
import { Question } from '@/lib/types/types';

const Page = async ({ params: { username } }: { params: { username: string } }) => {

  const user = await getUserBy("username", username);

  if (!user) return null;

  const questions = await getData({
    coll: "questions",
    key: "user_id",
    value: user.id,
    order: "desc"
  }) as Question[];

  return (
    <QuestionList questions={questions} />
  )
}

export default Page