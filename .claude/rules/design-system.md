# TelcoNow — Design System Rules

> Read this file before building ANY component or touching ANY styles.
> All visual decisions — colours, spacing, typography, components — are governed here.
> The reference designs in `/designs/` implement these tokens exactly.

---

## Colour tokens

These are defined in `tailwind.config.ts` under `theme.extend.colors`.
Always use the Tailwind class — never hardcode a hex value.

### Brand

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `brand.signature` | `#A100FF` | `bg-brand-signature` / `text-brand-signature` | CTAs, links, active states, focus rings |
| `brand.deep` | `#460073` | `bg-brand-deep` | Header, sidebar, hero backgrounds |
| `brand.mid` | `#7500C0` | `bg-brand-mid` | Hover states on brand elements |
| `brand.light` | `#E5CCFF` | `bg-brand-light` | Badge fills, tinted surfaces, "Most popular" |
| `brand.ghost` | `#F5EEFF` | `bg-brand-ghost` | Page background tint, card fill variants |

### Neutrals

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `neutral.ink` | `#0F0F1A` | `text-neutral-ink` | Headings, primary body text |
| `neutral.slate` | `#4A4A5A` | `text-neutral-slate` | Secondary text, captions, metadata |
| `neutral.border` | `#E8E8F0` | `border-neutral-border` | Card borders, dividers, input borders |
| `neutral.surface` | `#F8F8FC` | `bg-neutral-surface` | Subtle page backgrounds |

### Semantic

| Token | Hex | Tailwind class | Usage |
|-------|-----|----------------|-------|
| `semantic.success` | `#00B388` | `text-semantic-success` / `bg-semantic-success` | Active status, paid, healthy states |
| `semantic.warning` | `#FF6B35` | `text-semantic-warning` / `bg-semantic-warning` | Approaching limits, due soon |
| `semantic.error` | `#E8002D` | `text-semantic-error` / `bg-semantic-error` | Failed, overdue, exceeded |
| `semantic.success-tint` | `#E6F7F3` | `bg-semantic-success-tint` | Badge backgrounds for success |
| `semantic.warning-tint` | `#FFF0EB` | `bg-semantic-warning-tint` | Badge backgrounds for warning |
| `semantic.error-tint` | `#FDEAEA` | `bg-semantic-error-tint` | Badge backgrounds for error |

---

## Typography

Font: **Inter** (loaded via `next/font/google`)
Never use system fonts directly — always use the Inter variable.

| Role | Size | Weight | Class |
|------|------|--------|-------|
| Display / hero | 48px | 700 | `text-5xl font-bold tracking-tight` |
| H1 | 32px | 700 | `text-3xl font-bold` |
| H2 | 24px | 600 | `text-2xl font-semibold` |
| H3 | 18px | 600 | `text-lg font-semibold` |
| Body | 15px | 400 | `text-[15px] leading-relaxed` |
| Caption / label | 12px | 500 | `text-xs font-medium uppercase tracking-wider` |
| Metric / stat | 28px | 700 | `text-[28px] font-bold` |

---

## Spacing

Use Tailwind's default spacing scale. These are the values used in the designs:

| Usage | Value | Tailwind |
|-------|-------|----------|
| Card padding | 24px | `p-6` |
| Section gap | 32px | `gap-8` |
| Component internal gap | 16px | `gap-4` |
| Tight internal gap | 8px | `gap-2` |
| Page horizontal padding | 32px | `px-8` |
| Page vertical padding | 32px | `py-8` |

---

## Border radius

| Usage | Value | Tailwind |
|-------|-------|----------|
| Cards | 12px | `rounded-xl` |
| Buttons | 8px | `rounded-lg` |
| Inputs | 8px | `rounded-lg` |
| Badges / pills | 9999px | `rounded-full` |
| Progress bars | 4px | `rounded` |

---

## Shadow

Cards use a purple-tinted shadow — not a grey shadow.

```
box-shadow: 0 1px 4px rgba(70, 0, 115, 0.06)
```

