import { color2 } from '@/data/colors'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { User } from '@prisma/client'

export default function UserCard({ user }: { user: User }) {

    return (
        <Card className='my-1 py-2 px-4 rounded-sm' style={{ backgroundColor: color2 }}>
            <Link href={`/${user.username}`}>
                <CardHeader className='border-b py-1 px-2 flex-row items-center justify-between'>
                    <CardTitle className='text-lg'>{user.name}</CardTitle>
                </CardHeader>

                <CardContent className='flex flex-col p-2 gap-1 text-sm'>
                    <div className='flex gap-2'>
                        <p>{user.role}</p>
                    </div>
                    <div>
                        <p className='text-xs'>{user.country}</p>
                    </div>

                </CardContent>
            </Link>
        </Card>
    )
}
