"use client"
import { db } from '@/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { AiFillLike } from 'react-icons/ai'

const LikeButton = ({ id, user_id }: { id: string, user_id: string | undefined }) => {

    const [isLiked, setIsLiked] = React.useState(false);
    const [likes, setLikes] = React.useState(0);

    useEffect(() => {
        if (!id || !user_id) return;
        const q = collection(db, `models/${id}/likes`);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            setLikes(snapshot.docs.length);
            setIsLiked(!!snapshot.docs.map((doc) => doc.data()).find((doc: any) => doc.user_id === user_id));
        });
        return () => unsubscribe()
    }, [id, user_id]);


    return (
        <>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="user_id" value={user_id} />
            <button disabled={!user_id} className='flex items-center gap-1 py-2 rounded-md px-3 hover:bg-[#EDF2F7] active:scale-90 active:bg-[#E2E8F0] transition-all ease-out duration-300'>
                <AiFillLike className={isLiked ? 'text-red-500' : 'text-gray-500'} />
                <p>{likes}</p>
            </button>
        </>
    )
}

export default LikeButton