Tailwind: extend `boxShadow` in config as `card: '0 1px 4px rgba(70,0,115,0.06)'`
Usage: `shadow-card`

---

## Component patterns

### Card

Every card uses this exact pattern. Never deviate.

```tsx
<div className="bg-white border border-neutral-border rounded-xl shadow-card p-6">
  {/* content */}
</div>
```

### Primary button

```tsx
<button className="bg-brand-signature hover:bg-brand-mid text-white font-medium px-6 h-11 rounded-lg transition-colors">
  Label
</button>
```

### Ghost button

```tsx
<button className="border border-brand-signature text-brand-signature hover:bg-brand-ghost font-medium px-6 h-11 rounded-lg transition-colors">
  Label
</button>
```

### Status badge

Reusable component — lives at `src/components/ui/StatusBadge.tsx`.
**Check the component registry before rebuilding this.**

```tsx
type Status = 'active' | 'warning' | 'error' | 'pending'

const statusMap = {
  active:  { bg: 'bg-semantic-success-tint', text: 'text-semantic-success', label: 'Active' },
  warning: { bg: 'bg-semantic-warning-tint', text: 'text-semantic-warning', label: 'Due soon' },
  error:   { bg: 'bg-semantic-error-tint',   text: 'text-semantic-error',   label: 'Overdue' },
  pending: { bg: 'bg-brand-light',           text: 'text-brand-deep',       label: 'Pending' },
}
```

### Skeleton loader

Never use a spinner. Always use a skeleton that matches the component's layout.

```tsx
<div className="animate-pulse">
  <div className="h-4 bg-neutral-border rounded w-3/4 mb-2" />
  <div className="h-4 bg-neutral-border rounded w-1/2" />
</div>
```

### Progress bar

Used in UsageMeter. Colour driven by percentage value.

```tsx
const barColour =
  percent >= 100 ? 'bg-semantic-error' :
  percent >= 80  ? 'bg-semantic-warning' :
                   'bg-semantic-success'

<div className="w-full h-2 bg-neutral-border rounded">
  <div
    className={`h-2 rounded transition-all ${barColour}`}
    style={{ width: `${Math.min(percent, 100)}%` }}
  />
</div>
```

---

## Grid system

Dashboard uses a 12-column CSS grid:

```tsx
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-4"> {/* Plan summary */} </div>
  <div className="col-span-8"> {/* Usage meter */} </div>
</div>
```

Homepage uses full-width sections with a max-width container:

```tsx
<section className="w-full">
  <div className="max-w-7xl mx-auto px-8">
    {/* content */}
  </div>
</section>
```

---

## Layout primitives

These are structural wrappers with no visual style of their own. They encode spacing and layout decisions so pages and components never hardcode these values.

Generate these first before any atom or component. Path: `src/components/layout/`

| Primitive | Path | Behaviour |
|-----------|------|-----------|
| `Container` | `layout/Container.tsx` | `max-w-7xl mx-auto px-8` — wraps all page content |
| `Section` | `layout/Section.tsx` | `w-full` wrapper, accepts `background` token prop (`brand.deep`, `white`, `brand.ghost`) |
| `Grid` | `layout/Grid.tsx` | 12-column CSS grid, accepts `cols` and `gap` props. Default: `grid grid-cols-12 gap-6` |
| `Stack` | `layout/Stack.tsx` | Vertical flex, accepts `gap` prop. Default: `flex flex-col gap-4` |
| `Cluster` | `layout/Cluster.tsx` | Horizontal flex with wrap, accepts `gap` and `align` props |

```tsx
// Container — usage example
<Container>
  {/* all page content sits inside a Container */}
</Container>

// Section — usage example
<Section background="brand.deep">
  <Container>...</Container>
</Section>

// Grid — usage example
<Grid>
  <div className="col-span-4">...</div>
  <div className="col-span-8">...</div>
</Grid>

// Stack — usage example
<Stack gap="gap-2">
  <Text variant="label">Renews</Text>
  <Text variant="body">15 Jul 2026</Text>
</Stack>

// Cluster — usage example
<Cluster gap="gap-3" align="items-center">
  <Button variant="primary">View plans</Button>
  <Button variant="ghost-hero">Check coverage</Button>
</Cluster>
```

