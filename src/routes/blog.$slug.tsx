import { createFileRoute, notFound, Link } from '@tanstack/react-router'
import { blogPosts } from '../data/blog-posts'


export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug)
    if (!post) throw notFound()
    return post
  },
  component: BlogPostPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? 'مقال'} - Booklish` },
      { name: 'description', content: loaderData?.excerpt ?? '' },
    ],
  }),
})

function BlogPostPage() {
  const post = Route.useLoaderData()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12" dir="rtl">
      <Link to="/blog" className="text-[#9D381F] text-sm mb-6 inline-block">
        ← الرجوع للمدونة
      </Link>

      <h1 className="text-3xl font-semibold text-[#9D381F] mb-2">
        {post.title}
      </h1>
      <p className="text-sm text-gray-500 mb-8">{post.date}</p>

      <div className="prose prose-neutral max-w-none leading-8 whitespace-pre-line">
        {post.content}
      </div>
    </div>
  )
}
