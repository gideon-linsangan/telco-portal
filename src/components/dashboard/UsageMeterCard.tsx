'use client'

import { useEffect } from 'react'
import { useUsage } from '@/hooks/useUsage'
import { useUsageContext } from '@/context/UsageContext'
import { Badge } from '@/components/ui/atoms/Badge'
import { ProgressBar } from '@/components/ui/atoms/ProgressBar'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { StatTile } from '@/components/ui/molecules/StatTile'
import { ErrorState } from '@/components/ui/ErrorState'

function UsageMeterSkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <SkeletonBlock width="w-24" height="h-3" />
            <SkeletonBlock width="w-40" height="h-9" />
          </div>
          <SkeletonBlock width="w-24" height="h-6" rounded="rounded-full" />
        </div>
        <div className="mt-5">
          <SkeletonBlock width="w-full" height="h-2.5" />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <SkeletonBlock width="w-full" height="h-16" />
          <SkeletonBlock width="w-full" height="h-16" />
          <SkeletonBlock width="w-full" height="h-16" />
        </div>
      </div>
    </div>
  )
}

function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

export function UsageMeterCard() {
  const state = useUsage()
  const { publishPercent } = useUsageContext()

  useEffect(() => {
    if (state.status === 'success') {
      publishPercent(Math.round((state.data.usedGB / state.data.totalGB) * 100))
    }
  }, [state])

  if (state.status === 'loading') return <UsageMeterSkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { usedGB, totalGB, cycleStartDate, cycleEndDate, overageRate } = state.data

  const percentUsed = Math.round((usedGB / totalGB) * 100)
  const percentUsedDecimal = ((usedGB / totalGB) * 100).toFixed(1)
  const remainingGB = (totalGB - usedGB).toFixed(1)
  const daysRemaining = Math.max(
    0,
    Math.ceil((new Date(cycleEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  )
  const cycleRange = `${formatDateShort(cycleStartDate)} – ${formatDateShort(cycleEndDate)}`
  const overageDisplay = `$${overageRate.toFixed(2)}/MB`

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6 flex flex-col gap-5">
      {/* Header: usage on left, badge + days on right */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-slate mb-1.5">
            Data Usage
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[32px] font-bold text-neutral-ink tracking-[-0.02em]">
              {usedGB} GB
            </span>
            <span className="text-[16px] text-neutral-slate">of {totalGB} GB</span>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="warning">{percentUsedDecimal}% used</Badge>
          <p className="text-[12px] text-neutral-slate mt-1.5">
            {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
          </p>
        </div>
      </div>

      {/* Progress bar + threshold labels */}
      <div>
        <ProgressBar percent={percentUsed} />
        <div className="relative mt-1.5 h-4 text-[11px] text-neutral-slate">
          <span className="absolute left-0">0 GB</span>
          {percentUsed >= 80 && (
            <span
              className="absolute -translate-x-1/2 text-semantic-warning font-semibold whitespace-nowrap"
              style={{ left: '80%' }}
            >
              ▲ 80% warning threshold
            </span>
          )}
          <span className="absolute right-0">{totalGB} GB</span>
        </div>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-4">
        <StatTile label="Remaining" value={`${remainingGB} GB`} />
        <StatTile label="Cycle" value={cycleRange} />
        <StatTile label="Overage rate" value={overageDisplay} />
      </div>
    </div>
  )
}
