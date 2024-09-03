"use client"
import React, { useState } from 'react'
import { Textarea } from '../ui/textarea'
import ImageSearchUpload from '../image-upload/image-edit-modal'
import { Button } from '../ui/button'
import { IoMdClose } from 'react-icons/io'
import { FaArrowRight, FaRegImage } from 'react-icons/fa'
import { Input } from '../ui/input'
import { getBlurLevel } from '@/lib/functions'

const AskQuestion = () => {

    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState<File | undefined>(undefined);
    const [search, setSearch] = useState('');

    const handleUpload = (text: string, url: string) => {
        setImageUrl(url);
        setSearch(text);
    }


    const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return
        const [type] = file.type.split('/');
        if (type !== 'image') {
            alert('Choose Image Only!');
            return;
        }

        const image = new Image();
        image.src = URL.createObjectURL(file);
        await image.decode();
        if (image.width < 100 || image.height < 100) {
            alert('Image too small. Minimum size is 100x100')
            return
        }
        const blurLevel = getBlurLevel(image);
        if (blurLevel > 40) {
            alert('Image too blurry. Please upload a clear image')
            return
        }
        setFile(file);
        e.target.value = '';
    }

    return (
        <div className='px-4 py-4 w-full border bg-slate-100 rounded-lg shadow-xl'>
            <div className="flex gap-2">
                <Textarea
                    placeholder="Search"
                    className='bg-white text-lg rounded-lg resize-none'
                    spellCheck={false}
                    rows={6}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {
                    imageUrl && <div className='w-32 h-32 border rounded-md shadow-md relative'>
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            onClick={() => { setImageUrl(''); setFile(undefined) }}
                            className='absolute -top-2 -right-2 p-0.5 rounded-full w-auto h-auto bg-red-300 hover:bg-red-400 active:scale-95'>
                            <IoMdClose size={18} className='text-black' />
                        </Button>
                        <img src={imageUrl} alt="Uploaded Image" className='w-full h-full object-contain' />
                    </div>
                }
            </div>
            <div className='mt-3 flex justify-end items-center gap-4'>
                <div className='file-btn'>
                    <label htmlFor='photo' className='cursor-pointer'>
                        <FaRegImage size={24} className='text-gray-500 hover:text-gray-700 active:scale-90 hover:scale-105' />
                        <span className='sr-only'>Upload Image</span>
                    </label>
                    <Input disabled={!!file} id='photo' type='file' accept='image/*' onChange={onSelectFile} className='hidden' />
                </div>

                <div className='search-btn'>
                    <Button disabled={!search} className='my-0 rounded-full flex-center gap-3' >
                        <span>Search</span>
                        <FaArrowRight />
                    </Button>
                </div>
                <ImageSearchUpload file={file} onUpload={handleUpload} handleClose={() => setFile(undefined)} />
            </div>
        </div>
    )
}

export default AskQuestion
