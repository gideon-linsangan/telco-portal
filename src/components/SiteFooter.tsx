import NextLink from 'next/link'
import { Link } from '@/components/ui/atoms/Link'
import { Text } from '@/components/ui/atoms/Text'

const COLUMNS = [
  {
    heading: 'Plans',
    links: [
      { href: '/plans/starter',  label: 'Starter' },
      { href: '/plans/plus',     label: 'Plus' },
      { href: '/plans/pro',      label: 'Pro' },
      { href: '/plans/business', label: 'Business' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { href: '/support/help',     label: 'Help centre' },
      { href: '/support/contact',  label: 'Contact us' },
      { href: '/coverage',         label: 'Coverage map' },
      { href: '/support/faqs',     label: 'FAQs' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/legal/privacy',       label: 'Privacy policy' },
      { href: '/legal/terms',         label: 'Terms' },
      { href: '/legal/accessibility', label: 'Accessibility' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-neutral-ink w-full pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 pb-10 md:pb-14">

          {/* Brand column */}
          <div className="md:[flex:1.4] flex flex-col gap-4">
            <NextLink href="/" className="text-xl font-bold tracking-tight text-white">
              Telco<span className="text-brand-light">Now</span>
            </NextLink>
            <Text variant="caption" color="slate">Fast. Simple. Yours.</Text>
            <p className="text-[14px] text-neutral-slate leading-relaxed max-w-[240px]">
              Australia&rsquo;s fastest growing 5G network. Built for real people, priced fairly.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map(col => (
            <div key={col.heading} className="md:flex-1 flex flex-col">
              <div className="mb-3">
                <Text variant="label" color="slate">{col.heading}</Text>
              </div>
              <div className="flex flex-col gap-1">
                {col.links.map(link => (
                  <Link key={link.href} variant="muted" href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5 flex flex-col md:flex-row items-center gap-1 md:justify-between">
          <span className="text-[13px] text-neutral-slate">© 2026 TelcoNow Pty Ltd</span>
          <span className="text-[13px] text-neutral-slate">All prices include GST</span>
        </div>

      </div>
    </footer>
  )
}
