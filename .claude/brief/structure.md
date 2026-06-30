# Project Structure

```
/app
  /(public)         # Unauthenticated routes
    /page.tsx       # Homepage
    /login/page.tsx
  /(dashboard)      # Auth-gated routes
    /layout.tsx     # Auth check — redirect to /login if no session
    /page.tsx       # Dashboard home
/components
  /ui               # Generic, reusable primitives (Button, Card, Input...)
  /layout           # Header, Footer, Nav
  /dashboard        # Dashboard-specific components
  /homepage         # Homepage-specific components
/lib
  /contentful.ts    # Contentful client + typed fetch helpers
  /auth.ts          # NextAuth config
  /api              # Server-side data fetching utilities
/types              # Shared TypeScript types and Contentful content model types
/docs               # Per-topic project documentation
```
