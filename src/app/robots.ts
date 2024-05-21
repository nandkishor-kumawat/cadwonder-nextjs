import { siteMetadata } from '@/lib/siteMetaData'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/dashboard/',
        },
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    }
}