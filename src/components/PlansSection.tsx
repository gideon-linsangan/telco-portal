import NextLink from 'next/link'
import { SectionHeader } from '@/components/ui/molecules/SectionHeader'
import { Badge } from '@/components/ui/atoms/Badge'
import type { Plan } from '@/types/plans'


function PlanCard({ plan }: { plan: Plan }) {
  const monthly = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }).format(plan.price)

  return (
    <div className={`relative flex flex-col rounded-xl shadow-card p-6 border ${
      plan.featured
        ? 'bg-brand-deep border-brand-mid'
        : 'bg-white border-neutral-border'
    }`}>
      {plan.badgeText && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge variant="purple">{plan.badgeText}</Badge>
        </div>
      )}

      <p className={`text-xs font-medium uppercase tracking-wider mb-3 ${plan.featured ? 'text-brand-light' : 'text-neutral-slate'}`}>
        {plan.name}
      </p>

      <div className="flex items-end gap-1 mb-1">
        <span className={`text-[40px] font-bold leading-none ${plan.featured ? 'text-white' : 'text-neutral-ink'}`}>
          {monthly}
        </span>
        <span className={`text-sm mb-1.5 ${plan.featured ? 'text-brand-light' : 'text-neutral-slate'}`}>/mo</span>
      </div>

      <p className={`text-[13px] mb-5 ${plan.featured ? 'text-brand-light' : 'text-neutral-slate'}`}>
        {plan.tagline}
      </p>

      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {plan.features.map(f => (
          <li key={f} className={`flex items-start gap-2 text-[13px] ${plan.featured ? 'text-white/90' : 'text-neutral-ink'}`}>
            <span className="mt-0.5 text-semantic-success flex-shrink-0">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <NextLink
        href={plan.ctaHref}
        className={`inline-flex items-center justify-center h-11 rounded-lg text-[14px] font-semibold transition-colors ${
          plan.featured
            ? 'bg-brand-signature hover:bg-brand-mid text-white'
            : 'border border-brand-signature text-brand-signature hover:bg-brand-ghost'
        }`}
      >
        {plan.ctaLabel}
      </NextLink>
    </div>
  )
}

export function PlansSection({ data }: { data: Plan[] }) {
  return (
    <section className="w-full bg-neutral-surface py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-10 text-center">
          <SectionHeader eyebrow="Pricing" heading="Plans for everyone" align="center" />
        </div>

        <div className="grid grid-cols-3 gap-6 items-start">
          {data.map(plan => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
