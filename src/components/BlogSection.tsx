import NextLink from 'next/link'
import { SectionHeader } from '@/components/ui/molecules/SectionHeader'
import { Badge } from '@/components/ui/atoms/Badge'
import type { BlogPost } from '@/types/contentful'

export function BlogSection({ data }: { data: BlogPost[] }) {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-10">
          <SectionHeader eyebrow="From the blog" heading="Latest from TelcoNow" align="left" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {data.map((post) => {
            const date = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(post.publishDate))

            return (
              <NextLink
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-neutral-border rounded-xl shadow-card p-6 flex flex-col gap-3 hover:border-brand-signature/40 transition-colors group"
              >
                <Badge variant="neutral">{post.category}</Badge>
                <h3 className="text-lg font-semibold text-neutral-ink group-hover:text-brand-signature transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-slate flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-neutral-slate">{post.author}</span>
                  <span className="text-neutral-border">·</span>
                  <span className="text-xs text-neutral-slate">{date}</span>
                </div>
              </NextLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
