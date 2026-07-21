---
name: wpmn-design-system
description: The complete WPManageNinja (WPMN) design system in one place — full token set, brand primitives, typography, real component code, all brand logo SVGs, and the 57-section HTML library, plus the binding guidelines. Use this whenever building, designing, or reviewing any marketing page or website section for any WPMN product (FluentForms, FluentCRM, NinjaTables, FluentBooking, FluentCommunity, Paymattic, FluentBoards, FluentSMTP, FluentSupport, FluentAffiliate, AzonPress, WP Social Ninja, FluentCart, FluentPlayer, FluentMembers, or WPManageNinja itself). Everything needed to produce on-brand HTML/CSS is bundled in this skill.
---

# WPMN Design System

This skill carries the whole design system as real, usable code. No external repo needed. Build any WPMN product page or section from what's inside.

## What's in here (part by part)

```
SKILL.md                     <- you are here: how to use the system + binding rules
reference/
  WPMN-Design-System.md      <- full human + AI reference (every token value, brand hex, canon, all 57 sections indexed)
foundations/
  primitives.css             <- VARIABLE SET: raw ramps (color, spacing, radius)
  brand-primitives.css       <- BRAND PRIMITIVES: all 16 brands' primary + accent overrides
  tokens.css                 <- TOKEN SET: semantic tokens (--color-*, --btn-*, --radius-*, spacing, input, shadow)
  typography.css             <- TYPOGRAPHY: font family, type scale, .text-* classes
  wpmn-bundle.css            <- all four foundations merged in cascade order (load THIS one file)
components/
  wpmn-components.css         <- COMPONENT CODE: all component CSS (.wpmn-navbar, .wpmn-btn, .wpmn-footer, .wpmn-input-wrapper, .wpmn-badge, .wpmn-breadcrumbs, .wpmn-logo, .wpmn-social-icons)
  COMPONENTS.md              <- class names + one example per component
logos.json                   <- LOGO SVGs: all 16 brands, each with wordmark (logo-*) + icon (icon-*) in 5 variants (primary, dark, inverted, black, white). Shape: { "<brand>": { "logo-dark": "<svg...>", "icon-white": "<svg...>", ... } }
sections/
  <id>.html                  <- SECTION CODE: all 57 self-contained sections, drop in as-is
```

## How to use this skill

### To build a page

1. **Load the CSS.** Link `foundations/wpmn-bundle.css` then `components/wpmn-components.css` in `<head>`. The bundle is primitives + brand-primitives + tokens + typography already merged in cascade order, so one file covers all foundations.
2. **Set the brand.** Put `data-brand="<key>"` on `<html>`. This is REQUIRED, skip it and every product renders default WPManageNinja blue. Add `data-theme="dark"` for dark mode. Mobile type + some spacing auto-swap at `max-width: 768px`, you don't write mobile sizes by hand.
3. **Compose from sections first.** For each block (hero, features, pricing, FAQ, footer, etc.) pick a section by role from `sections/` and the index in `reference/WPMN-Design-System.md` (section 13). Copy its `sections/<id>.html` in as-is, each is self-contained (scoped style + markup + scoped script) and re-skins from `data-brand`. Only hand-build a block when nothing fits.
4. **Use real components** for navbar, footer, buttons, inputs: the `.wpmn-*` classes in `components/`. Don't hand-roll them.
5. **Use the real logo.** Pull the SVG string from `logos.json` (`logos[brand][variant]`) and inline it, picked by surface (see Logo rules below). Never use a placeholder box, raster, or plain text as the logo.
6. **Follow the canon** (typography pairings, spacing families, token purity) below.

Minimal setup:

```html
<!DOCTYPE html>
<html data-brand="fluentforms">
  <head>
    <link rel="stylesheet" href="foundations/wpmn-bundle.css">
    <link rel="stylesheet" href="components/wpmn-components.css">
  </head>
  <body>
    <!-- sections + components -->
  </body>
</html>
```

### To look something up

Open `reference/WPMN-Design-System.md`. It has every token value, all 16 brand hexes, the color system (light + dark), button tokens, the full spacing system, the type scale, radius, shadows, icon rules, component examples, logo rules, the full 57-section index, and do's and don'ts. Read the actual CSS in `foundations/` and `components/` for exact source.

## Binding rules (the canon)

These are not suggestions. A page is off-system if it breaks them.

### Tokens
- Use semantic tokens only: `--color-*`, `--btn-*`, `--input-*`, `--radius-*`, `--font-*`, `--shadow-*`. Tints via `color-mix()` over tokens.
- Never put raw hex/rgb, raw font sizes/weights, or off-scale spacing in markup or component CSS.
- Never reference `--primitive-*` in components. Primitives are the raw layer (in `primitives.css` / `brand-primitives.css`), consumed only by `tokens.css`.

