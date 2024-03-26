import React from 'react'
import Questions from './questions'

export default async function QuestionList({ queryString }: { queryString: string }) {
    const { questions } = await fetch(`${process.env.API_URL}/api/questions?${queryString}`, { cache: 'no-store' }).then(res => res.json())

    return (
        <Questions questions={questions} />
    )
}
