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

**Heading scale by context**
- Hero header — `text-h1` (xxl) + `body-large`, gap `--spacing-h-xxl-to-large`. The single H1 on the page.
- Section header — `text-h2` / `text-h3` + `body-large` / `body-medium`. Steps down from the hero.

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
| Hero heading | `text-h1` (xxl) + `body-large` — the one H1 per page |
| Section heading | `text-h2` / `text-h3` + `body-large` / `body-medium` |

Heading → body gap is paired to the heading scale — see the heading-to-body token table in **Spacing Within Sections**.

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

Button rules (match `components/Button/Button.css` exactly):

- **One primary button per section.** Every other action is secondary/tertiary.
- **Primary**: `--btn-bg-enable` bg, `--color-text-primary-invert` text, inner glow `inset 3px 4px 4px 0 var(--btn-bg-glow, rgba(255,255,255,0.3))`, hover `--btn-bg-hovered`, active `--btn-bg-pressed`.
- **Secondary**: transparent bg, `1.5px solid var(--btn-bg-enable)` border, brand text; hover fills brand with invert text. On dark/brand surfaces use the ghost-invert variant: same anatomy with `--color-text-primary-invert` border/text.
- **Radius**: `--radius-xsm` / `--primitive-radius-xs`. No pill buttons (999px is for tags/chips/badges only).
- **No underlines**: anchor-wrapped buttons need `a{text-decoration:none}` in scope.
- **Hover overlays never sit on text**: tints/blurs go on a `::before` layer (z-index 0) with the copy lifted above (`position:relative; z-index:1`).

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

Every gap is a named token, picked by intent. Values are desktop. Spacing tokens are desktop-only by design — mobile rhythm comes from the type scale swap at 768px, not from spacing overrides.

**Decision order:** section padding & container frame the page → content-gap separates blocks inside a section → heading-to-body sits under a heading → button-in-section spaces the CTA group → icon-size sets the icon box.

### Frame
| Token | Value |
|---|---|
| `--spacing-section-padding-tb-desktop` | 96px (64 mobile) |
| `--spacing-section-gap-desktop` | 80px |
| Container max-width | 1200px |
| Side padding | 32px desktop / 20px mobile (`--primitive-space-32` / `-20`) |

### Content gap — between major blocks in a section
| Token | Value |
|---|---|
| `--spacing-content-gap-xxl` | 48px |
| `--spacing-content-gap-xl` | 48px |
| `--spacing-content-gap-l` | 40px |
| `--spacing-content-gap-m` | 24px |
| `--spacing-content-gap-s` | 20px |
| `--spacing-content-gap-sm` | 16px |

### Heading-to-body gap — under a heading, by heading scale
| Token | Value | Pairs with |
|---|---|---|
| `--spacing-h-xxl-to-large` | 16px | text-h1 + body-large (hero) |
| `--spacing-h-xl-to-medium` | 12px | text-h2 + body-medium |
| `--spacing-h-l-to-medium` | 12px | text-h3 + body-medium |
| `--spacing-h-m-to-base` | 8px | text-h4 + body-base |
| `--spacing-h-s-to-base` | 8px | text-h5 + body-base |
| `--spacing-h-xs-to-small` | 8px | text-h6 + body-small |

### Button-in-section gap — around the CTA group / between buttons
| Token | Value |
|---|---|
| `--spacing-btn-in-section-xl` | 32px |
| `--spacing-btn-in-section-lg` | 32px |
| `--spacing-btn-in-section-md` | 24px |
| `--spacing-btn-in-section-sm` | 20px |
| `--spacing-btn-in-section-xs` | 16px |

### Section & card icon size
| Token | Value |
|---|---|
| `--spacing-icon-size-sm` | 20px |
| `--spacing-icon-size-md` | 24px |
| `--spacing-icon-size-lg` | 32px |

### When no named token fits
Snap to the nearest step on the primitive scale — never an off-scale number.
Scale: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 56 · 64 · 80 · 96 · 120 (`--primitive-space-*`).
Off-scale values (17px, 38px, etc.) are what make spacing drift across sections.

---

## Icon Usage

| Property | Rule |
|---|---|
| Library | `@hugeicons/react-pro` v0.3.2 |
| Variant | **One unified variant per site** — library standard `stroke.rounded` (what components/Icons, Footer, NavBar and all sections use). Never mix variants; switching means switching every icon on the site. |
| Usage | Always inline as SVG path data — no runtime imports |
| Default size | 24×24px |
| Small (buttons, inputs) | 20×20px |
| Large (feature icons) | 32×32px or 40×40px |
| Color | `currentColor` — inherits from parent text token |
| On dark surfaces | `--color-text-primary-invert`, never the brand color — brand-colored icons on dark break the light/dark toggle |
| Sourcing | Extract real paths from the installed Pro package: `node scripts/extract-hugeicon.mjs <icon-file-name> stroke.rounded` (`--find <term>` searches 7,800+ icons). Never freehand an icon. |

Icon pattern:
```jsx
const _IconName = ({ s, c }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
    <path d="..." fill={c} />
  </svg>
)
```

---

## Motion

Real motion (keyframes, rAF loops, intervals, transform transitions) always sits behind a `prefers-reduced-motion: reduce` guard — transitions off, content rendered in its final state. Keyframe names are prefixed `wpmn-` so sections coexist on one page.

---

## Responsive Basics

| Breakpoint | Width | Rules |
|---|---|---|
| Desktop | ≥ 1200px | Full layout, max-width container centered |
| Tablet | 768px – 1199px | Container fills width with 40px side padding. 2-col layouts stay 2-col. |
| Mobile | < 768px | All columns stack to 1-col. Side padding 20px. Section padding reduces to 64px. |
