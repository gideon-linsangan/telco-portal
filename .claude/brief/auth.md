# Authentication

- Provider: Credentials — stubbed with a hardcoded user/password (no real API call)
- Stub credentials: `user@telconow.com.au` / `password123` (hardcoded in `/lib/auth.ts`)
- Session strategy: JWT (no database adapter)

## Session Shape

```ts
interface Session {
  user: {
    id: string
    name: string
    email: string
    accountNumber: string
  }
}
```

## Middleware

- `middleware.ts` intercepts all `/dashboard/*` requests
- Calls `/api/auth/validate` via `fetch` to verify the session
- `/api/auth/validate` reads the JWT from the request cookie and returns `200` (valid) or `401` (invalid/missing)
- `401` → redirect to `/login`
- `200` → request proceeds

**Important:** Middleware runs on the Edge runtime — it cannot use Node.js APIs. Keep the validate call a simple `fetch` only. All session/token logic stays inside `/api/auth/validate`, not in middleware itself.

## Post-login

- Successful login redirects to `/dashboard`
- Failed login shows inline error: "Invalid email or password"

## Flag before proceeding

- Any change to the session shape
- Any change to the auth flow or middleware logic

## Session field sources (confirmed)

- `id`, `email` — from the stub credentials check in `/lib/auth.ts`
- `name`, `accountNumber` — **not** sourced from `account.json` or any mock data file. Generated as
  hardcoded fake values directly in `/lib/auth.ts`, alongside the stub credentials (e.g.
  `name: "Alex Chen"`, `accountNumber: "TN-000001"`). Update both together if stub credentials change.
  **Format not yet specified by the business** — `"TN-000001"` is a placeholder, not a confirmed
  account number pattern. Fine to use as-is until a real format is provided.
