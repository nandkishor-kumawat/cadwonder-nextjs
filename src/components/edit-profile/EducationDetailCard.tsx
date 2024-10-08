import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { color2 } from '@/data/colors'
import { Education } from '@prisma/client'
import EducationFormModal from './EducationFormModal'

interface EducationDetailCardProps {
    data: Education
    edit?: boolean
}

export default function EducationDetailCard({ data, edit }: EducationDetailCardProps) {

    return (
        <Card className='my-2 p-4' style={{ backgroundColor: color2 }}>
            <CardHeader className='border-b p-0 px-2 flex-row items-center justify-between'>
                <CardTitle className='text-lg'>{data.school}</CardTitle>
                {edit && <EducationFormModal data={data} key={data.id} />}
            </CardHeader>

            <CardContent className='flex flex-col p-2 gap-1 text-sm'>
                <div className='flex gap-2'>
                    <p>{data.degree}, </p>
                    <p>{data.field}: {data.startYear} - {data.endYear}</p>
                </div>
                <div>
                    <p className='text-xs'>{data.description}</p>
                </div>

            </CardContent>
        </Card>
    )
}

