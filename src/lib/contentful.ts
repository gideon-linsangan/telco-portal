import 'server-only'
import { createClient } from 'contentful'
import type {
  HomepageHero,
  FeatureBlock,
  SeoMeta,
  StatBlock,
  PricingPlan,
  PromoBanner,
  BlogPost,
} from '@/types/contentful'
import stubHero from '@/stubs/hero.json'
import stubFeatures from '@/stubs/features.json'
import stubStats from '@/stubs/stats.json'
import stubPlans from '@/stubs/plans.json'
import stubBanner from '@/stubs/banner.json'
import stubPosts from '@/stubs/posts.json'

function getClient() {
  const isPreview = process.env.VERCEL_ENV === 'preview'
  const accessToken = isPreview
    ? process.env.CONTENTFUL_PREVIEW_TOKEN
    : process.env.CONTENTFUL_DELIVERY_TOKEN
  if (!process.env.CONTENTFUL_SPACE_ID || !accessToken) return null
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken,
    host: isPreview ? 'preview.contentful.com' : 'cdn.contentful.com',
  })
}

function withWebP(url: string): string {
  if (!url) return url
  const base = url.startsWith('//') ? `https:${url}` : url
  return `${base}?fm=webp`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractFields<T>(entry: any): T {
  return entry.fields as T
}

export async function getHomepageHero(): Promise<HomepageHero | null> {
  const client = getClient()
  if (!client) return stubHero as HomepageHero
  try {
    const entries = await client.getEntries({ content_type: 'homepageHero', limit: 1 })
    if (!entries.items.length) return stubHero as HomepageHero
    const fields = extractFields<HomepageHero>(entries.items[0])
    if (fields.backgroundImage?.url) {
      fields.backgroundImage.url = withWebP(fields.backgroundImage.url)
    }
    return fields
  } catch {
    return stubHero as HomepageHero
  }
}

export async function getFeatureBlocks(): Promise<FeatureBlock[]> {
  const client = getClient()
  if (!client) return stubFeatures as FeatureBlock[]
  try {
    const entries = await client.getEntries({ content_type: 'featureBlock' })
    if (!entries.items.length) return stubFeatures as FeatureBlock[]
    return entries.items.map((e) => extractFields<FeatureBlock>(e))
  } catch {
    return stubFeatures as FeatureBlock[]
  }
}

export async function getSeoMeta(pageSlug: string): Promise<SeoMeta | null> {
  const client = getClient()
  if (!client) return null
  try {
    const entries = await client.getEntries({
      content_type: 'seoMeta',
      'fields.slug': pageSlug,
      limit: 1,
    })
    if (!entries.items.length) return null
    const fields = extractFields<SeoMeta>(entries.items[0])
    if (fields.ogImage?.url) {
      fields.ogImage.url = withWebP(fields.ogImage.url)
    }
    return fields
  } catch {
    return null
  }
}

export async function getStatBlocks(): Promise<StatBlock[]> {
  const client = getClient()
  if (!client) return stubStats as StatBlock[]
  try {
    const entries = await client.getEntries({
      content_type: 'statBlock',
      order: ['fields.order'],
    })
    if (!entries.items.length) return stubStats as StatBlock[]
    return entries.items.map((e) => extractFields<StatBlock>(e))
  } catch {
    return stubStats as StatBlock[]
  }
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const client = getClient()
  if (!client) return stubPlans as unknown as PricingPlan[]
  try {
    const entries = await client.getEntries({ content_type: 'pricingPlan' })
    if (!entries.items.length) return stubPlans as unknown as PricingPlan[]
    return entries.items.map((e) => extractFields<PricingPlan>(e))
  } catch {
    return stubPlans as unknown as PricingPlan[]
  }
}

export async function getPromoBanner(): Promise<PromoBanner | null> {
  const client = getClient()
  if (!client) return stubBanner as PromoBanner
  try {
    const entries = await client.getEntries({ content_type: 'promoBanner', limit: 1 })
    if (!entries.items.length) return stubBanner as PromoBanner
    return extractFields<PromoBanner>(entries.items[0])
  } catch {
    return stubBanner as PromoBanner
  }
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  const client = getClient()
  if (!client) return (stubPosts as BlogPost[]).slice(0, limit)
  try {
    const entries = await client.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishDate'],
      limit,
    })
    if (!entries.items.length) return (stubPosts as BlogPost[]).slice(0, limit)
    return entries.items.map((e) => extractFields<BlogPost>(e))
  } catch {
    return (stubPosts as BlogPost[]).slice(0, limit)
  }
}
