import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { Prisma } from '@prisma/client'

type CommentWithUser = Prisma.CommentGetPayload<{
  include: {
    user: {
      select: {
        name: true;
        username: true;
        profilePicture: true;
      };
    };
  };
}>;

export default async function CommentItem({ comment }: { comment: CommentWithUser }) {

  const user = comment.user

  return (
    <div className="flex border-t border-gray-400 py-1 mt-2">
      <div className="flex gap-2 my-1">
        <Avatar className='w-8 h-8'>
          <AvatarImage src={user?.profilePicture as string} />
          <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex gap-2">
            <Link href={`/${user?.username}`} className="font-bold text-orange-400 text-xs">{user?.name}</Link>
            <p className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-1">
            <p className="text-xs">{comment.comment}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
