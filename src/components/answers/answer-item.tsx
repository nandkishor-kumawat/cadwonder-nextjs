import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { Answer, User } from '@prisma/client'
import DeleteAnswerButton from './delete-answer-button'
import FilePreview from './file-preview'
import { validateRequest } from '@/lib/auth'
import CommentList from '../comments/comment-list'
import CommentForm from '../comments/comment-form'

interface Props {
  answer: Answer & { user: User }
}

export default async function AnswerItem({ answer }: Props) {

  const session = await validateRequest();

  const user = answer?.user;


  return (
    <div className='my-3 border-t border-t-slate-400 pt-2'>
      <div className='flex gap-4'>
        <div className='inline-flex self-start'>
          <Avatar className='w-12 h-12'>
            <AvatarImage src={user?.profilePicture} width={48} height={48} />
            <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className='flex-1'>
          <div className="info flex">
            <div className='flex-1'>
              <Link href={`/${user?.username}`} className='text-orange-400 font-semibold'>{user?.name}</Link>
              <p className='text-gray-500 text-sm'>{new Date(answer.createdAt).toLocaleString()}</p>
            </div>

            {session?.user?.id === answer.userId && (<DeleteAnswerButton id={answer.id} />)}
          </div>

          <div className="deails my-1">
            <p>{answer.answer}</p>
            {answer.fileDetails?.map((file) => (
              <FilePreview key={file.name} file={file} />
            ))}
          </div>

          {/* <div className='comments'>
            <CommentList id={answer.id} />

            {session.user &&
              <CommentForm association_id={answer.id} />
            }
          </div> */}
        </div>
      </div>
    </div>
  )
}
