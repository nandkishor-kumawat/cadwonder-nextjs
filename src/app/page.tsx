import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='relative h-full'>
      <div className="absolute inset-0 -z-10">
        <Image src="/banner.webp" alt="hero" fill />
      </div>
      <div className="w-full h-full flex-center flex-col space-y-6 max-w-screen-md mx-auto">
        <h1 className="text-4xl font-bold">Study Anytime, Anywhere</h1>
        <p className='text-xl'>Expert Help at Your Fingertips</p>
        <p className='text-xl'>Instant Solutions for Every Study Challenge</p>
        {/* <div className='px-4 py-6 w-full border bg-slate-100 rounded-lg'> */}
        <Textarea
          placeholder="Search"
          className='bg-white text-lg rounded-lg'
          spellCheck={false}
          rows={6}
        />
        {/* </div> */}
      </div>
    </div>
  )
}

export default page
