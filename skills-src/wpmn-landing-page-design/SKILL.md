---
name: wpmn-landing-page-design
description: >
  Full design system rulebook for creating marketing landing pages and website sections for WPManageNinja products in Figma.
  Use this skill whenever Mhasan asks to design, create, build, or work on any landing page, website section, hero, features grid, pricing, CTA, footer, or any other page component for any WPMN product (FluentForms, FluentCRM, NinjaTables, FluentSupport, FluentBoards, FluentCart, FluentPlayer, FluentMembers, FluentAffiliate, FluentBooking, FluentCommunity, FluentSMTP, AzonPress, Paymattic, WPSocialNinja, or WPManageNinja itself).
  Also use for any Figma design task involving the WPMN design system — tokens, variables, components, layout grids, brand switching, or design QA.
  Use this even if the user just says "design the hero section" or "make a features block" or "create a landing page for X" — any WPMN product design request triggers this skill.
---

# WPMN Landing Page Design Skill

Use this skill whenever designing a marketing landing page — or any section of one — for a WPManageNinja product in Figma. This covers every rule, token, component, and constraint you need to follow. Nothing here is optional unless explicitly stated.

---

## 1. Context

- **Figma file:** `54BG58iHusICXloB0fauSM` (WPMN Design System Beta)
- **Library name in Figma:** `WPMN Design System Beta`
- **CSS source:** `wpmn-design-tokens/` folder (GitHub: mehdi214designer/wpmn-design-tokens)
- **Stack:** React + plain CSS custom properties. No build step.
- **Design → Code flow:** Design in Figma first. Figma variables are the source of truth. CSS tokens are derived from them.

---

## 2. Brand Activation

Every design must have a brand set. In Figma, apply the correct variable mode to the frame root. In CSS, set `data-brand="<key>"` on the root element.

| Product | Figma mode key | CSS key |
|---|---|---|
| WPManageNinja | `wpmanagenia` | `wpmanagenia` |
| FluentForms | `fluentforms` | `fluentforms` |
| FluentCRM | `fluentcrm` | `fluentcrm` |
| NinjaTables | `ninjatables` | `ninjatables` |
| FluentSupport | `fluentsupport` | `fluentsupport` |
| FluentAffiliate | `fluentaffiliate` | `fluentaffiliate` |
| FluentBoards | `fluentboards` | `fluentboards` |
| FluentCart | `fluentcart` | `fluentcart` |
| FluentPlayer | `fluentplayer` | `fluentplayer` |
| WPSocialNinja | `wpsocialninja` | `wpsocialninja` |
| FluentMembers | `fluentmembers` | `fluentmembers` |
| FluentBooking | `fluentbooking` | `fluentbooking` |
| FluentCommunity | `fluentcommunity` | `fluentcommunity` |
| FluentSMTP | `fluentsmtp` | `fluentsmtp` |
| AzonPress | `azonpress` | `azonpress` |
| Paymattic | `paymattic` | `paymattic` |

**Rule: never design a page without brand context set. Every component must inherit from the correct brand mode.**

---

## 3. Token Reference

### Figma variable naming → CSS token mapping

Figma uses `/` separators. CSS uses `--` prefix with `-` separators. They are 1:1.

#### Surface (backgrounds)

| Figma variable | CSS token | Value (light) | Use |
|---|---|---|---|
| `Color/Surface/primary` | `--color-surface-primary` | #ffffff | Default white sections |
| `Color/Surface/alt` | `--color-surface-alt` | #f6f7f8 | Soft gray sections |
| `Color/Surface/secondary` | `--color-surface-secondary` | #07090c | Dark sections |
| `Color/Surface/secondary-alt` | `--color-surface-secondary-alt` | #171b24 | Soft dark sections |
| `Color/Brand/Surface/brand` | `--color-brand-surface` | accent-400 | Brand tint containers |
| `Color/Brand/Surface/brand-invert` | `--color-brand-surface-secondary` | primary-200 | Secondary brand tint |
| `Color/Surface/Icon-primary` | `--color-surface-icon-primary` | #0f1218 | Icon containers on light |
| `Color/Surface/Icon-brand` | `--color-surface-icon-brand` | brand-specific | Icon containers on brand |

