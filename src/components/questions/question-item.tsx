import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { color2 } from '@/lib/data/colors';
import Link from 'next/link';
import { getData, getUser } from '@/lib/functions';
import QuestionStates from './question-states';


const QuestionCard = async ({ question: data }: any) => {

    const {
        id,
        question,
        views,
        user_id,
        tags,
        category,
        slug
    } = data;


    const user = await getUser(user_id);

    const answers = await getData({
        coll: "answers",
        key: "question_id",
        value: id
    });

    const answer_count = answers.length;

    return (
        <Card className='my-2 py-2' style={{ backgroundColor: color2 }}>
            <CardContent className='flex p-2 gap-3'>

                <QuestionStates question_id={id} user_id={user_id} />

                <div className="flex flex-1">
                    <div className='flex flex-col flex-1'>
                        <Link href={`/questions/${slug}`}>
                            <h2 className='sm:text-xl font-bold text-lg'>{question.length > 50 ? question.slice(0, 50) + '...' : question}</h2>
                        </Link>
                        <p className='pt-1'>By
                            <Link href={`/${user?.username}`} > <span className='text-orange-500'>{user?.name}</span></Link>
                        </p>
                        <p className='sm:text-base text-sm'>Category: {category}</p>
                        {!!tags.length && <p className='sm:text-base text-sm'>Tags: {tags.join(', ')}</p>}
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default QuestionCard
