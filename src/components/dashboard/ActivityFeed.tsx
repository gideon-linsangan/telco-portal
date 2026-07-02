'use client'

import { useActivity } from '@/hooks/useActivity'
import { Badge } from '@/components/ui/atoms/Badge'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { ErrorState } from '@/components/ui/ErrorState'
import type { ActivityItem } from '@/types/activity'

const iconBgMap: Record<ActivityItem['type'], string> = {
  data_topup: 'bg-brand-light',
  payment: 'bg-semantic-success-tint',
  plan_change: 'bg-brand-ghost',
  addon: 'bg-semantic-warning-tint',
}

const iconColorMap: Record<ActivityItem['type'], string> = {
  data_topup: 'text-brand-deep',
  payment: 'text-semantic-success',
  plan_change: 'text-brand-signature',
  addon: 'text-semantic-warning',
}

function ActivityIcon({ type }: { type: ActivityItem['type'] }) {
  const bg = iconBgMap[type]
  const color = iconColorMap[type]

  return (
    <div className={`w-9 h-9 rounded-[10px] ${bg} flex items-center justify-center flex-shrink-0`}>
      {type === 'data_topup' && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={color}>
          <path
            d="M8 12V4M4 7l4-4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {type === 'payment' && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={color}>
          <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M1 6.5h14" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )}
      {type === 'plan_change' && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={color}>
          <path
            d="M13 4.5A6 6 0 1 1 9 2.07M13 4.5V1.5M13 4.5H10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {type === 'addon' && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={color}>
          <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  )
}

function statusToBadgeVariant(status: string): 'success' | 'purple' | 'neutral' {
  if (['completed', 'paid', 'active'].includes(status)) return 'success'
  if (['pending', 'upgrade'].includes(status)) return 'purple'
  return 'neutral'
}

function ActivitySkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <SkeletonBlock width="w-1/3" height="h-3" />
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex justify-between items-start py-2.5 px-3 mt-1">
            <div className="flex gap-3 items-center">
              <SkeletonBlock width="w-9" height="h-9" rounded="rounded-[10px]" />
              <div className="flex flex-col gap-2">
                <SkeletonBlock width="w-32" height="h-3" />
                <SkeletonBlock width="w-20" height="h-3" />
              </div>
            </div>
            <SkeletonBlock width="w-16" height="h-5" rounded="rounded-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function ActivityFeed() {
  const state = useActivity()

  if (state.status === 'loading') return <ActivitySkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const items = state.data

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <CardHeader
        label="Recent activity"
        action={
          <a href="#" className="text-[13px] text-brand-signature font-semibold hover:text-brand-mid">
            View all →
          </a>
        }
      />
      <div className="mt-2">
        {items.map(item => {
          const formattedAmount =
            item.amount !== null
              ? new Intl.NumberFormat('en-AU', {
                  style: 'currency',
                  currency: 'AUD',
                }).format(Math.abs(item.amount))
              : null

          const badgeVariant = statusToBadgeVariant(item.status)

          return (
            <div
              key={item.id}
              className="flex justify-between items-center px-3 py-2.5 rounded-lg hover:bg-brand-ghost transition-colors"
            >
              <div className="flex gap-3 items-start">
                <ActivityIcon type={item.type} />
                <div>
                  <p className="text-[14px] font-semibold text-neutral-ink">{item.description}</p>
                  <p className="text-[12px] text-neutral-slate">{item.detail}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {formattedAmount !== null ? (
                  <p className="text-[14px] font-bold text-neutral-ink">{formattedAmount}</p>
                ) : (
                  <p className="text-[14px] font-bold text-neutral-slate">—</p>
                )}
                <Badge variant={badgeVariant}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
