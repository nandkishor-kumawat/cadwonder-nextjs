import { getAnswersByQuestionId } from '@/actions';
import React from 'react'
import AnswerItem from './answer-item';
import { Answer } from '@prisma/client';

export default async function AnswerList({ question_id }: { question_id: string }) {
    const { answers, error } = await getAnswersByQuestionId(question_id);
    return (
        answers ? (
            answers.map((answer: any) => (
                <AnswerItem key={answer.id} answer={answer} />
            ))
        ) : null
    )
}
