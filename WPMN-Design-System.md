# WPMN Design System

One file, the whole system. This documents the WPManageNinja (WPMN) design system: tokens, brands, typography, components, and the 57-section library used to build marketing pages for FluentForms, FluentCRM, NinjaTables, and 13 more WordPress plugin brands.

It is built so a designer can email it to a teammate, or paste it straight into Claude/ChatGPT and ask for an on-brand page. Everything you need to understand and use the system is in here. The CSS to actually load is `wpmn-bundle.css` (tokens) plus `wpmn-components.css` (component styles).

---

## Table of contents

1. [How to use this file](#1-how-to-use-this-file)
2. [Activation and cascade](#2-activation-and-cascade)
3. [Brand system (16 brands)](#3-brand-system-16-brands)
4. [Color system](#4-color-system)
5. [Button tokens](#5-button-tokens)
6. [Spacing system](#6-spacing-system)
7. [Typography](#7-typography)
8. [Radius](#8-radius)
9. [Shadows](#9-shadows)
10. [Icons](#10-icons)
11. [Components](#11-components)
12. [Logo rules](#12-logo-rules)
13. [Section library (57 sections)](#13-section-library-57-sections)
14. [Do's and don'ts](#14-dos-and-donts)
15. [Build workflow](#15-build-workflow)

---

## 1. How to use this file

**For humans.** Read top to bottom, or jump around with the table of contents. Tokens and values are in tables, examples are in code blocks. Every hex and px value here is pulled straight from the source CSS, so you can trust it.

**For AI.** Paste this whole file into the chat, then describe the page you want. The rules below are binding. Use semantic tokens (never raw hex), set `data-brand` on `<html>`, compose from the section library first, inline the real logo SVG, and follow the typography canon. When in doubt, snap to the nearest token rather than inventing a value.

---

## 2. Activation and cascade

The brand color system is off until you set `data-brand` on `<html>`. Skip it and every product renders the default WPManageNinja blue.

- **`data-brand="<key>"` on `<html>`** is REQUIRED. It overrides `--primitive-primary-*` and `--primitive-accent-*` for the whole subtree. All semantic tokens cascade from there automatically.
- **`data-theme="dark"`** switches to dark mode.
- **Mobile auto-swaps at `max-width: 768px`** for type sizes and a few spacing/color tokens. You don't write mobile font sizes by hand.

**Cascade order** (this is the load order, each layer feeds the next):

1. `primitives.css` - raw values (color ramps, spacing scale, radius scale)
2. `brand-primitives.css` - per-brand overrides of the primary + accent ramps
3. `tokens.css` - semantic tokens that map meaning onto primitives (`--color-*`, `--btn-*`, `--radius-*`, spacing, input, shadows)
4. `typography.css` - font family, type scale, `.text-*` classes

All four are merged into `wpmn-bundle.css`, so in practice you load one file. Add `wpmn-components.css` for the component classes.

**Minimal setup:**

```html
<!DOCTYPE html>
<html data-brand="fluentforms">
  <head>
    <link rel="stylesheet" href="wpmn-bundle.css">
    <link rel="stylesheet" href="wpmn-components.css">
  </head>
  <body>
    <!-- sections + components go here -->
  </body>
</html>
```

Dark mode: `<html data-brand="fluentforms" data-theme="dark">`.

---

## 3. Brand system (16 brands)

Set the `data-brand` key on `<html>`. Each brand swaps the primary and accent ramps; the 500 step is the headline brand color.

| Brand | data-brand key | Primary (500) | Accent (500) |
|---|---|---|---|
| WPManageNinja (default) | `wpmanagenia` | `#0D5FFF` | `#4C5C73` |
| FluentForms | `fluentforms` | `#2B6CFF` | `#089DFF` |
| FluentCRM | `fluentcrm` | `#BA4CDE` | `#7742E6` |
| FluentBooking | `fluentbooking` | `#2653C5` | (accent not yet available) |
| FluentCommunity | `fluentcommunity` | `#485CE0` | (accent not yet available) |
| Ninja Tables | `ninjatables` | `#046EC0` | `#00AC9E` |
| Paymattic | `paymattic` | `#FF6A00` | (accent not yet available) |
| FluentBoards | `fluentboards` | `#F1EB62` | `#6268F1` |
| FluentSMTP | `fluentsmtp` | `#C516C0` | (accent not yet available) |
| FluentSupport | `fluentsupport` | `#00B36D` | `#FFCA6D` |
| FluentAffiliate | `fluentaffiliate` | `#2C6AE2` | `#2CC5E2` |
| AzonPress | `azonpress` | `#FFC800` | (accent not yet available) |
| WP Social Ninja | `wpsocialninja` | `#5B2DD4` | `#FF0C79` |
| FluentCart | `fluentcart` | `#0000D9` | `#00009F` |
| FluentPlayer | `fluentplayer` | `#0163DD` | `#DD1E13` |
| FluentMembers | `fluentmembers` | `#824EEB` | `#611CEB` |

Note: the default WPManageNinja key is spelled `wpmanagenia` in the CSS (no extra "n"). Five brands (FluentBooking, FluentCommunity, Paymattic, FluentSMTP, AzonPress) ship primary-only for now; their accent falls back to the WPManageNinja accent until their token file lands.

---

## 4. Color system

Two layers: **primitives** (raw ramps, the source of truth) and **semantic tokens** (what you actually use). Rule: in components use the semantic `--color-*` tokens, never raw primitives.

### 4a. Primitive ramps

Static ramps (same across all brands):

**Light (neutral grays)**

| Step | Hex | Step | Hex |
|---|---|---|---|
| light-0 | `#ffffff` | light-500 | `#949dae` |
| light-25 | `#f6f7f8` | light-600 | `#838da0` |
| light-50 | `#edeef1` | light-700 | `#717d93` |
| light-100 | `#dbdee4` | light-800 | `#5f6d85` |
| light-200 | `#c9ced6` | light-900 | `#4e5d78` |
| light-300 | `#b8bec9` | | |
| light-400 | `#a6aebb` | | |

**Dark**

| Step | Hex | Step | Hex |
|---|---|---|---|
| dark-50 | `#46536c` | dark-500 | `#1f2530` |
| dark-100 | `#3e4a60` | dark-600 | `#171b24` |
| dark-200 | `#364154` | dark-700 | `#0f1218` |
| dark-300 | `#2e3748` | dark-800 | `#07090c` |
| dark-400 | `#272e3c` | dark-900 | `#000000` |

**Feedback ramps** (key steps)

| Ramp | 300 | 400 | 500 | 600 |
|---|---|---|---|---|
| Success | `#80f075` | `#55eb47` | `#2be51a` | `#22b814` |
| Warning | `#ffb266` | `#ff9933` | `#ff8000` | `#cc6600` |
| Error | `#ff6666` | `#ff3333` | `#ff0000` | `#cc0000` |

**Primary + accent** are per-brand. The default WPManageNinja ramps: primary 50→950 `#e6effe #cedfff #9fbfff #6d9fff #3e7dff #0d5fff #094ccb #083999 #062666 #011333 #000919`; accent 50→950 `#edeef1 #dcdee2 #b7bec7 #939dab #6e7d8f #4c5c73 #3c4a5c #2d3745 #1d252e #101217 #07090b`. Each brand overrides these (see section 3).

### 4b. Semantic color tokens (light + dark)

Use these in markup and CSS. On dark or brand surfaces, switch text to the `-invert` variant.

**Text**

| Token | Light | Dark |
|---|---|---|
| `--color-text-primary` | `#07090c` | `#ffffff` |
| `--color-text-secondary` | `#4e5d78` | `#dbdee4` |
| `--color-text-primary-invert` | `#ffffff` | `#07090c` |
| `--color-text-secondary-invert` | `#dbdee4` | dark-500 `#1f2530` |
| `--color-text-brand` | accent-300 `#939dab` | accent-200 `#b7bec7` |

**Surface**

| Token | Light | Dark |
|---|---|---|
| `--color-surface-primary` | `#ffffff` | `#07090c` |
| `--color-surface-secondary` | `#07090c` | `#ffffff` |
| `--color-surface-alt` | light-25 `#f6f7f8` | (inherits light) |
| `--color-surface-secondary-alt` | dark-600 `#171b24` | (inherits light) |
| `--color-surface-icon-primary` | dark-700 `#0f1218` | `#ffffff` |
| `--color-surface-icon-primary-invert` | `#ffffff` | dark-700 `#0f1218` |
| `--color-surface-icon-brand` | primary-400 | primary-200 |

**Brand surface**

| Token | Light | Dark | Mobile light |
|---|---|---|---|
| `--color-brand-surface` | accent-400 `#6e7d8f` | primary-200 `#9fbfff` | accent-500 `#4c5c73` |
| `--color-brand-surface-secondary` | primary-200 `#9fbfff` | accent-100 `#dcdee2` | |

### Dark sections (the #1 thing that breaks)

A dark section is not just a dark background. The moment something sits on `--color-surface-secondary`, every heading, paragraph, and icon inside must switch to the `-invert` tokens. Paint a dark background but leave the heading on `--color-text-primary` and you get near-black text on a near-black surface: the heading disappears. Copy this:

```css
.dark-section {
  background: var(--color-surface-secondary);
  color: var(--color-text-primary-invert);   /* base text defaults to white */
}
.dark-section .heading { color: var(--color-text-primary-invert); }
.dark-section .subtext { color: var(--color-text-secondary-invert); }
.dark-section svg      { color: var(--color-text-primary-invert); }   /* currentColor */
```

Set the invert color on the dark root so any child that forgets its own color inherits white. The only exception is a light card on the dark section: it paints its own `--color-surface-primary`, so text inside it stays on the normal `--color-text-primary` / `--color-text-secondary`.

**Border**

| Token | Light | Dark |
|---|---|---|
| `--color-border-primary` | `#dbdee4` | `#0f1218` |
| `--color-border-primary-invert` | `#0f1218` | `#dbdee4` |

**Feedback / status**

| Token | Light | Dark |
|---|---|---|
| `--color-success-primary` | success-600 `#22b814` | success-400 `#55eb47` |
| `--color-success-invert` | success-400 `#55eb47` | success-600 `#22b814` |
| `--color-warning-primary` | warning-600 `#cc6600` | warning-400 `#ff9933` |
| `--color-warning-invert` | warning-400 `#ff9933` | warning-600 `#cc6600` |
| `--color-error-primary` | error-400 `#ff3333` | error-500 `#ff0000` |
| `--color-error-invert` | error-500 `#ff0000` | error-400 `#ff3333` |

**Input tokens** (light / dark)

| Token | Light | Dark |
|---|---|---|
| `--input-stroke-default` | `#c9ced6` | `#2e3748` |
| `--input-stroke-hover` | `#a6aebb` | `#3d4f69` |
| `--input-stroke-active` | `#1a1add` | `#6d9fff` |
| `--input-stroke-error` | `#ff6666` | `#ff6666` |
| `--input-stroke-success` | `#80f075` | `#55eb47` |
| `--input-stroke-disable` | `#c9ced6` | `#2e3748` |
| `--input-text-default` | `#a6aebb` | `#838da0` |
| `--input-text-hover` | `#4e5d78` | `#dbdee4` |
| `--input-text-active` | `#272e3c` | `#ffffff` |
| `--input-text-error` | `#ff0000` | (light value) |
| `--input-text-success` | `#22b814` | (light value) |
| `--input-text-disable` | `#b8bec9` | `#4e5d78` |
| `--input-fill-default` | `#edeef1` | `#1d252e` |
| `--input-fill-hover` | `#e3e5e9` | `#2d3745` |
| `--input-fill-active` | `#ffffff` | `#07090c` |
| `--input-fill-disable` | `#f6f7f8` | `#151b24` |

`--input-label-color` maps to `--color-text-primary`, `--input-hint-color` to `--color-text-secondary`.

---

## 5. Button tokens

Button backgrounds are state tokens, light and dark. The default set is for buttons on light/brand surfaces; the invert set is for buttons on dark surfaces. Pair with invert text and the inner glow.

**Default set**

| State | Light | Dark |
|---|---|---|
| `--btn-bg-enable` | primary-500 `#0d5fff` | primary-100 `#cedfff` |
| `--btn-bg-hovered` | primary-700 `#083999` | primary-200 `#9fbfff` |
| `--btn-bg-pressed` | primary-800 `#062666` | primary-300 `#6d9fff` |
| `--btn-bg-focused` | primary-100 `#cedfff` | primary-600 `#094ccb` |
| `--btn-bg-disabled` | primary-100 `#cedfff` | primary-800 `#062666` |

**Invert set** (buttons on dark surfaces)

| State | Light | Dark |
|---|---|---|
| `--btn-bg-enable-invert` | primary-100 `#cedfff` | accent-500 `#4c5c73` |
| `--btn-bg-hovered-invert` | primary-200 `#9fbfff` | accent-700 `#2d3745` |
| `--btn-bg-pressed-invert` | primary-300 `#6d9fff` | accent-800 `#1d252e` |
| `--btn-bg-focused-invert` | primary-600 `#094ccb` | primary-100 `#cedfff` |
| `--btn-bg-disabled-invert` | primary-800 `#062666` | primary-100 `#cedfff` |

Mobile dark overrides `--btn-bg-enable-invert` to accent-500.

Note: the inner highlight uses `--btn-bg-glow`. It isn't a defined token, it's used with a fallback (`var(--btn-bg-glow, rgba(255,255,255,0.3))`) for the `box-shadow: inset` on primary buttons, so just keep that fallback when you copy a button.

Button rules: primary = brand bg + invert text + inset glow + hover/pressed/focus states; secondary = transparent + 1.5px brand border, fills on hover (use the ghost-invert variant on dark surfaces); tertiary = text only. Size steps 32-64px height, radius `--radius-xsm`, 120ms ease transitions, one primary per section, no pill shapes, no underlines.

---

## 6. Spacing system

Spacing is named tokens only, picked by intent. Values are desktop; the named gap tokens (except button-in-section) are desktop-only.

### 6a. Primitive space scale

`--primitive-space-*`: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120, 128, 160, 192, 224, 256 (each value in px matches its name, e.g. `--primitive-space-24` = 24px). This is the fallback scale when no semantic gap fits.

### 6b. Section and layout spacing

| Token | Value |
|---|---|
| `--spacing-section-padding-tb-desktop` | 96px |
| `--spacing-section-gap-desktop` | 80px |
| `--spacing-section-padding-tb-mobile` | 64px |
| `--spacing-section-gap-mobile` | 48px |
| Container max width | 1200px, `margin: 0 auto` (no side padding on desktop) |

### 6c. The three semantic gap families

**Family 1 - heading to body** (`--spacing-h-*-to-*`), keyed by heading size:

| Token | Value |
|---|---|
| `--spacing-h-xxl-to-large` | 16px |
| `--spacing-h-xl-to-medium` | 12px |
| `--spacing-h-l-to-medium` | 12px |
| `--spacing-h-m-to-base` | 8px |
| `--spacing-h-s-to-base` | 8px |
| `--spacing-h-xs-to-small` | 8px |

**Family 2 - content gap** (`--spacing-content-gap-*`), between blocks, keyed by the block's heading:

| Token | Value |
|---|---|
| `--spacing-content-gap-xxl` | 48px |
| `--spacing-content-gap-xl` | 48px |
| `--spacing-content-gap-l` | 40px |
| `--spacing-content-gap-m` | 24px |
| `--spacing-content-gap-s` | 20px |
| `--spacing-content-gap-sm` | 16px |

**Family 3 - button in section** (`--spacing-btn-in-section-*`), the CTA group's gap, keyed by button size. This one has mobile overrides:

| Token | Desktop | Mobile |
|---|---|---|
| `--spacing-btn-in-section-xs` | 16px | 8px |
| `--spacing-btn-in-section-sm` | 20px | 12px |
| `--spacing-btn-in-section-md` | 24px | 16px |
| `--spacing-btn-in-section-lg` | 32px | 24px |
| `--spacing-btn-in-section-xl` | 32px | 24px |

Plus button gap helpers: `--spacing-btn-gap-sm` 8 / `--spacing-btn-gap-md` 12 / `--spacing-btn-gap-lg` 16, and icon-size tokens `--spacing-icon-size-sm` 20 / `--spacing-icon-size-md` 24 / `--spacing-icon-size-lg` 32.

### 6d. Decision order

1. **Section padding (96/64) and container (1200)** frame the page.
2. **`--spacing-content-gap-*`** separates blocks inside a section.
3. **`--spacing-h-*-to-*`** sits under a heading, paired to the heading scale.
4. **`--spacing-btn-in-section-*`** spaces the CTA group.
5. **`--spacing-icon-size-*`** sets the icon box.

### 6e. Fallback rule

If no named token fits, snap to the nearest `--primitive-space-*` step (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120). Never use an off-scale number.

---

## 7. Typography

**Font family:** Work Sans (`'Work Sans', sans-serif`), loaded from Google Fonts. Weights: Regular 400, Medium 500, Semi Bold 600, Bold 700.

Use the `.text-*` classes in markup. They pair size + line-height + weight and auto-swap at 768px. The `--font-size-*` / `--font-lh-*` vars hold the same values, only for custom CSS where you can't add a class. Don't mix both on one element.

### 7a. Type scale (desktop / mobile)

| Class | Weight | Desktop size / line-height | Mobile size / line-height |
|---|---|---|---|
| `.text-h1` | Bold 700 | 61 / 73 | 32 / 38 |
| `.text-h2` | Bold 700 | 49 / 59 | 28 / 34 |
| `.text-h3` | Semibold 600 | 39 / 47 | 25 / 30 |
| `.text-h4` | Semibold 600 | 31 / 37 | 22 / 26 |
| `.text-h5` | Medium 500 | 25 / 30 | 20 / 24 |
| `.text-h6` | Medium 500 | 20 / 24 | 18 / 22 |
| `.text-body-large` | Regular 400 | 20 / 30 | 18 / 27 |
| `.text-body-medium` | Regular 400 | 18 / 27 | 16 / 24 |
| `.text-body-base` | Regular 400 | 16 / 24 | 14 / 21 |
| `.text-body-small` | Regular 400 | 14 / 21 | 12 / 18 |
| `.text-body-label` | Medium 500 | 13 / 20 | 11 / 17 |
| `.text-body-mono` | Regular 400 (monospace) | 10 / 15 | 10 / 15 |

Button text classes (same on desktop + mobile): `.text-btn-xl` 23/28 semibold, `.text-btn-lg` 20/24 semibold, `.text-btn-md` 18/20 semibold, `.text-btn-sm` 16/18 medium, `.text-btn-xs` 13/16 medium.

### 7b. Canonical heading to body pairings (authoritative)

This is the canon. Each heading has one correct body size and one gap token.

| Heading | Body | Gap token | Gap |
|---|---|---|---|
| h1 (xxl) | body-large | `--spacing-h-xxl-to-large` | 16 |
| h2 (xl) | body-medium | `--spacing-h-xl-to-medium` | 12 |
| h3 (l) | body-medium | `--spacing-h-l-to-medium` | 12 |
| h4 (m) | body-base | `--spacing-h-m-to-base` | 8 |
| h5 (s) | body-base | `--spacing-h-s-to-base` | 8 |
| h6 (xs) | body-small | `--spacing-h-xs-to-small` | 8 |

**Hero rule:** the hero header is always `text-h1` (xxl) + `body-large`, and it's the one and only H1 on the page. Section headers use `text-h2` / `text-h3` with `body-large` / `body-medium`.

This canon only applies to a real heading and its supporting paragraph. A stat number + label, a name + role, an eyebrow/meta label, or a price/spec line is NOT a heading-to-body pair, leave those alone.

```html
<h1 class="text-h1">From first click to loyal customer</h1>
<p class="text-body-large">Run the whole funnel inside WordPress.</p>
```

---

## 8. Radius

Use the 4 semantic radius tokens only.

| Token | Value |
|---|---|
| `--radius-xsm` | 8px |
| `--radius-sm` | 12px |
| `--radius-md` | 16px |
| `--radius-lg` | 32px |

Never reference `--primitive-radius-*` directly (those are the raw layer, present in the bundle but not for component use). There is no `--radius-xxs` - the 4px radius exists only as a primitive. Buttons use `--radius-xsm`; section containers and mockup wrappers use 32px (`--radius-lg`); mockups inside them use 16px (`--radius-md`).

---

## 9. Shadows

Two scales. Hard shadows are crisp drop shadows (cards, menus, interactive elements). Soft shadows have negative spread for a floating effect (modals, tooltips, elevated surfaces).

**Hard** (color `rgba(0,0,0,α)`)

| Token | Value |
|---|---|
| `--shadow-hard-100` | `0px 1px 3px 0px rgba(0,0,0,0.20)` |
| `--shadow-hard-200` | `0px 2px 2px 0px rgba(0,0,0,0.17)` |
| `--shadow-hard-300` | `0px 3px 4px 0px rgba(0,0,0,0.17)` |
| `--shadow-hard-400` | `0px 4px 5px 0px rgba(0,0,0,0.15)` |
| `--shadow-hard-500` | `0px 6px 10px 0px rgba(0,0,0,0.10)` |
| `--shadow-hard-600` | `0px 8px 10px 0px rgba(0,0,0,0.10)` |
| `--shadow-hard-700` | `0px 9px 12px 0px rgba(0,0,0,0.10)` |
| `--shadow-hard-800` | `0px 12px 17px 0px rgba(0,0,0,0.10)` |
| `--shadow-hard-900` | `0px 16px 24px 0px rgba(0,0,0,0.10)` |
| `--shadow-hard-1000` | `0px 24px 38px 0px rgba(0,0,0,0.10)` |

**Soft** (color `rgba(0,0,16,α)`)

| Token | Value | Label |
|---|---|---|
| `--shadow-soft-100` | `0px 12px 12px -15px rgba(0,0,16,0.10)` | xs-small |
| `--shadow-soft-200` | `0px 24px 12px -24px rgba(0,0,16,0.15)` | x-small |
| `--shadow-soft-300` | `0px 24px 24px -24px rgba(0,0,16,0.15)` | small |
| `--shadow-soft-400` | `0px 24px 48px -20px rgba(0,0,16,0.10)` | medium |
| `--shadow-soft-500` | `30px 45px 84px -25px rgba(0,0,16,0.15)` | x-medium |
| `--shadow-soft-600` | `0px 72px 72px -40px rgba(0,0,16,0.10)` | large |
| `--shadow-soft-700` | `0px 96px 96px -45px rgba(0,0,16,0.10)` | x-large |
| `--shadow-soft-800` | `0px 72px 96px -18px rgba(0,0,16,0.10)` | xx-large |

---

## 10. Icons

**Library:** Hugeicons Pro (`@hugeicons/react-pro`). One unified variant per site, the standard is `stroke.rounded` (what the Icons, Footer and NavBar components use). Never mix variants. If a project deliberately picks another variant, switch all icons across the whole site.

Rules:

- **Inline SVG path data** always - no runtime imports, no bundler.
- **Color** is `currentColor`, so icons inherit the parent text token. On dark surfaces this means they invert automatically; if you set a color, use the invert token on dark.
- **Sizes** use the icon-size tokens: `--spacing-icon-size-sm` 20px (buttons, inputs), `--spacing-icon-size-md` 24px (default), `--spacing-icon-size-lg` 32px (feature icons; 40px also used for large feature icons).
- viewBox is `0 0 24 24`.

Inline pattern (JSX, note `var` not `const` inside the function body):

```jsx
var _CheckIcon = function(props) {
  return (
    <svg width={props.s} height={props.s} viewBox="0 0 24 24" fill="none">
      <path d="..." stroke={props.c} />
    </svg>
  );
};
// usage
<_CheckIcon s={24} c="currentColor" />
```

---

## 11. Components

Load `wpmn-components.css` for these classes (without it they render unstyled). Class names are exact, copy them. For full marketing sections, drop in a section instead of assembling atoms. There is no `.wpmn-card` - cards live inside sections as scoped classes.

### Badge - `.wpmn-badge`
Styles: `--soft --pill`. Status: `--completed --in_progress --experimental --deprecated --handoff_ready`. Uppercase expanded type.

```html
<span class="wpmn-badge wpmn-badge--soft">New</span>
```

### Breadcrumbs - `.wpmn-breadcrumbs`
Variants: `--border --flat --text --transparent`. Item: `__item`. Optional home icon, arrow separators.

```html
<nav class="wpmn-breadcrumbs wpmn-breadcrumbs--flat">
  <span class="wpmn-breadcrumbs__item">Home</span>
  <span class="wpmn-breadcrumbs__item">Forms</span>
</nav>
```

### Button - `.wpmn-btn`
Variants: `--primary --secondary --tertiary`. Sizes: `--xs --sm --md --lg --xl`. Modifiers: `--full --disabled --loading --focused`. Slots: `__icon-left __icon-right __spinner`. One primary per section, no pills, no underlines.

```html
<button class="wpmn-btn wpmn-btn--primary wpmn-btn--lg">Get FluentForms Free</button>
<button class="wpmn-btn wpmn-btn--secondary wpmn-btn--lg">See Pricing</button>
```

### Footer - `.wpmn-footer`
Parts: `__top __brand __logo-img __nav __nav-list __nav-title __nav-link __social __bottom __copyright`. Dark by default.

```html
<footer class="wpmn-footer" data-brand="fluentforms">
  <div class="wpmn-footer__top">
    <nav class="wpmn-footer__nav">
      <div><div class="wpmn-footer__nav-title">Product</div>
        <ul class="wpmn-footer__nav-list"><li><a class="wpmn-footer__nav-link" href="#">Pricing</a></li></ul>
      </div>
    </nav>
  </div>
  <div class="wpmn-footer__bottom"><span class="wpmn-footer__copyright">© 2026 WPManageNinja</span></div>
</footer>
```

### Icons - inline Hugeicons SVG
See section 10. Color `currentColor`, sizes 20/24/32, `stroke.rounded` variant.

```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="..." stroke="currentColor"/></svg>
```

### Input - `.wpmn-input-wrapper`
Field: `__field (--icon-left|--icon-right|--icon-both)`. States: `--error --success`. Style: `--stroke --fill`. Size: `--sm --lg`. Parts: `__label (--required) __hint (--error|--success) __icon (--left|--right)`.

```html
<div class="wpmn-input-wrapper">
  <label class="wpmn-input__label">Email</label>
  <div class="wpmn-input__field-wrap">
    <input class="wpmn-input__field" type="email" placeholder="you@site.com">
  </div>
  <span class="wpmn-input__hint">We never share it.</span>
</div>
```

### Logo - `.wpmn-logo`
Type modifiers: `--primary --dark --inverted --black --white`. `--icon` for mark-only. Always inline the real SVG from `logos/<brand>/logo-<type>.svg`, never draw one.

```html
<span class="wpmn-logo wpmn-logo--dark" role="img" aria-label="FluentForms logo">
  <!-- paste contents of logos/fluentforms/logo-dark.svg here -->
</span>
```

### NavBar - `.wpmn-navbar`
Parts: `__logo __nav __links __link (--active) __cta (--primary|--secondary) __hamburger __mobile-menu`. Desktop: logo + nav links + primary CTA. Mobile: logo + secondary CTA + hamburger drawer.

```html
<header class="wpmn-navbar" data-brand="fluentforms">
  <span class="wpmn-navbar__logo"><!-- inline logo SVG --></span>
  <nav class="wpmn-navbar__nav">
    <ul class="wpmn-navbar__links"><li><a class="wpmn-navbar__link" href="#">Features</a></li></ul>
  </nav>
  <a class="wpmn-navbar__cta wpmn-navbar__cta--primary" href="#">Get Started</a>
</header>
```

### SocialIcons - `.wpmn-social-icons`
Button: `.wpmn-social-icon-btn`. 7 platforms, sizable, light + dark.

```html
<div class="wpmn-social-icons">
  <a class="wpmn-social-icon-btn" href="#" aria-label="X"><!-- icon svg --></a>
</div>
```

### Text - typography utility classes
Headings `.text-h1 … .text-h6`, body `.text-body-large .text-body-medium .text-body-base .text-body-small .text-body-label .text-body-mono`, button text `.text-btn-xl … .text-btn-xs`. Sizes swap automatically at 768px.

```html
<h1 class="text-h1">From first click to loyal customer</h1>
<p class="text-body-large">Run the whole funnel inside WordPress.</p>
```

---

## 12. Logo rules

Always inline the real SVG from `logos/<brand>/`. Never use a placeholder box, raster PNG/JPG, or plain text as a logo.

**Variants:** `logo` (full wordmark, icon + product name) and `icon` (mark only).

**Types:**

| Type | Description | Use on |
|---|---|---|
| `dark` | Colored icon + dark text | Light / white backgrounds |
| `inverted` | White icon + white text | Dark backgrounds |
| `primary` | Colored icon + colored text | Brand-specific use |
| `black` | All black | Special use |
| `white` | All white | Special use |

**Background rule:** light background = `dark` logo, dark background = `inverted` logo.

**Navbar rule:** light navbar (default) uses `type="dark"`; dark navbar uses `type="inverted"`.

**Footer rule:** footer is dark by default, so it uses `type="inverted"`; a light footer uses `type="dark"`.

Files live at `logos/<brand>/logo-<type>.svg` (and `icon-<type>.svg` for mark-only), mapped in `logos/manifest.json`.

---

## 13. Section library (57 sections)

Sections are self-contained scoped HTML files: scoped styles + markup + scoped script in one block. Drop one in as-is, it re-skins via `data-brand`. Each lives at `sections/<id>/section.html` with a `prompt.md` and `meta.json` alongside. Compose pages from these first; only hand-build when nothing fits.

| Name | id | Role | What it is |
|---|---|---|---|
| Hero 1 | `agency-hero` | Hero | Agency hero: outline badge, oversized two-line heading + intro + pill CTA, media row with team photo, growth chart card, dark stat card. |
| Hero 2 | `board-hero` | Hero | Dark product hero with a tilted browser window holding a live kanban board, floating stat tiles, dot grid, ambient glows. |
| Hero 3 | `ecommerce-hero` | Hero | Commerce hero: eyebrow, heading with hand-drawn underline, floating dashboard collage with count-up stats, muted logo band. |
| Hero 4 | `hero-standard` | Hero | Page-opening hero: dot badge, H1 with brand accent, subtext, paired CTAs, 16:9 mockup in a brand-surface container. |
| Hero 5 | `hero-typographic` | Hero | Minimalist hero on massive type, brand accent span, subtext, paired CTAs, no imagery. |
| Hero 6 | `notch-tabs-hero` | Hero | Centered hero with a notched tab bar over a brand gradient showcase; tabs blur/spring the screenshot. |
| Hero 7 | `portrait-stats-hero` | Hero | Split hero: badge, heading, intro, CTAs, trusted-by row left; portrait photo card with glow and floating stat tiles right. |
| Features 1 | `animated-feature-grid` | Features | 2x2 illustrated feature cards with living micro-scenes (signing pen, analytics chart, opening macbook, speedometer). |
| Features 2 | `bento-grid` | Features | 4-column bento with span-2 and tall boxes, icon tiles, one inverted dark box with a big stat. Hover lifts shadow. |
| Features 3 | `content-accordion` | Features | Two-column disclosure: pinned heading left, numbered single-open accordion right. |
| Features 4 | `content-tabs` | Features | Centered header + pill tab bar switching content panels, each pairing text with a 16:10 mockup. |
| Features 5 | `dark-features-panel` | Features | Full-bleed dark rounded panel: chip header, centered title, 3x3 feature grid with gradient-fading dividers. |
| Features 6 | `feature-card-stack` | Features | Sticky heading with dark feature cards that stack and scale down as the next slides over. |
| Features 7 | `feature-scrollspy` | Features | Sticky scrollspy menu beside a column of feature cards; active item gets a brand dot as cards cross the viewport. |
| Features 8 | `feature-tabs-carousel` | Features | Auto-advancing tabbed feature panel on a drifting brand gradient; screenshots crossfade and rise. |
| Features 9 | `fibonacci-bento` | Features | Framed media bento on a Fibonacci-style 5-card grid; hover overlays tint cards with the brand color. |
| Features 10 | `multi-column-cards` | Features | Classic 3-column feature cards (32px gutter): icon tile, heading, body. Hover lift. |
| Features 11 | `sticky-feature-switcher` | Features | Pinned two-panel scroll story; left crossfades feature slides, right wipes media layers. |
| Features 12 | `sticky-scroll` | Features | 5/7 split where the left heading pins (sticky top 96px) while feature cards scroll on the right. |
| Features 13 | `zigzag-features` | Features | Alternating image/text rows (even rows flip order); kicker, heading, body, arrow link per row. |
| CTA 1 | `builder-cta` | CTA | Large CTA card with brand-tinted gradient, kicker pill, logo-in-heading, two-column icon feature list, CTAs, product screenshot. |
| CTA 2 | `cta-banner` | CTA | High-contrast dark panel (radius 32) with H2, subtext, primary + ghost CTA pair, guarantee note. |
| Floating Stats CTA | `floating-stats-cta` | CTA | Dark rounded CTA: left photo collage with floating white stat card and glass card, right column with badge, heading, review counter, CTA. |
| Comparison 1 | `comparison-table` | Comparison | Us-vs-them matrix: highlighted Us column, success checks and error crosses, CTA below. |
| Comparison 2 | `expandable-table` | Comparison | Comparison table whose rows expand inline to reveal a 3-fact detail grid. |
| Comparison 3 | `product-compare-table` | Comparison | 4-product feature matrix with a highlight ring around the hero column, tri-state marks, stacked cards on mobile. |
| Pricing 1 | `pricing-table` | Pricing | 3 tiers with a Most Popular highlight, monthly/yearly toggle, check-listed features. |
| Pricing 2 | `pricing-toggle` | Pricing | Three-plan pricing with sliding toggle, a dark featured plan, dashed dividers, full-width enterprise row. |
| Blog 1 | `blog-cards` | Blog | 3-column article cards: 16:9 cover, category + read time meta, title, excerpt. Whole card is the link. |
| Blog 2 | `stacked-list` | Blog | Uniform feed rows: date column, title + excerpt, tag pill. For blogs, changelogs, results. |
| Announcement 1 | `announcement-bar` | Announcement | Slim dark dismissible promo bar: bold lead-in, arrow link, close button. Sits above the navbar. |
| Clients 1 | `infinite-marquee` | Clients | Continuous auto-scrolling logo band (28s loop). Pauses on hover, honors reduced motion. |
| Clients 2 | `logo-cloud` | Clients | Trust strip: one-line label + centered row of grayscale logos at 65% opacity, full on hover. |
| Content 1 | `collapsible-drawer` | Content | Slide-out side panel over a stage area; 300ms transform, close button, for secondary info on demand. |
| Content 2 | `read-more` | Content | Long text truncated at 170px with a bottom fade; trigger expands to full height and flips to Read less. |
| FAQ 1 | `faq-accordion` | FAQ | Centered header + 800px accordion list, one item open at a time, icon rotates to an X, brand-color border. |
| Footer 1 | `mega-footer` | Footer | Full mega footer: 3-column grid (heading + CTAs + community icons, link groups, newsletter form + social row), giant outline wordmark, copyright row. |
| How It Works 1 | `horizontal-scroll` | How It Works | 300vh wrapper pins a viewport; scroll progress translates a horizontal panel track. Native-overflow fallback. |
| How It Works 2 | `stacking-cards` | How It Works | Cards pin with sticky at stepped offsets and stack as the page scrolls. Pure CSS, no scroll hijack. |
| How It Works 3 | `steps-card-stack` | How It Works | Four full-viewport gradient step cards pin and squash away (scale, rotateX, tilt) as the next slides over. |
| How It Works 4 | `steps-walkthrough` | How It Works | 4 numbered cards with connecting arrows; brand-filled number circles with the button glow. |
| Integrations 1 | `integration-grid` | Integrations | 4-column app tiles: logo tile, name, one-line purpose. Hover highlights border. Browse-all link below. |
| Newsletter 1 | `newsletter-signup` | Newsletter | Bordered 32px-radius panel, icon tile, heading, single email input + subscribe button, privacy note. |
| Newsletter 2 | `split-screen` | Newsletter | Even two-column split: brand-surface visual left, badge + heading + inline email capture right. |
| Roadmap 1 | `timeline-roadmap` | Roadmap | Vertical axis with status dots (done / in progress / planned), quarter labels and descriptions. |
| Showcase 1 | `asymmetric-grid` | Showcase | 12-column broken grid with intentional vertical offsets for an editorial feel; clean stack on mobile. |
| Showcase 2 | `before-after-slider` | Showcase | Draggable divider over two stacked panels (clip-path inset), 16:9 frame with knob handle. |
| Showcase 3 | `carousel-slider` | Showcase | Scroll-snap horizontal belt, 3-up responsive, arrow buttons, auto-generated page dots. |
| Showcase 4 | `masonry-grid` | Showcase | Pinterest-style packing via CSS columns (3/2/1 responsive) with variable-height media. |
| Showcase 5 | `mockup-showcase` | Showcase | Browser-framed screenshot (chrome dots + URL bar) on a dark stage; 16px frame radius, soft-500 shadow, 32px stage radius. |
| Showcase 6 | `product-showcase` | Showcase | E-commerce best picks grid: large featured card spanning two rows + 2x2 grid of smaller cards. |
| Showcase 7 | `work-portfolio` | Showcase | Pinned window-shade portfolio: project rows collapse to a thin strip as the page scrolls; image hover zoom, See More button. |
| Stats 1 | `stats-counter` | Stats | 4-column metric grid with large brand-colored numbers that count up when scrolled into view. |
| Team 1 | `team-grid` | Team | 4-column people cards: circular avatar, name, role, social icon links. Hover lifts shadow. |
| Testimonial 1 | `folder-quote-cards` | Testimonial | Three case-study quote cards drawn as folder tabs with a top notch and scanline-dithered brand art. |
| Testimonial 2 | `quote-stats-bento` | Testimonial | Social proof bento: four stat cards interleaved with two brand-tinted quote cards with company, quote, author. |
| Testimonial 3 | `testimonial-grid` | Testimonial | Wall-of-love masonry (CSS columns) of quote cards with star rows, avatar initials, names and roles. |

---

## 14. Do's and don'ts

**Do**

- Set `data-brand` on `<html>` before anything else.
- Use semantic tokens only: `--color-*`, `--btn-*`, `--input-*`, `--radius-*`, `--font-*`, `--shadow-*`. Tints via `color-mix()` over tokens.
- Pair dark text on light surfaces, `--color-text-*-invert` on dark/brand surfaces.
- Use the `.text-*` classes and the heading-to-body canon.
- Inline the real logo SVG, picked by surface.
- Compose from the section library first.
- One unified icon variant (`stroke.rounded`), inline SVG, `currentColor`.
- Keyframes prefixed `wpmn-`, all motion behind `prefers-reduced-motion`.
- One primary button per section.

**Don't**

- No raw hex/rgb, no raw font sizes or weights, no off-scale spacing.
- No `--primitive-*` values in components (raw layer only). No `--radius-xxs` (doesn't exist).
- No dark-on-dark or light-on-light text.
- No placeholder box, raster image, or plain text as a logo.
- No pill buttons, no underlines on buttons, no more than one primary per section.
- Don't mix `.text-*` classes and `--font-size-*` vars on the same element.
- Don't mix icon variants across the site.

---

## 15. Build workflow

1. **Load the bundle.** Link `wpmn-bundle.css` and `wpmn-components.css` in `<head>`.
2. **Set the brand.** Put `data-brand="<key>"` on `<html>` (add `data-theme="dark"` for dark).
3. **Map the page to sections.** For each block (hero, features, pricing, FAQ, footer, etc.) pick a section by role from the library in section 13.
4. **Drop sections in as-is.** Each is self-contained and re-skins from `data-brand`. Only hand-build a block when nothing fits.
5. **Use real components** for navbar, footer, buttons, inputs (the `.wpmn-*` classes), and inline the real logo SVG.
6. **Follow the canon.** Heading-to-body pairings, the three gap families in decision order, semantic tokens throughout, radius from the 4 tokens, one primary per section.
7. **Check it.** Surface pairing correct, no raw values, motion behind `prefers-reduced-motion`, mobile reads well at 768px.

---

*Source of truth: the `wpmn-design-tokens` repo. Load `wpmn-bundle.css` + `wpmn-components.css`. Every value in this file is pulled from the repo's CSS and docs.*