> **Note:** `Color/Surface/alt` and `Color/Surface/secondary-alt` exist in Figma variables but are **missing from tokens.css**. Add them before coding:
> ```css
> --color-surface-alt: var(--primitive-light-25);         /* #f6f7f8 */
> --color-surface-secondary-alt: var(--primitive-dark-600); /* #171b24 */
> ```

#### Text

| Figma variable | CSS token | Use |
|---|---|---|
| `Color/Text/primary` | `--color-text-primary` | Headings on light surfaces |
| `Color/Text/primary-invert` | `--color-text-primary-invert` | Headings on dark surfaces |
| `Color/Text/secondary` | `--color-text-secondary` | Body on light surfaces |
| `Color/Text/secondary-invert` | `--color-text-secondary-invert` | Body on dark surfaces |
| `Color/Brand/Text/text-brand` | `--color-text-brand` | Brand-tinted text (accent-300) |

#### Buttons

| Figma variable | CSS token | Description |
|---|---|---|
| `Spacing-new/Button/Colors/State/Default/button-enable` | `--btn-bg-enable` | Primary button fill — brand primary-500 |
| `Spacing-new/Button/Colors/State/Default/button-disabled` | `--btn-bg-disabled` | Disabled state |

#### Shadows

| CSS token | Type | Use |
|---|---|---|
| `--shadow-hard-100` to `--shadow-hard-1000` | Hard/crisp | Cards, menus, interactive elements |
| `--shadow-soft-100` to `--shadow-soft-800` | Soft/diffused | Mockups, modals, elevated surfaces |
| `--shadow-soft-400` | Soft minimum | Minimum shadow for all mockups |
| `--shadow-soft-600` | Soft standard | Standard mockup shadow |
| `--shadow-soft-800` | Soft maximum | Hero mockups, large features |

#### Highlighted text in headings

Use `--primitive-primary-500` directly (intentional exception to the no-primitives rule). This is the one place primitives are used in components.

```
DO:    The Best <span style="color: var(--primitive-primary-500)">Form Builder</span>
DON'T: The Best <span style="color: #6b7280">Form Builder</span>
DON'T: The Best <span style="color: var(--color-text-brand)">Form Builder</span>
```

---

## 4. Typography

**Font:** Work Sans only. Never substitute.
**Weights:** Regular 400, Medium 500, SemiBold 600, Bold 700

### Figma text styles → CSS utility classes

| Figma style | CSS class | Size (desktop) | Line height | Weight | Use |
|---|---|---|---|---|---|
| H1 | `.text-h1` | 61px | 73px | Bold 700 | Hero headlines |
| H2 | `.text-h2` | 49px | 59px | Bold 700 | Section headlines |
| H3 | `.text-h3` | 39px | 47px | SemiBold 600 | Sub-section headlines |
| H4 | `.text-h4` | 31px | 37px | SemiBold 600 | Card titles |
| H5 | `.text-h5` | 25px | 30px | Medium 500 | Feature titles |
| H6 | `.text-h6` | 20px | 24px | Medium 500 | Small labels |
| Body large | `.text-body-large` | 20px | 30px | Regular 400 | Hero subtext |
| Body medium | `.text-body-medium` | 18px | 27px | Regular 400 | Standard body |
| Body base | `.text-body-base` | 16px | 24px | Regular 400 | Default paragraph |
| Body small | `.text-body-small` | 14px | 21px | Regular 400 | Hints, support text |
| Body label | `.text-body-label` | 13px | 20px | Medium 500 | Labels, badges |
| `Button/xlarge` | `.text-btn-xl` | 23px | 28px | SemiBold 600 | XL button text |
| `Button/large` | `.text-btn-lg` | 20px | 24px | SemiBold 600 | LG button text |
| `Button/medium` | `.text-btn-md` | 18px | 20px | SemiBold 600 | MD button text |
| `Button/small` | `.text-btn-sm` | 16px | 18px | Medium 500 | SM button text |
| `Button/xsmall` | `.text-btn-xs` | 13px | 16px | Medium 500 | XS button text |

**Mobile overrides** kick in at `max-width: 768px` — H1 drops to 32px, H2 to 28px, etc. These are handled automatically via media query.

