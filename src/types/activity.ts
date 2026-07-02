export interface ActivityItem {
  id: string
  type: 'data_topup' | 'payment' | 'plan_change' | 'addon'
  description: string
  detail: string
  timestamp: string
  amount: number | null
  status: string
}

export type ActivityData = ActivityItem[]
