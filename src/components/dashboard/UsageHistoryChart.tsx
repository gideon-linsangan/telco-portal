import { Card } from '@/components/ui/Card'
import type { UsageHistory } from '@/types/dashboard'

export function UsageHistoryChart({ history }: { history: UsageHistory }) {
  const maxGB = Math.max(...history.map((e) => Math.max(e.usedGB, e.totalGB)))

  return (
    <Card className="p-6">
      <p className="text-xs font-medium text-neutral-slate uppercase tracking-wider mb-6">Usage history</p>

      <div className="flex items-end gap-2 h-32" role="img" aria-label="Monthly usage history bar chart">
        {history.map((entry) => {
          const heightPct = Math.min(100, (entry.usedGB / maxGB) * 100)
          const overCap = entry.usedGB > entry.totalGB

          return (
            <div key={entry.month} className="flex flex-col items-center gap-1.5 flex-1">
              <span className="text-[10px] text-neutral-slate">{entry.usedGB}GB</span>
              <div className="w-full flex items-end justify-center h-24">
                <div
                  className={`w-7 rounded-t transition-opacity hover:opacity-80 ${overCap ? 'bg-brand-light' : 'bg-brand-signature'}`}
                  style={{ height: `${heightPct}%` }}
                  title={`${entry.month}: ${entry.usedGB}GB of ${entry.totalGB}GB`}
                />
              </div>
              <span className="text-[10px] text-neutral-slate">{entry.month.split(' ')[0]}</span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}