'use client'

import { useTickets } from '@/hooks/useTickets'
import { Badge } from '@/components/ui/atoms/Badge'
import { SkeletonBlock } from '@/components/ui/atoms/SkeletonBlock'
import { CardHeader } from '@/components/ui/molecules/CardHeader'
import { ErrorState } from '@/components/ui/ErrorState'

function SupportTicketsSkeleton() {
  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <div className="animate-pulse">
        <SkeletonBlock width="w-1/3" height="h-3" />
        {[1, 2].map(i => (
          <div key={i} className="mt-3 border border-neutral-border rounded-lg p-3.5 flex flex-col gap-2">
            <div className="flex justify-between">
              <SkeletonBlock width="w-3/4" height="h-3" />
              <SkeletonBlock width="w-14" height="h-5" rounded="rounded-full" />
            </div>
            <div className="flex gap-2">
              <SkeletonBlock width="w-20" height="h-5" rounded="rounded-full" />
              <SkeletonBlock width="w-16" height="h-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const statusVariantMap: Record<string, 'warning' | 'success'> = {
  open: 'warning',
  resolved: 'success',
}

export function SupportTickets() {
  const state = useTickets()

  if (state.status === 'loading') return <SupportTicketsSkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const tickets = state.data
  const openCount = tickets.filter(t => t.status === 'open').length

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(iso))

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6 flex flex-col gap-4">
      <CardHeader
        label="Support Tickets"
        action={
          openCount > 0 ? (
            <Badge variant="warning">{openCount} open</Badge>
          ) : undefined
        }
      />
      {tickets.length === 0 ? (
        <p className="text-neutral-slate text-[14px] text-center py-6">No support tickets</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {tickets.map(ticket => (
            <div
              key={ticket.id}
              className="border border-neutral-border rounded-lg p-3.5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-semibold text-neutral-ink">{ticket.subject}</p>
                <Badge variant={statusVariantMap[ticket.status] ?? 'neutral'}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="neutral">
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} priority
                </Badge>
                <span className="text-[12px] text-neutral-slate">{formatDate(ticket.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <button type="button" className="w-full border border-brand-signature text-brand-signature text-[13px] font-semibold h-9 rounded-lg hover:bg-brand-ghost transition-colors">
        + Raise a ticket
      </button>
    </div>
  )
}