**Rules:**
- Centered section text max width: 800px always
- All section headings, subtext, toggles, CTAs: center-aligned
- Never hardcode font sizes — always use the CSS class or Figma text style
- Never use a font other than Work Sans

---

## 5. Components

All components exist in the Figma library "WPMN Design System Beta". Always insert from the library — never recreate from scratch.

> **Hard rule across all components:** If it is not a library instance, it is wrong. A rectangle that looks like a button is not a button. A frame that looks like a navbar is not a navbar. There is no acceptable substitute for a library component.

### Button (`buttons`)

**Component key:** `f90ceca38f7c19dea8078cab1f04a12c807831ad`

| Prop | Values |
|---|---|
| Type | Primary · Secondary · Tertiary |
| Size | Extra large · Large · Medium · Small · Extra small |
| State | Enabled · Hovered · Pressed · Focused · Disabled |

Size specs:
- XL: h 64px, px 32px, gap 8px, radius 8px
- LG: h 56px, px 32px, gap 8px, radius 8px
- MD: h 48px, px 24px, gap 8px, radius 8px
- SM: h 40px, px 20px, gap 4px, radius 8px
- XS: h 32px, px 16px, gap 4px, radius 4px

**Rules:**
- **Only the library component is acceptable.** Go to Assets → WPMN Design System Beta → `buttons`. Drag it onto the canvas. Do not draw a rectangle and style it as a button.
- Always pair Primary + Secondary side by side. Never solo. Never stacked.
- Never hardcode button background color. Must inherit `--btn-bg-enable` from brand mode.
- Default size for landing pages: Large (56px)

---

### Nav Bar (`Nav Bar`)

**Component key:** `842f3ea3789a4197bf9d0411489152df47215844`

Light navbar (default) or dark navbar variant. Responsive: full nav desktop, hamburger drawer mobile.

**Rules:**
- **Only the library component is acceptable.** A blank frame is never a navbar. Go to Assets → WPMN Design System Beta → `Nav Bar`. Drag it onto the canvas. Nothing else.
- The navbar is always the first element in the page frame.

**Logo rules per navbar style:**

| Navbar | Logo type |
|---|---|
| Light (default) | `logo-dark.svg` — colored icon + dark text |
| Dark | `logo-inverted.svg` — white icon + white text |

---

### Badge — Section Header Label (`bedge light soft-round`)

**Component key:** `786c78c2c508a2b4d5c31f32427b24127dd6bfa0`

> Note: named "bedge" in Figma (typo), "Badge" in code docs.

Use `variant="pill"` with a custom text label for section header labels. Format: uppercase text, short, dot prefix (•).

Example: `• MOST LOVED FORM PLUGIN`

**Rules:**
- **Only the library component is acceptable.** Do not create a pill shape manually. Go to Assets → WPMN Design System Beta → `bedge light soft-round`.
- Optional — not every section needs one
- Always sits above the heading
- Uses brand accent color
- Spacing below badge to heading: 12px

---

### Cards (`Cards`)

**Component key:** `5feaa5e621e107b8778d93f313366e7b16e43aa5`

Use for feature cards, benefit tiles, and testimonial blocks.

**Rules:**
- **Only the library component is acceptable.** Do not build a card from scratch.
- Border radius: 16px always
- Shadow: `--shadow-hard-300` minimum for interactive cards
- Border: `1px solid --color-border-primary`

---

### Footer

Full site footer. Always dark background. Always uses `logo-inverted.svg`.

---

### Tooltip (`tooltip`)

**Component key:** `83776b25fa3eac6a38a910061e31fbbaf5add813`

---

## 6. Layout System

### Container

| Property | Value |
|---|---|
| Max width | 1200px |
| Alignment | `margin: 0 auto` — centered, no horizontal padding |
| Section padding | 96px top + bottom (desktop), 64px (mobile) |

### Section header anatomy

Every section follows this exact order (top to bottom):

```
[Badge]      — optional. Pill variant. Uppercase. Dot prefix. Brand accent color.
Heading      — required. Max 800px wide. Center-aligned. H2 for sections.
[Subtext]    — optional. 1–2 sentences max. body-medium or body-large. Center-aligned.
[CTAs]       — always side by side: [ Primary ] [ Secondary ]. Spacing above: 32px.
```