---

## Atoms

Atoms are single-purpose, indivisible UI elements. They accept only design token values as props — never raw hex values or arbitrary strings.

Generate all atoms before building any molecule or component. Path: `src/components/ui/atoms/`

**Check `src/ui/component-registry.md` before building anything. If it exists, import it — do not rebuild it.**

### Heading

```tsx
// src/components/ui/atoms/Heading.tsx
type HeadingProps = {
  level: 1 | 2 | 3 | 4
  variant: 'display' | 'h1' | 'h2' | 'h3'
  color?: 'ink' | 'white' | 'brand-deep' | 'brand-signature'
  children: React.ReactNode
}

// variant → class mapping (exact — do not deviate)
// display → text-5xl font-bold tracking-tight
// h1      → text-3xl font-bold
// h2      → text-2xl font-semibold
// h3      → text-lg font-semibold
// color default: ink
```

### Text

```tsx
// src/components/ui/atoms/Text.tsx
type TextProps = {
  variant: 'body' | 'caption' | 'label' | 'metric' | 'small'
  color?: 'ink' | 'slate' | 'white' | 'brand-light' | 'brand-signature'
  children: React.ReactNode
}

// variant → class mapping (exact)
// body    → text-[15px] leading-relaxed
// caption → text-xs leading-relaxed
// label   → text-xs font-medium uppercase tracking-wider
// metric  → text-[28px] font-bold
// small   → text-[13px]
// color default: ink
```

### Link

```tsx
// src/components/ui/atoms/Link.tsx
type LinkProps = {
  variant: 'inline' | 'arrow' | 'nav' | 'muted'
  href: string
  children: React.ReactNode
}

// inline → text-brand-signature hover:text-brand-mid font-semibold
// arrow  → inline + " →" appended, gap animates on hover
// nav    → used in site header nav links
// muted  → text-neutral-slate hover:text-neutral-ink (footer links)
```

### Icon

```tsx
// src/components/ui/atoms/Icon.tsx
type IconProps = {
  name: string          // maps to SVG in /public/icons/
  size?: 14 | 16 | 18 | 24
  color?: string        // Tailwind text colour class only
  'aria-label'?: string
}
// Renders inline SVG. Never use emoji or text as icons.
// All SVGs used in the designs are inline — extract them to /public/icons/
```

### Button

```tsx
// src/components/ui/atoms/Button.tsx
type ButtonProps = {
  variant: 'primary' | 'ghost-purple' | 'ghost-white' | 'ghost-hero'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  onClick?: () => void
  children: React.ReactNode
}

// variant → class mapping (exact)
// primary      → bg-brand-signature hover:bg-brand-mid text-white rounded-lg font-semibold transition-colors
// ghost-purple → border border-brand-signature text-brand-signature hover:bg-brand-ghost rounded-lg font-semibold
// ghost-white  → border border-white/70 text-white hover:bg-white/10 rounded-lg font-semibold (header only)
// ghost-hero   → border border-white/60 text-white hover:border-white hover:bg-white/10 rounded-lg font-semibold

// size → height mapping
// sm → h-9 px-4 text-sm
// md → h-11 px-6 text-[14px]  (default)
// lg → h-13 px-8 text-[16px]
```

### Badge

```tsx
// src/components/ui/atoms/Badge.tsx
type BadgeProps = {
  variant: 'success' | 'warning' | 'error' | 'neutral' | 'purple' | 'info'
  dot?: boolean        // shows a 6px coloured dot before the label
  children: React.ReactNode
}

// variant → class mapping (exact)
// success → bg-semantic-success-tint text-semantic-success
// warning → bg-semantic-warning-tint text-semantic-warning
// error   → bg-semantic-error-tint text-semantic-error
// neutral → bg-neutral-surface text-neutral-slate
// purple  → bg-brand-light text-brand-deep
// info    → bg-blue-50 text-blue-700

// All badges: rounded-full text-xs font-semibold px-3 py-1 inline-flex items-center gap-1.5
```

