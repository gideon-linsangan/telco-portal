export interface UsageMonth {
  month: string
  label: string
  usedGB: number
  cost: number | null
  isCurrent: boolean
}

export interface UsageHistoryData {
  totalGB: number
  months: UsageMonth[]
}