### Seven approved grid layouts

Do not use any column ratio outside these seven.

| # | Name | Columns | Gutter | Use case |
|---|---|---|---|---|
| 1 | Full width | 12/12 | — | Hero, CTA banners, testimonials, full-width features |
| 2 | Equal 2-col | 6/6 | 48px | Text + mockup, hero split |
| 3 | Equal 3-col | 4/4/4 | 32px | Feature cards |
| 4 | Equal 4-col | 3/3/3/3 | 24px | Icon rows, compact feature grids |
| 5 | Asymmetric | 5/7 | 48px | Text-heavy left + large visual right |
| 6 | Asymmetric | 4/8 | 48px | Sidebar label + main content, pricing |
| 7 | Stacked | 6 + (6/6) | 48px outer / 24px inner | Large card left, two stacked small cards right |

### Responsive breakpoints

| Breakpoint | Width | Rules |
|---|---|---|
| Desktop | ≥ 1200px | Full layout, centered container |
| Tablet | 768px–1199px | Container fills width, 40px side padding, 2-col stays 2-col |
| Mobile | < 768px | All columns stack to 1-col, 20px side padding, 64px section padding |

---

## 7. Section Backgrounds and Alternation

### Four surface types

| Name | Token | Primitive | Note |
|---|---|---|---|
| primary | `--color-surface-primary` | `--primitive-light-0` | White — default, starting point |
| alt | `--color-surface-alt` | `--primitive-light-25` | Soft gray — separates without hard contrast |
| secondary | `--color-surface-secondary` | `--primitive-dark-800` | Dark — max 1–2 per page |
| secondary-alt | `--color-surface-secondary-alt` | `--primitive-dark-600` | Soft dark — for variation within dark sections |

### Text token pairings per surface

**Rule: never place dark text on a dark surface. Never place white text on a light surface.**

| Surface | Heading token | Body token |
|---|---|---|
| primary | `--color-text-primary` | `--color-text-secondary` |
| alt | `--color-text-primary` | `--color-text-secondary` |
| secondary | `--color-text-primary-invert` | `--color-text-secondary-invert` |
| secondary-alt | `--color-text-primary-invert` | `--color-text-secondary-invert` |

### Recommended page section sequence

| Section | Surface | Notes |
|---|---|---|
| NavBar | — | Sits above page flow |
| Hero | primary | Always white. Clean entry point. |
| Features | alt | Soft gray separates from hero. |
| Showcase / Demo | primary | Back to white. |
| Dark CTA / Testimonials / Stats | secondary | One dark emphasis section. |
| Pricing | alt | Back to light immediately after dark. |
| FAQ / Final CTA | primary | — |
| Footer | secondary | Always dark. Does not count against dark section budget. |

### Rules

- Maximum 1–2 dark sections per page. Footer doesn't count.
- Never two dark sections back to back.
- Never two identical surfaces back to back (e.g., alt → alt).

```
DO:    primary → alt → primary → secondary → alt → primary
DON'T: secondary → secondary
DON'T: alt → alt
DON'T: primary → secondary → secondary-alt → secondary  (too many dark)
```

---

## 8. Spacing Reference

### Within-section element spacing

| Element gap | Value |
|---|---|
| Badge → Heading | 12px |
| Heading → Subtext | 16px |
| Subtext → Content area | 48px |
| Section header → CTA buttons | 32px |
| Between 3-col feature cards | 32px |
| Between 4-col feature cards | 24px |
| Icon → Heading (within card) | 12px |
| Heading → Body (within card) | 8px |

### Border radius

| Use | Radius |
|---|---|
| Cards, feature tiles, image frames | 16px (`--primitive-radius-md`) |
| Section containers, mockup wrappers | 32px (`--primitive-radius-lg`) |
| Buttons (XL, LG, MD, SM) | 8px (`--primitive-radius-xs`) |
| Buttons (XS) | 4px (`--primitive-radius-xxs`) |
| Inputs, small elements | 12px (`--primitive-radius-sm`) |

---

## 9. Logo Usage

