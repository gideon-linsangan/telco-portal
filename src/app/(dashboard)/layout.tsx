import { verifySession } from '@/lib/dal'
import { DashboardSidebar } from '@/components/layout/DashboardSidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()

  return (
    <div className="flex min-h-screen bg-brand-bg">
      <DashboardSidebar session={session} />
      <div className="flex-1 flex flex-col overflow-auto">
        {children}
      </div>
    </div>
  )
}
