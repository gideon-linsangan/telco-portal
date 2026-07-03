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
          <SkeletonBlock width="w-1/2" height="h-10" />
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

const paymentStatusVariant: Record<string, 'success' | 'error'> = {
  paid: 'success',
  failed: 'error',
  overdue: 'error',
}

const VisaIcon = () => (
  <svg width="28" height="18" viewBox="0 0 28 18" fill="none">
    <rect width="28" height="18" rx="3" fill="#1A1F71"/>
    <path d="M11 13H9.4l1-5.8H12L11 13zm7.8-5.6c-.4-.15-.95-.3-1.67-.3-1.84 0-3.13.9-3.14 2.18-.01.95.9 1.48 1.58 1.8.7.32.94.53.94.82 0 .44-.56.64-1.08.64-.72 0-1.1-.1-1.7-.33l-.23-.1-.25 1.45c.42.18 1.18.34 1.97.34 1.96 0 3.22-.9 3.24-2.27.01-.76-.48-1.33-1.52-1.8-.63-.31-1.02-.52-1.02-.83 0-.28.33-.57 1.04-.57.6-.01 1.03.12 1.36.25l.16.07.25-1.35zm2.43-.2h-1.43c-.44 0-.77.12-.96.57L17.4 13h1.96l.39-1h2.39l.23 1H24l-1.57-5.8zm-2.3 3.6l.74-1.88.43 1.88h-1.17zM8.6 7.2l-1.83 3.96-.2-.96C6.23 9.3 5.4 8.4 4.5 8l1.67 5H8.1L10.7 7.2H8.6z" fill="#FAFAFA"/>
  </svg>
)

export function BillingCard() {
  const state = useBilling()

  if (state.status === 'loading') return <BillingSkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const { nextPayment, lastPayment, paymentMethod } = state.data

  const formatDateShort = (iso: string) =>
    new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))

  const lastPaymentValue = (
    <span className="flex items-center gap-2">
      <span className="text-[13px] font-semibold text-neutral-ink">{formatDateShort(lastPayment.date)}</span>
      <Badge variant={paymentStatusVariant[lastPayment.status] ?? 'neutral'}>
        {lastPayment.status.charAt(0).toUpperCase() + lastPayment.status.slice(1)}
      </Badge>
    </span>
  )

  const paymentMethodValue = (
    <span className="flex items-center gap-1.5">
      <VisaIcon />
      <span className="font-semibold text-neutral-ink text-[13px]">•••• {paymentMethod.last4}</span>
    </span>
  )

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6 flex flex-col gap-4">
      <CardHeader label="Billing" />
      <div>
        <p className="text-[12px] text-neutral-slate mb-1">Next payment</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[36px] font-bold text-brand-deep leading-none tracking-[-0.02em]">
            ${nextPayment.amount}
          </span>
          <span className="text-[13px] text-neutral-slate">
            due {formatDateShort(nextPayment.date)}
          </span>
        </div>
      </div>
      <div className="h-px bg-neutral-border" />
      <div className="flex flex-col gap-2.5">
        <KeyValueRow label="Last payment" value={lastPaymentValue} />
        <KeyValueRow label="Payment method" value={paymentMethodValue} />
      </div>
      <a
        href="#"
        className="text-[13px] text-brand-signature font-semibold hover:text-brand-mid transition-colors mt-1"
      >
        Billing history →
      </a>
    </div>
  )
}
