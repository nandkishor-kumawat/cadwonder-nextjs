import React from 'react'
import { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CommentList from '@/components/comments/comment-list';
import Link from 'next/link';
import CommentForm from '@/components/comments/comment-form';
import { getServerSession } from 'next-auth';
import AnswerForm from '@/components/answers/answer-form';
import AnswerItem from '@/components/answers/answer-item';
import { Button } from '@/components/ui/button';
import { FileDetails } from '@/lib/types/types';
import DataInfo from '@/components/questions/data-info';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = params;

  const data = await fetch(`http://localhost:3001/api/models/${slug}`).then(res => res.json())
  
  const model = data?.model;

  return {
    title: model?.modelName ?? "Model not found",
    description: model?.description ?? "",
  };
}


async function Question({ params: { slug } }: { params: { slug: string } }) {

  const data = await fetch(`http://localhost:3001/api/models/${slug}`).then(res => res.json())
  const session = await getServerSession()


  if (!data) return <div>Loading...</div>
  if (data?.error) return <div>Error</div>
  if (!data?.model) return <div>Model not found</div>

  const { model } = data;

  // const { answers } = await fetch(`http://localhost:3001/api/answers`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ question_id: question.id })
  // }).then(res => res.json())


  return (
    <>
      <div className="container max-w-[46rem] py-2">

        <DataInfo data={model} title={model.modelName} />

        {/* <div className="flex-flex-col gap-3">
          <div className="answers my-2 flex flex-col gap-2">
            {answers.map((answer: any) => (
              <AnswerItem key={answer.id} answer={answer} />
            ))}
          </div>

          <div className='my-2'>
            {session ? (
              <>
                <h1 className='text-2xl font-bold'>Drop your answer</h1>
                <AnswerForm question_id={question.id} />
              </>
            ) :
              <Button className="rounded-none py-1 my-3 h-8 bg-orange-400 hover:bg-orange-500">Login to answer</Button>
            }
          </div>

        </div> */}


      </div>
    </>
  )
}

export default Question
