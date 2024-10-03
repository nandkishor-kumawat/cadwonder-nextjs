"use server"

import { getAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const postComment = async (formData: FormData) => {
  const { user } = await getAuth();
  console.log(user)
  if (!user) return { error: "You need to be logged in to post a comment" }

  const rowData = {
    comment: formData.get('comment') as string,
    associationId: formData.get('association_id') as string,
    userId: formData.get('user_id') as string,
  };

  try {
    const comment = await prisma.comment.create({
      data: {
        ...rowData,
      }
    });
    revalidateTag(`/questions`);
    return { comment };

  } catch (error) {
    console.error('Error creating Comment:', error);
    return { error: "Error creating Comment" };
  }
}


export const getCommentsByAssociationId = async (associationId: string) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        associationId
      },
      include: {
        user: {
          select: {
            name: true,
            profilePicture: true,
            username: true
          }
        }
      },
      take: 10,
      skip: 0,
    });
    return { comments };

  } catch (error) {
    console.error('Error getting Comments:', error);
    return { error: "Error getting Comments" };
  }
}
