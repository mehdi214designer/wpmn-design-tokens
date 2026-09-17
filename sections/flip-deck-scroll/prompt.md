# Build Spec: WPMN Section — Flip Deck Scroll

A scroll-scrubbed 3D flip deck built natively on WPMN tokens (all artwork is token CSS/SVG, no images/video and no third-party logos). A sticky 100vh viewport over a long runway scrubs a card deck through rotateX, revealing four faces one at a time, over a giant drifting uppercase serif-style ticker stripe.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/flip-deck-scroll/section.html`

## Interaction rules (keep exactly as reference)

- The `.td-section` is `height: calc(100vh + 4098px)` with a `.td-sticky` sticky 100vh viewport. Scroll position relative to the section top drives progress across six 250px windows starting at 649, 900, 1799, 2050, 2949, 3200px (`p += clamp01((rel - w)/250)`).
- The deck transform is `rotateX(90 * p)`, scrubbed through a smoothed scroll value (`smooth += (scrollY - smooth) * 0.12`). Faces are built pre-rotated at `k*180deg` and shown only while `abs(theta - k*180) < 180.5`.
- The `.td-stripe-rows` translate `-120px * p`; each `.td-ticker` drifts continuously (`wpmn-td-drift` 36s linear infinite) with its content duplicated for a seamless loop.
- Card media scales 1.05 → 1 on hover; the corner arrow (two copies) swaps along the diagonal on hover (450ms cubic-bezier).
- Dual drive: a passive scroll listener and a `requestAnimationFrame` loop both call `update()`; expose `window.__sectionUpdate` to re-sync. Under 809px the section flattens (`.td-section` auto height, deck static, faces stacked), so there is no 3D or runway on mobile.
- prefers-reduced-motion: the ticker drift and media transition are off.

## Layout rules (WPMN design guideline)

- Section and card base `--color-surface-secondary`; text `--color-text-primary-invert`. Scene is `min(500px, 88vw)` wide at 0.754 ratio, `perspective: 1000px`. Faces `--radius-md`, `backface-visibility:hidden`.
- Media is a per-face token gradient (`--td-media-a..d`, mixes of brand/success/warning/error). The `.td-shade` paints surface-secondary under a bottom alpha mask for caption legibility.
- Caption: name (h5, regular, invert) and tag chips (surface-primary bg, text-primary, `--radius-xsm`). Ticker uses `--font-size-h1`, uppercase, -0.03em, an invert-tinted color.

## Surface and text pairing (hard rule)

- Everything is on dark surfaces: the ticker and caption name use `--color-text-primary-invert`; tag chips are a light surface-primary chip with `--color-text-primary` text (a light island on the dark card, allowed). Media gradients and the shade carry no text. Never dark text on the dark card except inside the light tag chips.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-flip-deck-scroll">` with scoped `<style>`, the sticky/stripe/scene markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement` and queries within it. No external dependencies; media is token gradients and cases are placeholders (content swapped on use), no third-party logos. All sub-classes are `td-`-prefixed and the keyframe is `wpmn-td-`-prefixed so host styles can't leak in.
