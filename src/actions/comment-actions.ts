"use server"

import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { revalidateTag } from "next/cache";

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
