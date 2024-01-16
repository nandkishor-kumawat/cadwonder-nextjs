"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useSession } from 'next-auth/react'
import { getData } from '@/lib/functions'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import Link from 'next/link'

interface Props {
    following_id: string
}

const FollowButton = ({ following_id }: Props) => {
    const { data, status } = useSession();

    const user_id = data?.user?.id as string;
    const [followers, setFollowers] = useState<any[]>([]);

    const isSameUser = user_id === following_id;
    const isFollowing = followers.find((follower: any) => follower.follower_id === user_id);

    useEffect(() => {
        const q = query(collection(db, "followers"), where("following_id", "==", following_id));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const followers: any[] = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setFollowers(followers);
        });

        return () => unsubscribe()
    }, [following_id]);


    const doFollowUnfollow = useCallback(async () => {
        if (!isFollowing) {
            await addDoc(collection(db, "followers"), {
                follower_id: user_id,
                following_id
            });
        } else {
            const docRef = doc(db, "followers", isFollowing.id);
            await deleteDoc(docRef);
        }
    }, [isFollowing, user_id, following_id]);


    const unVisible = isSameUser || status === 'loading' || status === 'unauthenticated';

    return (
        <>
            {!unVisible && <Button onClick={doFollowUnfollow} variant={'outline'}>{isFollowing ? 'Unfollow' : 'Follow'}</Button>}
            <Link href='#' className='text-center'>
                <p>{followers.length}</p>
                <p>Followers</p>
            </Link>
        </>
    )
}

export default FollowButton