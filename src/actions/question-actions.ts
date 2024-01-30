"use server"

import { db } from "@/firebase";
import { Question } from "@/lib/types/types";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { revalidatePath, revalidateTag } from "next/cache";


export const postQuestion = async (body: Omit<Question, "id">) => {
  try {
    const docRef = await addDoc(collection(db, 'questions'), {
      ...body,
      createdAt: Date.now(),
    });
    revalidatePath('/questions')
    return { id: docRef.id, ...body, error: null };
  } catch (error) {
    console.error('Error creating Question:', error);
    return { error: "Error creating Question" }
  }
}

export const deleteQuestion = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'questions', id));
    // TODO: also remove Question related data
    revalidatePath('/questions');
    revalidatePath('/');
    return { error: false, message: "Question deleted Successfully" };
  } catch (error) {
    console.error('Error deleting Question:', error);
    return { message: "Error deleting Question", error: true };
  }
}