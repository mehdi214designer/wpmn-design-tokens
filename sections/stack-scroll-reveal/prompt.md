# Build Spec: WPMN Section — Stack Scroll Reveal

A scroll-scrubbed stacking deck recreated from an HTML/Framer reference and fully tokenized. Four case-study cards (number, category, title, description, image) sit pinned over a large accent headline. As the page scrolls, each card grows while the front card peels away with a perspective tilt.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/stack-scroll-reveal/section.html`

## Interaction rules (keep exactly as reference)

- Track height `calc(152px + 570vh)`; the sticky stage pins for 30vh: `S = 152 + 0.3 * vh` measured from the section top (`-root.getBoundingClientRect().top`).
- Per card N (1-based): grow `scale = base + (base*boost - base) * pg` where `pg = clamp01((smooth - S) / (n * 1.1 * vh))`, plus `translateY(lift * pg * u)`. Keep the verbatim `data-base` (1 / .88 / .76 / .64), `data-boost` (1.12 / 1.28 / 1.5 / 1.8), `data-lift` (0 / -22 / -39 / -47), and `--peek` (0 / 13.06 / 22.07 / 26.58).
- Front-card exit on the inner: `translateY(-736 * pe * u) rotateX(15 * pe deg)` where `pe = clamp01((smooth - (S + (n-1)*1.1*vh)) / vh)`; `perspective(500px)` on both transforms.
- The scrubbed value is lerp-smoothed: `smooth += (target - smooth) * 0.12`. Dual drive: a rAF `frame()` loop + a passive `scroll` listener.
- `--u = stack.clientWidth / 1000` drives the fluid layout; toggle `wssr-narrow` when `root.clientWidth < 810` (container width, not viewport).
- Re-scope to the section root via `document.currentScript.parentElement`; guard against double-init with `data-init`.
- prefers-reduced-motion: skip the whole animation setup (`measure()` only); CSS lays the deck out as a static stacked list.

## Layout rules (WPMN design guideline)

- Root background is a soft off-white `color-mix(--color-text-primary 3%, --color-surface-primary)`. Headline uses h2 tokens, semibold, in `--btn-bg-enable` (brand accent), max 20ch, centered.
- Stack is `min(100%, 1000px)`; each card `--radius-lg`, image `--radius-md`, `object-fit: cover`. Card padding, gaps, image width, peek, and transforms stay in `calc(px * var(--u))` (the fluid engine) — only type, color, and radius are tokenized.
- Card type: number h4 semibold, category body-label uppercase (75% invert), title h3 bold, description body-medium.
- Below 810px container: cards flip to a stacked column (image full width).

## Surface and text pairing (hard rule)

- The four card surfaces are deepening brand/dark shades: `--btn-bg-enable`, `--btn-bg-hovered`, `color-mix(--btn-bg-enable 55%, --color-surface-secondary)`, `--color-surface-secondary`. All card text is inverted: titles/numbers `--color-text-primary-invert`, descriptions `--color-text-secondary-invert`, category a 75% invert tint. Never dark text on these cards.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-stack-scroll-reveal">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies and no hardcoded `data-brand` (it inherits the page brand): the four rainbow colors collapse to one brand accent at four depths, type/radii are tokens, and the four Framer images are verified Unsplash photos.
