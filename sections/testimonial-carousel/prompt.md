# Build Spec: WPMN Section — Testimonial Carousel

A centered testimonial section recreated from a screenshot and built natively on WPMN tokens. A pill badge sits above a bold heading and a short sub, then a peek carousel of pastel-tinted quote cards. Each card has an overlapping monogram avatar at its top center, a centered quote, a hairline divider, the person's name + role on the left, and a star rating on the right. The active card centers in the viewport while its neighbours peek and dim; prev/next controls move through.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/testimonial-carousel/section.html`

## Motion rules

- Peek carousel: active card centers via `translateX = viewport.clientWidth/2 - (card.offsetLeft + card.offsetWidth/2)`, `.5s cubic-bezier(.22,1,.36,1)`; inactive cards sit at `opacity .55 / scale .96`, active resets to full.
- prev/next move the active index, clamped to `[0, n-1]`; buttons disable at the first/last card; re-center on `resize`.
- Header items + track carry `.reveal` and fade up on first view (IntersectionObserver, 600ms `wpmn-tsc-up`, 70ms stagger).
- Control hover fill at 120ms; `:focus-visible` ring with `--btn-bg-focused`.
- prefers-reduced-motion: track + card transitions off, reveals shown in place.

## Layout rules (WPMN design guideline)

- Section `--color-surface-primary`, 96px/32px padding (40px sides <1200, 64px/20px <768); `overflow:hidden`; container max-width 1200px, centered.
- Card tints are hoisted on the root as derived props so the surface-pairing audit reads cards as light: `--tsc-tint-1..4` = `color-mix(<status/brand> 12-16%, surface-primary)` over `--color-warning-primary`, `--btn-bg-enable`, `--color-success-primary`, `--color-error-primary`. Matching `--tsc-ring-1..4` (34-38%) drive the avatar rings.
- Header: badge pill `--tsc-badge` with `--btn-bg-enable` text (body-label semibold); h2 bold -0.02em; sub body-medium `--color-text-secondary`.
- Carousel: `.track` flex, 24px gap, transform-animated; cards `flex:0 0 460px` (88% <768), `--radius-lg`, top padding 64px to clear the avatar, `margin-top` 48px for the overhang.
- Avatar: 88px circle, `--color-surface-primary` bg, semibold monogram (`--font-size-h5`), positioned -48px at top center, double box-shadow ring (tint + ring color per card class).
- Quote centered body-medium `--color-text-primary`; hairline `--tsc-line`; footer is name (body-base semibold) + role (body-small secondary) on the left, rating (body-base semibold + filled star) on the right.
- Controls: two 48px circular icon buttons (chip-style, allowed as non-text controls), hairline border `--tsc-ctl`, hover `--tsc-ctl-hover`, disabled at ends.

## Surface and text pairing (hard rule)

- Everything sits on light surfaces (the section and the pastel tints, which resolve light because they are hoisted behind `var()`). Dark text tokens only: `--color-text-primary` for quotes/names/heading/rating, `--color-text-secondary` for sub/role. Accent badge text uses `--btn-bg-enable`. Never place these on a dark surface.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-testimonial-carousel">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; avatars are token monograms (no images), the star is inline SVG.