Logo files live at `logos/<brand>/`. Always use SVG. Never use placeholders, rasters, or text substitutes.

### Logo types

| Type | Description | When to use |
|---|---|---|
| `logo-dark.svg` | Colored icon + dark text | Light / white backgrounds |
| `logo-inverted.svg` | White icon + white text | Dark backgrounds |
| `logo-primary.svg` | Full color | Brand-specific use only |
| `logo-black.svg` | All black | Special cases |
| `logo-white.svg` | All white | Special cases |
| `icon-*.svg` | Icon only (no text) | Favicon, small spaces |

### Logo selection rules

| Background | Use |
|---|---|
| `primary` surface (white) | `logo-dark.svg` |
| `alt` surface (soft gray) | `logo-dark.svg` |
| `secondary` surface (dark) | `logo-inverted.svg` |
| `secondary-alt` surface (soft dark) | `logo-inverted.svg` |
| Light navbar | `logo-dark.svg` |
| Dark navbar | `logo-inverted.svg` |
| Footer (always dark) | `logo-inverted.svg` |

---

## 10. Mockup and Screenshot Treatment

### Required treatment

```
┌─────────────────────────────────────────┐  ← outer wrapper
│   radius: 32px                          │    surface: secondary or brand-surface
│   ┌─────────────────────────────────┐   │  ← mockup frame
│   │   radius: 16px                  │   │    shadow: --shadow-soft-400 minimum
│   │   border: 1px solid border-primary   │    border: 1px solid --color-border-primary
│   │   product screenshot            │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Shadow scale for mockups

| Token | Use |
|---|---|
| `--shadow-soft-400` | Minimum — light sections |
| `--shadow-soft-600` | Standard — most mockups |
| `--shadow-soft-800` | Hero mockups, large showcase blocks |

### Browser frame (optional)

When showing a browser chrome around a screenshot:
- Title bar: `--primitive-light-25`
- Traffic lights: `#ff5f57` · `#febc2e` · `#28c840`
- Title bar border: `1px solid --color-border-primary`
- Content area: `#ffffff`

### DON'T

- No shadow — looks flat
- Radius below 8px
- Mockup floating directly on white — always needs a wrapper surface
- Raster images without proper frame treatment

---

## 11. Icons

**Library:** `@hugeicons/react-pro` v0.3.2
**Variant:** `solid.rounded` — always, no exceptions

| Size | Use |
|---|---|
| 20×20px | Buttons, inputs |
| 24×24px | Default, nav, inline |
| 32×32px | Feature cards |
| 40×40px | Large feature icons, hero section icons |

**Color:** Always `currentColor` — inherits from parent text token. Exception: explicit brand color icon backgrounds use `--btn-bg-enable`.

**In Figma:** Use icons from the WPMN Design System Beta library. All icons are HugeIcons solid.rounded variant.

**In code:** Always inline SVG path data. Never import from the library at runtime.

```jsx
var _IconName = function(props) {
  return (
    <svg width={props.s} height={props.s} viewBox="0 0 24 24" fill="none">
      <path d="..." fill={props.c} />
    </svg>
  );
};
// Usage: <_IconName s={24} c="currentColor" />
```

---

## 12. Design Workflow in Figma

### Starting a new landing page design

1. Open Figma file `54BG58iHusICXloB0fauSM`
2. Create a new page or frame inside the file
3. Set the frame width to 1440px (desktop design canvas)
4. Apply the correct brand variable mode to the root frame
5. Insert components from the WPMN Design System Beta library — never recreate them
6. Use only variables from the "Tokens" variable collection for colors
7. Use only text styles from the WPMN Design System Beta library

### Frame naming convention

`[ProductName] / [PageName] / [Section]`

Example: `FluentForms / Homepage / Hero`

### Figma component insert order for a typical landing page

1. Nav Bar (light variant)
2. Hero section (full-width frame, `primary` surface)
3. Social proof / trust bar (full-width, `primary` surface)
4. Features section (`alt` surface, 3-col or 4-col grid)
5. Showcase / Demo section (`primary` surface, 6/6 grid)
6. Dark CTA or testimonials (`secondary` surface)
7. Pricing (`alt` surface, 3-col grid)
8. FAQ or final CTA (`primary` surface)
9. Footer (`secondary` surface)

