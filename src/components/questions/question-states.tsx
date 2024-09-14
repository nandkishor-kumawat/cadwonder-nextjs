"use client"
import { Question } from '@prisma/client'
import React from 'react'
import { FaEye, FaRupeeSign } from 'react-icons/fa'
import { SiAnswer } from "react-icons/si";

interface Props {
    question: Question
    ext?: boolean
}

const QuestionStates = ({
    question,
    ext
}: Props) => {


    if (ext) {
        return (
            <div className="flex items-center gap-1 bg-gray-300">
                <div className="text-center px-4 py-2 flex-1">
                    <p className='sm:text-base text-sm text-blue-400'>{question.price}</p>
                    <p className='sm:text-base text-sm'>Price</p>
                </div>
                <div className="text-center px-4 py-2 flex-1">
                    <p className='sm:text-base text-sm text-blue-400'>{question.answerCount ?? 0}</p>
                    <p className='sm:text-base text-sm'>Answers</p>
                </div>
                <div className="text-center px-4 py-2 flex-1">
                    <p className='sm:text-base text-sm text-blue-400'>{question.views}</p>
                    <p className='sm:text-base text-sm'>Views</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-2 ml-1'>
            <div className='flex-center gap-0.5 text-green-600' title='Price'>
                <FaRupeeSign />
                <p className='sr-only'>Price</p>
                <p>{question.price}</p>
            </div>
            <div className='flex-center gap-1' title='views'>
                <FaEye />
                <p className='sr-only'>views</p>
                <p>{question.views}</p>
            </div>
            <div className='flex-center gap-1' title='Answers'>
                <SiAnswer />
                <p className='sr-only'>Answers</p>
                <p>{question.answerCount}</p>
            </div>
        </div>
    )
}

export default QuestionStates