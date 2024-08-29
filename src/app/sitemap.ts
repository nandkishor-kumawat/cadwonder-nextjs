import prisma from '@/lib/prisma';
import { siteMetadata } from '@/lib/siteMetaData';
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [questions, users, library] = await Promise.all([
        prisma.question.findMany({ select: { slug: true, createdAt: true, }, }),
        prisma.user.findMany({ select: { username: true, createdAt: true, }, }),
        prisma.model.findMany({ select: { slug: true, createdAt: true, }, }),
    ]);

    const questionEntries: MetadataRoute.Sitemap = questions.map(({ slug, createdAt }) => ({
        url: `${siteMetadata.siteUrl}/questions/${slug}`,
        lastModified: new Date(createdAt),
    }));

    const userEntries: MetadataRoute.Sitemap = users.map(({ username, createdAt }) => ({
        url: `${siteMetadata.siteUrl}/${username}`,
        lastModified: new Date(createdAt),
    }));

    const libraryEntries: MetadataRoute.Sitemap = library.map(({ slug, createdAt }) => ({
        url: `${siteMetadata.siteUrl}/library/${slug}`,
        lastModified: new Date(createdAt),
    }));

    return [
        {
            url: siteMetadata.siteUrl,
        },
        ...questionEntries,
        ...userEntries,
        ...libraryEntries,
    ];
}