---

## 13. Strict Rules — Never Break Without Explicit Command

These cannot be overridden by convenience, time pressure, or creative preference:

1. **Never use primitive tokens directly in components** — use semantic tokens. Exception: highlighted heading text uses `--primitive-primary-500`.
2. **Never hardcode hex colors** in Figma or CSS.
3. **Never use a font other than Work Sans.**
4. **Never place dark text on a dark surface** or white text on a light surface.
5. **Never use a placeholder box as a logo** — always use the actual SVG file.
6. **Never float a mockup directly on white** — always wrap it in a surface container.
7. **Never have a mockup with no shadow** — minimum `--shadow-soft-400`.
8. **Never use back-to-back dark sections.**
9. **Never use more than 2 dark sections per page** (footer excluded).
10. **Never use a grid layout outside the 7 approved layouts.**
11. **Never show a lone CTA button** — always pair primary + secondary.
12. **Never use a hardcoded button background color** — must be `--btn-bg-enable`.
13. **Never design without brand mode set** on the root frame.
14. **Never use `const` inside JSX function bodies in code** — use `var`.
15. **Never use a blank frame as a spacer.** Spacing between elements is always set via Auto Layout gap, row gap, column gap, or padding. A frame placed between two elements purely to create space is always wrong — delete it and set the gap in the Auto Layout panel instead.
16. **Never build a Button from scratch.** The only acceptable button is the `buttons` library component (key: `f90ceca38f7c19dea8078cab1f04a12c807831ad`). A rectangle styled to look like a button is not a button.
17. **Never use a blank frame as a NavBar.** The only acceptable navbar is the `Nav Bar` library component (key: `842f3ea3789a4197bf9d0411489152df47215844`). A frame with some text and a logo placed inside it is not a navbar.
18. **Never build a Badge from scratch.** The only acceptable badge is the `bedge light soft-round` library component (key: `786c78c2c508a2b4d5c31f32427b24127dd6bfa0`).

---

## 14. During-Design Blocking Checklist

Run this check before moving on from each element you place. Not at the end — right now, as you work.

### Before placing any button

- [ ] Is it the `buttons` library component from WPMN Design System Beta? If not, delete it and insert the correct one.
- [ ] Is it paired with a second button (Primary + Secondary)? A solo button is never acceptable.
- [ ] Is the size Large (56px) for landing pages?

### Before placing the navbar

- [ ] Is it the `Nav Bar` library component from WPMN Design System Beta? If not, delete it and insert the correct one.
- [ ] Is it the first element in the page frame?
- [ ] Is the correct logo variant set (dark on light, inverted on dark)?

### Before placing any badge

- [ ] Is it the `bedge light soft-round` library component? If not, delete it and insert the correct one.

### Before placing any spacing

- [ ] Is the space between elements set via Auto Layout gap in the panel? If you placed a blank frame to create space, delete it and set the gap instead.
- [ ] Is section padding set as Auto Layout padding on the section frame — not as empty top/bottom frames?

### Before placing any card

- [ ] Is it the `Cards` library component? If not, delete it and insert the correct one.

### Before finishing any section

- [ ] Does every text layer use a WPMN library text style — not a manual font size?
- [ ] Does every color reference a Figma variable — no raw hex anywhere?
- [ ] Is the section background set to the correct surface token variable?

---

## 15. Pre-Delivery Quality Check

Before showing the final design to Mhasan, run through every item in this checklist. Do not skip. Do not present the design if any item fails.

### 15.1 Activate the UI Pro skill first

Before designing anything, run:

```
$ uipro init --ai claude
```

Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git

This skill layers additional high-end UI/UX principles on top of the WPMN design system rules. Use both together. The WPMN rules are the constraint layer — UI Pro is the quality layer.

---

### 15.2 Design System Integrity Check

Verify every single one of these before delivery:

