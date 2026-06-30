import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Account } from '@/types/dashboard'

const tierLabel: Record<Account['planTier'], string> = {
  starter: 'Starter',
  plus: 'Plus',
  pro: 'Pro',
}

export function AccountCard({ account }: { account: Account }) {
  const statusVariant = account.status === 'active' ? 'success' : account.status === 'suspended' ? 'error' : 'neutral'

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-brand-muted uppercase tracking-wider mb-1">Your plan</p>
          <h2 className="text-brand-dark text-xl font-bold">{account.planName}</h2>
        </div>
        <Badge variant="purple">{tierLabel[account.planTier]}</Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-brand-muted">Account number</span>
          <span className="text-brand-dark font-medium">{account.accountNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-muted">Monthly cost</span>
          <span className="text-brand-dark font-medium">${account.monthlyCost}/mo</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-muted">Renews</span>
          <span className="text-brand-dark font-medium">
            {new Date(account.renewalDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-brand-muted">Status</span>
          <Badge variant={statusVariant} className="capitalize">{account.status}</Badge>
        </div>
      </div>
    </Card>
  )
}
