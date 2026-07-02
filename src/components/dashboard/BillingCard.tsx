'use client'

import { useBilling } from '@/hooks/useBilling'
import { Badge } from '@/components/ui/atoms/Badge'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { KeyValueRow } from '@/components/ui/molecules/KeyValueRow'
import { ErrorState } from '@/components/ui/ErrorState'

function BillingSkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <SkeletonBlock width="w-1/3" height="h-3" />
        <div className="mt-4 flex flex-col gap-2">
          <SkeletonBlock width="w-1/2" height="h-8" />
          <SkeletonBlock width="w-1/3" height="h-3" />
        </div>
        <div className="h-px bg-neutral-border my-4" />
        <div className="flex flex-col gap-3">
          <SkeletonBlock width="w-full" height="h-4" />
          <SkeletonBlock width="w-full" height="h-4" />
        </div>
      </div>
    </div>
  )
}

const paymentStatusMap: Record<string, 'success' | 'error'> = {
  paid: 'success',
  failed: 'error',
  overdue: 'error',
}

export function BillingCard() {
  const state = useBilling()

  if (state.status === 'loading') return <BillingSkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { nextPayment, lastPayment, paymentMethod } = state.data

  const formatAUD = (amount: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount)

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso))

  const lastPaymentBadge = (
    <Badge variant={paymentStatusMap[lastPayment.status] ?? 'neutral'}>
      {lastPayment.status.charAt(0).toUpperCase() + lastPayment.status.slice(1)}
    </Badge>
  )

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <CardHeader label="Billing" />
      <div className="mt-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-slate mb-1">
          Next payment
        </p>
        <p className="text-[28px] font-bold text-neutral-ink">{formatAUD(nextPayment.amount)}</p>
        <p className="text-[13px] text-neutral-slate">{formatDate(nextPayment.date)}</p>
      </div>
      <div className="h-px bg-neutral-border my-4" />
      <div className="flex flex-col gap-3">
        <KeyValueRow label="Last payment" value={lastPaymentBadge} />
        <KeyValueRow
          label="Payment method"
          value={`${paymentMethod.type} ···· ${paymentMethod.last4}`}
        />
      </div>
      <a
        href="#"
        className="mt-4 block text-[13px] text-brand-signature font-semibold hover:text-brand-mid"
      >
        Billing history →
      </a>
    </div>
  )
}
