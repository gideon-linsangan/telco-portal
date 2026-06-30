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

export function TicketsCard({ tickets }: { tickets: Tickets }) {
  return (
    <Card className="p-6">
      <p className="text-xs font-medium text-brand-muted uppercase tracking-wider mb-4">Support tickets</p>

      {tickets.length === 0 ? (
        <p className="text-brand-muted text-sm">No tickets open.</p>
      ) : (
        <ul className="space-y-4" aria-label="Support tickets">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-brand-dark text-sm font-medium truncate">{ticket.subject}</p>
                <p className="text-brand-muted text-xs mt-0.5">
                  {ticket.id} · Updated {new Date(ticket.updatedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <Badge variant={statusVariant[ticket.status]} className="capitalize">{ticket.status}</Badge>
                <Badge variant={priorityVariant[ticket.priority]} className="capitalize">{ticket.priority}</Badge>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
