import { LinkButton } from '@/components/ui/Button'
import type { PricingPlan } from '@/types/contentful'

interface PricingSectionProps {
  plans: PricingPlan[]
}

export function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-12">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-brand-signature mb-3">Pricing</p>
          <h2 className="text-3xl font-bold text-neutral-ink tracking-tight">
            Simple, honest pricing.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl p-8 flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
                plan.featured
                  ? 'bg-white border-2 border-brand-signature shadow-[0_4px_24px_rgba(161,0,255,0.14)] hover:shadow-[0_8px_32px_rgba(161,0,255,0.22)]'
                  : 'bg-white border border-neutral-border shadow-card hover:shadow-[0_8px_32px_rgba(70,0,115,0.13)]'
              }`}
            >
              {plan.featured && plan.badgeText && (
                <span className="inline-block mb-4 text-xs font-semibold bg-brand-light text-brand-deep px-4 py-1 rounded-full w-fit tracking-[0.04em]">
                  {plan.badgeText}
                </span>
              )}

              <h3 className={`text-xs font-medium uppercase tracking-[0.06em] mb-2 ${plan.featured ? 'text-brand-signature' : 'text-neutral-slate'}`}>
                {plan.name}
              </h3>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-bold text-brand-deep tracking-tight leading-none">${plan.price}</span>
                <span className="text-base font-medium text-neutral-slate pb-2">/month</span>
              </div>
              <p className="text-sm text-neutral-slate mb-8">{plan.tagline}</p>

              <div className="h-px bg-neutral-border mb-7" />

              <ul className="space-y-3.5 flex-1 mb-9">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm flex items-center gap-3 text-neutral-ink">
                    <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? 'bg-brand-signature' : 'bg-brand-ghost'}`}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 2" stroke={plan.featured ? '#fff' : '#A100FF'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <LinkButton
                href={plan.ctaHref}
                variant={plan.featured ? 'primary' : 'ghost-purple'}
                size="default"
                className="w-full justify-center"
              >
                {plan.ctaLabel}
              </LinkButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
