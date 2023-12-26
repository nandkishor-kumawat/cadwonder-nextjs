import React from 'react'
import { Metadata } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import CommentList from '@/components/comments/comment-list';
import Link from 'next/link';
import CommentForm from '@/components/comments/comment-form';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import AnswerForm from '@/components/answers/answer-form';
import AnswerItem from '@/components/answers/answer-item';
import { Button } from '@/components/ui/button';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = params;
  const url = `http://localhost:3001/api/questions/${slug}`;

  const { question } = await fetch(url).then((res) => res.json());

  return {
    title: question?.question ?? "Question not found",
    description: question?.description ?? "",
  };
}


async function Question({ params: { slug } }: { params: { slug: string } }) {

  const data = await fetch(`http://localhost:3001/api/questions/${slug}`).then(res => res.json())
  const session = await getServerSession()


  if (!data) return <div>Loading...</div>
  if (data?.error) return <div>Error</div>
  if (!data?.question) return <div>Question not found</div>

  const { question, user } = data;

  const { answers } = await fetch(`http://localhost:3001/api/answers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ question_id: question.id })
  }).then(res => res.json())


  return (
    <>
      <div className="container max-w-[46rem] py-2">

        <div className='my-2'>
          <h1 className='text-2xl font-bold'>{question.question}</h1>
        </div>

        <div className='flex gap-4 my-2'>
          <div className='inline-flex self-start'>
            <Avatar className='w-12 h-12'>
              <AvatarImage src={user.profilePicture} />
              <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </div>

          <div className='flex-1'>
            <div className="info">
              <Link href={`/users/${user.id}`} className='text-orange-400 font-semibold'>{user.name}</Link>
              <p className='text-gray-400 text-sm'>{new Date(question.createdAt).toLocaleString()}</p>
            </div>

            <div className="deails my-1">
              <p>{question.description}</p>
              {question.file_details?.map((file: any) => (
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={file.name}
                  className='px-4 py-2 bg-slate-200 rounded-md text-sm w-full inline-block mt-2'
                >
                  {file.name}
                </a>
              ))}
            </div>

            <div className='comments'>
              <CommentList id={question.id} />

              {session &&
                <CommentForm association_id={question.id} />
              }
            </div>
          </div>
        </div>

        <div className="flex-flex-col gap-3">
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
            ):
              <Button className="rounded-none py-1 my-3 h-8 bg-orange-400 hover:bg-orange-500">Login to answer</Button>
            }
          </div>

        </div>


      </div>
    </>
  )
}

export default Question
