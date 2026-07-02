# Tailwind

- **Version: Tailwind v4 (CSS-first)** — no `tailwind.config.ts` file
- All custom tokens defined in `src/app/globals.css` under `@theme {}`
- Use Tailwind utility classes directly — no inline styles
- Mobile-first responsive: `sm:`, `md:`, `lg:`
- No arbitrary values unless there is no token equivalent — flag in a comment

## Token Reference (`src/app/globals.css`)

### Brand colours
| Token | Value | Utility class |
|---|---|---|
| `--color-brand-purple-darkest` | `#460073` | `bg-brand-purple-darkest` |
| `--color-brand-purple` | `#A100FF` | `bg-brand-purple` |
| `--color-brand-purple-light` | `#E5CCFF` | `text-brand-purple-light` |
| `--color-brand-bg` | `#F5EEFF` | `bg-brand-bg` |
| `--color-brand-dark` | `#0F0F1A` | `text-brand-dark` |
| `--color-brand-muted` | `#4A4A5A` | `text-brand-muted` |
| `--color-brand-border` | `#E8E8F0` | `border-brand-border` |
| `--color-brand-surface` | `#F0F0F6` | `bg-brand-surface` |

### Status colours
| Token | Utility class |
|---|---|
| `--color-status-success-bg` / `--color-status-success-text` | `bg-status-success-bg`, `text-status-success-text` |
| `--color-status-warning-bg` / `--color-status-warning-text` | `bg-status-warning-bg`, `text-status-warning-text` |
| `--color-status-error-bg` / `--color-status-error-text` | `bg-status-error-bg`, `text-status-error-text` |
| `--color-status-info-bg` / `--color-status-info-text` | `bg-status-info-bg`, `text-status-info-text` |

### Other tokens
| Token | Value | Utility class |
|---|---|---|
| `--shadow-card` | `0 1px 4px rgba(70, 0, 115, 0.06)` | `shadow-card` |
| `--font-sans` | `'Inter', system-ui, sans-serif` | applied via `body` in globals.css |