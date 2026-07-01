# Authentication

- **Library: native `jose` JWT** — no NextAuth installed
- Provider: Credentials — stubbed with hardcoded user/password
- Stub credentials: `user@telconow.com.au` / `password123` (in `src/app/actions/auth.ts`)
- Session strategy: HS256 JWT, 7-day expiry, stored in an httpOnly cookie named `session`

## Stub User (hardcoded in `src/app/actions/auth.ts`)

```ts
const STUB_USER = {
  userId: 'usr_001',
  name: 'Alex Chen',
  email: 'user@telconow.com.au',
  accountNumber: 'TN-000001',
}
```

`name` and `accountNumber` are hardcoded fake values — not sourced from `account.json`. Update both together if stub credentials change. `TN-000001` is a placeholder format — not yet confirmed by the business.

## Session Shape (`src/types/session.ts`)

```ts
interface SessionPayload {
  userId: string
  name: string
  email: string
  accountNumber: string
  expiresAt: Date
}
```

## Auth Files

| File | Purpose |
|---|---|
| `src/lib/session.ts` | JWT helpers: `encrypt`, `decrypt`, `createSession`, `deleteSession`, `getSession` |
| `src/lib/dal.ts` | `verifySession()` — React `cache()` memoised; redirects to `/login` if no valid session |
| `src/app/actions/auth.ts` | `login` and `logout` Server Actions (`'use server'`) |

## Route Protection (`proxy.ts` at project root)

- **Node.js runtime — NOT Edge**
- Reads `session` cookie directly via `cookies()` from `next/headers`
- Decrypts JWT using `decrypt()` from `src/lib/session.ts`
- Protected routes: `/dashboard` (and all subroutes)
- Public-only routes: `/login` (redirects to `/dashboard` if already authenticated)
- Matcher excludes: `/api/*`, `/_next/*`, static assets, `favicon.ico`

No `/api/auth/validate` route exists — session is verified inline in `proxy.ts`.

## Post-login

- Successful login redirects to `/dashboard`
- Failed login returns `{ error: 'Invalid email or password' }` — shown inline in the form

## Login Form Pattern

- `'use client'` component
- Uses `useActionState(login, undefined)` from React
- Calls the `login` Server Action on form submit

## Flag before proceeding

- Any change to the session shape
- Any change to auth flow or route protection logic

## Session field sources (confirmed)

- `userId`, `email` — from the stub credentials check in `src/app/actions/auth.ts`
- `name`, `accountNumber` — hardcoded fake values in `src/app/actions/auth.ts`, not sourced from `account.json`. Update both together if stub credentials change. Format `"TN-000001"` is a placeholder until a real pattern is provided by the business.