import type {
  HeroData,
  FeatureBlock,
  StatBlock,
  PricingPlan,
  PromoBanner,
  BlogPost,
} from '@/types/contentful'

const SPACE = process.env.CONTENTFUL_SPACE_ID
const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN
const BASE = `https://api.contentful.com/spaces/${SPACE}/environments/master`

interface CmaEntry {
  sys: { id: string }
  fields: Record<string, Record<string, unknown>>
}

interface CmaResponse {
  items: CmaEntry[]
}

async function getEntries(contentType: string, params: Record<string, string> = {}): Promise<CmaEntry[]> {
  if (!SPACE || !TOKEN) return []

  const qs = new URLSearchParams({ content_type: contentType, ...params }).toString()
  const res = await fetch(`${BASE}/entries?${qs}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: 'no-store',
  })

  if (!res.ok) return []

  const data: CmaResponse = await res.json()
  return data.items ?? []
}

function f<T>(entry: CmaEntry, name: string): T {
  return (entry.fields[name]?.['en-US'] ?? null) as T
}

export async function getHero(): Promise<HeroData> {
  try {
    const items = await getEntries('homepageHero', { limit: '1' })
    if (items.length > 0) {
      const item = items[0]
      return {
        badgeText:    f(item, 'badgeText'),
        headline:     f(item, 'headline'),
        subheadline:  f(item, 'subheadline'),
        primaryCta:   f(item, 'primaryCta'),
        secondaryCta: f(item, 'secondaryCta'),
        backgroundImage: f(item, 'backgroundImage') ?? undefined,
      }
    }
  } catch { /* fall through */ }
  return (await import('@/stubs/hero.json')).default as HeroData
}

export async function getFeatures(): Promise<FeatureBlock[]> {
  try {
    const items = await getEntries('featureBlock')
    if (items.length > 0) {
      return items.map(item => ({
        icon:     f<string>(item, 'icon'),
        title:    f<string>(item, 'title'),
        bodyCopy: f<string>(item, 'bodyCopy'),
      }))
    }
  } catch { /* fall through */ }
  return (await import('@/stubs/features.json')).default as FeatureBlock[]
}

export async function getStats(): Promise<StatBlock[]> {
  try {
    const items = await getEntries('statBlock', { order: 'fields.order' })
    if (items.length > 0) {
      return items.map(item => ({
        value: f<string>(item, 'value'),
        label: f<string>(item, 'label'),
        order: f<number>(item, 'order'),
      }))
    }
  } catch { /* fall through */ }
  return (await import('@/stubs/stats.json')).default as StatBlock[]
}

export async function getPlans(): Promise<PricingPlan[]> {
  try {
    const items = await getEntries('pricingPlan')
    if (items.length > 0) {
      return items.map(item => ({
        name:      f<string>(item, 'name'),
        price:     f<number>(item, 'price'),
        tagline:   f<string>(item, 'tagline'),
        features:  f<string[]>(item, 'features'),
        ctaLabel:  f<string>(item, 'ctaLabel'),
        ctaHref:   f<string>(item, 'ctaHref'),
        featured:  f<boolean>(item, 'featured'),
        badgeText: f<string | null>(item, 'badgeText'),
      }))
    }
  } catch { /* fall through */ }
  return (await import('@/stubs/plans.json')).default as PricingPlan[]
}

export async function getPromoBanner(): Promise<PromoBanner> {
  try {
    const items = await getEntries('promoBanner', { limit: '1' })
    if (items.length > 0) {
      const item = items[0]
      return {
        heading:  f<string>(item, 'heading'),
        body:     f<string>(item, 'body'),
        ctaLabel: f<string>(item, 'ctaLabel'),
        ctaHref:  f<string>(item, 'ctaHref'),
      }
    }
  } catch { /* fall through */ }
  return (await import('@/stubs/banner.json')).default as PromoBanner
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const items = await getEntries('blogPost', { order: '-fields.publishDate', limit: '3' })
    if (items.length > 0) {
      return items.map(item => ({
        category:    f<string>(item, 'category'),
        title:       f<string>(item, 'title'),
        excerpt:     f<string>(item, 'excerpt'),
        author:      f<string>(item, 'author'),
        publishDate: f<string>(item, 'publishDate'),
        slug:        f<string>(item, 'slug'),
      }))
    }
  } catch { /* fall through */ }
  return (await import('@/stubs/posts.json')).default as BlogPost[]
}
