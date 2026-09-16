# Build Spec: WPMN Section — Glass Icon Showcase

A two-column icon-pack showcase built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). The left column carries a brand mark, pill badge, big two-line heading, and a community chip; the right column is a 4x4 grid of glassmorphic tiles.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/glass-icon-showcase/section.html`

## Interaction rules (keep exactly as reference)

- The JS builds 16 `.gis-glass` tiles from a set of glyph silhouettes; each glyph is filled with a per-tile token-gradient (`<linearGradient>` with `--token`/`color-mix` stops and a unique id) plus an invert-tinted highlight ellipse for the glass look.
- On first view an IntersectionObserver (threshold 0.12) adds `.is-inview`; the copy fades up (`wpmn-gis-up` 600ms) and tiles pop in on a diagonal stagger (`wpmn-gis-pop` 550ms).
- Tiles lift `translateY(-4px)` and deepen to `--shadow-soft-700` on hover (200ms).
- prefers-reduced-motion: copy and tiles render in place, no animation or hover transition.

## Layout rules (WPMN design guideline)

- Section `color-mix(--color-text-primary 2%, surface-primary)`, 96px/32px padding (64/24 under 768). `.gis-wrap` max-width 1200px, two columns (.8fr / 1.2fr), 64px gap, stacking under 900px.
- Left: a brand mark (a gradient `--radius-sm` chip + wordmark), a pill (`color-mix(--color-error-primary 14%, surface)` bg, error text, 999px), an h1 heading whose second line is a regular-weight `--color-text-secondary` span, and a chip (surface-primary, `--shadow-soft-300`, a small gradient mark).
- Right: a 4-column grid, 24px gap. Tiles are white `--color-surface-primary`, `--radius-lg`, `--gis-line` hairline, `--shadow-soft-500`, glyph at 52%.

## Surface and text pairing (hard rule)

- Everything sits on the light section surface: heading `--color-text-primary`, secondary line and chip text `--color-text-secondary`, pill `--color-error-primary`. Tile glyphs are token-gradient fills with an invert highlight (decorative, no text). The brand and chip marks are small gradient surfaces with no text inside. Never light text on the light tiles.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-glass-icon-showcase">` with scoped `<style>`, markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies; glyphs are generic token-gradient placeholders (content swapped on use) and no third-party brand logos are used. All sub-classes are `gis-`-prefixed and keyframes are `wpmn-gis-`-prefixed so host styles can't leak in.
