# Token System

**Source:** `index.css` → `primitives.css` + `brand-primitives.css` + `tokens.css` + `typography.css`

---

## How It Works

```
primitives.css          — raw base values (light, dark, spacing, radius, status colors)
brand-primitives.css    — brand overrides for --primitive-primary-* and --primitive-accent-*
tokens.css              — semantic tokens mapped from primitives
typography.css          — type scale and utility classes
index.css               — imports all four in the correct order
```

**Rule: never use primitives directly in components. Always use semantic tokens.**

```css
/* Wrong */
color: var(--primitive-dark-800);

/* Correct */
color: var(--color-text-primary);
```

---

## Token Cascade

```
data-brand="fluentforms"
    └── overrides --primitive-primary-* and --primitive-accent-*
            └── tokens.css reads those primitives
                    └── --btn-bg-enable = --primitive-primary-500
                    └── --color-text-brand = --primitive-accent-300
                    └── etc.
```

---

## File Load Order (`index.css`)

```css
@import './primitives.css';
@import './brand-primitives.css';
@import './tokens.css';
@import './typography.css';
```

---

## Key Semantic Tokens

### Text
| Token | Light mode | Dark mode |
|---|---|---|
| `--color-text-primary` | `--primitive-dark-800` | `--primitive-light-0` |
| `--color-text-primary-invert` | `--primitive-light-0` | `--primitive-dark-800` |
| `--color-text-secondary` | `--primitive-light-900` | `--primitive-light-100` |
| `--color-text-secondary-invert` | `--primitive-light-100` | `--primitive-dark-500` |
| `--color-text-brand` | `--primitive-accent-300` | `--primitive-accent-200` |

### Surface
| Token | Light mode | Dark mode |
|---|---|---|
| `--color-surface-primary` | `--primitive-light-0` | `--primitive-dark-800` |
| `--color-surface-secondary` | `--primitive-dark-800` | `--primitive-light-0` |
| `--color-brand-surface` | `--primitive-accent-400` | `--primitive-primary-200` |

### Border
| Token | Light mode | Dark mode |
|---|---|---|
| `--color-border-primary` | `--primitive-light-100` | `--primitive-dark-700` |
| `--color-border-primary-invert` | `--primitive-dark-700` | `--primitive-light-100` |

### Button
| Token | Description |
|---|---|
| `--btn-bg-enable` | Primary button background (brand primary-500) |
| `--btn-bg-hovered` | Hovered state |
| `--btn-bg-focused` | Focused state |
| `--btn-bg-disabled` | Disabled state |

### Status
| Token | Use |
|---|---|
| `--color-success-primary` | Success — green |
| `--color-error-primary` | Error — red |
| `--color-warning-primary` | Warning — orange |

---

## Dark Mode

Apply `data-theme="dark"` to swap all semantic tokens to their dark mode values:

```html
<html data-theme="dark" data-brand="fluentforms">
```

Both `data-theme` and `data-brand` can be combined on any element.
