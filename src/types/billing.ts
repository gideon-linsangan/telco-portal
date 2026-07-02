export interface BillingData {
  nextPayment: { amount: number; date: string }
  lastPayment: { amount: number; date: string; status: 'paid' | 'failed' | 'overdue' }
  paymentMethod: { type: string; last4: string }
}
