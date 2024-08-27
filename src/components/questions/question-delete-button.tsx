"use client"
import React, { useTransition } from 'react'
import { Button } from '../ui/button'
import { MdDeleteForever } from 'react-icons/md'
import { deleteQuestion } from '@/actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function QuestionDeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const deleteQue = () => {
        startTransition(async () => {
            const { error, message } = await deleteQuestion(id);
            toast(error ?? message, {
                style: {
                    color: error ? "red" : "green"
                },
                icon: error ? "🚨" : "✅"
            })
            router.back();
        })
    }

    return (
        <Button
            variant={'destructive'}
            className='rounded-none border border-slate-400 w-full font-normal text-sm space-x-2'
            onClick={deleteQue}
        >
            <MdDeleteForever />
            <span>{isPending ? "Deleting..." : "Delete"}</span>
        </Button>
    )
}
