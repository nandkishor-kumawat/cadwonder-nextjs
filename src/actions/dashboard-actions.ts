"use server"

import { Education, Experience } from "@prisma/client"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const addExperience = async (experience: Experience, user: any) => {
    //TODO
    const { id, ...rest } = experience;

    // if (id) {
    //     const docRef = doc(db, `users/${user?.uid}/workExperience`, id)
    //     await updateDoc(docRef, rest);
    //     return experience
    // }

    // const docRef = await addDoc(collection(db, `users/${user?.uid}/workExperience`), experience)
    // return {
    //     ...experience,
    //     id: docRef.id,

    // }
}

export const deleteExperience = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const user_id = formData.get("user_id");
    //TODO
    // const docRef = doc(db, `users/${user_id}/workExperience`, id);
    // await deleteDoc(docRef);
}

export const addEducation = async (education: Education, user: any) => {

    const { id, ...rest } = education;
    //TODO

    // if (id) {
    //     const docRef = doc(db, `users/${user?.id}/Education`, id)
    //     await updateDoc(docRef, rest)
    //     return education;
    // }
    // const docRef = await addDoc(collection(db, `users/${user?.id}/Education`), education)
    // return {
    //     ...education,
    //     id: docRef.id,
    // }
}

export const deleteEducation = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const user_id = formData.get("user_id");
    //TODO
    // const docRef = doc(db, `users/${user_id}/Education`, id);
    // await deleteDoc(docRef);
}

export const updateProfile = async (data: any, user_id: string) => {
    //TODO

    // const docRef = doc(db, `users/${user_id}`);
    // await updateDoc(docRef, data);
    // revalidatePath("/dashboard");
    // redirect("/dashboard");
}
