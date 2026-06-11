# Build Spec: WPMN Section — Folder Quote Cards

Three case-study quote cards drawn as folder tabs, imported from a reference build. Each card's outline is an inline SVG "folder tab" path (notch on the top edge) stretched with `preserveAspectRatio="none"`; art panels are scanline-dithered canvas renders of a glyph in the brand color; footers carry a notched arrow pill with a slide-in hover fill. Cards enter with a damped, scroll-linked stagger. Interactions are preserved exactly from the reference; all visuals are tokenized.

The reference implementation is the source of truth. Fetch it and reproduce structure, geometry, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/folder-quote-cards/section.html`

## Interaction rules (keep exactly as reference)

- Entrance: raw progress `clamp((innerHeight - gridTop) / (innerHeight * 0.72), 0, 1.5)`; per-card target `clamp(raw - i*0.18, 0, 1)`; damped `state += (target - state) * 0.14`; ease `1-(1-p)^2`; applied as `translateY((1-e)*200px) scale(0.88 + 0.12e)` + opacity. Dual drive: passive scroll listener + permanent rAF loop.
- Arrow pill: hover scales 1.05, active 0.96 (200ms cubic-bezier(.2,.8,.2,1)); a currentColor fill layer at 5% opacity slides from translateX(-56px) to 0 in 260ms cubic-bezier(.22,1,.36,1).
- Canvas art: glyph drawn to an offscreen canvas, then scanlines (4px pitch, seeded LCG jitter, run-length fills) rendered where silhouette alpha > 60 and luminance < 0.82. Fill color read from `--btn-bg-enable` via getComputedStyle at runtime; re-rendered on `data-brand`/`data-theme` mutations.
- Folder-tab SVG path and notched pill path are geometry — keep both verbatim.
- Below 920px: cards stack vertically. prefers-reduced-motion: entrance pinned to final state.

## Layout rules (WPMN design guideline)

- Section: 96px/32px padding, container max-width 1200px, outer grid gap 72px.
- Header: kicker = 14x7 brand rect (`--btn-bg-enable`) + body-base medium in `--color-text-secondary`; h2 tokens regular with a semibold em span; sub body-base `--color-text-secondary`, max-width 560px.
- Card fill: `--color-surface-primary`; outline stroke and dotted dividers: `color-mix(in srgb, var(--color-text-primary) 20%/40%, transparent)`. Radius `--radius-xsm`.
- Card title: h5 semibold. Quote: body-base `--color-text-secondary`. Footer role body-small medium, org body-small secondary, 1px vline at 40% text-primary.
- Class scoping: every rule prefixed with `.wpmn-sec-folder-quote-cards`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Light surfaces (--color-surface-primary, soft grey fills): headings use --color-text-primary, body uses --color-text-secondary. Never white or invert text on light surfaces.
- Dark surfaces (--color-surface-secondary) and brand-color surfaces: use --color-text-primary-invert / --color-text-secondary-invert. Never dark text or dark elements on these surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` (primitives -> brand-primitives -> tokens -> typography) before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-folder-quote-cards">` containing a scoped `<style>` block, the markup, and a scoped IIFE `<script>`. No external dependencies, no libraries.
