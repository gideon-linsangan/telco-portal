# Vercel

- Three environments: `development`, `preview` (per-branch), `production`
- Preview deployments use `CONTENTFUL_PREVIEW_TOKEN`
- Production uses `CONTENTFUL_DELIVERY_TOKEN`
- Serverless functions only — no edge runtime unless explicitly decided
- No custom build commands beyond `next build`
