import Link from 'next/link'
import { logout } from '@/app/actions/auth'
import type { SessionPayload } from '@/types/session'

const navItems = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Bills & Payments', href: '#' },
  { label: 'Data Usage', href: '#' },
  { label: 'My Plan', href: '#' },
  { label: 'Add-ons', href: '#' },
  { label: 'Support', href: '#' },
]

interface DashboardSidebarProps {
  session: SessionPayload
}

export function DashboardSidebar({ session }: DashboardSidebarProps) {
  return (
    <aside className="w-60 flex-shrink-0 bg-brand-purple-darkest flex flex-col min-h-screen">
      <div className="px-4 py-5 border-b border-white/10">
        <Link href="/" className="text-white text-lg font-bold tracking-tight no-underline">
          Telco<span className="text-brand-purple-light">Now</span>
        </Link>
      </div>

      <div className="px-4 py-4 border-b border-white/10">
        <p className="text-white text-sm font-semibold">{session.name}</p>
        <p className="text-white/50 text-xs mt-0.5">{session.accountNumber}</p>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5" aria-label="Dashboard navigation">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-white/75 text-sm font-medium hover:bg-white/8 hover:text-white transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <form action={logout}>
          <button
            type="submit"
            className="text-white/50 text-sm font-medium hover:text-white transition-colors"
          >
            Log out
          </button>
        </form>
      </div>
    </aside>
  )
}
