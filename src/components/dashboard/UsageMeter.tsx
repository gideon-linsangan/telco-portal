import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { Usage } from '@/types/dashboard'

export function UsageMeter({ usage }: { usage: Usage }) {
  return (
    <Card className="p-6">
      <p className="text-xs font-medium text-neutral-slate uppercase tracking-wider mb-4">Data usage</p>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-neutral-ink text-2xl font-bold">{usage.usedGB}</span>
        <span className="text-neutral-slate text-sm">of {usage.totalGB} GB used</span>
      </div>

      <p className="text-neutral-slate text-xs mb-4">{usage.daysRemaining} days remaining in cycle</p>

      <ProgressBar percent={usage.percentUsed} className="mb-2" />

      <div className="flex justify-between text-xs text-neutral-slate mt-2">
        <span>{usage.percentUsed}% used</span>
        {usage.overageRate > 0 && (
          <span>${usage.overageRate}/MB overage</span>
        )}
      </div>
    </Card>
  )
}