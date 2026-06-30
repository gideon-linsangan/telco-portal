import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Activity, ActivityItem } from '@/types/dashboard'

const typeLabel: Record<ActivityItem['type'], string> = {
  payment: 'Payment',
  data_topup: 'Data top-up',
  plan_change: 'Plan change',
  addon: 'Add-on',
}

const statusVariant: Record<ActivityItem['status'], 'success' | 'warning' | 'error'> = {
  completed: 'success',
  pending: 'warning',
  failed: 'error',
}

export function ActivityFeed({ activity }: { activity: Activity }) {
  return (
    <Card className="p-6">
      <p className="text-xs font-medium text-brand-muted uppercase tracking-wider mb-4">Recent activity</p>

      <ul className="space-y-4" aria-label="Recent account activity">
        {activity.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-brand-dark text-sm font-medium truncate">{item.description}</p>
              <p className="text-brand-muted text-xs mt-0.5">
                {typeLabel[item.type]} · {new Date(item.timestamp).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {item.amount !== null && (
                <span className="text-brand-dark text-sm font-semibold">
                  ${Math.abs(item.amount).toFixed(2)}
                </span>
              )}
              <Badge variant={statusVariant[item.status]} className="capitalize">{item.status}</Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
