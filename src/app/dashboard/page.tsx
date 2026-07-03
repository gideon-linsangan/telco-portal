export const dynamic = 'force-dynamic'

import { verifySession } from '@/lib/dal'
import accountStub from '@/stubs/account.json'
import { PlanSummaryCard } from '@/components/dashboard/PlanSummaryCard'
import { UsageMeterCard } from '@/components/dashboard/UsageMeterCard'
import { BillingCard } from '@/components/dashboard/BillingCard'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { SupportTickets } from '@/components/dashboard/SupportTickets'
import { UsageHistoryChart } from '@/components/dashboard/UsageHistoryChart'
import { AddOnsCard } from '@/components/dashboard/AddOnsCard'
import { UpgradeBanner } from '@/components/dashboard/UpgradeBanner'
import { UsageProvider } from '@/context/UsageContext'

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

  const dateLabel = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="p-4 md:p-8">
      {/* Page header */}
      <div className="mb-7">
        <h1 className="text-[22px] md:text-[28px] font-bold text-neutral-ink tracking-tight mb-1">
          {getGreeting()}, {firstName}.
        </h1>
        <p className="text-[14px] text-neutral-slate">
          {dateLabel} · Your next bill is in {daysUntilBill} day{daysUntilBill !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Dashboard grid */}
      <UsageProvider>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-full md:col-span-4">
            <PlanSummaryCard />
          </div>
          <div className="col-span-full md:col-span-8">
            <UsageMeterCard />
          </div>

          <div className="col-span-full md:col-span-4">
            <BillingCard />
          </div>
          <div className="col-span-full md:col-span-8">
            <ActivityFeed />
          </div>

          <div className="col-span-full">
            <UsageHistoryChart />
          </div>

          <div className="col-span-full md:col-span-4">
            <SupportTickets />
          </div>
          <div className="col-span-full md:col-span-6">
            <AddOnsCard />
          </div>
          <div className="col-span-full md:col-span-6">
            <UpgradeBanner />
          </div>
        </div>
      </UsageProvider>
    </div>
  )
}
