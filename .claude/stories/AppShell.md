# Story: App Shell

**Story ID:** TN-009
**Component:** `AppShell.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Dashboard layout"

---

## Story

As an authenticated TelcoNow customer
I want the dashboard to have a consistent layout with navigation
So that I can move between sections without losing context

---

## Acceptance criteria

### Happy path

```
Given an authenticated user navigates to /dashboard
When the page loads
Then render the Sidebar on the left
And render the main content area to the right of the sidebar
And apply the page background colour (bg-neutral-surface)
⚠ Uncertain: exact sidebar width — confirm against design file
```

```
Given a user with a valid session views the dashboard
When AppShell renders
Then display the authenticated user's name in the Sidebar via UserChip
And do not show any auth prompts
```

```
Given a user with no valid session accesses /dashboard
When the route is checked by proxy.ts
Then redirect to /login before AppShell renders
(Route protection is handled by proxy.ts — not by AppShell itself)
```

### Loading state

```
Given the component has no data dependency
Then no skeleton or loading state is required for AppShell itself
And each dashboard card within the main area manages its own loading state
```

### Error state

```
Given the component has no data dependency
Then no error state is required for AppShell
```

---

## Out of scope

- Mobile nav / hamburger menu
- Session expiry handling within AppShell (handled by proxy.ts)
- Route transition animations

---

## Notes for developer

- AppShell is a Server Component — it receives `children` and renders layout only
- Session is read via `verifySession()` from `src/lib/dal.ts` — pass `name` as prop to Sidebar
- Do not fetch session inside AppShell — `verifySession()` is React `cache()`-memoised
