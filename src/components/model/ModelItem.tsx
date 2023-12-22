import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { MdDownload } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'


const ModelItem = ({ data }: any) => {

    const {
        id,
        user_id,
        category,
        slug,
        modelName
    } = data;

    const [followers, setFollowers] = useState([])
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="rounded border bg-card text-card-foreground shadow-sm"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col space-y-1.5 p-1">
                <Link href={`/library/${slug}`}>
                    <div className='w-full relative'>
                        <Image
                            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                            alt='Green double couch with wooden legs'
                            className='rounded w-full object-contain'
                            height={200}
                            width={300}
                        />

                        <div style={{background:'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)'}} className={`absolute bottom-0 px-2 opacity-${isHovered ? 100 : 0} transition-opacity ease-linear duration-300 flex justify-end w-full`}>
                            <p className='text-xs text-white'>{new Date(data.createdAt).toLocaleString()}</p>
                        </div>

                    </div>
                </Link>
            </div>
            <div className="px-4 pb-2 pt-0 flex flex-col gap-1">
                <div className="flex justify-between">
                    <div>
                        <Link href={`/library/${slug}`}>{modelName.length > 25 ? `${modelName.slice(0, 25)}...` : modelName}</Link>
                        <Link href={`/${'user.username'}`}><p className="text-sm text-muted-foreground">By {'user.name'}</p></Link>
                    </div>
                    <div>
                        <Avatar className='w-[32px] h-[32px]'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className='flex items-center gap-1 py-2 rounded-md px-3 hover:bg-[#EDF2F7] active:scale-90 active:bg-[#E2E8F0] transition-all ease-out duration-300'>
                        <AiFillLike />
                        <p>{followers.length}</p>
                    </button>
                    <button className='flex items-center gap-1 py-2 rounded-md px-3 hover:bg-[#EDF2F7] active:scale-90 active:bg-[#E2E8F0] transition-all ease-out duration-300'>
                        <MdDownload />
                        <p>{followers.length}</p>
                    </button>
                    <button className='flex items-center gap-1 py-2 rounded-md px-3 hover:bg-[#EDF2F7] active:scale-90 active:bg-[#E2E8F0] transition-all ease-out duration-300'>
                        <BiCommentDetail />
                        <p>{followers.length}</p>
                    </button>
                </div>
                <hr className='border-gray-200' />
            </div>
            <div className="flex items-center p-4 pt-0">
                <p className='text-sm'>{category.join(', ')}</p>
            </div>
        </div>

    )
}

export default ModelItem