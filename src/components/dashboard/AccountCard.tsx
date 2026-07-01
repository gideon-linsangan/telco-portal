import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Account } from '@/types/dashboard'

export function AccountCard({ account }: { account: Account }) {
  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-slate">Current Plan</p>
        <span className="inline-flex items-center gap-1.5 rounded-full text-xs font-semibold px-2.5 py-0.5 bg-semantic-success-tint text-semantic-success">
          <span className="w-1.5 h-1.5 rounded-full bg-semantic-success flex-shrink-0" />
          Active
        </span>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[26px] font-bold text-brand-deep tracking-tight leading-none">
            {account.planName}
          </span>
          {account.dataAllowanceGB !== null && (
            <Badge variant="purple">{account.dataAllowanceGB}GB</Badge>
          )}
        </div>
        <p className="text-[28px] font-bold text-neutral-ink tracking-tight leading-none">
          ${account.monthlyCost}
          <span className="text-sm font-normal text-neutral-slate">/mo</span>
        </p>
      </div>

      <div className="h-px bg-neutral-border" />

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-[13px]">
          <span className="text-neutral-slate">Renews</span>
          <span className="font-semibold text-neutral-ink">
            {new Date(account.renewalDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-neutral-slate">Contract</span>
          <span className="font-semibold text-neutral-ink">{account.contract}</span>
        </div>
      </div>

      <a href="#" className="text-brand-signature text-[13px] font-semibold mt-1 hover:text-brand-mid transition-colors">
        Manage plan →
      </a>
    </Card>
  )
}
