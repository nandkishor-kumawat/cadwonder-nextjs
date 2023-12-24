"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useSession } from 'next-auth/react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'


export default function CommentForm({commentTo}: any) {
    const { data: session } = useSession();
    const user = session?.user;

    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitForm = async () => {
        console.table({ comment, commentTo, user_id: user?.id })
        return
        setIsLoading(true);

        const res = await fetch('http://localhost:3001/api/comments/postcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment, commentTo, user_id: user.id })
        })

        if (res.ok) {
            setComment('');
            setIsLoading(false);
            console.log('first')
        }
    }

    return (
        <div className="my-3 py-3 h-8 box-border">
            <div className="flex gap-2 items-center">
                <Avatar className='w-7 h-7'>
                    <AvatarImage src={user?.profilePicture} />
                    <AvatarFallback>{user?.name[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                <Input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment"
                    className="h-8 rounded-none w-full py-1 focus-visible:ring-cyan-400 focus-visible:ring-offset-0" />
                <Button 
                disabled={isLoading || !comment}
                onClick={submitForm}
                className="rounded-none py-1 h-8 bg-orange-400 hover:bg-orange-500"
                >Submit</Button>
            </div>
        </div>
    )
}
