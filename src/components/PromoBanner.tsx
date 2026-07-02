import NextLink from 'next/link'
import type { PromoBanner as PromoBannerType } from '@/types/contentful'

function GiftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="8" width="18" height="13" rx="2" stroke="#460073" strokeWidth="1.8"/>
      <path d="M3 12h18" stroke="#460073" strokeWidth="1.8"/>
      <path d="M12 8V21" stroke="#460073" strokeWidth="1.8"/>
      <path d="M12 8C12 8 9 8 9 5.5C9 4 10 3 11.5 3C13 3 12 5 12 8Z" stroke="#460073" strokeWidth="1.5" fill="none"/>
      <path d="M12 8C12 8 15 8 15 5.5C15 4 14 3 12.5 3C11 3 12 5 12 8Z" stroke="#460073" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

export function PromoBanner({ data }: { data: PromoBannerType }) {
  return (
    <section className="w-full bg-brand-ghost border-y border-brand-light">
      <div className="max-w-7xl mx-auto px-8 h-[120px] flex items-center justify-between gap-8">

        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
            <GiftIcon />
          </div>
          <div>
            <h2 className="text-[22px] font-bold text-neutral-ink tracking-tight mb-1">{data.heading}</h2>
            <p className="text-[15px] text-neutral-slate">{data.body}</p>
          </div>
        </div>

        <NextLink
          href={data.ctaHref}
          className="inline-flex items-center justify-center h-11 px-7 bg-brand-signature hover:bg-brand-mid text-white text-[15px] font-semibold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
        >
          {data.ctaLabel}
        </NextLink>

      </div>
    </section>
  )
}
