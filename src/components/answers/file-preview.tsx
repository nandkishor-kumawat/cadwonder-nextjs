"use client"
import { Files } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function FilePreview({ file }: { file: Files }) {
    const isImage = file.type.startsWith('image');
    const secureUrl = `/api/media/${file.name}`;
    const [localUrl, setLocalUrl] = useState('');

    useEffect(() => {
        (async () => {
            const response = await fetch(secureUrl);
            if (!response.ok) {
                console.error('Failed to fetch file:', secureUrl);
                return;
            }
            const blob = await response.blob();
            setLocalUrl(URL.createObjectURL(blob));
        })();
    }, [secureUrl]);

    return (
        <a
            href={secureUrl}
            target="_blank"
            rel="noopener noreferrer"
            key={file.name}
            className={`${!isImage && 'px-4 py-2'} bg-slate-200 rounded-md text-sm w-full inline-block mt-2`}
        >
            {isImage ? (<Image src={secureUrl} sizes='100vw' alt={file.name} width={900} height={200} />) : file.name}
        </a>
    )
}
