'use client'

import { useUsage } from '@/hooks/useUsage'
import { ProgressBar } from '@/components/ui/atoms/ProgressBar'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { StatTile } from '@/components/ui/molecules/StatTile'
import { ErrorState } from '@/components/ui/ErrorState'

function UsageMeterSkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <SkeletonBlock width="w-1/4" height="h-3" />
        <div className="mt-4 mb-2">
          <SkeletonBlock width="w-1/2" height="h-8" />
        </div>
        <SkeletonBlock width="w-full" height="h-2.5" />
        <div className="flex gap-4 mt-4">
          <SkeletonBlock width="w-full" height="h-16" />
          <SkeletonBlock width="w-full" height="h-16" />
          <SkeletonBlock width="w-full" height="h-16" />
        </div>
      </div>
    </div>
  )
}

function formatDateShort(iso: string): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(iso))
}

export function UsageMeterCard() {
  const state = useUsage()

  if (state.status === 'loading') return <UsageMeterSkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { usedGB, totalGB, cycleStartDate, cycleEndDate, overageRate } = state.data

  const percentUsed = Math.round((usedGB / totalGB) * 100)
  const remainingGB = (totalGB - usedGB).toFixed(1)
  const cycleRange = `${formatDateShort(cycleStartDate)} – ${formatDateShort(cycleEndDate)}`
  const overageDisplay = `$${overageRate.toFixed(2)}/MB`

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <CardHeader label="Data usage" />
      <div className="mt-4 mb-3">
        <span className="text-[28px] font-bold text-neutral-ink">{usedGB} GB</span>
        <span className="text-[15px] text-neutral-slate ml-2">of {totalGB} GB</span>
      </div>
      <ProgressBar percent={percentUsed} showThreshold />
      {percentUsed >= 80 && (
        <p className="text-semantic-warning text-[13px] mt-2">
          You&apos;re approaching your data limit — {percentUsed}% used.
        </p>
      )}
      <div className="flex gap-4 mt-4">
        <StatTile label="Remaining" value={`${remainingGB} GB`} />
        <StatTile label="Cycle" value={cycleRange} />
        <StatTile label="Overage rate" value={overageDisplay} />
      </div>
    </div>
  )
}
