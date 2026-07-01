# Story: Hero Section

**Story ID:** TN-003
**Component:** `HeroSection.tsx`
**Design reference:** `TelcoNow Homepage.dc.html` → "Hero"

---

## Story

As a visitor landing on the TelcoNow homepage
I want to see a compelling hero section with the brand proposition and a clear call to action
So that I understand what TelcoNow offers and can take the next step

---

## Acceptance criteria

### Happy path

```
Given a visitor lands on the homepage
When the hero section renders
Then display the announcement pill with label "5G Now Live Nationwide"
And display the heading "Australia's fastest 5G network."
And display the subheading "Flexible plans. No lock-in contracts. Cancel any time."
And display a "View plans" primary button and a "Check coverage" ghost button
And display the network illustration on the right side
And the section background uses bg-brand-deep
```

```
Given a visitor clicks "View plans"
When the button is clicked
Then navigate to the plans section or plans page
⚠ Uncertain: exact destination route — confirm before building
```

```
Given a visitor clicks "Check coverage"
When the button is clicked
Then navigate to the coverage page or tool
⚠ Uncertain: exact destination route — confirm before building
```

### Loading state

```
Given the component has no data dependency
Then no skeleton or loading state is required
And the hero renders immediately on page load
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given the viewport is narrow (mobile)
Then the illustration is hidden or repositioned so the text remains readable
⚠ Uncertain: exact mobile layout — confirm with design before building
```

---

## Out of scope

- Trust stats bar below the hero (covered by TrustBar component)
- Animated transitions on the illustration
- Video background variant

---

## Notes for developer

- No data fetching — static render only
- `AnnouncementPill` molecule is already in the registry — import it, do not rebuild
- "View plans" uses `Button` atom with `variant="primary"` and `size="lg"`
- "Check coverage" uses `Button` atom with `variant="ghost-hero"` and `size="lg"`
- Network illustration is an inline SVG — extract to `/public/icons/` or a dedicated component
