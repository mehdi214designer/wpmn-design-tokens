# Build Spec: WPMN Section — columns footer
An HTML import rebuilt natively on WPMN tokens; the interaction/structure is preserved, fonts fall back to `--font-family-base`, colors are tokenized (accent `--color-warning-primary`), buttons use `--radius-xsm`, and any avatar is a verified Unsplash image (content swapped on use). Source of truth: `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/columns-footer/section.html`.
## Interaction rules (keep exactly as reference)
- Preserve the reference behavior verbatim (single-open JS accordion / hover states); prefers-reduced-motion renders in place.
## Layout rules (WPMN design guideline)
- Surfaces/text/accent map to tokens; radii, shadows, spacing, type are tokens; working tablet + mobile breakpoints.
## Surface and text pairing (hard rule)
- Never dark-on-dark or light-on-light; dark surfaces use invert tokens; decorative fills carry no text.
## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.
## Output format
A single self-contained `<section class="wpmn-sec-columns-footer">` with scoped `<style>`, markup, and a scoped IIFE resolving root via `document.currentScript.parentElement`. Sub-classes/keyframes section-prefixed.
