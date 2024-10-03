import { answerActions } from '@/actions';
import React from 'react'
import AnswerItem from './answer-item';
import { Answer } from '@prisma/client';

export default async function AnswerList({ question_id }: { question_id: string }) {
    const { answers, error } = await answerActions.getAnswersByQuestionId(question_id);
    return (
        answers?.map((answer: any) => (
            <AnswerItem key={answer.id} answer={answer} />
        ))
    )
}
