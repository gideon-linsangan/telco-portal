import NextLink from 'next/link'
import { AnnouncementPill } from '@/components/ui/molecules/AnnouncementPill'
import { Heading } from '@/components/ui/atoms/Heading'
import { NetworkIllustration } from '@/components/NetworkIllustration'

export function HeroSection() {
  return (
    <section className="bg-brand-deep w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 flex items-center h-[440px] relative">

        {/* Left content */}
        <div className="w-[55%] flex flex-col gap-6 relative z-[2]">
          <AnnouncementPill label="5G Now Live Nationwide" />

          <Heading level={1} variant="display" color="white">
            Australia&rsquo;s fastest<br />5G network.
          </Heading>

          <p className="text-lg text-brand-light leading-relaxed max-w-[480px]">
            Flexible plans. No lock-in contracts.<br />Cancel any time.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <NextLink
              href="/plans"
              className="inline-flex items-center justify-center h-[52px] px-8 text-[16px] bg-brand-signature hover:bg-brand-mid text-white rounded-lg font-semibold transition-colors"
            >
              View plans
            </NextLink>
            <NextLink
              href="/coverage"
              className="inline-flex items-center justify-center h-[52px] px-8 text-[16px] border border-white/60 text-white hover:border-white hover:bg-white/10 rounded-lg font-semibold transition-colors"
            >
              Check coverage
            </NextLink>
          </div>
        </div>

        {/* Right illustration */}
        <div className="absolute right-0 top-0 w-[45%] h-full flex items-center justify-end">
          <NetworkIllustration />
        </div>

      </div>
    </section>
  )
}
