# Build Spec: WPMN Section — Builder CTA Card

Large CTA card imported from a reference build: brand-tinted diagonal gradient, kicker pill, two-line heading with an inline logo tile, two-column icon feature list, paired CTAs, and a clipped product screenshot that double-fades into the card on the right. Static section; button hovers are the only motion. All visuals tokenized.

The reference implementation is the source of truth. Fetch it and reproduce structure, geometry, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/builder-cta/section.html`

## Interaction rules (keep exactly as reference)

- Primary button hover: an invert-color overlay (::after) fades 0 -> 0.12, 200ms cubic-bezier(.6,.6,0,1); active sets `--btn-bg-pressed` with 50ms transition.
- Light button hover: shadow lifts `--shadow-soft-300` -> `--shadow-soft-500` (1px stroke ring constant).
- No scroll-driven motion. prefers-reduced-motion disables button transitions.

## Layout rules (WPMN design guideline)

- Section: 96px/16px padding, card wrap max-width 1160px. Card radius `--radius-lg`, overflow hidden.
- Card gradient (derived tokens on the section root): `linear-gradient(114.58deg, color-mix(btn-bg-enable 16%, surface-primary) -1.34%, color-mix(btn-bg-enable 7%, surface-primary) 24.05%, color-mix(text-primary 4%, surface-primary) 74.82%)`. The stage color (last stop) is reused by the screenshot fades.
- Content column: max-width 576px, padding 60px 0 60px 60px. Kicker pill body-label uppercase on `color-mix(text-primary 4%, transparent)`. Heading h3 semibold, text-wrap balance; logo tile 44px, `--btn-bg-enable` bg, `--radius-xsm`, inner glow, white inline SVG glyph.
- Feature list: 2-col grid, gap 16px, body-base secondary text; inline SVG icons (geometry verbatim) via currentColor at `color-mix(text-primary 36%, transparent)`.
- Screenshot panel (geometry verbatim): clipped panel from x 558px; image 800x622 at left 141 / top 56, radius `--radius-md`, 1px stroke at text-primary 8%; fade-right 85% width and fade-bottom 65% height, both `linear-gradient(stage, stage 90% transparent, transparent)`.
- Below 1024px: panel hidden, inline screenshot below content (260px, radius-md). Below 640px: 64px section padding, single-column list.
- Class scoping: every rule prefixed `.wpmn-sec-builder-cta`. Static markup, no script needed.

## Surface and text pairing (hard rule)

- The card is a light tinted surface: headings `--color-text-primary`, body `--color-text-secondary`. Never invert text on it.
- The logo tile and primary button are brand surfaces: text/glyphs use `--color-text-primary-invert`.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-builder-cta">` with scoped `<style>` and markup. No external dependencies, no libraries.
