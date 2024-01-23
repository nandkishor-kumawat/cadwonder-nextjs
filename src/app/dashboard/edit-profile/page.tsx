import React from 'react'
import { checkProtected } from '@/actions'
import EditProfile from '@/components/edit-profile/edit-profile'

const Page = async () => {

    await checkProtected("/dashboard/edit-profile");

    return (
        <EditProfile />
    )
}

export default Page