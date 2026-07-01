import { verifySession } from '@/lib/dal'
import { AccountCard } from '@/components/dashboard/AccountCard'
import { BillingCard } from '@/components/dashboard/BillingCard'
import { UsageMeter } from '@/components/dashboard/UsageMeter'
import { UsageHistoryChart } from '@/components/dashboard/UsageHistoryChart'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { TicketsCard } from '@/components/dashboard/TicketsCard'
import { AddonsCard } from '@/components/dashboard/AddonsCard'
import type { Account, Billing, Usage, UsageHistory, Activity, Tickets, Addons } from '@/types/dashboard'
import accountData from '@/stubs/account.json'
import billingData from '@/stubs/billing.json'
import usageData from '@/stubs/usage.json'
import usageHistoryData from '@/stubs/usage-history.json'
import activityData from '@/stubs/activity.json'
import ticketsData from '@/stubs/tickets.json'
import addonsData from '@/stubs/addons.json'

export default async function DashboardPage() {
  const session = await verifySession()

  const today = new Date()
  const cycleEnd = new Date(usageData.cycleEndDate)
  const msPerDay = 1000 * 60 * 60 * 24
  const daysRemaining = Math.max(0, Math.ceil((cycleEnd.getTime() - today.getTime()) / msPerDay))
  const percentUsed = Math.round((usageData.usedGB / usageData.totalGB) * 100)

  const account: Account = {
    ...(accountData as unknown as Omit<Account, 'accountNumber'>),
    accountNumber: session.accountNumber,
  }
  const billing = billingData as unknown as Billing
  const usage: Usage = { ...usageData, percentUsed, daysRemaining }
  const usageHistory = usageHistoryData as unknown as UsageHistory
  const activity = activityData as unknown as Activity
  const tickets = ticketsData as unknown as Tickets
  const addons = addonsData as unknown as Addons

  return (
    <main className="flex-1 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-brand-dark mb-8">
          Welcome back, {session.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AccountCard account={account} />
          <BillingCard billing={billing} />
          <UsageMeter usage={usage} />
          <UsageHistoryChart history={usageHistory} />
          <ActivityFeed activity={activity} />
          <TicketsCard tickets={tickets} />
          <div className="md:col-span-2 lg:col-span-3">
            <AddonsCard addons={addons} />
          </div>
        </div>
      </div>
    </main>
  )
}
