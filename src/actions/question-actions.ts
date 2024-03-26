"use server"

import { db } from "@/firebase";
import { getData, getRegex, getUser } from "@/lib/functions";
import { Question } from "@/lib/types/types";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
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


export const getQuestionBySlug = async (slug: string) => {
  try {
    const [question] = await getData({
      coll: "questions",
      key: "slug",
      value: slug
    })
    if (!question) throw new Error("Question not found")

    const user = await getUser(question.user_id as string) as {
      username: string;
      profilePicture: string;
      name: string;
      id: string
    };

    const data = {
      ...question, user: {
        username: user?.username,
        profilePicture: user?.profilePicture,
        name: user?.name,
        id: user?.id
      }
    }
    return [data, null]
  } catch (error) {
    console.error('Error getting Question:', error);
    return [null, error]
  }
}

export const getQuestions = async (queryString: string) => {
  try {
    let q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
    const searchParams = new URLSearchParams(queryString);
    const que = searchParams.get('query');
    const category = searchParams.get('category');
    const software = searchParams.get('software');

    const querySnapshot = await getDocs(q);
    const questions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Question[];
    if (!que) return questions;

    const regex = getRegex(que);
    const filteredQuestions = questions?.filter(question => regex.test(question.question));

    return filteredQuestions
  } catch (error) {
    console.error('Error getting Questions:', error);
    return [];
  }
}