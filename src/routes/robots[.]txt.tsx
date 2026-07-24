import { createServerFileRoute } from '@tanstack/react-start/server'

const SITE_URL = 'https://d-learn.vercel.app'

export const ServerRoute = createServerFileRoute('/robots.txt').methods({
  GET: () => {
    const body = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${SITE_URL}/sitemap.xml`

    return new Response(body, {
      headers: { 'Content-Type': 'text/plain' },
    })
  },
})
