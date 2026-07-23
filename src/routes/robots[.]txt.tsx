import { createFileRoute } from '@tanstack/react-router'

const SITE_URL = 'https://booklish.app'

export const Route = createFileRoute('/robots.txt')({
  loader: () => {
    const body = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${SITE_URL}/sitemap.xml`

    throw new Response(body, {
      headers: { 'Content-Type': 'text/plain' },
    })
  },
})
