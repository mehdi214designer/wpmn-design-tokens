# Build Spec: WPMN Section — Flip Case Studies
An HTML import rebuilt on WPMN tokens; the interaction/motion engine is preserved verbatim, fonts fall back to `--font-family-base`, colors are tokenized (accent `--color-warning-primary`/`--color-success-primary`), buttons use `--radius-xsm`, and images are verified Unsplash (content swapped on use). Source of truth: `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/flip-case-studies/section.html`.
## Interaction rules (keep exactly as reference)
- Preserve the reference behavior verbatim; prefers-reduced-motion renders content in its final state.
## Layout rules (WPMN design guideline)
- Surfaces/text/accent map to tokens; dark surfaces use the invert tokens written as element rules owned by the dark-scoped class; radii, shadows, spacing and type are tokens; working tablet + mobile breakpoints.
## Surface and text pairing (hard rule)
- Never dark-on-dark or light-on-light; decorative fills carry no text.
## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.
## Output format
A single self-contained `<section class="wpmn-sec-flip-case-studies">` with scoped `<style>`, markup, and a scoped IIFE resolving root via `document.currentScript.parentElement`. Sub-classes/keyframes section-prefixed.
