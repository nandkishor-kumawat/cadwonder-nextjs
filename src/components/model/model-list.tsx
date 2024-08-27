import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { MdDownload } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi'
import { isModelLiked, likeModel } from '@/actions';
import LikeButton from './like-button';
import { validateRequest } from '@/lib/auth';
import { Prisma } from '@prisma/client';
import { AiFillLike } from 'react-icons/ai';
import prisma from '@/lib/prisma';

type IModel = Prisma.ModelGetPayload<{
  include: {
    user: {
      select: {
        username: boolean;
        profilePicture: boolean;
        name: boolean;
        id: boolean;
      };
    };
  };
}>;


export default async function ModelList({ models }: { models: IModel[] }) {

  return (
    <>
      {models.length === 0 && <p>No models found</p>}
      {models.map((model, index) => <ModelItem key={index} model={model} />)}
    </>
  )
}


const ModelItem = async ({ model: data }: { model: IModel }) => {

  const {
    id,
    userId,
    category,
    slug,
    modelName,
    likesCount
  } = data;

  const { user } = await validateRequest();
  const owner = data.user;

  const isLiked = await isModelLiked(id, user?.id);

  return (
    <div className="rounded border bg-card text-card-foreground shadow-sm group">
      <div className="flex flex-col space-y-1.5 p-1">
        <Link href={`/library/${slug}`}>
          <div className='w-full relative'>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              className='rounded w-full object-contain'
              height={200}
              width={300}
              placeholder='empty'
            />

            <div style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)' }} className={`absolute bottom-0 px-2 group-hover:opacity-100 opacity-0 transition-opacity ease-linear duration-500 flex justify-end w-full`}>
              <p className='text-xs text-white'>{new Date(data.createdAt).toLocaleString()}</p>
            </div>

          </div>
        </Link>
      </div>
      <div className="px-4 pb-2 pt-0 flex flex-col gap-1 a">
        <div className="flex justify-between gap-2">
          <div>
            <Link href={`/library/${slug}`} className='break-all'>{modelName.length > 25 ? `${modelName.slice(0, 25)}...` : modelName}</Link>
            <Link href={`/${owner?.username}`}><p className="text-sm text-muted-foreground">By {owner?.name}</p></Link>
          </div>
          <div>
            <Avatar className='w-[32px] h-[32px]'>
              <AvatarImage src={owner?.profilePicture!} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex items-center gap-2">

          <form action={likeModel}>
            {/* <LikeButton id={id} user_id={user?.id} /> */}
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="user_id" value={user?.id} />
            <button disabled={!user} className='flex items-center gap-1 py-2 rounded-md px-3 hover:bg-[#EDF2F7] active:scale-90 active:bg-[#E2E8F0] transition-all ease-out duration-300'>
              <AiFillLike className={isLiked ? 'text-red-500' : 'text-gray-500'} />
              <p>{likesCount}</p>
            </button>
          </form>

          <button className='flex items-center gap-1 py-2 rounded-md px-3 hover:bg-[#EDF2F7] active:scale-90 active:bg-[#E2E8F0] transition-all ease-out duration-300'>
            <MdDownload />
            {/* <p>{followers?.length}</p> */}
          </button>
          <button className='flex items-center gap-1 py-2 rounded-md px-3 hover:bg-[#EDF2F7] active:scale-90 active:bg-[#E2E8F0] transition-all ease-out duration-300'>
            <BiCommentDetail />
            {/* <p>{followers?.length}</p> */}
          </button>
        </div>
        <hr className='border-gray-200' />
      </div>
      <div className="flex items-center p-4 pt-0">
        <p className='text-xs'>{category?.join(', ')}</p>
      </div>
    </div>

  )
}