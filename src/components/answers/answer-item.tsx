import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { Answer, User } from '@/lib/types/types'
import { getAuth } from '@/app/api/auth/[...nextauth]/options'
import DeleteAnswerButton from './delete-answer-button'

interface Props {
  answer: Answer & { user: User }
}

export default async function AnswerItem({ answer }: Props) {

  const session = await getAuth();

  const user = answer?.user;


  return (
    <div className='my-3 border-t border-t-slate-400 pt-2'>
      <div className='flex gap-4'>
        <div className='inline-flex self-start'>
          <Avatar className='w-12 h-12'>
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className='flex-1'>
          <div className="info flex">
            <div className='flex-1'>
              <Link href={`/${user?.username}`} className='text-orange-400 font-semibold'>{user?.name}</Link>
              <p className='text-gray-500 text-sm'>{new Date(answer.createdAt).toLocaleString()}</p>
            </div>

            {session?.user?.id === answer.user_id && (<DeleteAnswerButton id={answer.id} />)}
          </div>

          <div className="deails my-1">
            <p>{answer.answer}</p>
            {answer.file_details?.map((file) => (
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

          {/* <div className='comments'>
            <CommentList id={answer.id} />

            {session &&
              <CommentForm association_id={answer.id} />
            }
          </div> */}
        </div>
      </div>
    </div>
  )
}
