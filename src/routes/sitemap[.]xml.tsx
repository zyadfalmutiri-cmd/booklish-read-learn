import { createFileRoute } from '@tanstack/react-router'
import { blogPosts } from '../data/blog-posts'

const SITE_URL = 'https://booklish.app'

const staticRoutes = [
  '',
  '/about',
  '/contact',
  '/faq',
  '/blog',
  '/step',
]

export const Route = createFileRoute('/sitemap.xml')({
  loader: () => {
    const staticUrls = staticRoutes
      .map(
        (path) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : '0.7'}</priority>
  </url>`,
      )
      .join('')

    const blogUrls = blogPosts
      .map(
        (post) => `
  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
      )
      .join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${blogUrls}
</urlset>`

    throw new Response(xml, {
      headers: { 'Content-Type': 'application/xml' },
    })
  },
})
