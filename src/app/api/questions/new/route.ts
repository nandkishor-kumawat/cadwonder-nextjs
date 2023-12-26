import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const docRef = await addDoc(collection(db, 'questions'), {
            ...body,
            createdAt: Date.now(),
        });
        return new Response(JSON.stringify({ id: docRef.id, ...body }), { status: 200 })
    } catch (error) {
        console.error('Error creating question:', error);

    }

}