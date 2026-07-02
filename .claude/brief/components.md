# Components

- Prefer Server Components by default — add `'use client'` only when interactivity or browser APIs are needed
- One component per file
- Props must be typed — no implicit `any`
- Loading states: use Next.js `loading.tsx` files and `<Suspense>` boundaries
- Error states: use `error.tsx` at the route segment level

## Flag before proceeding

- If a component needs `'use client'` that wasn't expected to
