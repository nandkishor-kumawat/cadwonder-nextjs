"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useSession } from 'next-auth/react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { postComment } from '@/app/questions/[slug]/action'
import { Skeleton } from '../ui/skeleton'


function Submit() {
    const { pending } = useFormStatus()
    return (
        <Button
            disabled={pending}
            aria-disabled={pending}
            type='submit'
            className="rounded-none py-1 h-8 bg-orange-400 hover:bg-orange-500"
        >{pending ? 'Posting...' : 'Post'}</Button>
    )
}

interface Props {
    association: string
}


export default function CommentForm({ association }: Props) {
    const { data: session } = useSession();
    const user = session?.user as {
        id: string;
        name: string;
        profilePicture: string;
    };
    const ref = React.useRef<HTMLFormElement>(null);


    if (!user) return (
        <div className="flex gap-2 items-center">
            <Skeleton className='w-7 h-7 rounded-full' />
            <Skeleton className='flex-grow h-7' />
            <Skeleton className='w-20 h-7' />
        </div>
    );

    return (
        <form
            ref={ref}
            action={async (formData) => {
                await postComment(formData);
                ref.current?.reset();
            }}>

            <input type="hidden" name="association" value={association} />
            <input type="hidden" name="user_id" value={user?.id} />
            <div className="my-3">
                <div className="flex gap-2 items-center">
                    <Avatar className='w-7 h-7'>
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback>{user?.name[0]?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <Input
                        name='comment'
                        placeholder="Write a comment"
                        className="h-8 rounded-none w-full py-1"
                        required
                    />
                    <Submit />
                </div>
            </div>
        </form>
    )
}
