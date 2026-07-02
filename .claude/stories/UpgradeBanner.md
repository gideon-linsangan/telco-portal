# Story: Upgrade Banner

**Story ID:** TN-018
**Component:** `UpgradeBanner.tsx`
**Design reference:** `TelcoNow Dashboard.dc.html` → "Upgrade Banner"

---

## Story

As an authenticated TelcoNow customer on a non-Max plan
I want to see a prompt to upgrade my plan
So that I'm aware of higher-tier options available to me

---

## Acceptance criteria

### Happy path

```
Given an authenticated user on the "Starter" or "Plus" plan views the dashboard
When UpgradeBanner renders
Then display a promotional heading encouraging an upgrade
And display supporting body copy
And display a CTA button linking to the plans page or upgrade flow
⚠ Uncertain: exact heading, body copy, and CTA label — confirm against design file
⚠ Uncertain: CTA destination — confirm before wiring the link
```

```
Given an authenticated user on the "Max" plan views the dashboard
When UpgradeBanner renders
Then do not display the banner
⚠ Uncertain: whether plan-conditional rendering is in scope — confirm before building
```

### Loading state

```
Given the component has no data dependency
Then no skeleton or loading state is required
And the banner renders immediately
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

---

## Out of scope

- Actual plan upgrade flow (would be a separate story)
- Personalised upgrade messaging based on usage data

---

## Notes for developer

- ⚠ Uncertain: whether this component receives the current plan tier as a prop or reads from session — confirm before building
- If plan-conditional rendering is confirmed, receive `planTier` as a prop from the dashboard page (which already fetches account data)
- No stub file — content is static; copy must be confirmed from the design file before hardcoding
