import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { color2 } from '@/data/colors'
import { Experience } from '@prisma/client'
import ExperienceFormModal from './ExperienceFormModal'

interface ExperienceDetailCardProps {
    data: Experience
    edit?: boolean
}

export default function ExperienceDetailCard({ data, edit }: ExperienceDetailCardProps) {
    return (
        <Card className='my-2 p-4' style={{ backgroundColor: color2 }}>
            <CardHeader className='border-b p-0 px-2 flex-row items-center justify-between'>
                <CardTitle className='text-lg'>{data.position}</CardTitle>
                {edit && <ExperienceFormModal data={data} key={data.id} />}
            </CardHeader>

            <CardContent className='flex flex-col p-2 gap-1 text-sm'>
                <div className='flex gap-2'>
                    <p>{data.company}:</p>
                    <p>{data.startMonth} {data.startYear} - {data.endMonth} {data.endYear}</p>
                </div>
                <div>
                    <p className='text-xs'>{data.description}</p>
                </div>

            </CardContent>
        </Card>
    )
}
