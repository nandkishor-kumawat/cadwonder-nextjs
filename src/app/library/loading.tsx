import SearchBar from '@/components/form/SearchBar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import React from 'react'

const Loading = () => {
    return (
        <div className="container max-w-4xl mx-auto px-2 mb-2">

            <div className="flex items-center justify-between">
                <h1 className='text-3xl font-semibold'>Models</h1>
                <Link href={'/library/new'}>
                    <Button size={'sm'} className="text-base text-white my-4 bg-orange-400 hover:bg-orange-500 rounded-sm">Upload New Model</Button>
                </Link>
            </div>
            <SearchBar />

            <div className="grid gap-2 pb-2" style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            }}>
                <Skeleton className="w-full h-[300px] rounded" />
                <Skeleton className="w-full h-[300px] rounded" />
                <Skeleton className="w-full h-[300px] rounded" />
            </div>
        </div>
    )
}

export default Loading