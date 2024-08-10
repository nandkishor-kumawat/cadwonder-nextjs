"use server"

import { db } from "@/firebase"
import { Education, Experience } from "@/types/types"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addExperience = async (experience: Experience, user: any) => {

    const { id, ...rest } = experience;

    if (id) {
        const docRef = doc(db, `users/${user?.uid}/workExperience`, id)
        await updateDoc(docRef, rest);
        return experience
    }

    const docRef = await addDoc(collection(db, `users/${user?.uid}/workExperience`), experience)
    return {
        id: docRef.id,
        ...experience

    }
}

export const deleteExperience = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const user_id = formData.get("user_id");
    const docRef = doc(db, `users/${user_id}/workExperience`, id);
    await deleteDoc(docRef);
}

export const addEducation = async (education: Education, user: any) => {

    const { id, ...rest } = education;

    if (id) {
        const docRef = doc(db, `users/${user?.id}/Education`, id)
        await updateDoc(docRef, rest)
        return education;
    }
    const docRef = await addDoc(collection(db, `users/${user?.id}/Education`), education)
    return {
        id: docRef.id,
        ...education
    }
}

export const deleteEducation = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const user_id = formData.get("user_id");
    const docRef = doc(db, `users/${user_id}/Education`, id);
    await deleteDoc(docRef);
}

export const updateProfile = async (data: any, user_id: string) => {
    const docRef = doc(db, `users/${user_id}`);
    await updateDoc(docRef, data);
    revalidatePath("/dashboard");
    redirect("/dashboard");
    return data;
}