### Color + surface
- Dark text on light surfaces; `--color-text-*-invert` on dark or brand surfaces.
- Never dark-on-dark or light-on-light.
- **Dark sections (the #1 thing that breaks):** a dark section is not just a dark background. The moment something sits on `--color-surface-secondary`, every heading, paragraph, and icon inside must use the `-invert` token. Set `color: var(--color-text-primary-invert)` on the dark root so children inherit white; headings `--color-text-primary-invert`, body `--color-text-secondary-invert`, icons inherit via `currentColor`. Leaving text on `--color-text-primary` makes the heading vanish on the dark surface. Only a light card placed on the dark section keeps normal `--color-text-primary` text. Enforced by `design-qa.mjs` (`surface-text-pairing`).

### Typography (heading to body canon)
Each heading has exactly one correct body size and one gap token:

| Heading | Body | Gap token | Gap |
|---|---|---|---|
| h1 (xxl) | body-large | `--spacing-h-xxl-to-large` | 16px |
| h2 (xl) | body-medium | `--spacing-h-xl-to-medium` | 12px |
| h3 (l) | body-medium | `--spacing-h-l-to-medium` | 12px |
| h4 (m) | body-base | `--spacing-h-m-to-base` | 8px |
| h5 (s) | body-base | `--spacing-h-s-to-base` | 8px |
| h6 (xs) | body-small | `--spacing-h-xs-to-small` | 8px |

- Use the `.text-*` classes in markup. Don't mix `.text-*` and `--font-size-*` on the same element.
- Hero header is always `text-h1` + `body-large`, and it's the only H1 on the page.
- This canon applies to a real heading + its supporting paragraph only. A stat number + label, name + role, eyebrow/meta label, or price/spec line is NOT a heading-to-body pair.

### Spacing (three semantic gap families)
- Heading to body: `--spacing-h-*-to-*` (per table above).
- Block to block: `--spacing-content-gap-*` (keyed by the block's heading: xxl/xl 48, l 40, m 24, s 20, sm 16).
- CTA group gap: `--spacing-btn-in-section-*` (keyed by button size; has mobile overrides).
- Section rhythm: 96px top/bottom padding, 80px gap (desktop); 64 / 48 (mobile).
- Off-scale value? Snap to the nearest token, don't invent one.

### Radius
- Only the 4 semantic tokens: `--radius-xsm` 8, `--radius-sm` 12, `--radius-md` 16, `--radius-lg` 32. There is no `--radius-xxs`.
- Buttons use `--radius-xsm`; section/mockup containers 32px; mockups inside them 16px.

### Icons
- Hugeicons Pro, one unified variant per site (standard: `stroke.rounded`). Never mix variants.
- Inline SVG path data, `viewBox="0 0 24 24"`, color `currentColor` (so it inverts on dark automatically).
- Sizes from `--spacing-icon-size-sm/md/lg` (20/24/32).

### Logos
- Variants: wordmark (`logo-*`) and icon (`icon-*`), each in primary / dark / inverted / black / white. All in `logos.json`.
- Light navbar: use `dark`. Dark navbar: use `inverted`.
- Footer follows the same surface logic (dark footer: inverted or white).
- Always inline the real SVG from `logos.json`.

### Buttons + motion
- One primary button per section. No pill buttons, no underlines on buttons.
- Keyframes prefixed `wpmn-`; all motion behind `prefers-reduced-motion`.

### Coding conventions (when writing JSX/components)
- Never use `const` inside function bodies in JSX, use `var`.
- Inline SVG path data for icons, no runtime imports.

## Brand keys

`wpmanagenia` (default, note the spelling), `fluentforms`, `fluentcrm`, `fluentbooking`, `fluentcommunity`, `ninjatables`, `paymattic`, `fluentboards`, `fluentsmtp`, `fluentsupport`, `fluentaffiliate`, `azonpress`, `wpsocialninja`, `fluentcart`, `fluentplayer`, `fluentmembers`. Full hex values per brand are in `reference/WPMN-Design-System.md` section 3.

## Section roles (pick from these)

Hero, Features, CTA, Comparison, Pricing, Blog, Announcement, Clients, Content, FAQ, Footer, How It Works, Integrations, Newsletter, Roadmap, Showcase, Stats, Team, Testimonial. All 57 sections with one-line descriptions are indexed in `reference/WPMN-Design-System.md` section 13.
