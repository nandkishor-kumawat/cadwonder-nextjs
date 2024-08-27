import React, { Suspense } from 'react'
import { Metadata } from 'next';
import DataInfo from '@/components/questions/data-info';
import { siteMetadata } from '@/lib/siteMetaData';
import { Model } from '@prisma/client';
import { getModelBySlug } from '@/actions';
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = params;

  const url = `${siteMetadata.siteUrl}/models/${slug}`;
  const { model, error } = await getModelBySlug(slug);
  if (!model) return {};

  const publishedAt = new Date(model.createdAt).toISOString();

  return {
    title: model?.modelName ?? "Model not found",
    description: model?.description || siteMetadata.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: model.modelName,
      description: model.description || siteMetadata.description,
      url: url,
      siteName: 'CadWonder',
      locale: "en_US",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: publishedAt,
      // images: ogImages,
      authors: model.user.name,
    },
    twitter: {
      card: "summary_large_image",
      title: model.modelName,
      description: model.description || siteMetadata.description,
      // images: ogImages,
    },
  };
}


export default async function page({ params: { slug } }: Props) {

  const { model, error } = await getModelBySlug(slug);
  if (!model) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "model",
    "headline": model.modelName,
    "description": model.description || siteMetadata.description,
    // "image": imageList,
    "datePublished": new Date(model.createdAt).toISOString(),
    "dateModified": new Date(model.createdAt || model.createdAt).toISOString(),
    "author": [{
      "@type": "Person",
      "name": model.user.name || siteMetadata.author,
      "url": siteMetadata.twitter,
    }]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container max-w-[46rem] py-2">

        <DataInfo data={model} title={model?.modelName} />

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