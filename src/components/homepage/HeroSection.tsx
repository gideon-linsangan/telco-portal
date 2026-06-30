import { LinkButton } from '@/components/ui/Button'
import type { HomepageHero } from '@/types/contentful'

interface HeroSectionProps {
  hero: HomepageHero
}

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="bg-brand-purple-darkest w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-12 flex items-center h-[440px] gap-0 relative">
        <div className="w-[55%] flex flex-col gap-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-purple/25 border border-brand-purple/40 rounded-full px-3.5 py-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple block shadow-[0_0_8px_#A100FF]" />
            <span className="text-brand-purple-light text-xs font-medium tracking-widest uppercase">
              {hero.badgeText}
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white tracking-tight leading-[1.08]">
            {hero.headline}
          </h1>

          <p className="text-lg text-brand-purple-light leading-relaxed max-w-[480px]">
            {hero.subheadline}
          </p>

          <div className="flex items-center gap-4 mt-2">
            <LinkButton href={hero.primaryCta.href} variant="primary" size="lg">
              {hero.primaryCta.label}
            </LinkButton>
            <LinkButton href={hero.secondaryCta.href} variant="ghost-white" size="lg">
              {hero.secondaryCta.label}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
