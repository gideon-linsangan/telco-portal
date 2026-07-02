# TelcoNow — Component Registry

> Read this file before building any component.
> If what you need already exists — import it. Do not rebuild it.
> When you create a new reusable component — add it here before committing.

---

## Layout primitives
`src/components/layout/`

| Component | Path | Props | Used in |
|-----------|------|-------|---------|
| `Container` | `components/layout/Container.tsx` | `children` | All pages |
| `Section` | `components/layout/Section.tsx` | `background?` | All pages |
| `Grid` | `components/layout/Grid.tsx` | `cols?, gap?` | Dashboard, PlansSection |
| `Stack` | `components/layout/Stack.tsx` | `gap?` | Widespread |
| `Cluster` | `components/layout/Cluster.tsx` | `gap?, align?` | Widespread |

---

## Atoms
`src/components/ui/atoms/`

| Component | Path | Props | Used in |
|-----------|------|-------|---------|
| `Heading` | `components/ui/atoms/Heading.tsx` | `level, variant, color?` | — |
| `Text` | `components/ui/atoms/Text.tsx` | `variant, color?` | — |
| `Link` | `components/ui/atoms/Link.tsx` | `variant, href` | — |
| `Icon` | `components/ui/atoms/Icon.tsx` | `name, size?, color?` | — |
| `Button` | `components/ui/atoms/Button.tsx` | `variant, size?, fullWidth?, onClick?, type?` | — |
| `Badge` | `components/ui/atoms/Badge.tsx` | `variant, dot?` | — |
| `Input` | `components/ui/atoms/Input.tsx` | `type, id?, name?, placeholder?, error?, suffix?` | — |
| `Label` | `components/ui/atoms/Label.tsx` | `htmlFor` | — |
| `Divider` | `components/ui/atoms/Divider.tsx` | — | — |
| `Avatar` | `components/ui/atoms/Avatar.tsx` | `initials, size?` | — |
| `Toggle` | `components/ui/atoms/Toggle.tsx` | `checked, onChange, aria-label` | — |
| `ProgressBar` | `components/ui/atoms/ProgressBar.tsx` | `percent, showThreshold?` | — |
| `SkeletonBlock` | `components/ui/atoms/SkeletonBlock.tsx` | `width?, height?, rounded?` | — |
| `StatusDot` | `components/ui/atoms/StatusDot.tsx` | `color` | — |

---

## Molecules
`src/components/ui/molecules/`

| Component | Path | Props | Used in |
|-----------|------|-------|---------|

---

## Components
`src/components/`

| Component | Path | Story | Data source | Used in |
|-----------|------|-------|-------------|---------|

---

## Error + loading states

| Component | Path | Used in |
|-----------|------|---------|

---

*Owner: Tech Lead*
*Update this file every time a reusable component is created.*
