import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="container max-w-[46rem] py-2">

      <div className="my-2 space-y-1">
        <Skeleton className='w-full h-5 rounded-sm' />
        <Skeleton className='w-full h-5 rounded-sm' />
        <Skeleton className='w-full h-5 rounded-sm' />
      </div>

      <div className='flex gap-4 my-2'>
        <div className='inline-flex self-start'>
          <Skeleton className='w-10 h-10 rounded-full' />
        </div>

        <div className='flex-1'>
          <Skeleton className='w-1/2 h-5 rounded-sm' />
          <Skeleton className='w-1/4 my-1 h-3 rounded-sm' />

          <div className="deails my-4 min-h-[3rem] space-y-1">
            <Skeleton className='w-full h-8 rounded-sm' />
            <Skeleton className='w-full h-8 rounded-sm' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading