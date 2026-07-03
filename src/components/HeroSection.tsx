import NextLink from 'next/link'
import { AnnouncementPill } from '@/components/ui/molecules/AnnouncementPill'
import { Heading } from '@/components/ui/atoms/Heading'
import { NetworkIllustration } from '@/components/NetworkIllustration'
import type { HeroData } from '@/types/contentful'

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="bg-brand-deep w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-0 md:h-[440px] flex items-center relative">

        {/* Left content */}
        <div className="w-full md:w-[55%] flex flex-col gap-5 md:gap-6 relative z-[2]">
          <AnnouncementPill label={data.badgeText} />

          <Heading level={1} variant="display" color="white">
            {data.headline}
          </Heading>

          <p className="text-base md:text-lg text-brand-light leading-relaxed max-w-[480px]">
            {data.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2">
            <NextLink
              href={data.primaryCta.href}
              className="inline-flex items-center justify-center h-12 md:h-[52px] px-7 md:px-8 text-[15px] md:text-[16px] bg-brand-signature hover:bg-brand-mid text-white rounded-lg font-semibold transition-colors"
            >
              {data.primaryCta.label}
            </NextLink>
            <NextLink
              href={data.secondaryCta.href}
              className="inline-flex items-center justify-center h-12 md:h-[52px] px-7 md:px-8 text-[15px] md:text-[16px] border border-white/60 text-white hover:border-white hover:bg-white/10 rounded-lg font-semibold transition-colors"
            >
              {data.secondaryCta.label}
            </NextLink>
          </div>
        </div>

        {/* Right illustration — hidden on mobile */}
        <div className="hidden md:flex absolute right-0 top-0 w-[45%] h-full items-center justify-end">
          <NetworkIllustration />
        </div>

      </div>
    </section>
  )
}
