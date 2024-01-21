"use server"
import { revalidatePath } from "next/cache"

import { db } from "@/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const postModel = async (path:string) => {
    revalidatePath(path)
}

export const likeModel = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const user_id = formData.get("user_id") as string;
    const docRef = doc(db, `models/${id}/likes`, user_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        await deleteDoc(docRef);
    } else {
        await setDoc(docRef, {
            user_id: user_id,
            createdAt: Date.now(),
        })
    }
}