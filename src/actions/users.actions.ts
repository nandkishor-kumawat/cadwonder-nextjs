import prisma from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";
import { cache } from "react";

export const getUsersBy = cache(async<K extends keyof User>(
    key: K,
    value: User[K],
): Promise<User | null> => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                [key]: value,
            },
        });
        return user;
    } catch (error) {
        console.error(`Error fetching users by ${key}:`, error);
        return null;
    }
})

export const getUserInfo = cache(async (username: string) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username
            },
            include: {
                educations: true,
                experiences: true,
                socialLinks: true,
            }
        });
        return user;
    } catch (error) {
        console.error(`Error fetching users by `, error);
        return null;
    }
})


export const getUserStats = cache(async (userId: string) => {
    try {
        const stats = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                _count: {
                    select: {
                        questions: true,
                        models: true,
                    },
                }
            }
        })
        if (stats) return stats._count;
        return { questions: 0, models: 0 };
    } catch (error) {
        console.error('Error fetching user stats:', error);
        return { questions: 0, models: 0 };
    }
})


export const getUserAnswers = cache(async (userId: string) => {
    try {
        const user = await prisma.answer.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: 0,
            take: 10,
        });
        return user;
    } catch (error) {
        console.error('Error fetching user answers:', error);
        return [];
    }
})

export const getUserComments = cache(async (userId: string) => {
    try {
        const user = await prisma.comment.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: 0,
            take: 10,
        });
        return user;
    } catch (error) {
        console.error('Error fetching user comments:', error);
        return [];
    }
})
