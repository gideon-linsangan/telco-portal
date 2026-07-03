export const dynamic = 'force-dynamic'

import { verifySession } from '@/lib/dal'
import { Sidebar } from '@/components/dashboard/Sidebar'
import { MobileTopBar } from '@/components/dashboard/MobileTopBar'
import accountStub from '@/stubs/account.json'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession()
  const initials = getInitials(session.name)

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <MobileTopBar />
      <Sidebar
        name={session.name}
        planName={accountStub.planName}
        initials={initials}
      />
      <main className="flex-1 overflow-y-auto bg-brand-ghost min-w-0">
        {children}
      </main>
    </div>
  )
}
