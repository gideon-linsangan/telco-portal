# Contentful

- **Space:** `[SPACE_ID]` — add to `.env.local` as `CONTENTFUL_SPACE_ID`
- **Delivery API key:** `CONTENTFUL_DELIVERY_TOKEN` (production/published content)
- **Preview API key:** `CONTENTFUL_PREVIEW_TOKEN` (draft content in dev)

## Content Models

| Model | Fields |
|---|---|
| `homepageHero` | headline, subheadline, badgeText, primaryCta { label, href }, secondaryCta { label, href }, backgroundImage |
| `featureBlock` | icon, title, body copy |
| `seoMeta` | title, description, og:image (used on all pages) |
| `statBlock` | value, label, order |
| `pricingPlan` | name, price, tagline, features[], ctaLabel, ctaHref, featured, badgeText (optional) |
| `promoBanner` | heading, body, ctaLabel |
| `blogPost` | category, title, excerpt, author, publishDate, slug |

## Rules

- All Contentful fetches live in `/lib/contentful.ts` — no direct API calls from components
- Data fetching is server-side only (Next.js Server Components or `generateStaticParams`)
- Always request WebP via the Contentful Image API (`?fm=webp`)

## Flag before proceeding

- Any assumption about content model field names not listed above

## Homepage content models — additional detail

The table above lists all confirmed fields. A few notes that don't fit a table:

- **`homepageHero`** was expanded from the original spec — it previously had a single `CTA` field;
  it now has separate `primaryCta` and `secondaryCta` objects, plus a new `badgeText` field for the
  small pill above the headline (e.g. "5G Now Live Nationwide").
- **`pricingPlan.featured`** is `true` only for the Plus plan — drives the highlighted border, "Most
  popular" badge, and elevated shadow styling in the design.
- **Blog homepage query:** fetch the 3 most recently published `blogPost` entries, sorted by
  `publishDate` descending. No manual curation, no featured flag on this model.
- **Footer is confirmed static** — brand tagline, Plans/Support/Legal link columns, and the
  copyright line are hardcoded in the codebase, not Contentful-driven.
