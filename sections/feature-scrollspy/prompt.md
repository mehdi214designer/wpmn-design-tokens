# Build Spec: WPMN Section — Feature Scrollspy

Sticky scrollspy menu beside a column of feature cards, imported from a reference build. The menu tracks scroll position with a brand dot on the active item; cards rise in on first view; the first card is a dark quote card with a light inner quote box. Interactions are preserved exactly from the reference; all visuals are tokenized.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/feature-scrollspy/section.html`

## Interaction rules (keep exactly as reference)

- Scrollspy: active index = last card whose `getBoundingClientRect().top <= innerHeight * 0.4`; menu items toggle `.active` (color, weight medium, 6px brand dot), 250ms color/opacity transitions.
- Menu item click: `scrollIntoView({ behavior: 'smooth', block: 'center' })` on its card.
- Reveal: `.reveal` elements get `.is-revealed` once when their top crosses `innerHeight * 0.88` — opacity 0 -> 1 and translateY(40px) -> 0, 1s, transform eased with cubic-bezier(0,0,0,1).
- Dual drive: passive scroll listener + permanent rAF loop, plus resize listener.
- Below 900px: menu unsticks and wraps horizontally above stacked cards.
- prefers-reduced-motion: reveals render in final state, menu transitions off.

## Layout rules (WPMN design guideline)

- Section: 96px/32px padding, container max-width 1200px. Grid `280px 1fr`, gap 40px; menu sticky top 84px.
- Section title: h2 tokens, semibold. Card titles: h4 tokens. Descriptions: body-base in `--color-text-secondary`.
- Feature cards: soft grey `color-mix(in srgb, var(--color-text-primary) 4%, var(--color-surface-primary))`, radius `--radius-md`, padding 48px. Split cards: `1fr 1.15fr` grid, image radius `--radius-xsm` + `--shadow-soft-300`.
- Quote card: bg `--color-surface-secondary` (dark); its title uses `--color-text-primary-invert`, its description `--color-text-secondary-invert`. Inner quote box: bg `--color-surface-primary`, radius `--radius-xsm`, dark text (h5 regular for the quote, body-small for the person).
- Tag pills: bg `--color-surface-primary`, radius 999px, body-small, 6px brand dot (`--btn-bg-enable`).
- Menu inactive color: `color-mix(in srgb, var(--color-text-primary) 32%, transparent)`; active `--color-text-primary`.
- Class scoping: every rule prefixed with `.wpmn-sec-feature-scrollspy`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Light surfaces (--color-surface-primary, soft grey fills): headings use --color-text-primary, body uses --color-text-secondary. Never white or invert text on light surfaces.
- Dark surfaces (--color-surface-secondary) and brand-color surfaces: use --color-text-primary-invert / --color-text-secondary-invert. Light elements (the white quote box, white tag pills) on dark surfaces are correct. Never dark text or dark elements directly on these surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` (primitives -> brand-primitives -> tokens -> typography) before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-feature-scrollspy">` containing a scoped `<style>` block, the markup, and a scoped IIFE `<script>`. No external dependencies, no libraries.
