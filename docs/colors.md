# Colors

**Source:** `tokens.css`, `primitives.css`

All colors are CSS custom properties. Never use hardcoded hex values in components or pages — always reference tokens.

---

## Text Tokens

| Token | Light mode primitive | Dark mode primitive | Used for |
|---|---|---|---|
| `--color-text-primary` | `--primitive-dark-800` (#07090c) | `--primitive-light-0` (#ffffff) | Headings on light surfaces |
| `--color-text-primary-invert` | `--primitive-light-0` (#ffffff) | `--primitive-dark-800` (#07090c) | Headings on dark surfaces |
| `--color-text-secondary` | `--primitive-light-900` (#4e5d78) | `--primitive-light-100` (#dbdee4) | Paragraphs on light surfaces |
| `--color-text-secondary-invert` | `--primitive-light-100` (#dbdee4) | `--primitive-dark-500` | Paragraphs on dark surfaces |
| `--color-text-brand` | `--primitive-accent-300` | `--primitive-accent-200` | Brand-colored text |

---

## Surface Tokens

| Token | Light mode | Dark mode | Note |
|---|---|---|---|
| `--color-surface-primary` | `--primitive-light-0` | `--primitive-dark-800` | White / default |
| `--color-surface-secondary` | `--primitive-dark-800` | `--primitive-light-0` | Dark section |
| `--color-brand-surface` | `--primitive-accent-400` | `--primitive-primary-200` | Brand tint |
| `--color-brand-surface-secondary` | `--primitive-primary-200` | `--primitive-accent-100` | Secondary brand tint |

---

## Text + Surface Pairings

**Rule: never place dark text on a dark surface. Never place white text on a light surface.**

| Surface | Background | Heading token | Paragraph token |
|---|---|---|---|
| primary | White | `--color-text-primary` | `--color-text-secondary` |
| secondary | Dark | `--color-text-primary-invert` | `--color-text-secondary-invert` |
| alt | Soft gray | `--color-text-primary` | `--color-text-secondary` |
| secondary-alt | Soft dark | `--color-text-primary-invert` | `--color-text-secondary-invert` |

---

## Border Tokens

| Token | Value |
|---|---|
| `--color-border-primary` | `--primitive-light-100` (light mode) |
| `--color-border-primary-invert` | `--primitive-dark-700` (light mode) |

---

## Status Tokens

| Token | Use |
|---|---|
| `--color-success-primary` | Success states, DO indicators |
| `--color-error-primary` | Error states, DON'T indicators |
| `--color-warning-primary` | Warning states |

---

## Brand Color Token

| Token | Use |
|---|---|
| `--btn-bg-enable` | Primary button background — always use this, never hardcode |

This token is automatically set to the correct brand primary color when `data-brand="x"` is applied.

---

## Static Light Scale

| Token | Value |
|---|---|
| `--primitive-light-0` | #ffffff |
| `--primitive-light-25` | #f6f7f8 |
| `--primitive-light-50` | #edeef1 |
| `--primitive-light-100` | #dbdee4 |
| `--primitive-light-200` | #c9ced6 |
| `--primitive-light-300` | #b8bec9 |
| `--primitive-light-400` | #a6aebb |
| `--primitive-light-500` | #949dae |
| `--primitive-light-600` | #838da0 |
| `--primitive-light-700` | #717d93 |
| `--primitive-light-800` | #5f6d85 |
| `--primitive-light-900` | #4e5d78 |

## Static Dark Scale

| Token | Value |
|---|---|
| `--primitive-dark-50` | #46536c |
| `--primitive-dark-100` | #3e4a60 |
| `--primitive-dark-200` | #364154 |
| `--primitive-dark-300` | #2e3748 |
| `--primitive-dark-400` | #272e3c |
| `--primitive-dark-500` | #1f2530 |
| `--primitive-dark-600` | #171b24 |
| `--primitive-dark-700` | #0f1218 |
| `--primitive-dark-800` | #07090c |
| `--primitive-dark-900` | #000000 |
