# WPMN Design Guidelines

Rules for layout, spacing, color, logo, and components on all WPMN product websites.

---

## Layout System

| Property | Value |
|---|---|
| Container max width | 1200px |
| Container alignment | `margin: 0 auto` — no horizontal padding |
| Section padding | 96px top and bottom — no exceptions |

---

## Section Structure

Every section follows this header anatomy:

```
[Badge]       — optional. Short label, uppercase, dot prefix.
Heading       — always required. Max 800px wide, center-aligned.
[Subtext]     — optional. One or two sentences max.
```

**CTA Buttons** — always side by side. Never just one, never stacked.
```
[ Primary CTA ]  [ Secondary CTA ]
```

---

## Section Backgrounds

Four surface types. Always use semantic tokens for backgrounds.

| Surface | Token | Primitive | Note |
|---|---|---|---|
| primary | `--color-surface-primary` | `--primitive-light-0` | White |
| secondary | `--color-surface-secondary` | `--primitive-dark-800` | Dark |
| alt | `--color-surface-alt` | `--primitive-light-25` | Soft gray |
| secondary-alt | `--color-surface-secondary-alt` | `--primitive-dark-600` | Soft dark |

### Text token pairings per surface

| Surface | Heading token | Paragraph token |
|---|---|---|
| primary | `--color-text-primary` | `--color-text-secondary` |
| secondary | `--color-text-primary-invert` | `--color-text-secondary-invert` |
| alt | `--color-text-primary` | `--color-text-secondary` |
| secondary-alt | `--color-text-primary-invert` | `--color-text-secondary-invert` |

**Rule: never place dark text on a dark surface. Never place white text on a light surface.**

### Text tokens

| Token | Primitive | Used for |
|---|---|---|
| `--color-text-primary` | `--primitive-dark-800` | Headings on light surfaces |
| `--color-text-primary-invert` | `--primitive-light-0` | Headings on dark surfaces |
| `--color-text-secondary` | `--primitive-light-900` | Paragraphs on light surfaces |
| `--color-text-secondary-invert` | `--primitive-light-100` | Paragraphs on dark surfaces |

---

## Section Alternation

Alternate light surfaces by default. Use dark sections sparingly — max 1–2 per page, never back to back.

### Recommended page sequence

| Section | Surface | Note |
|---|---|---|
| Hero | primary | Always white. Clean starting point. |
| Features | alt | Soft gray separates from hero without a hard contrast jump. |
| Showcase | primary | Back to white. |
| Dark CTA | secondary | One dark section for emphasis — CTA, testimonial, or stat block. |
| Pricing | alt | Back to light immediately after dark. |
| Footer | secondary | Always dark. Does not count against the dark section budget. |

### DO
```
primary → alt → primary → secondary → alt → primary
```

### DON'T
```
primary → secondary → secondary ← back to back dark
         → secondary-alt ← third dark section
```

---

## Typography Rules

| Property | Value |
|---|---|
| Centered text max width | 800px |
| Section alignment | Center — headings, subtext, toggles, CTAs |

**Highlighted / accented text** — use the brand color token, never gray or hardcoded values.

```
DO:    The Best <span color="--color-primary">Form Builder</span>
DON'T: The Best <span color="#6b7280">Form Builder</span>
```

---

## Radius Rules

| Element | Radius |
|---|---|
| Cards, feature tiles, pricing cards, image frames | 16px |
| Section containers, mockup wrappers, showcase blocks | 32px |

---

## Brand & Color

### Always set data-brand

Every product page must have `data-brand="x"` on the root element. This activates the correct primary and accent scales across all components.

```html
<div data-brand="fluentforms"> ... </div>
```

### Button color

Always use `--btn-bg-enable` (brand primary token) for primary buttons. Never use hardcoded colors.

```
DO:    Uses --btn-bg-enable (changes per brand)
DON'T: background: #4b5563 (hardcoded gray — breaks theming)
```

---

## Logo Usage

Always use the SVG from `logos/<brand>/<variant>-<type>.svg`. Never use placeholders, raster images, or plain text.

| Background | Logo type | Description |
|---|---|---|
| Light / white | `type="dark"` | Colored icon + dark text |
| Dark | `type="inverted"` | White icon + white text |

**Never** use a placeholder box with text as a logo substitute.

---

## Navbar & Footer Logo Rules

### Navbar

| Navbar style | Logo type |
|---|---|
| Light navbar (default) | `type="dark"` |
| Dark navbar | `type="inverted"` |

### Footer

| Footer style | Logo type |
|---|---|
| Dark footer (default) | `type="inverted"` |
| Light footer | `type="dark"` |

Footer is always dark by default. Never use a placeholder logo in either.

---

## Mockup & Screenshot Treatment

### DO
- Border radius: 16px on the mockup frame
- Shadow: `--shadow-soft-400` or higher — never no shadow
- Border: `1px solid --color-border-primary`
- Always place mockup inside a surface container (surface-secondary or brand-surface) — never float on white
- Container radius: 32px on the outer wrapper

### DON'T
- No shadow
- Tiny radius (< 8px)
- Mockup floating directly on white background

---

## Multi-Column Grids

Seven approved layout grids. Do not use arbitrary column ratios outside these.

| # | Layout | Columns | Gutter | Typical use |
|---|---|---|---|---|
| 1 | Full Width | 12 / 12 | — | Hero, CTA banner, testimonials, full-width feature |
| 2 | Equal 2-col | 6 / 6 | 48px | Text + mockup, hero section |
| 3 | Equal 3-col | 4 / 4 / 4 | 32px | Feature cards |
| 4 | Equal 4-col | 3 / 3 / 3 / 3 | 24px | Feature grids, icon rows |
| 5 | Asymmetric | 5 / 7 | 48px | Text-heavy section, text left + large visual right |
| 6 | Asymmetric | 4 / 8 | 48px | Sidebar-style, label + main content, pricing |
| 7 | Stacked | 6 + (6/6 stacked) | 48px outer / 24px inner | Large card left, two stacked cards right |

---

## Spacing Within Sections

| Property | Value |
|---|---|
| Badge → Heading | 12px |
| Heading → Subtext | 16px |
| Subtext → Content | 48px |
| Section header → CTA | 32px |
| Between feature cards (3-col) | 32px |
| Between feature cards (4-col) | 24px |
| Icon → Heading (within card) | 12px |
| Heading → Body (within card) | 8px |

---

## Icon Usage

| Property | Rule |
|---|---|
| Library | `@hugeicons/react-pro` v0.3.2 |
| Variant | `solid.rounded` — always, no exceptions |
| Usage | Always inline as SVG path data — no runtime imports |
| Default size | 24×24px |
| Small (buttons, inputs) | 20×20px |
| Large (feature icons) | 32×32px or 40×40px |
| Color | `currentColor` — inherits from parent text token |

Icon pattern:
```jsx
const _IconName = ({ s, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="..." fill={c} />
  </svg>
)
```

---

## Responsive Basics

| Breakpoint | Width | Rules |
|---|---|---|
| Desktop | ≥ 1200px | Full layout, max-width container centered |
| Tablet | 768px – 1199px | Container fills width with 40px side padding. 2-col layouts stay 2-col. |
| Mobile | < 768px | All columns stack to 1-col. Side padding 20px. Section padding reduces to 64px. |
