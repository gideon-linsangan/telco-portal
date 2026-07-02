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
