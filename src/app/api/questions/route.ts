import { db } from "@/firebase";
import { getRegex } from "@/lib/functions";
import { Question } from "@prisma/client";
import { collection, getDocs, orderBy, query as que, where } from "firebase/firestore";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    const software = searchParams.get('software');

    let q = que(collection(db, 'questions'), orderBy('createdAt', 'desc'));

    const questions = [] as Question[];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        questions.push({ id: doc.id, ...doc.data() } as Question);
    });

    if (!query) {
        return new Response(JSON.stringify({ questions }), { status: 200 })
    }

    const regex = getRegex(query);
    const filteredQuestions = questions?.filter(question => {
        return regex.test(question.question)
    });

    return new Response(JSON.stringify({ questions: filteredQuestions }), { status: 200 })


}