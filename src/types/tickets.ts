export interface Ticket {
  id: string
  subject: string
  status: 'open' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}

export type TicketsData = Ticket[]
