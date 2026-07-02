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
  if (!SPACE || !TOKEN) {
    console.warn(`[Contentful] Missing env vars — falling back to stub for "${contentType}"`)
    return []
  }

  const qs = new URLSearchParams({ content_type: contentType, ...params }).toString()
  console.log(`[Contentful] Fetching "${contentType}"`)

  const res = await fetch(`${BASE}/entries?${qs}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error(`[Contentful] HTTP ${res.status} for "${contentType}" — falling back to stub`)
    return []
  }

  const data: CmaResponse = await res.json()
  const count = data.items?.length ?? 0
  console.log(`[Contentful] "${contentType}" → ${count} item(s)`)
  return data.items ?? []
}

function f<T>(entry: CmaEntry, name: string): T {
  return (entry.fields[name]?.['en-US'] ?? null) as T
}

export async function getHero(): Promise<HeroData> {
  try {
    const items = await getEntries('homepageHero', { limit: '1' })
    if (items.length > 0) {
      console.log('[Contentful] hero → Contentful ✓')
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
  } catch (err) { console.error('[Contentful] getHero error:', err) }
  console.warn('[Contentful] hero → stub fallback')
  return (await import('@/stubs/hero.json')).default as HeroData
}

export async function getFeatures(): Promise<FeatureBlock[]> {
  try {
    const items = await getEntries('featureBlock')
    if (items.length > 0) {
      console.log('[Contentful] features → Contentful ✓')
      return items.map(item => ({
        icon:     f<string>(item, 'icon'),
        title:    f<string>(item, 'title'),
        bodyCopy: f<string>(item, 'bodyCopy'),
      }))
    }
  } catch (err) { console.error('[Contentful] getFeatures error:', err) }
  console.warn('[Contentful] features → stub fallback')
  return (await import('@/stubs/features.json')).default as FeatureBlock[]
}

export async function getStats(): Promise<StatBlock[]> {
  try {
    const items = await getEntries('statBlock', { order: 'fields.order' })
    if (items.length > 0) {
      console.log('[Contentful] stats → Contentful ✓')
      return items.map(item => ({
        value: f<string>(item, 'value'),
        label: f<string>(item, 'label'),
        order: f<number>(item, 'order'),
      }))
    }
  } catch (err) { console.error('[Contentful] getStats error:', err) }
  console.warn('[Contentful] stats → stub fallback')
  return (await import('@/stubs/stats.json')).default as StatBlock[]
}

export async function getPlans(): Promise<PricingPlan[]> {
  try {
    const items = await getEntries('pricingPlan')
    if (items.length > 0) {
      console.log('[Contentful] plans → Contentful ✓')
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
  } catch (err) { console.error('[Contentful] getPlans error:', err) }
  console.warn('[Contentful] plans → stub fallback')
  return (await import('@/stubs/plans.json')).default as PricingPlan[]
}

export async function getPromoBanner(): Promise<PromoBanner> {
  try {
    const items = await getEntries('promoBanner', { limit: '1' })
    if (items.length > 0) {
      console.log('[Contentful] promoBanner → Contentful ✓')
      const item = items[0]
      return {
        heading:  f<string>(item, 'heading'),
        body:     f<string>(item, 'body'),
        ctaLabel: f<string>(item, 'ctaLabel'),
        ctaHref:  f<string>(item, 'ctaHref'),
      }
    }
  } catch (err) { console.error('[Contentful] getPromoBanner error:', err) }
  console.warn('[Contentful] promoBanner → stub fallback')
  return (await import('@/stubs/banner.json')).default as PromoBanner
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const items = await getEntries('blogPost', { order: '-fields.publishDate', limit: '3' })
    if (items.length > 0) {
      console.log('[Contentful] blogPosts → Contentful ✓')
      return items.map(item => ({
        category:    f<string>(item, 'category'),
        title:       f<string>(item, 'title'),
        excerpt:     f<string>(item, 'excerpt'),
        author:      f<string>(item, 'author'),
        publishDate: f<string>(item, 'publishDate'),
        slug:        f<string>(item, 'slug'),
      }))
    }
  } catch (err) { console.error('[Contentful] getBlogPosts error:', err) }
  console.warn('[Contentful] blogPosts → stub fallback')
  return (await import('@/stubs/posts.json')).default as BlogPost[]
}
