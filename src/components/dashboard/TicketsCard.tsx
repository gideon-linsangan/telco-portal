import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Tickets, Ticket } from '@/types/dashboard'

const statusVariant: Record<Ticket['status'], 'warning' | 'success' | 'neutral'> = {
  open: 'warning',
  resolved: 'success',
  closed: 'neutral',
}

const priorityVariant: Record<Ticket['priority'], 'error' | 'warning' | 'info'> = {
  high: 'error',
  medium: 'warning',
  low: 'info',
}

const priorityLabel: Record<Ticket['priority'], string> = {
  high: 'High priority',
  medium: 'Medium priority',
  low: 'Low priority',
}

export function TicketsCard({ tickets }: { tickets: Tickets }) {
  const openCount = tickets.filter((t) => t.status === 'open').length

  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.06em] text-neutral-slate">Support Tickets</p>
        {openCount > 0 && (
          <Badge variant="warning">{openCount} open</Badge>
        )}
      </div>

      {tickets.length === 0 ? (
        <p className="text-neutral-slate text-sm">No tickets open.</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="border border-neutral-border rounded-lg p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-semibold text-neutral-ink">{ticket.subject}</span>
                <Badge variant={statusVariant[ticket.status]} className="capitalize">{ticket.status}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={priorityVariant[ticket.priority]}>{priorityLabel[ticket.priority]}</Badge>
                <span className="text-xs text-neutral-slate">
                  {new Date(ticket.updatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        className="mt-1 h-9 px-4 border border-brand-signature text-brand-signature text-[13px] font-semibold rounded-lg hover:bg-brand-ghost transition-colors self-start"
      >
        + Raise a ticket
      </button>
    </Card>
  )
}
