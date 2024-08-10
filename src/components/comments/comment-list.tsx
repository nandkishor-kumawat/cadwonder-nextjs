import React from 'react'
import CommentItem from './comment-item'
import { Comment } from '@/types/types';
import { getData } from '@/lib/functions';

export default async function CommentList({ id }: { id: string }) {

    const comments: Comment[] = await getData({
        coll: "comments",
        key: "association_id",
        value: id
    });

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