### Input

```tsx
// src/components/ui/atoms/Input.tsx
type InputProps = {
  type: 'text' | 'email' | 'password'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  suffix?: React.ReactNode   // for show/hide toggle in password fields
}

// Base: w-full h-11 border border-neutral-border rounded-lg px-4 text-[15px] text-neutral-ink bg-white
// Focus: focus:border-brand-signature focus:ring-2 focus:ring-brand-signature/15 outline-none
// Error: border-semantic-error focus:ring-semantic-error/15
// Placeholder: placeholder:text-neutral-slate/60
```

### Label

```tsx
// src/components/ui/atoms/Label.tsx
type LabelProps = {
  htmlFor: string
  children: React.ReactNode
}
// text-[13px] font-semibold text-neutral-ink tracking-[0.01em]
```

### Divider

```tsx
// src/components/ui/atoms/Divider.tsx
// h-px w-full bg-neutral-border
// No props — purely structural
```

### Avatar

```tsx
// src/components/ui/atoms/Avatar.tsx
type AvatarProps = {
  initials: string    // max 2 characters
  size?: 'sm' | 'md'
}
// sm → w-8 h-8 text-xs
// md → w-9 h-9 text-sm  (default)
// Base: rounded-full bg-brand-signature text-white font-bold flex items-center justify-center flex-shrink-0
```

### Toggle

```tsx
// src/components/ui/atoms/Toggle.tsx
type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  'aria-label': string
}
// Track: w-[34px] h-5 rounded-full transition-colors
// On:  bg-brand-signature
// Off: bg-neutral-border
// Thumb: w-3.5 h-3.5 rounded-full bg-white absolute top-[3px] transition-all
// On:  left-[17px]
// Off: left-[3px]
```

### ProgressBar

```tsx
// src/components/ui/atoms/ProgressBar.tsx
type ProgressBarProps = {
  percent: number     // 0–100, clamped
  showThreshold?: boolean   // shows the 80% warning marker line
}

// Track: w-full h-2.5 bg-neutral-surface rounded-full overflow-hidden
// Fill colour (derived in component, not in hook):
//   percent >= 100 → bg-semantic-error
//   percent >= 80  → bg-semantic-warning
//   default        → bg-semantic-success
// Fill: h-full rounded-full transition-all, width = Math.min(percent, 100)%
```

### SkeletonBlock

```tsx
// src/components/ui/atoms/SkeletonBlock.tsx
type SkeletonBlockProps = {
  width?: string      // Tailwind width class e.g. 'w-3/4', 'w-full'
  height?: string     // Tailwind height class e.g. 'h-4', 'h-10'
  rounded?: string    // Tailwind rounded class, default 'rounded'
}
// Base: animate-pulse bg-neutral-border
// Never use a spinner. Always use SkeletonBlock.
```

### StatusDot

```tsx
// src/components/ui/atoms/StatusDot.tsx
type StatusDotProps = {
  color: 'success' | 'warning' | 'error'
}
// w-1.5 h-1.5 rounded-full flex-shrink-0
// success → bg-semantic-success
// warning → bg-semantic-warning
// error   → bg-semantic-error
```

---

## Molecules

Molecules are composed exclusively from atoms and layout primitives. They have no data fetching. They accept only typed props.

Generate all molecules after atoms are confirmed. Path: `src/components/ui/molecules/`

**Check `src/ui/component-registry.md` before building anything.**

### FormField

```tsx
// molecules/FormField.tsx
// Composes: Label + Input + optional error Text
type FormFieldProps = {
  id: string
  label: string
  type: 'text' | 'email' | 'password'
  placeholder?: string
  error?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
// Stack gap-1.5 — Label on top, Input below, error Text below that if present
// Error text: text-semantic-error text-xs mt-1
```

