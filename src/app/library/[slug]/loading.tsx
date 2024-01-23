import Spinner from '@/components/loaders/spinner'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-full w-full grid place-content-center'>
      <Spinner className='w-16 h-16' />
    </div>
  )
}

export default Loading