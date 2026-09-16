# Build Spec: WPMN Section — Product Library Hero

A centered hero built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). A pill, bold heading, sub, and primary button sit over a three-row band of app tiles that fades at both edges, with a glowing brand tile at the center, above a muted trusted-by row.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/product-library-hero/section.html`

## Interaction rules (keep exactly as reference)

- The JS builds a 3-row by 11-column band of `.plh-tile` tiles from rotating token-SVG glyphs and token tints; the exact center tile is `.plh-hero` (a brand-gradient tile with a sparkle glyph). The trusted-by row is built from a list of placeholder wordmarks.
- On first view an IntersectionObserver (threshold 0.12) adds `.is-inview`; tiles pop in with `wpmn-plh-pop` (500ms) staggered by distance from the center. The center tile then pulses `wpmn-plh-glow` (3s ease-in-out infinite, 1s delay).
- The band fades at both edges with an alpha `mask-image`. The primary button shifts background on hover.
- prefers-reduced-motion: tiles render in place, no pop or glow.

## Layout rules (WPMN design guideline)

- Section `--color-surface-primary`, 96px/32px padding (64/24 under 768), centered text. `.plh-wrap` max-width 1100px column.
- Pill: `color-mix(--btn-bg-enable 12%, surface-primary)` bg, `--btn-bg-enable` text, 999px. Heading h1 (bold, -0.02em). Sub body-medium `--color-text-secondary`. Primary button uses button tokens and `--radius-xsm` (never a pill), with the glow inset and a trailing arrow glyph.
- Tiles: 64px, white, `--radius-md`, `--shadow-soft-300`, `--plh-line` hairline, token-tinted glyph at 44%; rows are flex, centered, 16px gap. The `.plh-hero` tile is a `linear-gradient(--btn-bg-enable → color-mix over surface-secondary)` with an invert sparkle and a pulsing brand glow.
- Trusted-by: a body-small `--color-text-secondary` label over a wrap of `.plh-logo` wordmarks in `color-mix(--color-text-primary 42%, transparent)`.

## Surface and text pairing (hard rule)

- Everything sits on the light section surface: heading `--color-text-primary`, sub and trust label `--color-text-secondary`, pill and glyph tints from brand/semantic tokens (decorative, no text). The center tile and the primary button are the only filled brand surfaces and use `--color-text-primary-invert`. Never light text on the light section.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-product-library-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies; tiles and wordmarks are generic placeholders (content swapped on use) and no third-party brand logos are used. All sub-classes are `plh-`-prefixed and keyframes are `wpmn-plh-`-prefixed so host styles can't leak in.
