import React, { Suspense } from 'react'
import { Metadata } from 'next';
import DataInfo from '@/components/questions/data-info';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = params;

  const data = await fetch(`${process.env.API_URL}/api/models/${slug}`).then(res => res.json())

  const model = data?.model;

  return {
    title: model?.modelName ?? "Model not found",
    description: model?.description ?? "",
  };
}


async function Question({ params: { slug } }: Props) {

  const data = await fetch(`${process.env.API_URL}/api/models/${slug}`).then(res => res.json())


  const { model } = data;


  return (
    <>
      <div className="container max-w-[46rem] py-2">

        <Suspense fallback={<div>Loading...</div>}>
          <DataInfo data={model} title={model?.modelName} />
        </Suspense>

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
