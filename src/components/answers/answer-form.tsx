"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { postAnswer } from '@/app/questions/[slug]/action'
import { Textarea } from '../ui/textarea'
import { Skeleton } from '../ui/skeleton'


function Submit() {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending}
      aria-disabled={pending}
      type='submit'
      className="rounded-none py-1 h-8 bg-orange-400 hover:bg-orange-500"
    >{pending ? 'Posting...' : 'Post Answer'}</Button>
  )
}


interface Props {
  question_id: string
  slug: string
}


export default function AnswerForm(props: Props) {
  const { data: session } = useSession();
  const user = session?.user as {
    id: string;
    name: string;
    profilePicture: string;
  };
  const ref = React.useRef<HTMLFormElement>(null);

  if (!user) return (
    <div className="flex gap-2 items-start my-2">
      <Skeleton className='w-10 h-10 rounded-full' />
      <div className="flex-col flex flex-1 gap-2">
        <Skeleton className='flex-grow h-32' />
        <div className='flex gap-2 items-center'>
          <Skeleton className='w-20 h-7' />
          <Skeleton className='w-20 h-4' />
        </div>
      </div>
    </div>
  );

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await postAnswer(formData);
        ref.current?.reset();
      }}>

      <input type="hidden" name="question_id" value={props.question_id} />
      <input type="hidden" name="slug" value={props.slug} />
      <input type="hidden" name="user_id" value={user?.id} />

      <div className="py-2 my-1">
        <div className="flex gap-2 items-start">
          <Avatar className='w-10 h-10'>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>{user?.name[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-col flex w-full gap-2">
            <Textarea
              name='answer'
              placeholder="Write your answer"
              className="rounded-none w-full"
              rows={8}
              required
            />
            <div className='flex gap-2 items-center'>
              <Submit />
              <div>
                <label htmlFor='fileInput' className="font-medium cursor-pointer">Attach a file</label>
                <input type="file" id='fileInput' className="hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
