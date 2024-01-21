"use server"

import { db } from "@/firebase";
import { Question } from "@/lib/types/types";
import { addDoc, collection } from "firebase/firestore";
import { revalidatePath, revalidateTag } from "next/cache";

export const postComment = async (formData: FormData) => {

  const rowData = {
    comment: formData.get('comment'),
    association_id: formData.get('association_id'),
    user_id: formData.get('user_id')
  };

  const docRef = await addDoc(collection(db, 'comments'), {
    ...rowData,
    createdAt: Date.now(),
  });

  revalidateTag(`/questions`);
}

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

  revalidatePath('/questions', 'page');
}


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
