import React from 'react'

export default function UserProfile({ params: { user_id } }: { params: { user_id: string } }) {

  return (
    <div>UserProfile: {user_id}</div>
  )
}
