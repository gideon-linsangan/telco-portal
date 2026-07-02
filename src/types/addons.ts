export interface Addon {
  id: string
  name: string
  description: string
  price: number
  billingCycle: 'monthly' | 'one-off'
  active: boolean
}

export type AddonsData = Addon[]
