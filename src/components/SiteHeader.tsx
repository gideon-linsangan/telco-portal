'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLink } from '@/components/ui/molecules/NavLink'

const NAV_LINKS = [
  { href: '/plans',    label: 'Plans' },
  { href: '/coverage', label: 'Coverage' },
  { href: '/business', label: 'Business' },
  { href: '/support',  label: 'Support' },
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-deep border-b border-white/8">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center">

        <NextLink href="/" className="flex-shrink-0 text-xl font-bold tracking-tight text-white">
          Telco<span className="text-brand-light">Now</span>
        </NextLink>

        <nav aria-label="Main navigation" className="flex items-center gap-1 mx-auto">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          <NextLink
            href="/login"
            className="inline-flex items-center justify-center h-11 px-6 text-[14px] border border-white/70 text-white hover:bg-white/10 rounded-lg font-semibold transition-colors"
          >
            Log in
          </NextLink>
          <NextLink
            href="/plans"
            className="inline-flex items-center justify-center h-11 px-6 text-[14px] bg-brand-signature hover:bg-brand-mid text-white rounded-lg font-semibold transition-colors"
          >
            Get started
          </NextLink>
        </div>

      </div>
    </header>
  )
}
