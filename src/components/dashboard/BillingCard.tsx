import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Billing } from '@/types/dashboard'

const paymentStatusVariant: Record<Billing['lastPayment']['status'], 'success' | 'error' | 'warning'> = {
  paid: 'success',
  failed: 'error',
  pending: 'warning',
}

export function BillingCard({ billing }: { billing: Billing }) {
  return (
    <Card className="p-6 flex flex-col gap-4">
      <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-slate">Billing</p>

      <div>
        <p className="text-[12px] text-neutral-slate mb-1">Next payment</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[36px] font-bold text-brand-deep tracking-tight leading-none">
            ${billing.nextPayment.amount}
          </span>
          <span className="text-[13px] text-neutral-slate">
            due {new Date(billing.nextPayment.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
      </div>

      <div className="h-px bg-neutral-border" />

      <div className="flex flex-col gap-2.5 text-[13px]">
        <div className="flex items-center justify-between">
          <span className="text-neutral-slate">Last payment</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-ink">
              {new Date(billing.lastPayment.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <Badge variant={paymentStatusVariant[billing.lastPayment.status]} className="capitalize">
              {billing.lastPayment.status}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-slate">Payment method</span>
          <span className="font-semibold text-neutral-ink capitalize">
            {billing.paymentMethod.type} •••• {billing.paymentMethod.last4}
          </span>
        </div>
      </div>

      <a href="#" className="text-brand-signature text-[13px] font-semibold mt-1 hover:text-brand-mid transition-colors">
        Billing history →
      </a>
    </Card>
  )
}
