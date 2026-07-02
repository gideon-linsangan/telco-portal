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

const VisaIcon = () => (
  <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
    <rect width="32" height="20" rx="3" fill="#1A1F71"/>
    <path d="M13.5 13.5H11.3L12.7 6.5H14.9L13.5 13.5ZM9.8 6.5L7.7 11.2L7.5 10.3L6.8 7.2C6.7 6.8 6.4 6.5 6 6.5H2.5L2.4 6.7C3.2 6.9 4 7.2 4.8 7.6L6.7 13.5H9L12.8 6.5H9.8ZM27.5 13.5H29.5L27.7 6.5H25.9C25.5 6.5 25.2 6.7 25.1 7L21.5 13.5H23.8L24.3 12.1H27L27.5 13.5ZM24.9 10.4L26 7.5L26.6 10.4H24.9ZM21.3 8.4L21.6 6.7C20.9 6.5 20.2 6.4 19.5 6.4C17.7 6.4 16.4 7.3 16.4 8.7C16.4 9.7 17.3 10.3 18 10.7C18.7 11.1 19 11.3 19 11.6C19 12.1 18.4 12.3 17.8 12.3C17 12.3 16.2 12.1 15.5 11.8L15.2 11.7L14.9 13.4C15.7 13.7 16.6 13.9 17.5 13.9C19.4 13.9 20.7 13 20.7 11.5C20.7 10.6 20.1 10 18.9 9.5C18.3 9.1 17.9 8.9 17.9 8.6C17.9 8.3 18.2 7.9 19 7.9C19.6 7.9 20.2 8 20.7 8.2L21 8.3L21.3 8.4Z" fill="white"/>
  </svg>
)

export function BillingCard() {
  const state = useBilling()

  if (state.status === 'loading') return <BillingSkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { nextPayment, lastPayment, paymentMethod } = state.data

  const formatAUD = (amount: number) =>
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso))

  const formatDateShort = (iso: string) =>
    new Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))

  const lastPaymentValue = (
    <span className="flex items-center gap-2">
      <Badge variant={paymentStatusMap[lastPayment.status] ?? 'neutral'}>
        {lastPayment.status.charAt(0).toUpperCase() + lastPayment.status.slice(1)}
      </Badge>
      <span className="text-[13px] text-neutral-slate">{formatDateShort(lastPayment.date)}</span>
    </span>
  )

  const paymentMethodValue = (
    <span className="flex items-center gap-1.5">
      <VisaIcon />
      <span className="font-semibold text-neutral-ink text-[13px]">•••• {paymentMethod.last4}</span>
    </span>
  )

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <CardHeader label="Billing" />
      <div className="mt-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-slate mb-1">
          Next payment
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[36px] font-bold text-brand-deep leading-none">{formatAUD(nextPayment.amount)}</span>
          <span className="text-[13px] text-neutral-slate">due {formatDate(nextPayment.date)}</span>
        </div>
      </div>
      <div className="h-px bg-neutral-border my-4" />
      <div className="flex flex-col gap-3">
        <KeyValueRow label="Last payment" value={lastPaymentValue} />
        <KeyValueRow label="Payment method" value={paymentMethodValue} />
      </div>
      <a
        href="#"
        className="mt-4 block text-[13px] text-brand-signature font-semibold hover:text-brand-mid transition-colors"
      >
        Billing history →
      </a>
    </div>
  )
}