| Layer | What to check |
|---|---|
| **Tokens** | Every color, spacing, and radius value references a Figma variable from the "Tokens" collection — no raw hex, no hardcoded numbers |
| **Variables** | Brand mode is applied on the root frame. Light/dark mode is consistent throughout. |
| **Text styles** | Every text layer uses a WPMN text style from the library — no detached styles, no manual font-size overrides |
| **Components** | All components (Button, NavBar, Badge, Cards, Footer) are library instances — not local copies or recreations |
| **Structure** | Every section follows the correct anatomy: [Badge] → Heading → [Subtext] → [CTAs] |
| **Layout** | Only the 7 approved grid layouts are used. No arbitrary column ratios. Container is max 1200px. |
| **Spacing** | Section padding is 96px top/bottom (desktop). Within-section gaps match the spacing reference table exactly. |
| **Radius** | Cards = 16px. Mockup wrappers = 32px. Buttons match size spec. No other values. |
| **Border** | Mockups have `1px solid --color-border-primary`. Cards have `1px solid --color-border-primary`. No random border colors. |

---

### 15.3 Section Integrity Check

Go through each section individually and confirm:

- [ ] Section does not bleed into the next — clean top and bottom boundaries
- [ ] Section background uses the correct surface token, not a raw color
- [ ] Text color matches the surface (dark text on light, white text on dark)
- [ ] No section is left incomplete — every section has at minimum a heading
- [ ] Section alternation follows the approved sequence — no back-to-back darks, no repeated surfaces
- [ ] Every CTA has both Primary and Secondary buttons, never just one

---

### 15.4 Auto Layout Check

Every frame, section, and component must use Figma Auto Layout correctly. Check all of these:

- [ ] All sections use Auto Layout (vertical, fill container width)
- [ ] Section padding is set as Auto Layout padding on the section frame — not empty top/bottom child frames
- [ ] **No blank frames exist anywhere as spacers.** Search the layer panel for unnamed frames with no content. If found, delete them and set the gap in Auto Layout instead.
- [ ] All column grids use Auto Layout with the correct gap (48px / 32px / 24px per layout type) — the gap is set in the Auto Layout panel, not by inserting empty frames between columns
- [ ] Components inside cards use Auto Layout — text stacks correctly at any content length
- [ ] No element has a fixed height that could cause text cut-off on content resize
- [ ] Hugging vs fill is set correctly:
  - Text layers: Hug width unless constrained to a max-width
  - Section frames: Fill container width
  - Cards in a grid: Fill container (equal width distribution)
  - CTAs wrapper: Hug — never stretches buttons to full width
- [ ] No overlapping layers that bypass Auto Layout
- [ ] Nested Auto Layout frames inherit direction correctly (outer = vertical, inner rows = horizontal)

---

### 15.5 Text and Element Clip Check

Before delivering, zoom into every text block and verify:

- [ ] No text is clipped, truncated, or hidden by a parent frame with `clip content` on
- [ ] No text layer has a fixed height smaller than its content
- [ ] Long headings wrap correctly and do not overflow their container
- [ ] Body text in cards wraps to multiple lines without cutting off
- [ ] Badge labels are not clipped — padding is sufficient around the text
- [ ] Button labels are fully visible at every size
- [ ] Icon + text rows have enough gap — icons don't overlap text
- [ ] On long section subtext (2 sentences), the layout still holds — test with realistic copy, not "Lorem ipsum"

---

### 15.6 Final Delivery Gate

Only present the design after all boxes above are checked. If anything fails, fix it first. The order is:

```
Design → DS Integrity Check → Section Check → Auto Layout Check → Clip Check → Present
```

Never present a work-in-progress as a final design. If something is intentionally incomplete, say so explicitly before showing it.

---

## 16. Known Gaps to Handle

| Gap | Status | Action |
|---|---|---|
| `--color-surface-alt` missing from tokens.css | Not in CSS, exists in Figma | Add to tokens.css before coding |
| `--color-surface-secondary-alt` missing from tokens.css | Not in CSS, exists in Figma | Add to tokens.css before coding |
| `Badge.jsx` not yet created | CSS only | Use Badge CSS class or the Figma component; no React component yet |
| `Logo.jsx` not yet created | CSS only | Use SVG directly; no React component yet |
| Accent scales missing for 5 brands | FluentBooking, FluentCommunity, FluentSMTP, AzonPress, Paymattic | Use primary scale only for these brands |
