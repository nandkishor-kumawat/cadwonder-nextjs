import { getDataFromCollection } from "@/lib/functions";
import { siteMetadata } from "@/lib/siteMetaData";
import { Model, Question } from "@/lib/types/types";

function generateSiteMap(type: string, data: any[]) {
  return `
       ${data
      .map(({ slug, createdAt, username }) => {
        return `
         <url>
             <loc>${`${siteMetadata.siteUrl}/${type}/${slug ?? username}`}</loc>
             <lastmod>${new Date(createdAt).toISOString()}</lastmod>
             <changefreq>daily</changefreq>
         </url>
       `;
      })
      .join('')}
   `;
}
const handler = async (req: any, res: any) => {
  // We make an API call to gather the URLs for our site
  const questions = await getDataFromCollection('questions');
  const users = await getDataFromCollection('users');
  const library = await getDataFromCollection('models');

  // We generate the XML sitemap with the posts data
  const sitemap1 = generateSiteMap('questions', questions);
  const sitemap2 = generateSiteMap('users', users);
  const sitemap3 = generateSiteMap('library', library);

  const newSitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
     <url>
       <loc>${siteMetadata.siteUrl}</loc>
     </url>
     <url>
       <loc>${siteMetadata.siteUrl}/questions</loc>
     </url>
     <url>
       <loc>${siteMetadata.siteUrl}/users</loc>
     </url>
     <url>
       <loc>${siteMetadata.siteUrl}/library</loc>
     </url>
     ${sitemap1}
     ${sitemap2}
     ${sitemap3}
     </urlset>`
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(newSitemap);
  res.end();

}

export default handler;