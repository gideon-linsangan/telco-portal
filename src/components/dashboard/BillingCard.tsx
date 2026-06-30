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
    <Card className="p-6">
      <p className="text-xs font-medium text-brand-muted uppercase tracking-wider mb-4">Billing</p>

      <div className="mb-4 pb-4 border-b border-brand-border">
        <p className="text-brand-muted text-sm mb-1">Next payment</p>
        <p className="text-brand-dark text-2xl font-bold">${billing.nextPayment.amount}</p>
        <p className="text-brand-muted text-xs mt-1">
          Due {new Date(billing.nextPayment.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-brand-muted">Last payment</span>
          <div className="flex items-center gap-2">
            <span className="text-brand-dark font-medium">${billing.lastPayment.amount}</span>
            <Badge variant={paymentStatusVariant[billing.lastPayment.status]} className="capitalize">
              {billing.lastPayment.status}
            </Badge>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-muted">Payment method</span>
          <span className="text-brand-dark font-medium capitalize">
            {billing.paymentMethod.type} ···· {billing.paymentMethod.last4}
          </span>
        </div>
      </div>
    </Card>
  )
}
