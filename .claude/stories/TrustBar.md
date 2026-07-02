# Story: Trust Bar

**Story ID:** TN-004
**Component:** `TrustBar.tsx`
**Design reference:** `TelcoNow Homepage.dc.html` → "Hero" (trust stats bar, below hero content)

---

## Story

As a visitor on the TelcoNow homepage
I want to see key trust statistics beneath the hero
So that I have confidence in TelcoNow's network and reputation

---

## Acceptance criteria

### Happy path

```
Given a visitor views the homepage
When the trust bar renders
Then display three statistics separated by vertical dividers:
  - "99.8%" with label "Network uptime"
  - "4.2M+" with label "Customers"
  - "★ 4.8" with label "Award-winning support"
And stat values are displayed in white
And stat labels are displayed in text-brand-light (uppercase, small)
And the bar sits directly below the hero content with a top border separator
And the background is bg-brand-deep (continuous with the hero section)
```

### Loading state

```
Given the component has no data dependency
Then no skeleton or loading state is required
And the trust bar renders immediately with the page
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

### Edge cases

```
Given the viewport is narrow (mobile)
Then the three stats stack or scroll horizontally without clipping
⚠ Uncertain: exact mobile layout — confirm with design before building
```

---

## Out of scope

- Dynamic or real-time statistics fetched from an API
- Animated counters

---

## Notes for developer

- No data fetching — values are hardcoded from the design
- Stat values use `Text` atom with `variant="metric"` and `color="white"`
- Stat labels use `Text` atom with `variant="label"` and `color="brand-light"`
