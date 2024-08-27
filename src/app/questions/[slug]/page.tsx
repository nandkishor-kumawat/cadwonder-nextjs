import React, { Suspense } from 'react'
import { Metadata } from 'next';
import AnswerForm from '@/components/answers/answer-form';
import { Button } from '@/components/ui/button';
import DataInfo from '@/components/questions/data-info';
import { getData, updateViewCount } from '@/lib/functions';
import QuestionStates from '@/components/questions/question-states';
import { FaRegEdit, FaShareSquare } from 'react-icons/fa';
import FollowButton from '@/components/user-profile/follow-button';
import { siteMetadata } from '@/lib/siteMetaData';
import { MdDeleteForever } from 'react-icons/md';
import QuestionDeleteButton from '@/components/questions/question-delete-button';
import AnswerList from '@/components/answers/answer-list';
import { AnswerFallback } from '@/components/fallbacks';
import { getQuestionBySlug } from '@/actions';
import Link from 'next/link';
import { validateRequest } from '@/lib/auth';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = params;

  const url = `${siteMetadata.siteUrl}/questions/${slug}`;

  const { question, error } = await getQuestionBySlug(slug);
  if (!question) return {};
  const publishedAt = new Date(question.createdAt).toISOString();

  return {
    title: question.question,
    description: question.description || siteMetadata.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: question.question,
      description: question.description || siteMetadata.description,
      url: url,
      siteName: 'CadWonder',
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: publishedAt,
      // images: ogImages,
      authors: question.user.name,
    },
    twitter: {
      card: "summary_large_image",
      title: question.question,
      description: question.description || siteMetadata.description,
      // images: ogImages,
    },
  };
}


async function Page({ params: { slug } }: Props) {
  const { question, error } = await getQuestionBySlug(slug);
  const { session, user } = await validateRequest();
  console.log(question)
  if (error) return <div>Error</div>
  if (!question) return <div>Question not found</div>

  await updateViewCount(question.id);

  const date = new Date(question.createdAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "question",
    "headline": question.question,
    "description": question.description || siteMetadata.description,
    // "image": imageList,
    "datePublished": new Date(question.createdAt).toISOString(),
    "dateModified": new Date(question.createdAt).toISOString(),
    "author": [{
      "@type": "Person",
      "name": question.user.name || siteMetadata.author,
      "url": siteMetadata.twitter,
    }]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-5xl py-2">

        <div className="flex md:flex-row flex-col gap-4">
          <div className='flex-1'>
            <DataInfo data={question} title={question.question} />

            <div className="flex flex-col gap-3">
              <div className="answers my-2 flex flex-col gap-2">
                <Suspense fallback={
                  <>
                    <AnswerFallback />
                    <AnswerFallback />
                  </>}>
                  <AnswerList question_id={question.id} />
                </Suspense>
              </div>

              <div className='my-2'>
                {session ? (
                  <>
                    <h1 className='text-2xl font-bold'>Drop your answer</h1>
                    <AnswerForm question_id={question.id} />
                  </>
                ) :
                  <Button className="rounded-none py-1 my-3 h-8 bg-orange-400 hover:bg-orange-500" asChild>
                    <Link href={`/login?callbackUrl=/questions/${slug}`}>Login to answer</Link>
                  </Button>
                }
              </div>
            </div>
          </div>

          <div className='w-full md:w-max md:mt-5 space-y-6'>
            <div className='flex gap-2'>
              {question.userId === user?.id && (<QuestionDeleteButton id={question.id} />)}
              <FollowButton following_id={question.user.id} className='rounded-none border border-slate-400 w-full font-normal text-sm' />
              <Button variant={'ghost'} className='rounded-none border border-slate-400 w-full font-normal text-sm space-x-2'>
                <FaShareSquare />
                <span>Share</span>
              </Button>
            </div>
            <div>
              <QuestionStates question={question} ext />
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

export default Page
