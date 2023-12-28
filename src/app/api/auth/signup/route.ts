import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  doc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const {
        name,
        email,
        password,
        country,
        college,
        role
    } = await request.json();


    if (!name || !email || !password || !country || !role) {
        return NextResponse.json({ error: 'Email, password and name are required' });
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;

        const userDetails = {
            uid: user.uid,
            name,
            email,
            country,
            college,
            role,
            createdAt: new Date().toISOString(),
        }

        // await addDoc(collection(db, "users"), userDetails);
        await setDoc(doc(db, "users", user.uid), userDetails);


        return NextResponse.json({
            message: "User created successfully",
            user: userDetails,
        });

    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            return NextResponse.json({ error: 'Email already exists, try to login' });
        }
        NextResponse.json({ error: error.message });
    }
}

