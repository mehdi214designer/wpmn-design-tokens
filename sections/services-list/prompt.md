# Build Spec: WPMN Section — Services List

An HTML import rebuilt natively on WPMN tokens. The interaction/motion engine is preserved verbatim; fonts fall back to `--font-family-base`, colors are tokenized (accent to `--color-warning-primary`), buttons use the button tokens at `--radius-xsm`, and images are verified Unsplash (content swapped on use). The reference implementation is the source of truth:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/services-list/section.html`

## Interaction rules (keep exactly as reference)
- The item list is built from a data model; each item is a label row (accent underline tick), a large heading, and a two-column body. No motion beyond hover; prefers-reduced-motion is a no-op.

## Layout rules (WPMN design guideline)
- Surfaces map to `--color-surface-primary`/`--color-surface-secondary`; text to `--color-text-primary`/`--color-text-secondary` (invert on dark, written as element rules owned by the dark class); the accent to `--color-warning-primary`. Radii, shadows, spacing and type all use tokens. Working tablet and mobile breakpoints; prefers-reduced-motion turns animation off and renders content in place.

## Surface and text pairing (hard rule)
- Never dark text on dark or light on light; dark surfaces use the invert tokens. Decorative fills carry no text.

## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format
A single self-contained `<section class="wpmn-sec-services-list">` with scoped `<style>`, markup, and a scoped IIFE `<script>` resolving its root via `document.currentScript.parentElement`. All sub-classes and keyframes are section-prefixed.
