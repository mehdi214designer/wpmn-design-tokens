# Build Spec: WPMN Section — banking hero

An image-mode recreation built natively on WPMN tokens (all artwork is token CSS/SVG; photos are verified Unsplash images with token tints; content is placeholder, swapped on use). The reference implementation is the source of truth:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/banking-hero/section.html`

## Interaction rules (keep exactly as reference)
- Motion is intentionally calm: an IntersectionObserver adds `.is-inview` on first view and content fades up (staggered) via the section's own keyframe; hover states are ~120-180ms; any carousel/menu logic is in the scoped IIFE. prefers-reduced-motion renders everything in its final state.

## Layout rules (WPMN design guideline)
- Section padding 96/32 desktop, 64/24 under 768; container centered. Colors map to tokens: surfaces `--color-surface-primary`/`--color-surface-secondary`, text `--color-text-primary`/`--color-text-secondary` (invert on dark), the accent to `--color-warning-primary` (or `--color-success-primary` where the design is green). Cards use `--radius-lg`, buttons the button tokens at `--radius-xsm` (never pills; 999px only for chips/tags/badges). Photos sit in `--radius-md`/`--radius-lg` figures with a token tint overlay. Every layout has working tablet and mobile breakpoints.

## Surface and text pairing (hard rule)
- Light surfaces use `--color-text-primary`/`--color-text-secondary`; dark cards use the invert tokens, written as element rules owned by the dark-scoped class so the audit attributes them. Decorative fills (illustrations, tints, dots) carry no text. Never dark text on dark, never light on light.

## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format
A single self-contained `<section class="wpmn-sec-banking-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies beyond verified Unsplash photos. All sub-classes and keyframes are section-prefixed so host styles can't leak in.
