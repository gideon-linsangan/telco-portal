# Story: Promo Banner

**Story ID:** TN-006
**Component:** `PromoBanner.tsx`
**Design reference:** `TelcoNow Homepage.dc.html` → "Promo Banner"

---

## Story

As a visitor on the TelcoNow homepage
I want to see a referral promotion banner
So that I know I can earn a benefit by referring a friend

---

## Acceptance criteria

### Happy path

```
Given a visitor views the homepage
When the promo banner renders
Then display a gift icon on the left
And display the heading "Refer a friend, get one month free."
And display the subtext "Share your code. When they sign up, you both win."
And display a "Refer now" button on the right
And the banner background uses bg-brand-ghost
And the banner has a top and bottom border using border-brand-light
```

```
Given a visitor clicks "Refer now"
When the button is clicked
Then navigate to the referral page or flow
⚠ Uncertain: exact destination route — confirm before building
```

### Loading state

```
Given the component has no data dependency
Then no skeleton or loading state is required
And the banner renders immediately with the page
```

### Error state

```
Given the component has no data dependency
Then no error state is required
```

---

## Out of scope

- Personalised referral code display (requires auth — not shown on public homepage)
- Dismissing or hiding the banner

---

## Notes for developer

- No data fetching — static render only
- "Refer now" uses `Button` atom with `variant="primary"`
- Gift icon is an inline SVG — extract to `/public/icons/gift.svg`
