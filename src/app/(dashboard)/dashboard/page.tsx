import { headers } from 'next/headers'
import { verifySession } from '@/lib/dal'
import { AccountCard } from '@/components/dashboard/AccountCard'
import { BillingCard } from '@/components/dashboard/BillingCard'
import { UsageMeter } from '@/components/dashboard/UsageMeter'
import { UsageHistoryChart } from '@/components/dashboard/UsageHistoryChart'
import { ActivityFeed } from '@/components/dashboard/ActivityFeed'
import { TicketsCard } from '@/components/dashboard/TicketsCard'
import { AddonsCard } from '@/components/dashboard/AddonsCard'
import type { Account, Billing, Usage, UsageHistory, Activity, Tickets, Addons } from '@/types/dashboard'

async function fetchAPI<T>(path: string, baseUrl: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to fetch ${path}`)
  return res.json() as Promise<T>
}

export default async function DashboardPage() {
  const session = await verifySession()
  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = `${protocol}://${host}`

  const [account, billing, usage, usageHistory, activity, tickets, addons] = await Promise.all([
    fetchAPI<Account>('/api/account', baseUrl),
    fetchAPI<Billing>('/api/billing', baseUrl),
    fetchAPI<Usage>('/api/usage', baseUrl),
    fetchAPI<UsageHistory>('/api/usage-history', baseUrl),
    fetchAPI<Activity>('/api/activity', baseUrl),
    fetchAPI<Tickets>('/api/tickets', baseUrl),
    fetchAPI<Addons>('/api/addons', baseUrl),
  ])

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
