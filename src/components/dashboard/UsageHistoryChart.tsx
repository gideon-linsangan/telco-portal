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
      <p className="text-[12px] text-neutral-slate mb-4">Monthly data consumption · Jan–Jun 2026</p>
      <div className="relative">
        {/* Cap line */}
        <div className="absolute top-0 left-0 right-0 flex items-center">
          <div
            className="flex-1 border-t border-dashed"
            style={{ borderColor: 'rgba(70,0,115,0.3)' }}
          />
          <span className="ml-2 text-[10px] font-semibold text-brand-deep opacity-60 whitespace-nowrap">
            {totalGB} GB cap
          </span>
        </div>
        {/* Bars */}
        <div
          className="flex items-end gap-0 pt-4"
          style={{ height: `${CHART_HEIGHT + 16}px` }}
        >
          {months.map(m => {
            const heightPct = Math.min((m.usedGB / totalGB) * 100, 100)
            const barHeight = Math.round((heightPct / 100) * CHART_HEIGHT)
            const isAtCap = !m.isCurrent && m.usedGB >= totalGB

            let barClass = 'bg-brand-signature rounded-t-[4px]'
            if (m.isCurrent) {
              barClass = 'bg-brand-ghost border border-dashed rounded-t-[4px] opacity-80'
            } else if (isAtCap) {
              barClass = 'bg-brand-light rounded-t-[4px]'
            }

            const labelColor = m.isCurrent ? 'text-brand-signature font-semibold' : 'text-neutral-slate'
            const valColor = isAtCap ? 'text-brand-mid font-semibold' : m.isCurrent ? 'text-brand-signature font-semibold' : 'text-neutral-slate'

            return (
              <div
                key={m.month}
                className="flex-1 flex flex-col items-center justify-end"
                style={{ height: `${CHART_HEIGHT}px` }}
              >
                <span className={`text-[10px] mb-0.5 ${valColor}`}>{m.usedGB}GB</span>
                <div
                  className={`w-7 ${barClass}`}
                  style={{
                    height: `${barHeight}px`,
                    ...(m.isCurrent ? { borderColor: 'rgba(161,0,255,0.5)' } : {}),
                  }}
                />
                <span className={`text-[11px] text-center mt-1 ${labelColor}`}>
                  {m.label}{m.isCurrent ? ' ▸' : ''}
                </span>
              </div>
            )
          })}
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-5 mt-4 pt-3 border-t border-neutral-border">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-[2px] bg-brand-signature" />
          <span className="text-[11px] text-neutral-slate">Data used</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-[2px] bg-brand-light" />
          <span className="text-[11px] text-neutral-slate">At cap</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-6 h-[2px] border-t border-dashed"
            style={{ borderColor: 'rgba(161,0,255,0.5)' }}
          />
          <span className="text-[11px] text-neutral-slate">Current month</span>
        </div>
      </div>
    </div>
  )
}
