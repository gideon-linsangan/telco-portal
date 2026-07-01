import Link from 'next/link'
import { logout } from '@/app/actions/auth'
import type { SessionPayload } from '@/types/session'

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: 'Usage',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Billing',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.4" />
        <rect x="4" y="9" width="3" height="1.5" rx="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Add-ons',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Support',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 3.5h12M2 8h8M2 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 13.5c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
]

interface DashboardSidebarProps {
  session: SessionPayload
}

export function DashboardSidebar({ session }: DashboardSidebarProps) {
  const initials = session.name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  return (
    <aside className="w-60 flex-shrink-0 bg-brand-deep flex flex-col min-h-screen">
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/" className="text-white text-lg font-bold tracking-tight no-underline block">
          Telco<span className="text-brand-light">Now</span>
        </Link>
        <p className="text-xs font-medium text-brand-light uppercase tracking-[0.04em] mt-1">My Account</p>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5" aria-label="Dashboard navigation">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-white/75 text-[14px] font-medium hover:bg-white/8 hover:text-white transition-colors"
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-signature flex items-center justify-center text-[13px] font-bold text-white flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white">{session.name}</p>
            <p className="text-xs text-brand-light/70">{session.planName}</p>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="text-white/50 text-[13px] font-medium hover:text-white transition-colors"
          >
            ← Log out
          </button>
        </form>
      </div>
    </aside>
  )
}
