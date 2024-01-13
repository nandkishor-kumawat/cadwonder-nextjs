import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { FileDetails } from '@/lib/types/types';
import CommentList from '../comments/comment-list';
import CommentForm from '../comments/comment-form';
import { getServerSession } from 'next-auth';

interface Props {
    data: {
        id: string;
        description: string;
        createdAt: string;
        user: {
            id: number;
            name: string;
            profilePicture: string;
        };
        file_details: FileDetails[];
    };
    title: string;
}

export default async function DataInfo({ data, title }: Props) {
    const user = data.user;
    const session = await getServerSession()

    return (
        <div className="info">
            <div className='my-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
            </div>

            <div className='flex gap-4 my-2'>
                <div className='inline-flex self-start'>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>

                <div className='flex-1'>
                    <div className="info">
                        <Link href={`/users/${user?.id}`} className='text-orange-400 font-semibold'>{user?.name}</Link>
                        <p className='text-gray-400 text-sm'>{new Date(data.createdAt).toLocaleString()}</p>
                    </div>

                    <div className="deails my-1 min-h-[3rem]">
                        <p>{data?.description}</p>
                        {data.file_details?.map((file: FileDetails) => (
                            <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={file.name}
                                className='px-4 py-2 bg-slate-200 rounded-md text-sm w-full inline-block mt-2'
                            >
                                {file.name}
                            </a>
                        ))}
                    </div>

                    <div className='comments'>
                        <CommentList id={data.id} />

                        {session &&
                            <CommentForm association_id={data.id} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
