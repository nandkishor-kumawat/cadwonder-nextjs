"use server"

import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { revalidateTag } from "next/cache";

export const postComment = async (formData: FormData) => {

  const rowData = {
    comment: formData.get('comment'),
    association: formData.get('association'),
    user_id: formData.get('user_id')
  };

  const docRef = await addDoc(collection(db, 'comments'), {
    ...rowData,
    createdAt: Date.now(),
  });

  console.log(docRef.id)
  revalidateTag(`/questions`);
}

export const postAnswer = async (formData: FormData) => {

  const rowData = {
    answer: formData.get('answer'),
    question_id: formData.get('question_id'),
    user_id: formData.get('user_id')
  };
  const slug = formData.get('slug')

  const docRef = await addDoc(collection(db, 'answers'), {
    ...rowData,
    createdAt: Date.now(),
  });

  console.log(rowData)
  revalidateTag(`/questions/${slug}`);
}
