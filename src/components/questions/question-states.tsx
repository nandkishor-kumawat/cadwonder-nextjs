"use client"
import { db } from '@/firebase'
import { color1 } from '@/lib/data/colors'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'

interface Props {
    question_id: string
    user_id: string
}

const QuestionStates = ({
    question_id,
    user_id
}: Props) => {

    const [follower_count, setFollowerCount] = React.useState(0);
    const [answer_count, setAnswerCount] = React.useState(0);

    useEffect(() => {
        if (!question_id) return;
        const q = query(collection(db, `answers`), where("question_id", "==", question_id));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setAnswerCount(snapshot.docs.length);
        });
        return () => unsubscribe()
    }, [question_id]);

    useEffect(() => {
        if (!user_id) return;
        const q = query(collection(db, `followers`), where("following", "==", user_id));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setFollowerCount(snapshot.docs.length);
        });
        return () => unsubscribe()
    }, [user_id]);


    return (
        <div className="flex items-center justify-center gap-3 p-2">
            <div className="flex flex-col items-center">
                <p className='sm:text-base text-sm' style={{ color: color1 }}>{answer_count ?? 0}</p>
                <p className='sm:text-base text-sm'>Answers</p>
            </div>
            <div className="hidden flex-col items-center md:flex">
                <p className='sm:text-base text-sm' style={{ color: color1 }}>{0}</p>
                <p className='sm:text-base text-sm'>Views</p>
            </div>
            <div className="hidden flex-col items-center sm:flex">
                <p className='sm:text-base text-sm' style={{ color: color1 }}>{follower_count}</p>
                <p className='sm:text-base text-sm'>Followers</p>
            </div>
        </div>
    )
}

export default QuestionStates