# Build Spec: WPMN Section — API Feature Bento

A dark, four-card feature bento recreated from a screenshot and built natively on WPMN tokens (all artwork is token CSS/SVG — no images). Over a faint vertical-line backdrop, a 2-column grid holds: Customizable UI Themes (icon, title, quote, a cluster of floating version chips), Advanced search (icon, description, a command-palette mock with status badges), a wide Pavyon API card (browser/IDE mock: title bar, menu bar, side nav, API file tree, syntax-highlighted code), and Cosmic API (icon, description, an animated paired bar chart).

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/api-feature-bento/section.html`

## Motion rules

- Cards `.afb-reveal` fade up on first view (IntersectionObserver adds `.afb-inview`; `wpmn-afb-up` 600ms, staggered 80ms per card via animation-delay).
- Version chips: `wpmn-afb-float` translateY +/-7px, 5s ease-in-out infinite, per-chip `animation-delay`; each chip keeps its rotation through a `--afb-rot` custom property inside the keyframe so the tilt is preserved.
- Cosmic chart: `.afb-bar` scaleY 0 -> 1 from `transform-origin:bottom` when `.afb-inview`, 800ms cubic-bezier(.22,1,.36,1), per-bar `transition-delay`; bar heights via a `--h` percentage. Faint `.afb-track` columns sit behind.
- Cards lift `translateY(-3px)` and brighten their border on hover (250ms).
- prefers-reduced-motion: float, bar-grow, and hover off; reveals rendered in place.

## Layout rules (WPMN design guideline)

- Section `--color-surface-secondary`, 96px/32px padding (40px sides <1200, 64px/20px <768), `overflow:hidden`. A `::before` paints a `repeating-linear-gradient` of `--afb-line` every 96px, masked to fade out downward (mask alpha exempt). Container max-width 1200px.
- Grid: `grid-template-columns:1fr 1fr`, 24px gap, `grid-template-areas: "themes pavyon" / "search pavyon" / "search cosmic"` (Pavyon spans the top two rows on the right, Advanced search spans the bottom two on the left). Collapses to one column < 900px.
- Cards: `--afb-card` fill (`color-mix(text-primary-invert 4%, surface-secondary)`), `--afb-line` border, `--radius-lg`, 32px padding. Derived props hoisted on the root for panels, chips, hairlines, muted/faint text, and chart tracks so the audit reads every surface as dark.
- Type: card titles h4 semibold invert; descriptions body-base `--color-text-secondary-invert`; mock text body-small/label. Chips `--radius-sm`; palette + browser panels `--afb-panel` with `--radius-md`; badges/counts are pills.
- Accents: `--btn-bg-enable` (purple chips/icons, code keywords, Active badge, purple bars) and `--color-warning-primary` (Pending badge, code strings, orange bars). Code comment/line-number tones use hoisted invert mixes.

## Surface and text pairing (hard rule)

- Everything sits on dark surfaces (section, cards, panels, badges). Invert text tokens only: `--color-text-primary-invert` for titles/strong, `--color-text-secondary-invert` for descriptions and default code. Accents (`--btn-bg-enable`, `--color-warning-primary`) and hoisted invert mixes are used for icons, syntax, and badges — badge backgrounds mix the accent over `--color-surface-secondary` so they read as dark with invert text. Never dark text on these dark surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-api-feature-bento">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; all icons, mocks, and the chart are token CSS/SVG. All sub-classes are `afb-`-prefixed so host styles can't leak in.
