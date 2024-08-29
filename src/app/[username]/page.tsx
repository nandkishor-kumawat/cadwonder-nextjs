import React from 'react'
import EducationDetailCard from '@/components/edit-profile/EducationDetailCard';
import ExperienceDetailCard from '@/components/edit-profile/ExperienceDetailCard';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { getUserInfo } from '@/actions';

export default async function Page({ params: { username } }: { params: { username: string } }) {

    const user = await getUserInfo(username);

    if (!user) notFound();


    const softwareSkills = user.softwareSkills;
    const specializedIn = user.specializations;
    const Education = user.educations;
    const workExperience = user.experiences;

    return (
        <div className='max-w-3xl m-auto space-y-3'>
            <div className='my-3 space-y-3'>
                {user?.about && <p>About: {user?.about}</p>}
                {user?.introduction && <p>Introduction: {user?.introduction}</p>}
                <p>Role: {user?.role}</p>
                <p>College: {user?.college}</p>
                <p>Country: {user?.country}</p>
            </div>


            {!!softwareSkills.length &&
                <div className='space-y-3'>
                    <p>Software Skills</p>
                    {softwareSkills.map((item, index) => {
                        return <Button key={index} variant="outline" type='button' className='px-2 py-1 text-xs font-normal h-6 mr-1 select-none rounded-none'>{item}</Button>
                    })}
                </div>}


            {!!specializedIn.length &&
                <div className='space-y-3'>
                    <p>Specialized in</p>
                    {specializedIn.map((item, index) => {
                        return <Button key={index} variant="outline" type='button' className='px-2 py-1 text-xs font-normal h-6 mr-1 select-none rounded-none'>{item}</Button>
                    })}
                </div>
            }


            {!!workExperience.length &&
                <div className='space-y-3'>
                    <p>Work experience</p>
                    {workExperience.map((data, index) => (
                        <ExperienceDetailCard key={index} data={data} />
                    ))}
                </div>
            }


            {!!Education.length && <>
                <div className='space-y-3'>
                    <p >Education</p>
                    {Education.map((data, index) => (
                        <EducationDetailCard key={index} data={data} />
                    ))}
                </div>
            </>}

        </div>
    )
}
