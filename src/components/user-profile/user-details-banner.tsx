import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import FollowButton from './follow-button'
import Link from 'next/link'
import { MdOutlineLocationOn } from 'react-icons/md'
import LinkNav from './link-nav'
import Await from '../await'
import { userActions } from '@/actions'

const UserDetailsBanner = async ({ username }: { username: string }) => {

    const user = await userActions.getUsersBy("username", username);

    if (!user) return null;

    const promise = userActions.getUserStats(user.id);

    return (
        <>
            <div className={`coverPicture h-1/2  relative`}>
                <div className="h-full w-full" style={{
                    backgroundImage: user.coverPicture ? `url(${user.coverPicture})` : "radial-gradient(circle, rgba(255,148,57,1) 0%, rgba(71,194,200,1) 7%, rgba(255,148,57,1) 13%, rgba(71,194,200,1) 31%, rgba(255,148,57,1) 100%)",
                    backgroundSize: 'cover',
                    backfaceVisibility: 'hidden'
                }}>
                    <div className="container h-full max-w-3xl mx-auto px-2 flex items-center justify-center">
                        <div className="flex gap-8 items-center p-4 px-10 w-full min-h-max sm:h-2/3 sm:flex-row flex-col" style={{
                            background: 'rgb(255 255 255 / 10%)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.47)',
                            borderRadius: '16px'
                        }}>
                            <div>
                                <Avatar className='h-20 w-20 sm:w-28 sm:h-28 md:w-32 md:h-32 border border-gray-300'>
                                    <AvatarImage src={user?.profilePicture as string} width={92} height={92} />
                                    <AvatarFallback className='text-2xl sm:text-3xl md:text-4xl'>{user?.name[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <h1 className='text-lg font-bold mb-3 text-center sm:text-left'>{user.name}</h1>
                                <div className='flex gap-4 items-end flex-wrap scale-80 sm:scale-90 md:scale-100'>
                                    <FollowButton username={username} following_id={user.id} />

                                    <Link href={`/${username}/questions`} className='text-center'>

                                        <Await promise={promise}>
                                            {data => <p>{data.questions}</p>}
                                        </Await>

                                        <p>Questions</p>
                                    </Link>

                                    <div>
                                        <MdOutlineLocationOn className='text-xl' />
                                        <p>{user?.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LinkNav username={username} />

        </>
    )
}

export default UserDetailsBanner