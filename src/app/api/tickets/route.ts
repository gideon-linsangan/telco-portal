import { verifySession } from '@/lib/dal'
import ticketsData from '@/stubs/tickets.json'
import type { Tickets } from '@/types/dashboard'

export async function GET(): Promise<Response> {
  await verifySession()

  const tickets = ticketsData as unknown as Tickets

  return Response.json(tickets)
}
