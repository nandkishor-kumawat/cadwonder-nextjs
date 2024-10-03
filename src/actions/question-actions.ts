"use server"

import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Files, Question } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cache } from "react";

interface QuestionBody extends Question {
  fileDetails: Files[]
}

export const postQuestion = async (body: QuestionBody) => {
  const { user } = await getAuth();

  if (!user) return { error: "You need to be logged in to post a question" }
  try {
    const { fileDetails, ...questionBody } = body;
    const question = await prisma.question.create({
      data: {
        ...questionBody,
        userId: user.id,
      }
    });

    if (fileDetails.length) {
      await prisma.files.createMany({
        data: fileDetails.map((file) => ({
          ...file,
          questionId: question.id
        }))
      })
    }

    revalidatePath('/questions')
    return { question };
  } catch (error) {
    console.error('Error creating Question:', error);
    return { error: "Error creating Question" }
  }
}

export const deleteQuestion = async (questionId: string) => {
  try {
    const { user } = await getAuth();
    if (!user) return { error: "You need to be logged in to delete a question" }
    const question = await prisma.question.findUnique({
      where: {
        id: questionId
      }
    })
    if (!question) return { error: "Question not found" }
    if (question.userId !== user.id) return { error: "You are not authorized to delete this question" }
    await prisma.question.delete({
      where: {
        id: questionId
      }
    })

    revalidatePath('/questions');
    revalidatePath('/');
    return { message: "Question deleted Successfully" };
  } catch (error) {
    console.error('Error deleting Question:', error);
    return { error: "Error deleting Question" };
  }
}

export const getQuestionBySlug = cache(async (slug: string) => {
  const { user } = await getAuth();
  try {
    const question = await prisma.question.findFirst({
      where: {
        slug
      },
      include: {
        user: {
          select: {
            username: true,
            profilePicture: true,
            name: true,
            id: true
          }
        },
        fileDetails: true
      }
    })
    if (!question) throw new Error('Question not found')
    return { question }
  } catch (error) {
    console.error('Error getting Question:', error);
    return { error }
  }
})

export const getQuestions = async (queryString: string) => {
  try {
    const searchParams = new URLSearchParams(queryString);
    const que = searchParams.get('query');
    const category = searchParams.get('category');
    const software = searchParams.get('software');
    const userId = searchParams.get('userId');

    const questions = await prisma.question.findMany({
      where: {
        AND: [
          que ? {
            OR: [
              { question: { contains: que, mode: 'insensitive' } },
              { description: { contains: que, mode: 'insensitive' } }
            ]
          } : {},
          category ? { category } : {},
          software ? { software } : {},
          userId ? { userId } : {}
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            username: true,
            profilePicture: true,
            name: true,
            id: true
          }
        },
        fileDetails: true
      },
      take: 10,
      skip: 0,
    })



    return questions
  } catch (error) {
    console.error('Error getting Questions:', error);
    return [];
  }
}

export const isQuestionUnlocked = cache(async (questionId: string) => {
  const { user } = await getAuth();
  if (!user) return false;
  const transaction = await prisma.transaction.findFirst({
    where: {
      questionId,
      userId: user.id,
      status: 'SUCCESS'
    }
  })
  return !!transaction;
})