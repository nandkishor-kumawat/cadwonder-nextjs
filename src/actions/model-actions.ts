"use server"
import { revalidatePath } from "next/cache"

import { db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { Model } from "@/lib/types/types";
import { getData, getRegex, getUser } from "@/lib/functions";

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

export const getModels = async (queryString: string) => {
    try {
        let q = query(collection(db, 'models'), orderBy('createdAt', 'desc'));
        const searchParams = new URLSearchParams(queryString);
        const que = searchParams.get('query');
        const category = searchParams.get('category');
        const software = searchParams.get('software');

        const querySnapshot = await getDocs(q);
        const models = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Model[];
        if (!que) return models;

        const regex = getRegex(que);
        const filteredModels = models?.filter(model => regex.test(model.modelName));

        return filteredModels
    } catch (error) {
        console.error('Error getting Questions:', error);
        return []
    }
}