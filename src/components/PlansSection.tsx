import NextLink from 'next/link'
import { SectionHeader } from '@/components/ui/molecules/SectionHeader'
import type { Plan } from '@/types/plans'

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-shrink-0">
      <circle cx="9" cy="9" r="9" fill={featured ? '#A100FF' : '#F5EEFF'} />
      <path d="M5 9l3 3 5-5" stroke={featured ? '#fff' : '#A100FF'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlanCard({ plan }: { plan: Plan }) {
  const monthly = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(plan.price)

  return (
    <div className={`relative flex flex-col rounded-xl p-8 bg-white ${
      plan.featured
        ? 'border-2 border-brand-signature shadow-[0_4px_24px_rgba(161,0,255,0.14)] -mt-2 -mb-2'
        : 'border border-neutral-border shadow-card'
    }`}>
      {plan.badgeText && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-brand-light text-brand-deep text-[12px] font-semibold tracking-[0.04em] px-4 py-1 rounded-full whitespace-nowrap">
            {plan.badgeText}
          </span>
        </div>
      )}

      <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${plan.featured ? 'text-brand-signature' : 'text-neutral-slate'}`}>
        {plan.name}
      </p>

      <div className="flex items-end gap-1 mb-1">
        <span className="text-[48px] font-bold leading-none text-brand-deep tracking-tight">
          {monthly}
        </span>
        <span className="text-[16px] font-medium text-neutral-slate mb-2">/month</span>
      </div>

      <p className="text-[14px] text-neutral-slate mb-8">{plan.tagline}</p>

      <div className="h-px bg-neutral-border mb-7" />

      <ul className="flex flex-col gap-3.5 mb-9 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-center gap-3">
            <CheckIcon featured={plan.featured} />
            <span className={`text-[15px] text-neutral-ink ${plan.featured ? 'font-medium' : ''}`}>{f}</span>
          </li>
        ))}
      </ul>

      <NextLink
        href={plan.ctaHref}
        className={`inline-flex items-center justify-center h-11 rounded-lg text-[15px] font-semibold transition-colors ${
          plan.featured
            ? 'bg-brand-signature hover:bg-brand-mid text-white'
            : 'border-[1.5px] border-brand-signature text-brand-signature hover:bg-brand-ghost'
        }`}
      >
        {plan.ctaLabel}
      </NextLink>
    </div>
  )
}

export function PlansSection({ data }: { data: Plan[] }) {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-12 text-center">
          <SectionHeader eyebrow="Pricing" heading="Simple, honest pricing." align="center" />
        </div>

        <div className="flex gap-6 items-stretch">
          {data.map(plan => (
            <div key={plan.name} className="flex-1">
              <PlanCard plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
