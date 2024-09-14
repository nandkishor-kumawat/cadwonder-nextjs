import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';
import { Files, Model, Prisma, Question } from '@prisma/client';
import FilePreview from '../answers/file-preview';
import { validateRequest } from '@/lib/auth';

type User = Prisma.UserGetPayload<{
    select: {
        id: true;
        name: true;
        profilePicture: true;
        username: true;
    }
}>


interface Props {
    data: (Question | Model) & {
        user: User,
        fileDetails: Files[];
    }
    title: string;
}

export default async function DataInfo({ data, title }: Props) {
    const user = data.user;
    const { session } = await validateRequest();
    return (
        <div className="info">
            <div className='flex gap-4 my-2 mt-4'>
                <div className='inline-flex self-start'>
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={user?.profilePicture} width={96} height={96} />
                        <AvatarFallback className='text-2xl'>{user?.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>

                <div className='flex-1'>
                    <div className="info">
                        <Link href={`/${user?.username}`} className='text-orange-400 font-semibold'>{user?.name}</Link>
                        <p className='text-gray-400 text-sm'>{new Date(data.createdAt).toLocaleString()}</p>
                    </div>

                    <div className='my-2'>
                        <h1 className='font-bold text-justify'
                            style={{
                                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                            }}
                        >{title}</h1>
                    </div>

                    <div className="deails my-1 min-h-[3rem]">
                        <p>{data?.description}</p>
                        {data.fileDetails?.map((file: Files) => (
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
