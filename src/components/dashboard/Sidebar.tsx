import { UserChip } from '@/components/ui/molecules/UserChip'
import { SidebarNav } from './SidebarNav'

type SidebarProps = {
  name: string
  planName: string
  initials: string
}

export function Sidebar({ name, planName, initials }: SidebarProps) {
  return (
    <aside className="hidden md:flex w-[240px] bg-brand-deep flex-col flex-shrink-0 overflow-y-auto">

      {/* Wordmark */}
      <div className="px-5 pt-6 pb-5 border-b border-white/8">
        <div className="text-[18px] font-bold text-white tracking-tight leading-none mb-1">
          Telco<span className="text-brand-light">Now</span>
        </div>
        <div className="text-[12px] font-medium text-brand-light uppercase tracking-[0.04em]">
          My Account
        </div>
      </div>

      {/* Nav + logout (client) */}
      <SidebarNav />

      {/* User chip */}
      <div className="px-5 py-4 border-t border-white/8">
        <UserChip name={name} planName={`${planName} plan`} initials={initials} />
      </div>

    </aside>
  )
}
