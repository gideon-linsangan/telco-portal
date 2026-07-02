'use client'

import { useAccount } from '@/hooks/useAccount'
import { Badge } from '@/components/ui/atoms/Badge'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { KeyValueRow } from '@/components/ui/molecules/KeyValueRow'
import { ErrorState } from '@/components/ui/ErrorState'

interface PlanSummaryCardProps {
  accountNumber: string
}

const statusVariantMap: Record<string, 'success' | 'warning' | 'error' | 'purple'> = {
  active: 'success',
  warning: 'warning',
  error: 'error',
  pending: 'purple',
}

function PlanSummarySkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <SkeletonBlock width="w-1/3" height="h-3" />
        <div className="mt-4 flex flex-col gap-2">
          <SkeletonBlock width="w-3/4" height="h-8" />
          <SkeletonBlock width="w-1/2" height="h-3" />
        </div>
        <div className="h-px bg-neutral-border my-4" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex justify-between">
              <SkeletonBlock width="w-1/3" height="h-3" />
              <SkeletonBlock width="w-1/4" height="h-3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PlanSummaryCard({ accountNumber }: PlanSummaryCardProps) {
  const state = useAccount()

  if (state.status === 'loading') return <PlanSummarySkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { planName, monthlyCost, renewalDate, contractType, status } = state.data

  const formattedCost = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(monthlyCost)

  const formattedDate = new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(renewalDate))

  const statusVariant = statusVariantMap[status] ?? 'neutral'

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <CardHeader label="Plan summary" />
      <div className="mt-4">
        <p className="text-[28px] font-bold text-neutral-ink">{planName}</p>
        <p className="text-[13px] text-neutral-slate mt-0.5">{accountNumber}</p>
      </div>
      <div className="h-px bg-neutral-border my-4" />
      <div className="flex flex-col gap-3">
        <KeyValueRow label="Monthly cost" value={formattedCost} />
        <KeyValueRow label="Renewal" value={formattedDate} />
        <KeyValueRow label="Contract" value={contractType} />
        <KeyValueRow
          label="Status"
          value={
            <Badge variant={statusVariant}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          }
        />
      </div>
    </div>
  )
}
