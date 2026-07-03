'use client'

import { logout } from '@/app/actions/auth'

export function MobileTopBar() {
  return (
    <div className="md:hidden flex items-center justify-between px-4 h-14 bg-brand-deep border-b border-white/8 flex-shrink-0">
      <span className="text-[18px] font-bold text-white tracking-tight leading-none">
        Telco<span className="text-brand-light">Now</span>
      </span>
      <form action={logout}>
        <button
          type="submit"
          className="text-[13px] font-medium text-white/70 hover:text-white transition-colors"
        >
          Log out
        </button>
      </form>
    </div>
  )
}
