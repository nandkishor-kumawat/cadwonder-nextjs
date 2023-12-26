import React from 'react'
import QuestionCard from './QuestionCard'
import { Question } from '@/lib/types/types'

export default function Questions({questions}:{questions: Question[]}) {
  

  return (
    questions.map((question, index) => <QuestionCard question={question} key={index} />)
  )
}
