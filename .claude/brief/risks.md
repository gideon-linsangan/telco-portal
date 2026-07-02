# Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Contentful field names are assumed, not confirmed against the actual space | Build-time failures or silent content mismatches | Confirm field names before implementing Contentful fetches; flag any mismatch immediately |
| Stub auth credentials are hardcoded in `src/app/actions/auth.ts` | Could accidentally ship to production | Replace with real auth before any production deploy; treat as a hard blocker |
| No automated tests | No safety net for auth flow, session handling, or complex logic | Flag any logic complex enough to warrant tests, even though "no tests for now" is the current policy |
| Preview vs production Contentful tokens | Wrong token in wrong environment could silently serve draft or stale content | Confirm Vercel environment variable config per environment before each deploy |
| Login page has dead links (`href="#"`) for forgot-password and get-started with no defined destination | Could be wired to nowhere or left broken without anyone noticing | **Deferred intentionally** — revisit before login page implementation begins |

## Closed risks

| Risk | Resolution |
|---|---|
| Design files not linked | Resolved — `.dc.html` files exist in `.claude/designs/` |
| `/api/account` response shape inferred | Resolved — see `brief/api-routes.md` and `brief/typescript.md` |
| 7 mock JSON files, no routing strategy | Resolved — separate routes per resource confirmed |
| Session shape (`name`, `accountNumber`) had no source | Resolved — hardcoded in `src/app/actions/auth.ts` |
| Homepage had sections with no Contentful model | Resolved — all 7 models confirmed, footer static |
| Derived values (% used, days remaining) location undecided | Resolved — server-side in `/api/usage` using server time |
| Add-on toggle behavior undecided | Resolved — UI-only, no persistence, no API route |
| No TypeScript interfaces for mock data | Resolved — see `src/types/dashboard.ts` |
| Union type values inferred from stub data only | Resolved — accepted, will widen if live data adds new values |
| `accountNumber` format unspecified | Resolved — placeholder `"TN-000001"` accepted until business confirms |
| Middleware latency from `/api/auth/validate` call | Resolved — `proxy.ts` reads cookie directly, no extra request |