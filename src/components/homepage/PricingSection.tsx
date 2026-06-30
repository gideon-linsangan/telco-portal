import { LinkButton } from '@/components/ui/Button'
import type { PricingPlan } from '@/types/contentful'

interface PricingSectionProps {
  plans: PricingPlan[]
}

export function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-12">
        <h2 className="text-3xl font-bold text-brand-dark text-center mb-12 tracking-tight">
          Plans for everyone
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
                plan.featured
                  ? 'bg-brand-purple-darkest text-white border-2 border-brand-purple shadow-[0_8px_32px_rgba(161,0,255,0.18)]'
                  : 'bg-white border border-brand-border shadow-[0_1px_4px_rgba(70,0,115,0.06)] hover:shadow-[0_8px_32px_rgba(70,0,115,0.13)]'
              }`}
            >
              {plan.featured && plan.badgeText && (
                <span className="inline-block mb-4 text-xs font-semibold bg-brand-purple text-white px-3 py-1 rounded-full w-fit">
                  {plan.badgeText}
                </span>
              )}

              <h3 className={`text-xl font-bold mb-1 ${plan.featured ? 'text-white' : 'text-brand-dark'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.featured ? 'text-brand-purple-light' : 'text-brand-muted'}`}>
                {plan.tagline}
              </p>

              <p className={`text-4xl font-bold mb-8 ${plan.featured ? 'text-white' : 'text-brand-dark'}`}>
                ${plan.price}
                <span className={`text-base font-normal ${plan.featured ? 'text-brand-purple-light' : 'text-brand-muted'}`}>
                  /mo
                </span>
              </p>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className={`text-sm flex items-start gap-2 ${plan.featured ? 'text-brand-purple-light' : 'text-brand-muted'}`}>
                    <span className="text-[#00B388] mt-0.5 flex-shrink-0" aria-hidden="true">✓</span>
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
