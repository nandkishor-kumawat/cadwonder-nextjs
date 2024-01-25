import React from 'react'
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import AnswerForm from '@/components/answers/answer-form';
import AnswerItem from '@/components/answers/answer-item';
import { Button } from '@/components/ui/button';
import DataInfo from '@/components/questions/data-info';
import { getData } from '@/lib/functions';
import QuestionStates from '@/components/questions/question-states';
import { FaShareSquare } from 'react-icons/fa';
import FollowButton from '@/components/user-profile/follow-button';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = params;
  const url = `${process.env.API_URL}/api/questions/${slug}`;

  const { question } = await fetch(url).then((res) => res.json());

  return {
    title: question?.question ?? "Question not found",
    description: question?.description ?? "",
  };
}


async function Question({ params: { slug } }: { params: { slug: string } }) {
  const data = await fetch(`${process.env.API_URL}/api/questions/${slug}`).then(res => res.json())
  const session = await getServerSession()


  if (!data) return <div>Loading...</div>
  if (data?.error) return <div>Error</div>
  if (!data?.question) return <div>Question not found</div>

  const { question } = data;

  const answers = await getData({
    coll: "answers",
    key: "question_id",
    value: question.id,
    order: "asc"
  });

  const date = new Date(question.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <div className="container max-w-5xl py-2">

        <div className="flex md:flex-row flex-col gap-4">
          <div className='flex-1'>
            <DataInfo data={question} title={question.question} />

            <div className="flex flex-col gap-3">
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

            </div>
          </div>

            <div className='w-full md:w-max md:mt-5 space-y-6'>
              <div className='flex gap-2'>
                <FollowButton following_id={question.user.id} className='rounded-none border border-slate-400 w-full font-normal text-sm' />
                <Button variant={'ghost'} className='rounded-none border border-slate-400 w-full font-normal text-sm space-x-2'>
                  <FaShareSquare />
                  <span>Share</span>
                </Button>
              </div>
              <div>
                <QuestionStates question_id={question.id} user_id={question.user_id} ext />
              </div>

              <div>
                <p>Details:</p>
                <table className='w-full text-left align-baseline'>
                  <tbody>
                    <tr>
                      <th>Created:</th>
                      <td>{date}</td>
                    </tr>
                    <tr>
                      <th>Category:</th>
                      <td>{question.category}</td>
                    </tr>
                    {question.software && (
                      <tr>
                        <th>Software:</th>
                        <td>{question.software}</td>
                      </tr>
                    )}

                  </tbody>
                </table>
              </div>
            </div>

        </div>


      </div>
    </>
  )
}

export default Question
