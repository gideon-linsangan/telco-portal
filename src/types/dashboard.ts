export interface Account {
  planName: string
  planTier: 'starter' | 'plus' | 'pro'
  dataAllowanceGB: number | null
  renewalDate: string
  monthlyCost: number
  contract: string
  status: 'active' | 'inactive' | 'suspended'
  accountNumber: string
}

export interface Billing {
  nextPayment: { date: string; amount: number }
  lastPayment: { date: string; amount: number; status: 'paid' | 'failed' | 'pending' }
  paymentMethod: { type: 'visa' | 'mastercard' | 'amex'; last4: string }
}

export interface Usage {
  usedGB: number
  totalGB: number
  cycleStartDate: string
  cycleEndDate: string
  overageRate: number
  percentUsed: number
  daysRemaining: number
}

export interface UsageHistoryEntry {
  month: string
  usedGB: number
  totalGB: number
  cost: number
}
export type UsageHistory = UsageHistoryEntry[]

export interface ActivityItem {
  id: string
  type: 'payment' | 'data_topup' | 'plan_change' | 'addon'
  description: string
  timestamp: string
  amount: number | null
  status: 'completed' | 'pending' | 'failed'
}
export type Activity = ActivityItem[]

export interface Ticket {
  id: string
  subject: string
  status: 'open' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}
export type Tickets = Ticket[]

export interface Addon {
  id: string
  name: string
  description: string
  price: number
  active: boolean
  category: 'travel' | 'data' | 'entertainment' | 'insurance'
}
export type Addons = Addon[]
