# Build Spec: WPMN Section — Feature Color Switcher

A split feature switcher recreated from an HTML reference and fully tokenized. The left column is four feature cards (icon + bold lead + supporting line); the right column is one tall panel spanning all rows that color-shifts through brand-tinted states while crossfading its mockup. On desktop a scroll-spy activates the card nearest viewport center; hover and click also switch.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/feature-color-switcher/section.html`

## Interaction rules (keep exactly as reference)

- Scroll-spy (verbatim): on `scroll`/`resize`, active card = the one whose `getBoundingClientRect()` center is closest to `innerHeight/2`, gated to `innerWidth >= 901`.
- Hover (`mouseenter`, desktop) and `click` set the active card too.
- Active card background tints to its per-index brand shade (`.4s ease`). The panel fill tweens between four brand tints via the panel's `data-active` attribute (`.5s ease`); the matching `.layer` crossfades `opacity` (`.5s ease`).
- No raw colors in JS: state is driven by toggling `active` classes and setting `data-active`; CSS resolves the tokens.
- Re-scope to the section root via `document.currentScript.parentElement`.
- prefers-reduced-motion: card/panel/layer transitions off.

## Layout rules (WPMN design guideline)

- Section padding 96px/32px desktop, 64px/20px mobile; container max-width 1200px. Grid `1fr 2fr`, `--primitive-space-16` gap, `grid-auto-rows: 1fr`.
- Cards: `--primitive-space-16` padding, `--radius-sm`, idle fill `color-mix(--color-text-primary 4%, --color-surface-primary)`, hover 8%, min-height 150px. Active fills are per-index brand tints (14/22/30/38% over surface) hoisted as derived props.
- Card icon: 32px (`--spacing-icon-size-lg`) inline stroke icon in `--color-text-primary`; lead in `<b>` `--font-weight-bold`; text body-base, max 34ch.
- Panel: `grid-row: 1 / 5`, `--radius-sm`, overflow hidden, min-height 480px; fills are brand tints (32/48/64/80%); layer images `object-fit: cover`.
- Below 900px: one column, panel above the cards (`order: -1`).

## Surface and text pairing (hard rule)

- Everything sits on the light section surface; card text uses `--color-text-primary` only. The active-card tints and panel fills are light brand tints (text stays dark on them). Panel images carry no text, so panel fills may use brand directly.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-feature-color-switcher" data-brand="...">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies: the original four accent colors collapse to one brand accent at four tint strengths (so it re-skins per `data-brand`), card illustrations become inline stroke icons, and the four panel mockups are verified Unsplash photos.
