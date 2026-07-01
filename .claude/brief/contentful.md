# Contentful

- **Space:** `[SPACE_ID]` — add to `.env.local` as `CONTENTFUL_SPACE_ID`
- **Delivery API key:** `CONTENTFUL_DELIVERY_TOKEN` (production/published content)
- **Preview API key:** `CONTENTFUL_PREVIEW_TOKEN` (draft content in dev/preview)

## Stub Fallback

All fetch helpers in `src/lib/contentful.ts` fall back to stub JSON files when:
- Contentful env vars are not set, **or**
- A content type doesn't exist yet in the space (via `try/catch`)

This means the homepage renders correctly out of the box without a Contentful account configured. Stub files are in `src/stubs/`: `hero.json`, `features.json`, `stats.json`, `plans.json`, `banner.json`, `posts.json`.

When real Contentful content is added, the live data takes over automatically — no code change needed.

## Content Models

| Model | Fields |
|---|---|
| `homepageHero` | `headline`, `subheadline`, `badgeText`, `primaryCta { label, href }`, `secondaryCta { label, href }`, `backgroundImage` |
| `featureBlock` | `icon`, `title`, `bodyCopy` |
| `seoMeta` | `title`, `description`, `ogImage` |
| `statBlock` | `value`, `label`, `order` |
| `pricingPlan` | `name`, `price`, `tagline`, `features[]`, `ctaLabel`, `ctaHref`, `featured`, `badgeText` (optional) |
| `promoBanner` | `heading`, `body`, `ctaLabel`, `ctaHref` |
| `blogPost` | `category`, `title`, `excerpt`, `author`, `publishDate`, `slug` |

## Rules

- All Contentful fetches live in `src/lib/contentful.ts` — no direct API calls from components
- Data fetching is server-side only (Next.js Server Components)
- Always request WebP via the Contentful Image API (`?fm=webp`)

## Flag before proceeding

- Any assumption about content model field names not listed above

## Additional detail

- **`homepageHero`** has `primaryCta` and `secondaryCta` objects (not a single CTA), plus `badgeText` for the pill above the headline
- **`pricingPlan.featured`** is `true` only for the Plus plan — drives highlighted border, "Most popular" badge, elevated shadow
- **`featureBlock.bodyCopy`** — field name is `bodyCopy` (camelCase), not `body` or `body copy`
- **`promoBanner.ctaHref`** — included in the model (required for the CTA link to work)
- **Blog homepage query:** 3 most recently published `blogPost` entries, sorted by `publishDate` descending. No manual curation, no featured flag.
- **Footer is static** — hardcoded in the codebase, not Contentful-driven