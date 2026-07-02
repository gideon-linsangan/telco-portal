# Story: Sidebar

**Story ID:** TN-010
**Component:** `Sidebar.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Sidebar"

---

## Story

As an authenticated TelcoNow customer
I want a sidebar with navigation links
So that I can move between dashboard sections

---

## Acceptance criteria

### Happy path

```
Given an authenticated user views the dashboard
When the Sidebar renders
Then display the TelcoNow logo at the top
And display the primary nav items below the logo
And highlight the nav item matching the current route as active
And display the UserChip with the user's name and plan name at the bottom
And display a logout button at the bottom
⚠ Uncertain: exact nav item labels and icons — confirm against design file
```

```
Given a user clicks a nav item
When the link is activated
Then navigate to the corresponding dashboard section
And update the active state to reflect the new route
```

```
Given a user clicks the logout button
When the logout Server Action is called
Then delete the session cookie
And redirect to /login
```

### Loading state

```
Given the component has no data dependency
Then no skeleton or loading state is required
And the sidebar renders immediately with the layout
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

---

## Out of scope

- Collapsible or mini-rail sidebar variant
- Mobile sidebar / drawer

---

## Notes for developer

- Sidebar is a Server Component — receives `name`, `planName`, `initials` as props from AppShell
- Use `SidebarNavItem` molecule for each nav item — already in registry
- Use `UserChip` molecule for the user identity block — already in registry
- Active state determined by comparing `usePathname()` — requires a client wrapper for nav items only
- Logout calls the `logout` Server Action from `src/app/actions/auth.ts`
- Background: `bg-brand-deep`
