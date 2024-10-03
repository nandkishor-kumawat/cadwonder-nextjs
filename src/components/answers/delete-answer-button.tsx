"use client"
import React, { useTransition } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdDeleteForever } from 'react-icons/md';
import { toast } from 'sonner';
import { answerActions } from '@/actions';
import { useRouter } from 'next/navigation';


export default function DeleteAnswerButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter()

    const deleteAns = () => {
        startTransition(async () => {
            const { error, message } = await answerActions.deleteAnswer(id);
            toast(message, {
                style: {
                    color: error ? "red" : "green"
                },
                icon: error ? "🚨" : "✅"
            })
            // router.refresh()
        })
    }

    return (
        <>

            <DropdownMenu>
                <DropdownMenuTrigger className='outline-none focus:outline-none'><CiMenuKebab /></DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={deleteAns} className='text-red-400 cursor-pointer hover:text-red-600 hover:bg-transparent'>
                        <MdDeleteForever />
                        <span>&nbsp;{"Delete"}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}
