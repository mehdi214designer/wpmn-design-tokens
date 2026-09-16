# Build Spec: WPMN Section — Integration Recipes Split

A two-column integrations hero built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). The left column is a grid of app tiles that fades out at the left edge; the right column holds a kicker, heading, sub, and two buttons.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/integration-recipes-split/section.html`

## Interaction rules (keep exactly as reference)

- The JS builds 24 `.irs-tile` tiles from a rotating set of token-SVG glyphs and token tints.
- On first view an IntersectionObserver (threshold 0.15) adds `.is-inview`; tiles pop in with `wpmn-irs-pop` (500ms cubic-bezier(.22,1,.36,1)) staggered 28ms each, and the `.irs-copy` column fades up with `wpmn-irs-up` (600ms, 120ms delay).
- Buttons transition their background on hover/active (180ms).
- The grid fades at the left edge via an alpha `mask-image`; under 900px the columns stack and the mask is removed (grid ordered second).
- prefers-reduced-motion: tiles and copy render in their final state, no animation.

## Layout rules (WPMN design guideline)

- Section `--color-surface-primary`, 96px/32px padding (64/24 under 768). `.irs-wrap` max-width 1200px, a two-column grid (1.05fr / .95fr), 40px gap.
- Tiles: white `--color-surface-primary`, `--radius-md`, 1px `--irs-line` hairline, `--shadow-soft-300`, a token-tinted glyph at 46%. Grid is 6 columns, 16px gap.
- Copy: kicker (body-base semibold `--btn-bg-enable`), h2 (regular weight, -0.01em, `--color-text-primary`), sub (body-medium `--color-text-secondary`).
- Buttons use the button tokens and `--radius-xsm` (never pills). Primary: `--btn-bg-enable` bg, `--color-text-primary-invert` text, `inset 3px 4px 4px 0 var(--btn-bg-glow, rgba(255,255,255,0.3))`, hover `--btn-bg-hovered`. Ghost: surface-primary bg, `--btn-bg-enable` text, a `color-mix(--btn-bg-enable 45%, transparent)` inset ring.

## Surface and text pairing (hard rule)

- Everything sits on the light section surface: headings `--color-text-primary`, sub `--color-text-secondary`, kicker `--btn-bg-enable`. Tiles are light with token-tinted decorative glyphs (no text). The primary button is the only filled brand surface and uses `--color-text-primary-invert` text. Never light text on the light section.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-integration-recipes-split">` with scoped `<style>`, markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies; tiles are generic token-SVG placeholders (content swapped on use) and no third-party brand logos are used. All sub-classes are `irs-`-prefixed and keyframes are `wpmn-irs-`-prefixed so host styles can't leak in.
