import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { getData, getUserByEmail } from '@/lib/functions'
import { getServerSession } from 'next-auth'

const UserInfo = async () => {

    const session = await getServerSession();
    const user = await getUserByEmail(session?.user?.email as string);
    if (!session || !user) return null;

    const userQuestions = await getData({
        coll: "questions",
        key: "user_id",
        value: user.id
    });

    const userModels = await getData({
        coll: "models",
        key: "user_id",
        value: user.id
    })


    return (
        <div className={`coverPicture flex items-center justify-center h-full relative`}>
            {user.coverPicture && <Image
                src={user.coverPicture as string}
                alt="coverPicture"
                className='w-full h-1/3 object-cover absolute top-0 left-0'
                width={1280}
                height={920}
                priority={true}
            />}

            <div className='detail w-[32rem] h-[12rem] m-auto relative' style={{
                background: 'rgb(255 255 255 / 10%)',
                borderRadius: '16px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.47)',
                padding: '1rem',
                marginTop: '10rem',
            }}>
                <Link href='/dashboard/edit-profile'>
                    <div className='absolute top-0 right-0 p-4 cursor-pointer'>
                        <FaEdit className='text-orange-400' />
                    </div>
                </Link>

                <div className='w-full h-full flex items-center justify-between gap-4 flex-col'>
                    <Avatar className='w-20 h-20 -mt-14'>
                        <AvatarImage src={user?.profilePicture as string} />
                        <AvatarFallback className='text-3xl'>{user?.name[0].toUpperCase()}</AvatarFallback>
                    </Avatar>



                    <div>
                        <h1>{user.name}</h1>
                    </div>

                    <div className='flex items-center justify-center gap-2 flex-wrap'>
                        <p>0 Follower(s), </p>
                        <p>{userQuestions.length} Question(s), </p>
                        <p>{userModels.length} Model(s), </p>
                        {/* <p>1 Badge received</p> */}
                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserInfo