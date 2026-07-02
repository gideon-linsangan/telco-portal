'use client'

import { useUsageHistory } from '@/hooks/useUsageHistory'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { ErrorState } from '@/components/ui/ErrorState'

function UsageHistorySkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <SkeletonBlock width="w-1/4" height="h-3" />
        <div className="flex items-end gap-2 mt-4" style={{ height: '160px' }}>
          {[80, 120, 60, 140, 100, 90].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end" style={{ height: '160px' }}>
              <div
                className="w-full animate-pulse bg-neutral-border rounded-t-sm"
                style={{ height: `${h}px` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const CHART_HEIGHT = 160

export function UsageHistoryChart() {
  const state = useUsageHistory()

  if (state.status === 'loading') return <UsageHistorySkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { totalGB, months } = state.data

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <CardHeader label="Usage history" />
      <div className="mt-4 relative">
        {/* Cap line */}
        <div className="absolute top-0 left-0 right-0 flex items-center">
          <div className="flex-1 border-t border-dashed border-neutral-slate/40" />
          <span className="ml-2 text-[10px] text-neutral-slate whitespace-nowrap">
            {totalGB} GB
          </span>
        </div>
        {/* Bars */}
        <div
          className="flex items-end gap-2 pt-4"
          style={{ height: `${CHART_HEIGHT + 16}px` }}
        >
          {months.map(m => {
            const heightPct = Math.min((m.usedGB / totalGB) * 100, 100)
            const barHeight = Math.round((heightPct / 100) * CHART_HEIGHT)

            let barClass = 'bg-brand-signature'
            if (m.isCurrent) {
              barClass = 'bg-brand-ghost border border-dashed border-brand-signature opacity-80'
            } else if (m.usedGB >= totalGB) {
              barClass = 'bg-brand-light'
            }

            return (
              <div
                key={m.month}
                className="flex-1 flex flex-col items-center justify-end"
                style={{ height: `${CHART_HEIGHT}px` }}
              >
                <span className="text-[10px] text-neutral-slate mb-0.5">{m.usedGB}GB</span>
                <div
                  className={`w-full rounded-t-sm ${barClass}`}
                  style={{ height: `${barHeight}px` }}
                />
                <span className="text-[11px] text-neutral-slate text-center mt-1">{m.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
