import React from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { color2 } from '@/data/colors';
import Link from 'next/link';
import { getData, getUser } from '@/lib/functions';
import QuestionStates from './question-states';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


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
            <CardContent className='flex px-5 py-2 gap-3'>
                <div className="flex flex-1">
                    <div className='flex flex-col flex-1 gap-1'>
                        <Link href={`/questions/${slug}`}>
                            <h2 className='sm:text-xl font-semibold text-lg text-justify break-all' title={question}>
                                {question.length > 150 ? question.slice(0, 150) + '...' : question}
                            </h2>
                        </Link>
                        <div className='pt-1 flex gap-1 items-center'>
                            <p>By</p>
                            <Link href={`/${user?.username}`} className="flex gap-1 items-center">
                                <Avatar className='h-5 w-5 border border-gray-300'>
                                    <AvatarImage src={user?.profilePicture as string} />
                                    <AvatarFallback className='text-xs'>{user?.name[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <p className='text-orange-500'>{user?.name}</p>
                            </Link>

                        </div>
                        <p className='sm:text-base text-sm'>Category: <span className='text-gray-400'>{category}</span></p>
                        {!!tags.length && <p className='sm:text-base text-sm'>Tags: {tags.join(', ')}</p>}
                    </div>
                </div>
                <QuestionStates question={data} />

            </CardContent>
        </Card>
    )
}

export default QuestionCard
