# Build Spec: WPMN Section — Testimonials Results

A warm testimonial band on WPMN tokens: a left column (heading, two stats, a case-studies link), a middle column of two quotes with authors, and a right real portrait in a tinted glass frame. Orange accent maps to `--color-warning-primary`.

The reference implementation is the source of truth:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/testimonials-results/section.html`

## Interaction rules (keep exactly as reference)
- IntersectionObserver (0.12) adds `.is-inview`; the three columns fade up with `wpmn-tr-up` (600ms), staggered 90/180ms. prefers-reduced-motion renders in place.

## Layout rules (WPMN design guideline)
- Section `color-mix(--color-warning-primary 5%, surface-primary)`, 96/32 padding. `.tr-wrap` max-width 1280px, columns (.9fr / 1.1fr / .7fr).
- Left: kicker, h2 (medium), sub, two stats (uppercase label with a warning dot, `--font-size-h2` warning number, unit), and a "View more case studies" link with a round warning arrow chip.
- Middle: two quotes separated by a hairline, each a large warning-tint quote mark, an h6 regular quote, a warning dash, an author name (semibold) and role.
- Right: the `.tr-vis` portrait bleeds past the section padding, `--radius-lg` on the left corners, cover, with a warning-tint overlay.

## Surface and text pairing (hard rule)
- Light warm surface: quotes/headings/names `--color-text-primary`, sub/role `--color-text-secondary`, stat numbers/kicker/dash `--color-warning-primary`. The arrow chip is a warning surface with invert glyph. Never light text on the light surface.

## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format
A single self-contained `<section class="wpmn-sec-testimonials-results">` with scoped `<style>`, markup, and a scoped IIFE. Portrait is a verified Unsplash image; orange is the warning token (content swapped on use). Sub-classes `tr-`-prefixed, keyframes `wpmn-tr-`-prefixed.
