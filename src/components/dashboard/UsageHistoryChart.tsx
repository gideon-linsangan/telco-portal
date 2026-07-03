'use client'

import { useUsageHistory } from '@/hooks/useUsageHistory'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { ErrorState } from '@/components/ui/ErrorState'

function UsageHistorySkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card px-8 py-7">
      <div className="animate-pulse flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <SkeletonBlock width="w-28" height="h-3" />
          <SkeletonBlock width="w-64" height="h-4" />
        </div>
        <div className="flex gap-5">
          <SkeletonBlock width="w-16" height="h-3" />
          <SkeletonBlock width="w-16" height="h-3" />
          <SkeletonBlock width="w-16" height="h-3" />
        </div>
      </div>
      <div className="flex items-end gap-0" style={{ height: '128px' }}>
        {[56, 64, 90, 82, 100, 76].map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5">
            <div
              className="w-7 bg-neutral-border rounded-t-[4px]"
              style={{ height: `${Math.round(h / 100 * 128)}px` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const CHART_HEIGHT = 128

export function UsageHistoryChart() {
  const state = useUsageHistory()

  if (state.status === 'loading') return <UsageHistorySkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { totalGB, months } = state.data

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card px-8 py-7 flex flex-col gap-6">
      {/* Header: label + subtitle on left, legend on right */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-slate mb-1">
            Usage History
          </p>
          <p className="text-[15px] font-semibold text-neutral-ink">
            Monthly data consumption · Jan–Jun 2026
          </p>
        </div>
        <div className="flex items-center gap-5 text-[12px] text-neutral-slate">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-[2px] bg-brand-signature" />
            <span>Data used</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-[2px] bg-brand-light" />
            <span>At cap</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-6 h-[2px]"
              style={{ background: 'repeating-linear-gradient(90deg, #460073 0 4px, transparent 4px 8px)', opacity: 0.5 }}
            />
            <span>{totalGB}GB cap</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative pt-2">
        {/* Cap line */}
        <div
          className="absolute top-2 left-0 right-0 h-px"
          style={{ background: 'repeating-linear-gradient(90deg, #460073 0 6px, transparent 6px 12px)', opacity: 0.35 }}
        />
        <span className="absolute top-0 right-0 text-[10px] font-semibold text-brand-deep opacity-60 tracking-[0.03em]">
          {totalGB} GB cap
        </span>

        <div className="flex gap-0" style={{ height: `${CHART_HEIGHT}px` }}>
          {months.map(m => {
            const heightPct = Math.min((m.usedGB / totalGB) * 100, 100)
            const barHeight = Math.round((heightPct / 100) * (CHART_HEIGHT - 38))
            const isAtCap = !m.isCurrent && m.usedGB >= totalGB

            let barStyle: React.CSSProperties = { height: `${barHeight}px`, width: '28px' }
            let barClass = 'rounded-t-[4px] bg-brand-signature'

            if (m.isCurrent) {
              barClass = 'rounded-t-[4px] bg-brand-ghost border border-dashed border-brand-signature/50 opacity-65'
              barStyle = { height: `${barHeight}px`, width: '28px' }
            } else if (isAtCap) {
              barClass = 'rounded-t-[4px] bg-brand-light'
            }

            const valColor = isAtCap
              ? 'text-brand-mid font-semibold'
              : m.isCurrent
              ? 'text-brand-signature font-semibold'
              : 'text-neutral-slate'

            const labelColor = m.isCurrent
              ? 'text-brand-signature font-semibold'
              : 'text-neutral-slate'

            return (
              <div key={m.month} className="flex-1 h-full flex flex-col">
                {/* bar area — bar sits at the bottom of this flex region */}
                <div className="flex-1 flex items-end justify-center">
                  <div className={barClass} style={barStyle} />
                </div>
                {/* value below bar */}
                <div className="flex justify-center mt-1">
                  <span className={`text-[10px] ${valColor}`}>{m.usedGB} GB</span>
                </div>
                {/* month label below value */}
                <div className="flex justify-center mt-0.5">
                  <span className={`text-[11px] ${labelColor}`}>
                    {m.label}{m.isCurrent ? ' ▸' : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
