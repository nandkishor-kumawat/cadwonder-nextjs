import React from 'react'
import QuestionCard from './question-item'
import { Question } from '@/lib/types/types'

export default function Questions({ questions }: { questions: Question[] }) {
  // let a = questions.map(q => q.createdAt) as number[];
  return (
    <div className='pb-2'>
      {questions.length === 0 && <p className="text-center text-gray-500">No questions found</p>}
      {questions.map((question, index) => <QuestionCard question={question} key={question.id} />)}
    </div>
  )
}
