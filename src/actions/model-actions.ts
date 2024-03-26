"use server"
import { revalidatePath } from "next/cache"

import { db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Model } from "@/lib/types/types";
import { getData, getUser } from "@/lib/functions";

export const postModel = async (body: Omit<Model, "id">) => {
    try {
        const docRef = await addDoc(collection(db, 'models'), {
            ...body,
            createdAt: Date.now(),
        });
        revalidatePath('/library')
        return { id: docRef.id, ...body, error: null };
    } catch (error) {
        console.error('Error creating Model:', error);
        return { error: "Error creating Model" }
    }
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


export const getModelBySlug = async (slug: string) => {
    try {
        const [model] = await getData({
            coll: "models",
            key: "slug",
            value: slug
        })
        if (!model) throw new Error("Model not found")

        const user = await getUser(model.user_id as string) as {
            username: string;
            profilePicture: string;
            name: string;
            id: string
        };

        const data = {
            ...model,
            user: {
                username: user?.username,
                profilePicture: user?.profilePicture,
                name: user?.name,
                id: user?.id
            }
        }
        return [data, null]
    } catch (error) {
        console.error('Error getting Model:', error);
        return [null, error]
    }
}