### NavLink

```tsx
// molecules/NavLink.tsx
// Composes: Icon + Text — horizontal public site nav
type NavLinkProps = {
  href: string
  label: string
  active?: boolean
}
// text-white/85 hover:text-white hover:bg-white/10 px-3 py-1.5 rounded-md text-[14px] font-medium transition-all
// active → text-white bg-white/10
```

### SidebarNavItem

```tsx
// molecules/SidebarNavItem.tsx
// Composes: Icon + Text — authenticated dashboard sidebar
type SidebarNavItemProps = {
  href: string
  label: string
  icon: React.ReactNode
  active?: boolean
}
// flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-white/75 text-[14px] font-medium transition-all
// hover → bg-white/8 text-white
// active → bg-white/12 text-white
```

### StatTile

```tsx
// molecules/StatTile.tsx
// Composes: Text (label) + Text (value)
// The three sub-cells inside the usage meter card
type StatTileProps = {
  label: string
  value: string
  background?: 'ghost' | 'white'   // default: ghost
}
// bg-brand-ghost rounded-lg p-3.5 flex flex-col gap-1
// label → Text variant="label" color="slate"
// value → Text variant="body" color="ink" font-semibold
```

### KeyValueRow

```tsx
// molecules/KeyValueRow.tsx
// Composes: Text (key) + Text (value) — billing rows, plan detail rows
type KeyValueRowProps = {
  label: string
  value: React.ReactNode   // string or a Badge
}
// flex justify-between items-center text-[13px]
// label → text-neutral-slate
// value → text-neutral-ink font-semibold
```

### SectionHeader

```tsx
// molecules/SectionHeader.tsx
// Composes: Text (uppercase label) + Heading
type SectionHeaderProps = {
  eyebrow?: string     // e.g. "Pricing" — uppercase label above heading
  heading: string
  align?: 'left' | 'center'
}
// Stack gap-3
// eyebrow → Text variant="label" color="brand-signature"
// heading → Heading level={2} variant="h1"
```

### PageHeader

```tsx
// molecules/PageHeader.tsx
// Composes: Heading + Text — dashboard page greeting
type PageHeaderProps = {
  greeting: string     // "Good morning, Alex."
  subtitle: string     // "Monday, 23 June 2026 · Your next bill is in 22 days"
}
// Stack gap-1
```

### AnnouncementPill

```tsx
// molecules/AnnouncementPill.tsx
// Composes: StatusDot + Text
// The "5G Now Live Nationwide" pill in the hero section
type AnnouncementPillProps = {
  label: string
}
// inline-flex items-center gap-2 bg-brand-signature/25 border border-brand-signature/40 rounded-full px-3.5 py-1.5
// label → Text variant="label" color="brand-light"
```

### UserChip

```tsx
// molecules/UserChip.tsx
// Composes: Avatar + Stack of Text — sidebar footer user identity
type UserChipProps = {
  name: string
  planName: string
  initials: string
}
// flex items-center gap-3
```

### CardHeader

```tsx
// molecules/CardHeader.tsx
// Composes: Text (label) + optional Badge or Link — top row of every dashboard card
type CardHeaderProps = {
  label: string
  action?: React.ReactNode    // Badge or Link
}
// flex items-center justify-between
// label → Text variant="label" color="slate"
```

---

## What NOT to do

- Never write `style={{ color: '#A100FF' }}` — use `text-brand-signature`
- Never use `text-purple-600` or other default Tailwind colour names — use brand tokens
- Never use `rounded-2xl` on cards — use `rounded-xl` exactly
- Never use grey shadows — use `shadow-card`
- Never mix spacing values arbitrarily — use the scale above

---

*Owner: Design / Tech Lead*
*Reference: `/designs/homepage.html`, `/designs/dashboard.html`, `/designs/login.html`*
