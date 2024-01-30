"use server"

import { db } from "@/firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { revalidateTag } from "next/cache";

export const postAnswer = async (formData: FormData) => {

  const rowData = {
    answer: formData.get('answer'),
    question_id: formData.get('question_id'),
    user_id: formData.get('user_id'),
    file_details: JSON.parse(formData.get('file_details') as string),
  };

  const docRef = await addDoc(collection(db, 'answers'), {
    ...rowData,
    createdAt: Date.now(),
  });

  revalidateTag('answers');
}

export const deleteAnswer = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'answers', id));
    // TODO: also remove Question related data
    revalidateTag('answers');
    return { message: "Answer deleted Successfully", error: false };
  } catch (error) {
    console.error('Error deleting Answer:', error);
    return { message: "Error deleting Answer", error: true };
  }
}

