import React, { PropsWithChildren } from 'react'
import LinkNav from '@/components/user-profile/link-nav';
import UserDetailsBanner from '@/components/user-profile/user-details-banner';

interface Props extends PropsWithChildren {
    params: { username: string }
}

export default function Layout({ children, params: { username } }: Props) {

    return (
        <div className='h-full'>
            <UserDetailsBanner username={username} />
            <LinkNav username={username} />
            <div className="container max-w-3xl mx-auto p-2">
                {children}
            </div>
        </div>
    )

}
