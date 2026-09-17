# Build Spec: WPMN Section — Process Steps

A warm process band on WPMN tokens: a left intro beside four numbered steps over a wide real photo band. Orange accent maps to `--color-warning-primary`.

The reference implementation is the source of truth:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/process-steps/section.html`

## Interaction rules (keep exactly as reference)
- IntersectionObserver (0.12) adds `.is-inview`; the intro, the four steps (staggered 70/140/210ms), and the photo band fade up with `wpmn-ps-up` (600-700ms). prefers-reduced-motion renders in place.

## Layout rules (WPMN design guideline)
- Section `color-mix(--color-warning-primary 5%, surface-primary)`, 96/32 padding. `.ps-wrap` max-width 1280px, columns (.7fr / 2fr).
- Right column: a 4-column `.ps-steps` grid (big `--font-size-h2` regular `--color-warning-primary` number, a short hairline tick, h6 title, body-small desc), then a wide `.ps-band` photo (`--radius-lg`, aspect 24/8, cover) with a warning-tint overlay. Steps collapse to 2-up under 980px.

## Surface and text pairing (hard rule)
- Light warm surface: headings/titles `--color-text-primary`, copy `--color-text-secondary`, numbers/kicker `--color-warning-primary`. Photo overlay decorative. Never light text on the light surface.

## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format
A single self-contained `<section class="wpmn-sec-process-steps">` with scoped `<style>`, markup, and a scoped IIFE. Photo is a verified Unsplash image; orange is the warning token (content swapped on use). Sub-classes `ps-`-prefixed, keyframes `wpmn-ps-`-prefixed.
