# Build Spec: WPMN Section — Hero Services

A warm split hero built on WPMN tokens. A left column (kicker, heading, sub, primary + ghost buttons, footer note) sits beside a right bento of four numbered service cards. The orange accent maps to `--color-warning-primary`; card photos are verified Unsplash images with a warm token tint.

The reference implementation is the source of truth:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/hero-services/section.html`

## Interaction rules (keep exactly as reference)
- On first view an IntersectionObserver (threshold 0.12) adds `.is-inview`; the left column and four cards fade up with `wpmn-hs-up` (600ms cubic-bezier(.22,1,.36,1)); cards staggered 70/140/210ms.
- Buttons shift background on hover. prefers-reduced-motion renders everything in place.

## Layout rules (WPMN design guideline)
- Section `--hs-bg` (`color-mix(--color-warning-primary 5%, surface-primary)`), 96/32 padding (64/24 <768). `.hs-wrap` max-width 1240px, two columns (.86fr / 1.4fr).
- Left: kicker (body-small semibold uppercase `--color-warning-primary`), h1 (medium, -0.02em), sub (body-medium `--color-text-secondary`), two buttons at `--radius-xsm` (primary `--color-warning-primary` + invert + glow inset + white arrow chip; ghost surface-primary + hairline ring), and a dotted footer note.
- Right bento: `grid-template-areas "c1 c2 c2" / "c1 c3 c4"` (columns 1.14fr/1fr/1fr). Each card surface-primary, hairline, `--radius-lg`; a warning number, h6 title, body-small desc, a 999px arrow chip, and a photo figure (`--radius-md`, cover) with a warning-tint multiply overlay. Cards collapse to 2-up then 1-up.

## Surface and text pairing (hard rule)
- Everything on the light warm surface: headings `--color-text-primary`, copy `--color-text-secondary`, kicker/numbers `--color-warning-primary`. The primary button is the one filled warning surface (`--color-text-primary-invert` label). Photo overlays are decorative. Never light text on the light surface.

## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format
A single self-contained `<section class="wpmn-sec-hero-services">` with scoped `<style>`, markup, and a scoped IIFE `<script>` (IntersectionObserver reveal) that resolves its root via `document.currentScript.parentElement`. Photos are verified Unsplash images; the orange accent is the warning token (content swapped on use). All sub-classes are `hs-`-prefixed and keyframes `wpmn-hs-`-prefixed.
