"use server"

import { validateRequest } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Answer } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";

export const postAnswer = async (data: Answer) => {

  const { user } = await validateRequest();
  if (!user) return { error: "You need to be logged in to post an answer" }

  try {
    const [answer] = await prisma.$transaction([
      prisma.answer.create({
        data: {
          ...data,
          userId: user.id,
        }
      }),
      prisma.question.update({
        where: {
          id: data.questionId
        },
        data: {
          answerCount: {
            increment: 1
          }
        }
      })
    ]);
    revalidatePath(`/questions/[slug]`, "page");
    return { answer };

  } catch (error) {
    console.error('Error creating Answer:', error);
    return { error: "Error creating Answer" };
  }
}

export const deleteAnswer = async (id: string) => {
  try {
    const { user } = await validateRequest();
    if (!user) return { message: "You need to be logged in to delete an answer", error: true };
    const answer = await prisma.answer.findUnique({
      where: {
        id
      }
    });
    if (!answer) return { message: "Answer not found", error: true }
    if (answer.userId !== user.id) return { error: "You are not authorized to delete this answer" }

    await prisma.$transaction([
      prisma.answer.delete({
        where: { id }
      }),
      prisma.question.update({
        where: {
          id: answer.questionId
        },
        data: {
          answerCount: {
            decrement: 1
          }
        }
      })
    ]);
    revalidateTag('answers');
    return { message: "Answer deleted Successfully", error: false };
  } catch (error) {
    console.error('Error deleting Answer:', error);
    return { message: "Error deleting Answer", error: true };
  }
}


export const getAnswersByQuestionId = async (questionId: string) => {
  try {
    const answers = await prisma.answer.findMany({
      where: {
        questionId
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'asc'
      },
      take: 10,
      skip: 0
    });
    if (!answers) return { error: "No answers found" };
    return { answers };
  } catch (error) {
    console.error('Error getting Answers:', error);
    return { error: "Error getting Answers" };
  }
}