import type {
  HeroData,
  FeatureBlock,
  StatBlock,
  PricingPlan,
  PromoBanner,
  BlogPost,
} from '@/types/contentful'
import type { AccountData } from '@/types/account'
import type { UsageData } from '@/types/usage'
import type { BillingData } from '@/types/billing'
import type { ActivityData } from '@/types/activity'
import type { TicketsData } from '@/types/tickets'
import type { AddonsData } from '@/types/addons'
import type { UsageHistoryData, UsageMonth } from '@/types/usage-history'

// Strip BOM (U+FEFF) that can appear when env vars are copy-pasted from certain editors
const SPACE = process.env.CONTENTFUL_SPACE_ID?.replace(/﻿/g, '')
const TOKEN = process.env.CONTENTFUL_DELIVERY_TOKEN?.replace(/﻿/g, '')
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
  console.log(`[Contentful] space="${SPACE}" token_prefix="${TOKEN.slice(0, 8)}..."`)


  const qs = new URLSearchParams({ content_type: contentType, ...params }).toString()
  console.log(`[Contentful] Fetching "${contentType}"`)

  const res = await fetch(`${BASE}/entries?${qs}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error(`[Contentful] HTTP ${res.status} for "${contentType}": ${body.slice(0, 200)}`)
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

// ── Dashboard data ────────────────────────────────────────────────────────────

export async function getAccount(): Promise<AccountData> {
  try {
    const items = await getEntries('customerAccount', { limit: '1' })
    if (items.length > 0) {
      const item = items[0]
      return {
        planName:       f<string>(item, 'planName'),
        dataAllowanceGB: f<number>(item, 'dataAllowanceGB'),
        monthlyCost:    f<number>(item, 'monthlyCost'),
        renewalDate:    f<string>(item, 'renewalDate'),
        contractType:   f<string>(item, 'contractType'),
        status:         f<AccountData['status']>(item, 'status'),
      }
    }
  } catch (err) { console.error('[Contentful] getAccount error:', err) }
  console.warn('[Contentful] account → stub fallback')
  return (await import('@/stubs/account.json')).default as AccountData
}

export async function getUsage(): Promise<UsageData> {
  try {
    const items = await getEntries('customerUsage', { limit: '1' })
    if (items.length > 0) {
      const item = items[0]
      return {
        usedGB:         f<number>(item, 'usedGB'),
        totalGB:        f<number>(item, 'totalGB'),
        cycleStartDate: f<string>(item, 'cycleStartDate'),
        cycleEndDate:   f<string>(item, 'cycleEndDate'),
        overageRate:    f<number>(item, 'overageRate'),
      }
    }
  } catch (err) { console.error('[Contentful] getUsage error:', err) }
  console.warn('[Contentful] usage → stub fallback')
  return (await import('@/stubs/usage.json')).default as UsageData
}

export async function getBilling(): Promise<BillingData> {
  try {
    const items = await getEntries('customerBilling', { limit: '1' })
    if (items.length > 0) {
      const item = items[0]
      return {
        nextPayment: {
          amount: f<number>(item, 'nextPaymentAmount'),
          date:   f<string>(item, 'nextPaymentDate'),
        },
        lastPayment: {
          amount: f<number>(item, 'lastPaymentAmount'),
          date:   f<string>(item, 'lastPaymentDate'),
          status: f<BillingData['lastPayment']['status']>(item, 'lastPaymentStatus'),
        },
        paymentMethod: {
          type:  f<string>(item, 'paymentMethodType'),
          last4: f<string>(item, 'paymentMethodLast4'),
        },
      }
    }
  } catch (err) { console.error('[Contentful] getBilling error:', err) }
  console.warn('[Contentful] billing → stub fallback')
  return (await import('@/stubs/billing.json')).default as BillingData
}

export async function getActivity(): Promise<ActivityData> {
  try {
    const items = await getEntries('activityItem', { order: '-fields.timestamp' })
    if (items.length > 0) {
      return items.map(item => ({
        id:          f<string>(item, 'activityId'),
        type:        f<ActivityData[number]['type']>(item, 'type'),
        description: f<string>(item, 'description'),
        detail:      f<string>(item, 'detail'),
        timestamp:   f<string>(item, 'timestamp'),
        amount:      f<number | null>(item, 'amount') ?? null,
        status:      f<string>(item, 'status'),
      }))
    }
  } catch (err) { console.error('[Contentful] getActivity error:', err) }
  console.warn('[Contentful] activity → stub fallback')
  const raw = (await import('@/stubs/activity.json')).default as Array<{
    id: string; type: ActivityData[number]['type']; description: string;
    detail: string; timestamp: string; amount: number | null; status: string
  }>
  return raw
}

export async function getTickets(): Promise<TicketsData> {
  try {
    const items = await getEntries('supportTicket', { order: '-fields.updatedAt' })
    if (items.length > 0) {
      return items.map(item => ({
        id:        f<string>(item, 'ticketId'),
        subject:   f<string>(item, 'subject'),
        status:    f<TicketsData[number]['status']>(item, 'status'),
        priority:  f<TicketsData[number]['priority']>(item, 'priority'),
        createdAt: f<string>(item, 'createdAt'),
        updatedAt: f<string>(item, 'updatedAt'),
      }))
    }
  } catch (err) { console.error('[Contentful] getTickets error:', err) }
  console.warn('[Contentful] tickets → stub fallback')
  const raw = (await import('@/stubs/tickets.json')).default as Array<{
    id: string; subject: string; status: TicketsData[number]['status'];
    priority: TicketsData[number]['priority']; createdAt: string; updatedAt: string
  }>
  return raw
}

export async function getAddons(): Promise<AddonsData> {
  try {
    const items = await getEntries('customerAddon')
    if (items.length > 0) {
      return items.map(item => ({
        id:           f<string>(item, 'addonId'),
        name:         f<string>(item, 'name'),
        description:  f<string>(item, 'description'),
        price:        f<number>(item, 'price'),
        billingCycle: f<AddonsData[number]['billingCycle']>(item, 'billingCycle'),
        active:       f<boolean>(item, 'active'),
      }))
    }
  } catch (err) { console.error('[Contentful] getAddons error:', err) }
  console.warn('[Contentful] addons → stub fallback')
  const raw = (await import('@/stubs/addons.json')).default as Array<{
    id: string; name: string; description: string; price: number;
    billingCycle: AddonsData[number]['billingCycle']; active: boolean
  }>
  return raw
}

export async function getUsageHistory(): Promise<UsageHistoryData> {
  try {
    const items = await getEntries('usageHistory', { limit: '1' })
    if (items.length > 0) {
      const item = items[0]
      return {
        totalGB: f<number>(item, 'totalGB'),
        months:  f<UsageMonth[]>(item, 'months'),
      }
    }
  } catch (err) { console.error('[Contentful] getUsageHistory error:', err) }
  console.warn('[Contentful] usageHistory → stub fallback')
  return (await import('@/stubs/usage-history.json')).default as UsageHistoryData
}
