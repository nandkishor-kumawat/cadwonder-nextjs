"use client"
import SearchBar from '@/components/form/SearchBar';
import QuestionCard from '@/components/questions/QuestionCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react'

function QuestionList() {
  const [allQuestions, setAllQuestions] = React.useState([]);
  React.useEffect(() => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        let d = []
        snapshot.forEach((doc) => {
            d.push({ id: doc.id, ...doc.data() })
        })
        setAllQuestions(d);
    });
    return () => unsubscribe()
}, []);

  return (
    <div className="container max-w-3xl mx-auto px-2">
      <Link href={'/questions/new'}>
        <Button className="text-lg my-4 bg-orange-400 hover:bg-orange-500">New Question</Button>
      </Link>

      <SearchBar />

      {
        allQuestions.map((question, index) => <QuestionCard question={question} key={index} />)
      }

    </div>
  )
}

export default QuestionList