"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useSession } from '@/hooks'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import { commentActions } from '@/actions'


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
    association_id: string
}


export default function CommentForm({ association_id }: Props) {
    const { session } = useSession();
    const user = session?.user;

    // if (!user) return (
    //     <div className="flex gap-2 items-center">
    //         <Skeleton className='w-7 h-7 rounded-full' />
    //         <Skeleton className='flex-grow h-7' />
    //         <Skeleton className='w-20 h-7' />
    //     </div>
    // );

    return (
        <form
            key={Math.random()}
            action={commentActions.postComment}
        >
            <input type="hidden" name="association_id" value={association_id} />
            <input type="hidden" name="user_id" value={user?.id} />
            <div className="my-3">
                <div className="flex gap-2 items-center">
                    <Avatar className='w-7 h-7'>
                        <AvatarImage src={user?.profilePicture} width={48} height={48} />
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
