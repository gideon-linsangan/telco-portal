import { LinkButton } from '@/components/ui/Button'
import type { PromoBanner as PromoBannerType } from '@/types/contentful'

interface PromoBannerProps {
  banner: PromoBannerType
}

export function PromoBanner({ banner }: PromoBannerProps) {
  return (
    <section className="bg-brand-ghost border-y border-brand-light w-full">
      <div className="max-w-7xl mx-auto px-12 h-[120px] flex items-center justify-between gap-8">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="8" width="18" height="13" rx="2" stroke="#460073" strokeWidth="1.8" />
              <path d="M3 12h18" stroke="#460073" strokeWidth="1.8" />
              <path d="M12 8V21" stroke="#460073" strokeWidth="1.8" />
              <path d="M12 8C12 8 9 8 9 5.5C9 4 10 3 11.5 3C13 3 12 5 12 8Z" stroke="#460073" strokeWidth="1.5" fill="none" />
              <path d="M12 8C12 8 15 8 15 5.5C15 4 14 3 12.5 3C11 3 12 5 12 8Z" stroke="#460073" strokeWidth="1.5" fill="none" />
            </svg>
          </div>
          <div>
            <h2 className="text-[22px] font-bold text-neutral-ink tracking-tight leading-tight mb-1">
              {banner.heading}
            </h2>
            <p className="text-[15px] text-neutral-slate">{banner.body}</p>
          </div>
        </div>
        <LinkButton href={banner.ctaHref} variant="primary" size="default" className="flex-shrink-0">
          {banner.ctaLabel}
        </LinkButton>
      </div>
    </section>
  )
}
