export interface AccountData {
  planName: string
  dataAllowanceGB: number
  monthlyCost: number
  renewalDate: string
  contractType: string
  status: 'active' | 'warning' | 'error' | 'pending'
}
