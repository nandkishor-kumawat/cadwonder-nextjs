import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { color1, color2 } from '@/lib/data/colors';
import Link from 'next/link';
import { getFollowers, getUser } from '@/lib/functions';
import type { InferGetStaticPropsType, GetStaticProps } from 'next'

const QuestionCard = ({ question: data }) => {

    const {
        id,
        question,
        answer_count,
        views,
        user_id,
        tags,
        category,
        slug
    } = data;



    const [followers, setFollowers] = React.useState([]);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        if (data) {
            getUser(user_id).then(user => {
                setUser(user)
            })
        }
    }, [])

    React.useEffect(() => {
        if (data) {
            getFollowers(user_id, setFollowers)
        }
    }, [])

    return (
        <Card className='my-2 py-2' style={{ backgroundColor: color2 }}>
            <CardContent className='flex p-2 gap-3'>
                <div className="flex items-center justify-center gap-3 p-2">
                    <div className="flex flex-col items-center">
                        <p className='sm:text-base text-sm' style={{ color: color1 }}>{answer_count}</p>
                        <p className='sm:text-base text-sm'>Answers</p>
                    </div>
                    <div className="hidden flex-col items-center md:flex">
                        <p  className='sm:text-base text-sm' style={{ color: color1 }}>{views}</p>
                        <p className='sm:text-base text-sm'>Views</p>
                    </div>
                    <div className="hidden flex-col items-center sm:flex">
                        <p className='sm:text-base text-sm' style={{ color: color1 }}>{followers.length}</p>
                        <p className='sm:text-base text-sm'>Followers</p>
                    </div>
                </div>

                <div className="flex flex-1">
                    <div className='flex flex-col flex-1'>
                        <Link href={`/questions/${slug}`}>
                            <h2 className='sm:text-xl font-bold text-lg'>{question}</h2>
                        </Link>
                        <p className='pt-1'>By
                            <Link href={`/${user?.username}`} > <span className='text-orange-500'>{user?.name}</span></Link>
                        </p>
                        <p className='sm:text-base text-sm'>Category: {category}</p>
                        <p className='sm:text-base text-sm'>Tags: {tags.join(',')}</p>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}

export default QuestionCard
