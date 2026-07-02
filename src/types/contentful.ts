export interface HeroData {
  badgeText: string
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  backgroundImage?: string
}

export interface FeatureBlock {
  icon: string
  title: string
  bodyCopy: string
}

export interface StatBlock {
  value: string
  label: string
  order: number
}

export interface PricingPlan {
  name: string
  price: number
  tagline: string
  features: string[]
  ctaLabel: string
  ctaHref: string
  featured: boolean
  badgeText: string | null
}

export interface PromoBanner {
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export interface BlogPost {
  category: string
  title: string
  excerpt: string
  author: string
  publishDate: string
  slug: string
}

export interface SeoMeta {
  title: string
  description: string
  ogImage?: string
}
