import React from 'react'
import { Skeleton } from '../ui/skeleton'

export function AnswerFallback() {
    return (
        <div className='flex gap-2 my-2 mb-4 border-t border-t-slate-400 pt-2'>
            <div className='inline-flex self-start'>
                <Skeleton className='w-10 h-10 rounded-full' />
            </div>

            <div className='flex-1'>
                <Skeleton className='w-1/2 h-5 rounded-sm' />
                <Skeleton className='w-1/4 my-1 h-3 rounded-sm' />

                <div className="deails mt-4 min-h-[3rem] space-y-1">
                    <Skeleton className='w-full h-8 rounded-sm' />
                    <Skeleton className='w-full h-8 rounded-sm' />
                </div>
            </div>
        </div>
    )
}
