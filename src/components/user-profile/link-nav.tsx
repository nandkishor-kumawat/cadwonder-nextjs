"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


function LinkNav({ username }: { username: string }) {
    const pathname = usePathname()

    const linkOptions = [
        {
            name: 'Profile',
            path: `/${username}`,
        },
        {
            name: 'Models',
            path: `/${username}/models`,
        },
        {
            name: 'Questions',
            path: `/${username}/questions`,
        },
    ]

    return (
        <div className='border-b border-b-slate-400'>
            <div className="container max-w-3xl mx-auto px-2">
                <div className="flex gap-6">

                    {linkOptions.map(({ name, path }) => (
                        <Link
                            key={name}
                            href={path}
                            className={`px-1 py-2 text-lg border-b-4 hover:border-b-orange-400 ${pathname === `${path}` ? 'border-b-orange-400' : 'border-b-transparent'}`}
                        >
                            {name}
                        </Link>
                    ))
                    }

                </div>
            </div>
        </div>
    )
}

export default LinkNav
