# Build Spec: WPMN Section — Animated Bento Showcase

A fluid, em-scaled feature bento recreated from an HTML reference and fully tokenized. A 3-column grid holds four feature cards with living micro-scenes around a tall center phone. Two dark cards (a looping payment-pill carousel and a tilted product-image stack) alternate with two light brand-tinted cards (a floating coin cluster and a typing secure-checkout field). A pill of pagination dots sits below.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/animated-bento-showcase/section.html`

## Interaction rules (keep exactly as reference)

- The em engine: the section root sets `font-size: var(--abs-root)` where `--abs-root: clamp(13px, 1.652vw, 28.55px)`. Every card dimension, position, and micro-scene coordinate is in `em`, so the whole bento scales as one block. Keep it.
- Connect carousel: advance a pill every 2600ms; entering pill uses `wpmn-abs-pill-in` (0.5s `cubic-bezier(0.2,0.7,0.3,1)`), leaving uses `wpmn-abs-pill-out` (0.4s ease); the active dot widens to 0.84em.
- Account coins: `wpmn-abs-bob` on staggered 4s / 4.6s / 4.2s / 5s loops.
- Collect stack: `wpmn-abs-sway` 6s with fixed `rotate` values -11.6deg / +11.8deg / -25.1deg and 0.8s / 1.6s delays.
- Privacy field: type one password dot every 420ms cycling `(PW_COUNT + 4)` with a blinking caret (`wpmn-abs-blink` 1.1s `steps(1)`).
- Carousel + typing share one rAF `tick(now)` plus a 1s `setInterval` fallback. Re-scope to the section root; use class/`data-` selectors so instances coexist.
- prefers-reduced-motion: stop every animation/transition and render the first pill in, all password dots filled.

## Layout rules (WPMN design guideline)

- Section is a centered flex column, 2em/1em padding, 1.5em gap. Grid columns `14em 16.5em 14em`, gap `0.667em 1.333em`.
- Cards `14em x 11.32em`, `--radius-xsm`, headings `font-size:1em` (em-scaled artwork text), `--font-weight-medium`, margin `1.333em`.
- Phone `16.5em x 27em`, `--color-surface-primary`, `--shadow-soft-500`; skeleton bars in `--abs-skeleton` (8% text-primary); headline `1.7em` `--font-weight-bold` uppercase.
- Below 900px: root font-size 16px, grid 2-col, phone hidden. Below 540px: 1-col.

## Surface and text pairing (hard rule)

- Dark cards (`card--connect`, `card--collect`) use `--color-surface-secondary`; their headings are element rules owned by the dark class (`.card--connect h2`, `.card--collect h2`) set to `--color-text-primary-invert`. Connect dots use the invert dot tint.
- Light tint cards (`card--account` 16% brand, `card--privacy` 26% brand) keep `--color-text-primary` headings.
- Pills, the checkout field, and pagination sit on their own `--color-surface-primary` and use dark text/dots. NFT tags pair explicitly: `tag-dark` = surface-secondary + invert, `tag-light` = surface-primary + text-primary. The privacy wedge is decorative `--btn-bg-enable`.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-animated-bento-showcase" data-brand="...">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies: card palette mapped to tokens (two brand tints + two dark surfaces), coin/gateway logos replaced with inline stroke icons, the five catalog images are verified Unsplash photos, every keyframe prefixed `wpmn-abs-`.
