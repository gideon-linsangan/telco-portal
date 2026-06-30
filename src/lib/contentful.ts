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
  if (!client) return null
  const entries = await client.getEntries({ content_type: 'homepageHero', limit: 1 })
  if (!entries.items.length) return null
  const fields = extractFields<HomepageHero>(entries.items[0])
  if (fields.backgroundImage?.url) {
    fields.backgroundImage.url = withWebP(fields.backgroundImage.url)
  }
  return fields
}

export async function getFeatureBlocks(): Promise<FeatureBlock[]> {
  const client = getClient()
  if (!client) return []
  const entries = await client.getEntries({ content_type: 'featureBlock' })
  return entries.items.map((e) => extractFields<FeatureBlock>(e))
}

export async function getSeoMeta(pageSlug: string): Promise<SeoMeta | null> {
  const client = getClient()
  if (!client) return null
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
}

export async function getStatBlocks(): Promise<StatBlock[]> {
  const client = getClient()
  if (!client) return []
  const entries = await client.getEntries({
    content_type: 'statBlock',
    order: ['fields.order'],
  })
  return entries.items.map((e) => extractFields<StatBlock>(e))
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const client = getClient()
  if (!client) return []
  const entries = await client.getEntries({ content_type: 'pricingPlan' })
  return entries.items.map((e) => extractFields<PricingPlan>(e))
}

export async function getPromoBanner(): Promise<PromoBanner | null> {
  const client = getClient()
  if (!client) return null
  const entries = await client.getEntries({ content_type: 'promoBanner', limit: 1 })
  if (!entries.items.length) return null
  return extractFields<PromoBanner>(entries.items[0])
}

export async function getRecentBlogPosts(limit = 3): Promise<BlogPost[]> {
  const client = getClient()
  if (!client) return []
  const entries = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
    limit,
  })
  return entries.items.map((e) => extractFields<BlogPost>(e))
}
