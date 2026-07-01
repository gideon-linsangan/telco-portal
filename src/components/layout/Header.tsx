import Link from 'next/link'
import { LinkButton } from '@/components/ui/Button'

const navLinks = [
  { label: 'Plans', href: '#' },
  { label: 'Coverage', href: '#' },
  { label: 'Business', href: '#' },
  { label: 'Support', href: '#' },
]

export function Header() {
  return (
    <header className="bg-brand-deep w-full sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-12 h-16 flex items-center">
        <Link href="/" className="text-white text-xl font-bold tracking-tight flex-shrink-0 no-underline">
          Telco<span className="text-brand-light">Now</span>
        </Link>

        <nav className="flex items-center gap-1 mx-auto" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/85 text-sm font-medium px-3 py-1.5 rounded-md hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 flex-shrink-0">
          <LinkButton href="/login" variant="ghost-white" size="default">
            Log in
          </LinkButton>
          <LinkButton href="#" variant="primary" size="default">
            Get started
          </LinkButton>
        </div>
      </div>
    </header>
  )
}
