import { createFileRoute, Link } from '@tanstack/react-router'
import { blogPosts } from '~/data/blog-posts'

export const Route = createFileRoute('/blog')({
  component: BlogListPage,
  head: () => ({
    meta: [
      { title: 'المدونة - Booklish' },
      {
        name: 'description',
        content: 'مقالات ونصائح لتعلم اللغة الإنجليزية من فريق Booklish.',
      },
    ],
  }),
})

function BlogListPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-semibold text-[#9D381F] mb-8">المدونة</h1>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="block border border-gray-200 rounded-lg p-5 hover:bg-[#FAF8F5] transition-colors"
          >
            <h2 className="text-xl font-semibold text-[#9D381F] mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="text-base text-gray-700 leading-7">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
