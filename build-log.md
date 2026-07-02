# Build Log

## Setup checklist

- [x] `npm run dev` running locally
- [x] Vercel URL live
- [x] `.env.local` has Contentful keys
- [x] `tailwind.config.ts` has brand tokens
- [x] `component-registry.md` copied to `src/ui/`

## TN-004 — TrustBar

- [x] `src/components/TrustBar.tsx` — stat strip between hero and features
- Data: imported directly from `src/stubs/stats.json` (Server Component)
- 3 stats in a horizontal row, divided by `divide-x`, white background, `border-b`
- Value: `Text variant="metric" color="brand-signature"`, Label: `Text variant="label" color="slate"`

## TN-005 — PlansSection

- [x] `src/app/api/plans/route.ts` — stub passthrough
- [x] `src/types/plans.ts` — `Plan` interface
- [x] `src/hooks/usePlans.ts` — status-union hook with cancellation
- [x] `src/components/ui/ErrorState.tsx` — reusable error state (message + retry)
- [x] `src/components/PlansSection.tsx` — `'use client'`, 3-column grid
- Loading: three `PlanCardSkeleton` placeholders; Error: `ErrorState` with reload retry
- Featured plan (`brand.deep` background) visually elevated; `Badge variant="purple"` for label

## TN-006 — PromoBanner

- [x] `src/components/PromoBanner.tsx` — static Server Component, 17 lines JSX
- Data: imported directly from `src/stubs/banner.json`
- Full-width `bg-brand-signature` strip with heading, body, white CTA button

## TN-007 — FeatureBlocks

- [x] `src/components/FeatureBlocks.tsx` — Server Component, 3-column card grid
- Data: imported directly from `src/stubs/features.json`
- Cards follow standard card pattern; emoji icon, h3 title, body copy

## TN-008 — BlogSection

- [x] `src/components/BlogSection.tsx` — Server Component, 3-column card grid
- Data: imported directly from `src/stubs/posts.json`
- Cards are `NextLink` wrappers; date formatted with `Intl.DateTimeFormat`; category `Badge variant="neutral"`
- Hover: `border-brand-signature/40`, title shifts to `text-brand-signature`

## TN-009 — Homepage wired

- [x] `src/app/page.tsx` — assembles all 7 homepage sections in order:
  SiteHeader → HeroSection → TrustBar → FeatureBlocks → PlansSection → PromoBanner → BlogSection → SiteFooter

## Contentful integration

- [x] `src/types/contentful.ts` — typed interfaces for all 7 content models (HeroData, FeatureBlock, StatBlock, PricingPlan, PromoBanner, BlogPost, SeoMeta)
- [x] `src/lib/contentful.ts` — Management API client (CFPAT) with per-content-type stub fallback; `cache: 'no-store'` on every fetch
- [x] Content types and entries seeded in Contentful space `pjbi9mgz7500` (ATCP Training - Space 1)
- [x] `src/app/page.tsx` rewritten as async Server Component; `export const dynamic = 'force-dynamic'` to prevent static prerender
- [x] All homepage components converted to accept typed data props (no more direct stub imports or client-side hooks)
- [x] `PlansSection` converted from `'use client'` hook pattern to Server Component receiving `data` prop
- [x] Vercel env vars set: `CONTENTFUL_SPACE_ID`, `CONTENTFUL_DELIVERY_TOKEN` (CFPAT)
- [x] BOM (`U+FEFF`) stripped from both env vars at read time — root cause of silent fallback-to-stub on Vercel
- [x] Console logging added to `src/lib/contentful.ts` — logs source (Contentful ✓ or stub fallback) and any errors per content type
- **Confirmed live on Vercel:** all 6 content types served from Contentful (verified via `vercel logs`)
- **Note:** `CONTENTFUL_DELIVERY_TOKEN` env var holds a CFPAT — do not replace with a Delivery API token; other team members rely on it

## Next up

- [ ] Login page `/login` — `useActionState`, Server Action `src/app/actions/auth.ts`
- [ ] Auth middleware `proxy.ts` — JWT validation, redirect to `/login` if no session
- [ ] Dashboard `/dashboard` — 7 card components: AccountCard, BillingCard, UsageMeter, UsageHistoryChart, ActivityFeed, TicketsCard, AddonsCard
