'use client'
import { usePathname } from 'next/navigation'
import { SidebarNavItem } from '@/components/ui/molecules/SidebarNavItem'
import { logout } from '@/app/actions/auth'

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.9"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/usage',
    label: 'Usage',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/billing',
    label: 'Billing',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="4" y="9" width="3" height="1.5" rx="0.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/addons',
    label: 'Add-ons',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5.5 8h5M8 5.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/support',
    label: 'Support',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 3.5h12M2 8h8M2 12.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 13.5c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <>
      <nav className="px-3 py-4 flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map(item => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname === item.href}
          />
        ))}
      </nav>

      <form action={logout} className="px-5 pb-2">
        <button
          type="submit"
          className="text-[13px] font-medium text-white/50 hover:text-white transition-colors"
        >
          ← Log out
        </button>
      </form>
    </>
  )
}
