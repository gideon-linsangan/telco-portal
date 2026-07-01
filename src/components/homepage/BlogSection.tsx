import Link from 'next/link'
import type { BlogPost } from '@/types/contentful'

interface BlogSectionProps {
  posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-brand-signature mb-2.5">Blog</p>
            <h2 className="text-3xl font-bold text-neutral-ink tracking-tight">From the TelcoNow blog</h2>
          </div>
          <Link
            href="#"
            className="text-[14px] font-semibold text-brand-signature hover:text-brand-mid transition-colors mb-1.5"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-neutral-border rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(70,0,115,0.12)] flex flex-col"
            >
              <div className="p-7 flex flex-col gap-4 flex-1">
                <div>
                  <span className="inline-block bg-brand-ghost text-brand-deep text-[11px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-neutral-ink font-semibold text-lg leading-snug tracking-tight mb-2.5">
                    {post.title}
                  </h3>
                  <p className="text-neutral-slate text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-border">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[13px] font-semibold text-neutral-ink">{post.author}</span>
                    <span className="text-xs text-neutral-slate">
                      {new Date(post.publishDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-brand-signature text-[14px] font-semibold hover:text-brand-mid transition-colors inline-flex items-center gap-1"
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
