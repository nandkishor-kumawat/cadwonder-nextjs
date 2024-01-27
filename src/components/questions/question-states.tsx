"use client"
import { db } from '@/firebase'
import { color1 } from '@/lib/data/colors'
import { Question } from '@/lib/types/types'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { FaEye, FaUser } from 'react-icons/fa'
import { SiAnswer } from "react-icons/si";

interface Props {
    question: Question
    ext?: boolean
}

const QuestionStates = ({
    question,
    ext
}: Props) => {

    const [follower_count, setFollowerCount] = React.useState(0);
    const [answer_count, setAnswerCount] = React.useState(0);
    const [views, setViews] = React.useState(0);

    useEffect(() => {
        if (!question || !question.id || !question.user_id) return;

        const q1 = query(collection(db, `answers`), where("question_id", "==", question.id));
        const unsubscribe1 = onSnapshot(q1, (snapshot) => {
            setAnswerCount(snapshot.docs.length);
        });

        const q2 = query(collection(db, `followers`), where("following_id", "==", question.user_id));
        const unsubscribe2 = onSnapshot(q2, (snapshot) => {
            setFollowerCount(snapshot.docs.length);
        });

        const docRef = doc(db, "questions", question.id);
        const unsubscribe3 = onSnapshot(docRef,
            { includeMetadataChanges: true },
            (doc) => {
                if (doc.exists()) {
                    setViews(doc.data().views ?? 0);
                }
            });


        return () => {
            unsubscribe1()
            unsubscribe2()
            unsubscribe3()
        }
    }, [question]);



    if (ext) {
        return (
            <div className="flex items-center gap-1 bg-gray-300">
                <div className="text-center px-4 py-2 flex-1">
                    <p className='sm:text-base text-sm text-blue-400'>{answer_count ?? 0}</p>
                    <p className='sm:text-base text-sm'>Answers</p>
                </div>
                <div className="text-center px-4 py-2 flex-1">
                    <p className='sm:text-base text-sm text-blue-400'>{follower_count ?? 0}</p>
                    <p className='sm:text-base text-sm'>Followers</p>
                </div>
                <div className="text-center px-4 py-2 flex-1">
                    <p className='sm:text-base text-sm text-blue-400'>{views}</p>
                    <p className='sm:text-base text-sm'>Views</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-2 ml-1'>
            <div className='flex items-center gap-1 rounded-md' title='views'>
                <FaEye />
                {/* <p className='sm:block hidden'>views</p> */}
                <p>{views}</p>
            </div>
            <div className='flex items-center gap-1 rounded-md' title='Answers'>
                {/* <BiCommentDetail /> */}
                <SiAnswer />
                {/* <p className='sm:block hidden'>Answers</p> */}
                <p>{answer_count}</p>
            </div>
            <div className='flex items-center gap-1 rounded-md' title='Followers'>
                <FaUser />
                {/* <p className='sm:block hidden'>Answers</p> */}
                <p>{follower_count}</p>
            </div>
        </div>
    )
}

export default QuestionStates