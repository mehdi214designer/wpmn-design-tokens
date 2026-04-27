# Typography

**Font family:** Work Sans (`'Work Sans', sans-serif`)
**Weights:** Regular 400 · Medium 500 · SemiBold 600 · Bold 700
**Source:** `typography.css`

---

## Type Scale — Desktop

| Token class | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `.text-h1` | 61px | 73px | Bold 700 | Hero headlines |
| `.text-h2` | 49px | 59px | Bold 700 | Section headlines |
| `.text-h3` | 39px | 47px | SemiBold 600 | Sub-section headlines |
| `.text-h4` | 31px | 37px | SemiBold 600 | Card titles, page titles |
| `.text-h5` | 25px | 30px | Medium 500 | Feature titles |
| `.text-h6` | 20px | 24px | Medium 500 | Small labels, captions |

## Body Scale — Desktop

| Token class | Size | Line height | Weight | Use |
|---|---|---|---|---|
| `.text-body-large` | 20px | 30px | Regular 400 | Hero subtext, intro paragraphs |
| `.text-body-medium` | 18px | 27px | Regular 400 | Standard body copy |
| `.text-body-base` | 16px | 24px | Regular 400 | Default paragraph text |
| `.text-body-small` | 14px | 21px | Regular 400 | Supporting text, hints |
| `.text-body-label` | 13px | 20px | Medium 500 | Labels, badges, captions |
| `.text-body-mono` | 10px | 15px | Regular 400 | Code, tokens, monospace |

## Button Scale

| Token class | Size | Line height | Weight |
|---|---|---|---|
| `.text-btn-xl` | 23px | 28px | SemiBold 600 |
| `.text-btn-lg` | 20px | 24px | SemiBold 600 |
| `.text-btn-md` | 18px | 20px | SemiBold 600 |
| `.text-btn-sm` | 16px | 18px | Medium 500 |
| `.text-btn-xs` | 13px | 16px | Medium 500 |

---

## Mobile Overrides (`max-width: 768px`)

| Token | Desktop | Mobile |
|---|---|---|
| H1 | 61px | 32px |
| H2 | 49px | 28px |
| H3 | 39px | 25px |
| H4 | 31px | 22px |
| H5 | 25px | 20px |
| H6 | 20px | 18px |
| body-large | 20px | 18px |
| body-base | 16px | 14px |
| body-small | 14px | 12px |

---

## Rules

- Always use `.text-*` utility classes — never hardcode font sizes
- Centered section text: max-width 800px
- All section headings, subtext, and CTAs are center-aligned
- Highlighted/accented words use `--color-primary` (brand token) — never gray or hardcoded hex
- Never use a font other than Work Sans
