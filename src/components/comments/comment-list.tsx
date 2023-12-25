import React from 'react'
import CommentItem from './comment-item'
import { Comment } from '@/lib/types';

export default async function CommentList({ id }: { id: string }) {
    const data = await fetch(`http://localhost:3001/api/comments/${id}`).then(res => res.json())

    const comments: Comment[] = data?.comments ?? [];

    return (
        <div className='w-full'>
            <div className='flex flex-col'>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    )
}