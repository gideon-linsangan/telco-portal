export interface Plan {
  name: string
  price: number
  tagline: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  featured: boolean
  badgeText: string | null
}
