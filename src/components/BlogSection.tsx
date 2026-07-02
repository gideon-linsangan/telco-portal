import NextLink from 'next/link'
import type { BlogPost } from '@/types/contentful'

const BAR_COLORS = ['bg-brand-signature', 'bg-brand-deep', 'bg-brand-mid']

export function BlogSection({ data }: { data: BlogPost[] }) {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-brand-signature mb-2.5">Blog</p>
            <h2 className="text-3xl font-bold text-neutral-ink tracking-tight">From the TelcoNow blog</h2>
          </div>
          <NextLink href="#" className="text-brand-signature hover:text-brand-mid text-[14px] font-semibold transition-colors mb-1.5">
            View all articles →
          </NextLink>
        </div>

        <div className="flex gap-6">
          {data.map((post, i) => {
            const date = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.publishDate))

            return (
              <NextLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex-1 bg-white border border-neutral-border rounded-xl shadow-card overflow-hidden flex flex-col hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(70,0,115,0.12)] transition-all group"
              >
                {/* Colored top bar */}
                <div className={`h-2 ${BAR_COLORS[i % BAR_COLORS.length]}`} />

                {/* Card body */}
                <div className="p-7 flex flex-col gap-4 flex-1">
                  {/* Category badge */}
                  <span className="inline-block bg-brand-ghost text-brand-deep text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit">
                    {post.category}
                  </span>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-ink group-hover:text-brand-signature transition-colors leading-snug mb-2.5">
                      {post.title}
                    </h3>
                    <p className="text-[14px] text-neutral-slate leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>

                  {/* Card footer */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-neutral-border">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[13px] font-semibold text-neutral-ink">{post.author}</span>
                      <span className="text-[12px] text-neutral-slate">{date}</span>
                    </div>
                    <span className="text-brand-signature text-[14px] font-semibold group-hover:gap-2 transition-all">
                      Read more →
                    </span>
                  </div>
                </div>
              </NextLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
