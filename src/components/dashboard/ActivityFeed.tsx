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
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-slate">Recent Activity</p>
        <a href="#" className="text-brand-signature text-[13px] font-semibold hover:text-brand-mid transition-colors">
          View all →
        </a>
      </div>

      <ul className="flex flex-col gap-1" aria-label="Recent account activity">
        {activity.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4 px-3 py-3 rounded-lg hover:bg-brand-ghost transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-neutral-ink text-[14px] font-semibold truncate">{item.description}</p>
              <p className="text-neutral-slate text-xs mt-0.5">
                {typeLabel[item.type]} · {new Date(item.timestamp).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {item.amount !== null && (
                <span className="text-neutral-ink text-[14px] font-bold">
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
