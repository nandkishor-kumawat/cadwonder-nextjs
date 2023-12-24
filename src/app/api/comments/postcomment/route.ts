import { auth, db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { comment, commentTo,user_id } = await request.json();

    if (!comment || !commentTo || !user_id) {
        return NextResponse.json({ message: 'Email and password are required' });
    }

    try {
        const docRef = await addDoc(collection(db, 'comments'), {
            comment,
            commentTo,
            user_id,
            createdAt: Date.now(),
          });
    } catch (error: any) {
        // if (error.code === 'auth/user-not-found') {
        //     return NextResponse.json({ error: 'User not found' });
        // }
        // if (error.code === 'auth/wrong-password') {
        //     return NextResponse.json({ error: 'Wrong password' });
        // }
        return NextResponse.json({ error: 'Invalid credentials' });
    }

}

