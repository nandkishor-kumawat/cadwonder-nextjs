"use server"
import { revalidatePath } from "next/cache"

import { Files, Model } from "@prisma/client";
import prisma from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import { cache } from "react";

export const postModel = async (body: Model & { fileDetails: Files[] }) => {
	const { user } = await validateRequest();
	if (!user) return { error: "You need to be logged in to post a model" }
	if (body.userId !== user.id) return { error: "You are not authorized to post this model" }
	try {
		const { fileDetails, ...modelBody } = body;
		const model = await prisma.model.create({
			data: {
				...modelBody,
				userId: user.id,

			}
		});
		// TODO: update model id in fileDetails
		revalidatePath('/library')
		return { model };
	} catch (error) {
		console.error('Error creating Model:', error);
		return { error: "Error creating Model" }
	}
}

export const likeModel = async (formData: FormData) => {
	const { user } = await validateRequest();
	if (!user) return { error: "You need to be logged in to like a model" }
	const modelId = formData.get('id') as string;
	const userId = formData.get('user_id') as string;
	if (!modelId || !userId) return { error: "Invalid Request" }
	try {
		const isLiked = await isModelLiked(modelId, user.id);
		if (isLiked) {
			await prisma.$transaction([
				prisma.likes.delete({
					where: {
						userId_referenceId: {
							userId: user.id,
							referenceId: modelId
						}
					}
				}),
				prisma.model.update({
					where: {
						id: modelId
					},
					data: {
						likesCount: {
							decrement: 1
						}
					}
				})
			])
		} else {
			await prisma.$transaction([
				prisma.likes.create({
					data: {
						referenceId: modelId,
						userId: user.id
					}
				}),
				prisma.model.update({
					where: {
						id: modelId
					},
					data: {
						likesCount: {
							increment: 1
						}
					}
				})
			])
		}
		revalidatePath(`/library`, 'page')
	} catch (error) {
		console.error('Error liking Model:', error);
		return { error: "Error liking Model" }
	}
}

export const isModelLiked = async (modelId: string, userId?: string) => {
	if (!userId) return false;
	const like = await prisma.likes.findFirst({
		where: {
			referenceId: modelId,
			userId
		}
	})
	return !!like;
}

export const getModelBySlug = cache(async (slug: string) => {
	try {
		const model = await prisma.model.findFirst({
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
		if (!model) throw new Error('Model not found')
		return { model }
	} catch (error) {
		console.error('Error getting Model:', error);
		return { error }
	}
})

export const getModels = async (queryString: string) => {
	try {
		const searchParams = new URLSearchParams(queryString);
		const que = searchParams.get('query');
		const category = searchParams.get('category');
		const userId = searchParams.get('userId');

		const models = await prisma.model.findMany({
			where: {
				AND: [
					que ? {
						OR: [
							{ modelName: { contains: que, mode: 'insensitive' } },
							{ description: { contains: que, mode: 'insensitive' } }
						]
					} : {},
					category ? {
						category: {
							hasSome: category.split(',')
						}
					} : {},
					userId ? { userId } : {},
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

		return models
	} catch (error) {
		console.error('Error getting Questions:', error);
		return [];
	}
}