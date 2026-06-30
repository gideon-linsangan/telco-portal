import Link from 'next/link'
import type { BlogPost } from '@/types/contentful'

interface BlogSectionProps {
  posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-12">
        <h2 className="text-3xl font-bold text-brand-dark mb-12 tracking-tight">Latest news</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-brand-border rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(70,0,115,0.12)]"
            >
              <div className="p-6">
                <span className="text-xs font-semibold text-brand-purple uppercase tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-brand-dark font-semibold text-base mt-2 mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brand-muted">{post.author}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-brand-purple text-sm font-semibold hover:text-[#7500C0] transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
