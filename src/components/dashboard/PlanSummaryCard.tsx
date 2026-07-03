'use client'

import { useAccount } from '@/hooks/useAccount'
import { Badge } from '@/components/ui/atoms/Badge'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { KeyValueRow } from '@/components/ui/molecules/KeyValueRow'
import { ErrorState } from '@/components/ui/ErrorState'

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
          {[1, 2].map(i => (
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

export function PlanSummaryCard() {
  const state = useAccount()

  if (state.status === 'loading') return <PlanSummarySkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { planName, dataAllowanceGB, monthlyCost, renewalDate, contractType, status } = state.data

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(renewalDate))

  const statusVariant = statusVariantMap[status] ?? 'neutral'

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6 flex flex-col gap-4">
      <CardHeader
        label="Current Plan"
        action={
          <Badge variant={statusVariant} dot>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        }
      />
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[26px] font-bold text-brand-deep leading-none tracking-[-0.02em]">{planName}</span>
          <Badge variant="purple">{dataAllowanceGB}GB</Badge>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[28px] font-bold text-neutral-ink tracking-[-0.02em]">${monthlyCost}</span>
          <span className="text-[14px] font-normal text-neutral-slate">/mo</span>
        </div>
      </div>
      <div className="h-px bg-neutral-border" />
      <div className="flex flex-col gap-2">
        <KeyValueRow label="Renews" value={formattedDate} />
        <KeyValueRow label="Contract" value={contractType} />
      </div>
      <a
        href="#"
        className="text-[13px] text-brand-signature font-semibold hover:text-brand-mid transition-colors mt-1"
      >
        Manage plan →
      </a>
    </div>
  )
}
