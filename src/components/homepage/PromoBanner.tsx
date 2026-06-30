import { LinkButton } from '@/components/ui/Button'
import type { PromoBanner as PromoBannerType } from '@/types/contentful'

interface PromoBannerProps {
  banner: PromoBannerType
}

export function PromoBanner({ banner }: PromoBannerProps) {
  return (
    <section className="py-16 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-12">
        <div className="bg-brand-purple-darkest rounded-2xl px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{banner.heading}</h2>
            <p className="text-brand-purple-light text-sm leading-relaxed max-w-lg">{banner.body}</p>
          </div>
          <LinkButton href={banner.ctaHref} variant="primary" size="default" className="flex-shrink-0">
            {banner.ctaLabel}
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
