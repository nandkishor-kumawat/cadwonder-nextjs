import ImageSearchUpload from '@/components/image-upload/image-edit-modal'
import AskQuestion from '@/components/questions/ask-question'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import React from 'react'

const page = async () => {
  return (
    <div className='relative h-body container p-2'>
      <div className="absolute inset-0 -z-10">
        <Image src="/banner.webp" alt="hero" fill />
      </div>
      <div className="w-full h-full flex-center flex-col space-y-6 max-w-screen-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-balance">Study Anytime, Anywhere</h1>
        <p className='text-xl'>Expert Help at Your Fingertips</p>
        <p className='text-xl'>Instant Solutions for Every Study Challenge</p>
        <AskQuestion />
      </div>
    </div>
  )
}

export default page
