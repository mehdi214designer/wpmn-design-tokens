# Build Spec: WPMN Section — Trusted Stats

A three-part trust band on WPMN tokens: left heading + buttons, a middle trusted-by logo grid over three headline stats, and a right real photo visual with a floating caption card. Orange accent maps to `--color-warning-primary`.

The reference implementation is the source of truth:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/trusted-stats/section.html`

## Interaction rules (keep exactly as reference)
- IntersectionObserver (0.12) adds `.is-inview`; the three columns fade up with `wpmn-ts-up` (600ms), staggered 90/180ms. Buttons shift on hover. prefers-reduced-motion renders in place.
- A scoped IIFE builds the placeholder logo row from an array.

## Layout rules (WPMN design guideline)
- Section `color-mix(--color-warning-primary 5%, surface-primary)`, 96/32 padding. `.ts-wrap` max-width 1240px, three columns (1fr / 1.05fr / .8fr).
- Left: kicker, h2 (medium), sub, two buttons at `--radius-xsm` (warning primary + ghost).
- Middle: an uppercase "trusted by" label over a 3-column placeholder wordmark grid, then three stats (h3 `--color-warning-primary` number + body-small label) above a hairline.
- Right: a photo (`--radius-lg` on the outer corners, cover) with a warning-tint overlay and a floating surface-primary caption card (`--shadow-soft-500`, a warning dot).

## Surface and text pairing (hard rule)
- Light warm surface throughout: headings `--color-text-primary`, muted `--color-text-secondary`, stat numbers/kicker `--color-warning-primary`. Buttons filled warning use invert text. Never light text on the light surface.

## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format
A single self-contained `<section class="wpmn-sec-trusted-stats">` with scoped `<style>`, markup, and a scoped IIFE. Photo is a verified Unsplash image; logos are generic placeholders; orange is the warning token (content swapped on use). Sub-classes `ts-`-prefixed, keyframes `wpmn-ts-`-prefixed.
