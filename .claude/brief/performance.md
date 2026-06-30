# Performance

- Target Lighthouse score: 90+ on mobile
- Images: use `next/image` with explicit `width`/`height` or `fill` — no raw `<img>` tags
- Fonts: use `next/font` — no external font `<link>` tags
- No large client-side bundles — keep `'use client'` components lean
- Contentful images: always request WebP via the Contentful Image API (`?fm=webp`)
