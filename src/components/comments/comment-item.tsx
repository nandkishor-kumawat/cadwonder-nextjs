import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import { Comment } from '@/lib/types/types'

export default async function CommentItem({ comment }: { comment: Comment }) {

    const { user } = await fetch(`${process.env.API_URL}/api/users/${comment.user_id}`).then(res => res.json())

    return (
        <div className="flex border-t border-gray-400 py-1 mt-2">
            <div className="flex gap-2 my-1">
                <Avatar className='w-8 h-8'>
                    <AvatarImage src={user?.profilePicture} />
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
