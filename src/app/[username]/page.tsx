import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Page({ params: { username } }: { params: { username: string } }) {
    const user = fetch(`http://localhost:3001/api/users/${username}`).then(res => res.json());
    return (
        <div>
            <div className='relative py-6 bg-cover bg-center'
                style={{
                    // backgroundImage: url(),
                }}
            >

            </div>
        </div>
    )
}
