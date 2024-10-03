import React from 'react'
import CommentItem from './comment-item'
import { commentActions } from '@/actions';

export default async function CommentList({ id }: { id: string }) {

    const { comments } = await commentActions.getCommentsByAssociationId(id);

    return (
        <div className='w-full'>
            <div className='flex flex-col'>
                {comments?.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    )
}
