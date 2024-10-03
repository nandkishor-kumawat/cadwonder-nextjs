import { getAuth } from '@/lib/auth';
import React from 'react'

const page = async () => {
    const { user } = await getAuth();
    if (!user) return <div>You are not authorized to view this page</div>;
    return (
        <div>
            <h1>Hello, {user.name}!</h1>
        </div>
    )
}

export default page
