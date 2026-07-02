import NextLink from 'next/link'
import type { PromoBanner as PromoBannerType } from '@/types/contentful'

export function PromoBanner({ data }: { data: PromoBannerType }) {
  return (
    <section className="w-full bg-brand-signature">
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col items-center gap-5 text-center">
        <h2 className="text-2xl font-semibold text-white">{data.heading}</h2>
        <p className="text-[15px] text-white/80 leading-relaxed">{data.body}</p>
        <NextLink
          href={data.ctaHref}
          className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-[14px] font-semibold bg-white text-brand-signature hover:bg-brand-light transition-colors"
        >
          {data.ctaLabel}
        </NextLink>
      </div>
    </section>
  )
}
