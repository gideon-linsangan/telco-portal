# Story: Site Header

**Story ID:** TN-001
**Component:** `SiteHeader.tsx`
**Design reference:** `TelcoNow Homepage.dc.html` → "Header"

---

## Story

As a visitor to the TelcoNow website
I want to see a consistent site header with navigation and call to action buttons
So that I can find my way around the site and log in or get started

---

## Acceptance criteria

### Happy path

```
Given a visitor lands on any public page
When the page loads
Then display the TelcoNow wordmark on the left — "Telco" in white, "Now" in text-brand-light
And display navigation links centred: "Plans", "Coverage", "Business", "Support"
And display a "Log in" ghost button and a "Get started" primary button on the right
And the header background uses bg-brand-deep
And the header is sticky — it remains at the top of the viewport on scroll
And a subtle bottom border separates the header from the page content
```

```
Given a visitor clicks "Log in"
When clicked
Then navigate to the login page
```

```
Given a visitor clicks "Get started"
When clicked
Then navigate to the plans or sign-up page
⚠ Uncertain: exact destination route — confirm before building
```

```
Given a visitor is on a page matching a nav link's route
When the header renders
Then that nav link appears in the active state
```

### Loading state

```
Given the component has no data dependency
Then no skeleton or loading state is required
And the header renders immediately on page load
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given the viewport is narrow (mobile)
Then the navigation links collapse
⚠ Uncertain: mobile nav behaviour (hamburger vs hidden) — confirm with design before building
```

---

## Out of scope

- Authenticated header state (different nav for logged-in users — covered by AppShell/Sidebar)
- Mobile nav menu interaction detail
- Dropdown or mega-menu navigation

---

## Notes for developer

- No data fetching — render immediately, no skeleton needed
- `NavLink` molecule is already in the registry — import it, do not rebuild
- "Log in" uses `Button` atom with `variant="ghost-white"`
- "Get started" uses `Button` atom with `variant="primary"`
- Active nav link detection should derive from current route, not hardcoded state
