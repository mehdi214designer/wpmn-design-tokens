# Typography

**Font family:** Manrope (`'Manrope', system-ui, sans-serif`), Google Fonts
**Weights:** Light 300 (reserved) · Regular 400 · Medium 500 · SemiBold 600 · Bold 700
**Source:** `typography.css`

Sizes are fluid via `clamp(mobile floor → desktop)` — the mobile floor is baked into each step,
so there is no separate mobile mode. Line-heights are unitless ratios (desktop px in parentheses);
tracking is letter-spacing (`--font-ls-*`).

---

## Type Scale — Headings

| Token class | Size (floor → desktop) | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `.text-h1` | 34 → 54 | 1.204 (65) | Bold 700 | −0.03em | Hero headlines |
| `.text-h2` | 30 → 45 | 1.200 (54) | SemiBold 600 | −0.028em | Section headlines |
| `.text-h3` | 27 → 37 | 1.216 (45) | SemiBold 600 | −0.024em | Sub-section headlines |
| `.text-h4` | 24 → 31 | 1.194 (37) | Medium 500 | −0.02em | Card titles, statement lines |
| `.text-h5` | 21 → 26 | 1.192 (31) | Medium 500 | −0.018em | Feature titles |
| `.text-h6` | 19 → 22 | 1.182 (26) | Medium 500 | −0.016em | Small labels, captions |

## Body Scale

| Token class | Size | Line height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `.text-body-large` | 18 → 20 | 1.65 (33) | Regular 400 | −0.005em | Hero subtext, intro paragraphs |
| `.text-body-medium` | 17 → 18 | 1.667 (30) | Regular 400 | −0.004em | Standard body copy |
| `.text-body-base` | 16 | 1.688 (27) | Regular 400 | −0.003em | Default paragraph text |
| `.text-body-small` | 14 | 1.714 (24) | Medium 500 | 0 | Supporting text, nav, hints |
| `.text-body-label` | 13 | 1.538 (20) | SemiBold 600 | 0.02em | Eyebrows, badges, captions |
| `.text-body-mono` | 10 | 1.6 (16) | Bold 700 | 0.08em | Uppercase micro labels, tabular (Manrope) |

## Button Scale

| Token class | Size | Line height | Weight |
|---|---|---|---|
| `.text-btn-xl` | 23px | 28px | SemiBold 600 |
| `.text-btn-lg` | 20px | 24px | SemiBold 600 |
| `.text-btn-md` | 18px | 20px | SemiBold 600 |
| `.text-btn-sm` | 16px | 18px | Medium 500 |
| `.text-btn-xs` | 13px | 16px | Medium 500 |

Button sizes are fixed (not fluid) and render in Manrope.

---

## Fluid sizing (no breakpoint)

Headings and `body-large` / `body-medium` scale smoothly with the viewport via `clamp()`; the rest
are fixed. There is no `@media` type mode. Note: `body-base` stays 16px on mobile.

---

## Rules

- Always use `.text-*` utility classes — never hardcode font sizes
- Centered section text: max-width 800px
- All section headings, subtext, and CTAs are center-aligned
- Highlighted/accented words use `--color-primary` (brand token) — never gray or hardcoded hex
- Never use a font other than Manrope
