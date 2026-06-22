# Build Spec: WPMN Section — Scrollspy Accordion

A split, scroll-driven feature showcase recreated from an HTML reference and fully tokenized. A centered heading sits above a 4/8 grid: the left column is a sticky nav of three numbered accordion items, the right column is three tall image cards. As the page scrolls, scroll-spy activates the item whose image is nearest the viewport center, expanding that item's accordion and lifting its card.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/scrollspy-accordion/section.html`

## Interaction rules (keep exactly as reference)

- Scroll-spy (verbatim): on `scroll`/`resize` and every `requestAnimationFrame`, active index = the `.img-slot` whose `getBoundingClientRect()` center is closest to `innerHeight/2`.
- Active item states, all `.3s cubic-bezier(0.4, 0, 0.2, 1)`: number color idle->active, title color idle->`--color-text-primary`, left accent bar `transparent`->`--color-text-primary`, and the CSS grid accordion `grid-template-rows: 0fr -> 1fr` with the description `opacity 0 -> 1`.
- Active card: `box-shadow` transition `.4s`, soft-100 -> soft-600.
- Click a nav item -> `slots[i].scrollIntoView({ behavior: 'smooth', block: 'center' })` (auto under reduced motion).
- Sticky nav `position: sticky; top: 20vh`. Re-scope all queries to the section root via `document.currentScript.parentElement`.
- prefers-reduced-motion: all transitions off; smooth scroll downgraded to auto. Under 800px the grid is one column and every reveal is open.

## Layout rules (WPMN design guideline)

- Section 96px/32px padding (64px/20px <800px); container max-width 1200px. Background `--ssa-bg` = `color-mix(--color-text-primary 3%, --color-surface-primary)` (soft off-white).
- Derived props hoisted on root (so the audit reads the section as light and the dim text states stay token-based): hover tint, number idle/active, title idle, plus the shared `--ssa-ease`.
- Heading: h2 bold, -0.04em tracking, max 20ch, text-wrap balance.
- Grid `4fr 8fr`, 48px column gap.
- Nav item: 20/24 padding, `--radius-md`, hover `--ssa-hover`. Number body-label medium 0.12em; title h4 semibold -0.03em; description body-base `--color-text-secondary`, max 34ch. Accent bar 3px, full-radius, inset 16% top/bottom.
- Image column: 20px gap; each slot `min-height: 60vh` (gives the scroll-spy room to switch one at a time). Card `--radius-lg`, overflow hidden, `16/10` cover images.

## Surface and text pairing (hard rule)

- Everything sits on the light section surface. Dark text tokens only: `--color-text-primary` for the heading, active title, and accent bar; `--color-text-secondary` for descriptions; idle number/title use `color-mix` of `--color-text-primary` with transparent. Never place these on a dark surface.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-scrollspy-accordion">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; the only assets are three verified Unsplash images.
