import EducationDetailCard from '@/components/edit-profile/EducationDetailCard';
import ExperienceDetailCard from '@/components/edit-profile/ExperienceDetailCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { getData, getDataFromCollection } from '@/lib/functions'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';

export default async function Page({ params: { username } }: { params: { username: string } }) {

    const users = await getData({
        coll: "users",
        key: "username",
        value: username
    });

    const user = users[0];

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

    const softwareSkills: string[] = user?.softwareSkills ?? [];
    const specializedIn: string[] = user?.specializedIn ?? [];
    const Education = await getDataFromCollection(`users/${user.id}/Education`);
    const workExperience = await getDataFromCollection(`users/${user.id}/workExperience`);

    return (
        <div className='h-full'>
            <div className={`coverPicture h-1/3  relative`}>
                <div className="h-full w-full" style={{
                    backgroundImage: `url(${user.coverPicture})`,
                    backgroundSize: 'cover',
                    backfaceVisibility: 'hidden'
                }}>
                    <div className="h-full w-full flex items-center justify-center" style={{

                    }}>
                        <div className="flex gap-4 items-center p-4" style={{
                            background: 'rgb(255 255 255 / 10%)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                            backdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.47)',
                            borderRadius: '16px'
                        }}>
                            <div>
                                <Avatar className='w-20 h-20 border border-gray-300'>
                                    <AvatarImage src={user?.profilePicture as string} />
                                    <AvatarFallback className='text-3xl'>{user?.name[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div>
                                <h1 className='text-lg font-bold mb-3'>{user.name}</h1>
                                <div className='flex gap-4 items-end'>
                                    <Button variant={'outline'}>Follow</Button>
                                    <Link href='#'>
                                        <p>0</p>
                                        <p>Followers</p>
                                    </Link>

                                    <Link href='./questions'>
                                        <p>{userQuestions.length}</p>
                                        <p>Questions</p>
                                    </Link>

                                    <div>
                                        <MdOutlineLocationOn />
                                        <p>{user?.country}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='p-4 max-w-3xl m-auto space-y-3'>
                <div className='my-3 space-y-3'>
                    {user?.about && <p>About: {user?.about}</p>}
                    {user?.introduction && <p>Introduction: {user?.introduction}</p>}
                    <p>Role: {user?.role}</p>
                    <p>College: {user?.college}</p>
                    <p>Country: {user?.country}</p>
                </div>

                <div>
                    {!!softwareSkills.length &&
                        <div className='space-y-3'>
                            <p>Software Skills</p>
                            {softwareSkills.map((item, index) => {
                                return <Button key={index} variant="outline" type='button' className='px-2 py-1 text-xs h-6 mr-1 select-none'>{item}</Button>
                            })}
                        </div>}
                </div>

                <div>
                    {!!specializedIn.length &&
                        <div className='space-y-3'>
                            <p>Specialized in</p>
                            {specializedIn.map((item, index) => {
                                return <Button key={index} variant="outline" type='button' className='px-2 py-1 text-xs h-6 mr-1 select-none'>{item}</Button>
                            })}
                        </div>}
                </div>

                <div className='space-y-3'>
                    {!!workExperience.length &&
                        <div>
                            <p>Work experience</p>
                            {workExperience.map((data, index) => (
                                <ExperienceDetailCard key={index} data={data} />
                            ))}
                        </div>
                    }
                </div>

                <div >
                    {!!Education.length && <>
                        <p >Education</p>
                        {Education.map((data, index) => (
                            <EducationDetailCard key={index} data={data} />
                        ))}
                    </>}
                </div>

            </div>
        </div>
    )
}
