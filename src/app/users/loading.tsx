import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
    return (
        <div className="container max-w-2xl py-3">
            <h1 className="text-2xl font-bold my-2">Users</h1>
            <div className="flex flex-col gap-3">
                {new Array(3).fill(0).map((_, index) => (
                    <Skeleton key={index} className="w-full h-[100px] rounded my-2 py-2 px-4" />
                ))}
            </div>
        </div>
    )
}

export default Loading
