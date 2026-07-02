export const dynamic = 'force-dynamic'

import { verifySession } from '@/lib/dal'
import accountStub from '@/stubs/account.json'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function getDaysUntil(isoDate: string): number {
  return Math.ceil((new Date(isoDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
}

export default async function DashboardPage() {
  const session = await verifySession()
  const firstName = session.name.split(' ')[0]
  const daysUntilBill = getDaysUntil(accountStub.renewalDate)

  const dateLabel = new Intl.DateTimeFormat('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="p-8">

      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-[28px] font-bold text-neutral-ink tracking-tight mb-1">
          {getGreeting()}, {firstName}.
        </h1>
        <p className="text-[14px] text-neutral-slate">
          {dateLabel} · Your next bill is in {daysUntilBill} day{daysUntilBill !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Dashboard cards — added per component story */}
      <div className="grid grid-cols-12 gap-6">
        {/* Cards go here */}
      </div>

    </div>
  )
}
