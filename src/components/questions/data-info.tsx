import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { FileDetails, Question } from '@/lib/types/types';
import CommentList from '../comments/comment-list';
import CommentForm from '../comments/comment-form';
import FilePreview from '../answers/file-preview';

interface Props {
    data: Question & {
        createdAt: Date;
        user: {
            id: string;
            name: string;
            profilePicture: string;
            username: string;
        };
    }
    title: string;
}

export default async function DataInfo({ data, title }: Props) {
    const user = data.user;
    return (
        <div className="info">
            <div className='my-2'>
                <h1 className='text-2xl font-bold'>{title}</h1>
            </div>

            <div className='flex gap-4 my-2'>
                <div className='inline-flex self-start'>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={user?.profilePicture} width={96} height={96} />
                        <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>

                <div className='flex-1'>
                    <div className="info">
                        <Link href={`/${user?.username}`} className='text-orange-400 font-semibold'>{user?.name}</Link>
                        <p className='text-gray-400 text-sm'>{new Date(data.createdAt).toLocaleString()}</p>
                    </div>

                    <div className="deails my-1 min-h-[3rem]">
                        <p>{data?.description}</p>
                        {data.file_details?.map((file: FileDetails) => (
                            <FilePreview key={file.name} file={file} />
                        ))}
                    </div>

                    {/* <div className='comments'>
                        <CommentList id={data.id} />

                        {session &&
                            <CommentForm association_id={data.id} />
                        }
                    </div> */}
                </div>
            </div>
        </div>
    )
}
