# Build Spec: WPMN Section — Stages Cards

An HTML import rebuilt natively on WPMN tokens. The interaction/motion engine is preserved verbatim; fonts fall back to `--font-family-base`, colors are tokenized (accent to `--color-warning-primary`), buttons use the button tokens at `--radius-xsm`, and images are verified Unsplash (content swapped on use). The reference implementation is the source of truth:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/stages-cards/section.html`

## Interaction rules (keep exactly as reference)
- Cards fade up staggered on load (wpmn-stg-in .7s, 50/150/250/350ms) in an alternating-offset 4-column grid; the marquee strip scrolls continuously (wpmn-stg-scroll 32s linear) with the item set duplicated for a seamless 50% loop and edge-faded by an alpha mask. prefers-reduced-motion shows cards in place and stops the marquee.

## Layout rules (WPMN design guideline)
- Surfaces map to `--color-surface-primary`/`--color-surface-secondary`; text to `--color-text-primary`/`--color-text-secondary` (invert on dark, written as element rules owned by the dark class); the accent to `--color-warning-primary`. Radii, shadows, spacing and type all use tokens. Working tablet and mobile breakpoints; prefers-reduced-motion turns animation off and renders content in place.

## Surface and text pairing (hard rule)
- Never dark text on dark or light on light; dark surfaces use the invert tokens. Decorative fills carry no text.

## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format
A single self-contained `<section class="wpmn-sec-stages-cards">` with scoped `<style>`, markup, and a scoped IIFE `<script>` resolving its root via `document.currentScript.parentElement`. All sub-classes and keyframes are section-prefixed.
