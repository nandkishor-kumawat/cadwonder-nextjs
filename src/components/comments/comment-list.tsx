import React from 'react'
import CommentItem from './comment-item'

export default async function CommentList({ id }) {
    const data = await fetch(`http://localhost:3001/api/comments/${id}`).then(res => res.json())

    const comments = data?.comments ?? [];

    return (
        <div>
            <div className='flex flex-col'>
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
            <p>{JSON.stringify(comments, null, 2)}</p>
        </div>
    )
}
