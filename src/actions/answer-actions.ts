"use server"

import { db } from "@/firebase";
import { getData, getUser } from "@/lib/functions";
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


export const getAnswersByQuestionId = async (questionId: string) => {
  try {
    const ans = await getData({
      coll: "answers",
      key: "question_id",
      value: questionId,
      order: "asc"
    });

    const answers = await Promise.all(ans.map(async answer => {
      const user = await getUser(answer.user_id as string);
      return {
        ...answer,
        user: {
          username: user?.username,
          profilePicture: user?.profilePicture,
          name: user?.name,
          id: user?.id
        }
      };
    }));

    return [answers, null]
  } catch (error) {
    return [null, error]
  }
}