import SearchBar from '@/components/form/SearchBar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import React from 'react'

const Loading = () => {
  return (
    <div className="container max-w-3xl mx-auto px-2 mb-2 h-full">

      <div className="flex items-center justify-between">
        <h1 className='text-3xl font-semibold'>Questions</h1>
        <Link href={'/questions/new'}>
          <Button size={'sm'} className="text-base text-white my-4 bg-orange-400 hover:bg-orange-500 rounded-sm">Ask Question</Button>
        </Link>
      </div>

      <SearchBar />
      <div className='flex flex-col gap-2'>
        <Skeleton className="w-full h-[100px] rounded" />
        <Skeleton className="w-full h-[100px] rounded" />
        <Skeleton className="w-full h-[100px] rounded" />
      </div>

    </div>
  )
}

export default Loading