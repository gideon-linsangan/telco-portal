# Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Contentful field names are assumed, not confirmed against the actual space | Build-time failures or silent content mismatches | Confirm field names before implementing Contentful fetches; flag any mismatch immediately |
| Stub auth credentials are hardcoded in `/lib/auth.ts` | Could accidentally ship to production | Replace with real auth before any production deploy; treat as a hard blocker |
| Middleware calls `/api/auth/validate` on every `/dashboard/*` request | Added latency from Vercel serverless cold starts | Monitor performance; revisit if latency becomes noticeable |
| No automated tests | No safety net for auth flow, session handling, or complex logic | Flag any logic complex enough to warrant tests, even though "no tests for now" is the current policy |
| ~~Design files are referenced but not linked or described anywhere~~ — **RESOLVED**: design files exist as `.dc.html` files in the project (`TelcoNow_Homepage_dc.html`, `TelcoNow_Login_dc.html`, `TelcoNow_Dashboard_dc.html`) and have been audited against the brief throughout | — | Closed |
| Preview vs production Contentful tokens | Wrong token in wrong environment could silently serve draft or stale content | Confirm Vercel environment variable config per environment before each deploy |
| ~~`/api/account` response shape was inferred~~ — **RESOLVED**: separate routes confirmed, shapes drafted | — | Closed — see `/brief/api-routes.md` and `/brief/typescript.md` |
| ~~7 separate mock JSON files, no decided routing strategy~~ — **RESOLVED**: separate routes per resource confirmed | — | Closed — see `/brief/api-routes.md` |
| ~~Session shape (`name`, `accountNumber`) had no source~~ — **RESOLVED**: hardcoded fake values generated in `/lib/auth.ts` alongside stub credentials | — | Closed — see `/brief/auth.md` |
| ~~Homepage had 5 sections with no matching Contentful model~~ — **RESOLVED**: all 4 new models approved, footer confirmed static, blog query confirmed as 3-most-recent | — | Closed — see `/brief/contentful.md` |
| ~~Derived dashboard values (% used, days remaining) — calculation location undecided~~ — **RESOLVED**: confirmed server-side in `/api/usage`, using server time | — | Closed — see `/brief/api-routes.md` |
| ~~Add-on toggle behavior undecided~~ — **RESOLVED**: confirmed UI-only, no persistence, no API route | — | Closed — see `/brief/pages.md` |
| Login page has dead links (`href="#"`) for forgot-password and get-started with no defined destination | Could be wired to nowhere or left broken without anyone noticing | **Deferred intentionally** — revisit before login page implementation begins |
| ~~No TypeScript interfaces defined for the 7 mock data shapes~~ — **RESOLVED**: drafted in `/brief/typescript.md` | — | Closed |
| ~~Union type values inferred only from stub data~~ — **RESOLVED**: accepted as-is, will widen if/when live data introduces new values | — | Closed — see `/brief/typescript.md` |
| ~~`accountNumber` format unspecified~~ — **RESOLVED**: placeholder format `"TN-000001"` accepted until a real pattern is provided | — | Closed — see `/brief/auth.md` |
