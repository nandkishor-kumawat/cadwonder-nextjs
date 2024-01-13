import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const docRef = await addDoc(collection(db, 'models'), {
            ...body,
            createdAt: Date.now(),
        });
        return NextResponse.json(({ id: docRef.id, ...body }), { status: 200 })
    } catch (error) {
        console.error('Error creating question:', error);

    }

}