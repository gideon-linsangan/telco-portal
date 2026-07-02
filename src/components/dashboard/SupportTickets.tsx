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
          <div key={i} className="py-3 border-b border-neutral-border last:border-0">
            <SkeletonBlock width="w-3/4" height="h-3" />
            <div className="flex gap-2 mt-2">
              <SkeletonBlock width="w-16" height="h-5" rounded="rounded-full" />
              <SkeletonBlock width="w-16" height="h-5" rounded="rounded-full" />
            </div>
            <SkeletonBlock width="w-1/2" height="h-3" />
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

const priorityVariantMap: Record<string, 'neutral' | 'error'> = {
  low: 'neutral',
  medium: 'neutral',
  high: 'error',
}

export function SupportTickets() {
  const state = useTickets()

  if (state.status === 'loading') return <SupportTicketsSkeleton />
  if (state.status === 'error') return (
    <ErrorState message={state.message} onRetry={() => window.location.reload()} />
  )

  const tickets = state.data

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'long',
    }).format(new Date(iso))

  return (
    <div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
      <CardHeader label="Support tickets" />
      {tickets.length === 0 ? (
        <p className="text-neutral-slate text-[14px] text-center py-8">No support tickets</p>
      ) : (
        <div className="mt-2">
          {tickets.map(ticket => (
            <div
              key={ticket.id}
              className="flex flex-col gap-1 py-3 border-b border-neutral-border last:border-0"
            >
              <p className="text-[13px] font-semibold text-neutral-ink">
                {ticket.id} — {ticket.subject}
              </p>
              <div className="flex gap-2 mt-0.5">
                <Badge variant={statusVariantMap[ticket.status] ?? 'neutral'}>
                  {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                </Badge>
                <Badge variant={priorityVariantMap[ticket.priority] ?? 'neutral'}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} priority
                </Badge>
              </div>
              <p className="text-[12px] text-neutral-slate">Updated {formatDate(ticket.updatedAt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
