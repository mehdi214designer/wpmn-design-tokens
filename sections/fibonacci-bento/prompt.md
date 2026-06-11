# Build Spec: WPMN Section — Fibonacci Bento

Framed media bento imported from a reference build. Five cards on a Fibonacci-style grid inside a dark 12px frame; hovering a card tints its overlay with the brand color (multiply + blur) and thickens the title; the heading splits into letters that rise in staggered on first view and pop on hover. Interactions are preserved exactly from the reference; all visuals are tokenized.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/fibonacci-bento/section.html`

## Interaction rules (keep exactly as reference)

- Heading: JS splits text into `.ltr` spans (spaces kept as text nodes), each `translateY(110%)` with `transitionDelay = i*18ms`; an IntersectionObserver at 0.4 threshold adds `.in` to rise them. Per-letter mouseenter restarts a 0.35s pop keyframe via `void el.offsetWidth` reflow.
- Card hover: overlay background animates to `color-mix(in srgb, var(--btn-bg-enable) 78%, transparent)` with `mix-blend-mode: multiply` and `backdrop-filter: blur(3px)`, 450ms; description fades and slides up 350ms.
- Title hover weight: `font-variation-settings 'wght' 700 -> 900`, 400ms transition.
- Grid frame shadow transitions `--shadow-soft-500 -> --shadow-hard-300` on hover, 400ms.
- `prefers-reduced-motion`: letters render in place, all transitions/animations off.

## Layout rules (WPMN design guideline)

- Section: 96px/32px padding desktop, container max-width 1200px centered.
- Grid: 5 columns, rows `84fr 84fr 84fr 198fr 198fr`, gap 8px, `aspect-ratio: 1280/704`, 12px padding acting as the frame, bg `--color-surface-secondary`, radius `--radius-lg`. Cards radius `--radius-sm`.
- Card placement: forms 1/4 x 1/6, crm 4/6 x 1/4, automation 5/6 x 4/6, design 4/5 x 4/5, analytics 4/5 x 5/6. Re-grids at 991px (2-col) and 767px (stack).
- Overlay: bottom gradient of surface-secondary at 92% -> 0% via color-mix, inset 1.5px outline in surface-secondary, padding 20px.
- Card text on dark media: title `--color-text-primary-invert` (h5 tokens, bold, uppercase), description `--color-text-secondary-invert` (body-small).
- Header: uppercase body-label tagline in `--color-text-secondary`, h2 heading in `--color-text-primary`.
- One card uses a pure-CSS radial-gradient graphic (color-mix of text-primary-invert over surface-secondary) instead of an image — no external animation libraries.
- Class scoping: every rule prefixed with `.wpmn-sec-fibonacci-bento`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Light surfaces (--color-surface-primary, soft grey fills): headings use --color-text-primary, body uses --color-text-secondary. Never white or invert text on light surfaces.
- Dark surfaces (--color-surface-secondary) and brand-color surfaces: use --color-text-primary-invert / --color-text-secondary-invert. Never dark text or dark elements on these surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` (primitives -> brand-primitives -> tokens -> typography) before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-fibonacci-bento">` containing a scoped `<style>` block, the markup, and a scoped IIFE `<script>`. No external dependencies, no libraries.
