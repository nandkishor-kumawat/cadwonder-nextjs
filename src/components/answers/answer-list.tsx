import { getAnswersByQuestionId } from '@/actions';
import React from 'react'
import AnswerItem from './answer-item';
import { Answer } from '@/lib/types/types';

export default async function AnswerList({ question_id }: { question_id: string }) {
    const [answers, error] = await getAnswersByQuestionId(question_id) as [Answer[], any];
    return (
        answers ? (
            answers.map((answer: any) => (
                <AnswerItem key={answer.id} answer={answer} />
            ))
        ) : null
    )
}
