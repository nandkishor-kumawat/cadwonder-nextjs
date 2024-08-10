"use client"
import { FileDetails } from '@/types/types'
import Image from 'next/image'
import React from 'react'

export default function FilePreview({ file }: { file: FileDetails }) {
    const isImage = ['jpg', 'jpeg', 'png'].includes(file.name.split('.').at(-1) as string)
    return (
        <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            key={file.name}
            className={`${!isImage && 'px-4 py-2'} bg-slate-200 rounded-md text-sm w-full inline-block mt-2`}
        >
            {isImage ? (<Image src={file.url} alt={file.name} width={900} height={200} />) : file.name}
        </a>
    )
}
