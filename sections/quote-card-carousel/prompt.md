# Build Spec: WPMN Section — Quote Card Carousel

A dark testimonial slider recreated from a screenshot and built natively on WPMN tokens. An outline badge sits above a bold heading and a short sub, then a peek carousel of folder-notch quote cards. Each card's silhouette is an SVG path with a **raised top-left tab** that holds a large quote glyph, stepping down via a concave joint to the main top edge. Below the glyph: the quote, then an avatar monogram with the name and an accent role. Fully-visible cards brighten while peeking neighbours dim; a ghost prev and a brand-filled next control move through.

This spec is the source of truth. Fetch the reference implementation and reproduce the card shape, structure, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/quote-card-carousel/section.html`

## The card shape (match exactly)

- Built as an inline `<svg class="shape" preserveAspectRatio="none">` behind each card (`z-index:-1`), with a single `.fill` path (no border/stroke). ViewBox `0 0 400 360`.
- Path silhouette: top-left tab raised to `y=0` from `x≈8` to `x≈122`, a short rounded concave step `L152 16` down to the main top edge at `y≈18`, across to a convex top-right corner, then standard rounded right/bottom/left. The quote glyph sits inside the raised tab.
- `.fill` = `--qcc-fill` (`color-mix(text-primary-invert 6%, surface-secondary)`), brightening to `--qcc-fill-active` (10%) on active cards. The card itself has no CSS background, so the audit pairs card text against the dark section surface.

## Motion rules

- Centered carousel: the active card is translated to the middle of the viewport via `translateX = viewport.clientWidth/2 - (card.offsetLeft + card.offsetWidth/2)`, so neighbours peek on both sides. `prev/next` change the active `idx` clamped to `[0, n-1]`; controls disable at the ends; re-center on resize. Start on the middle of the row.
- Only the centered (active) card gets `.qcc-active` — opacity .4 -> 1, fill 6% -> 10%, quote `--color-text-secondary-invert` -> `--color-text-primary-invert`. Every other card stays dimmed.
- Header items + track carry `.reveal`, fading up on first view (IntersectionObserver, 600ms, 70ms stagger).
- prefers-reduced-motion: track/card transitions off, reveals shown in place.

## Layout rules (WPMN design guideline)

- Section `--color-surface-secondary` (dark), 96px/32px padding (40px sides <1200, 64px/20px <768), `overflow:hidden`; container max-width 1200px.
- Header centered: badge outline pill in `--btn-bg-enable` (border `color-mix(btn-bg-enable 55%, transparent)`), h2 bold -0.02em invert, sub body-medium `--color-text-secondary-invert`.
- Cards: `flex:0 0 460px` (84% <768), min-height 360px, 32px padding, gap 24px. Quote glyph 44x36 SVG in `--qcc-qmark`; quote body-medium; footer pinned to the bottom with a 52px avatar monogram (`--qcc-avatar`), name (h5 bold invert), role (body-small medium `--btn-bg-enable`).
- Controls: two 56px circles. Prev is ghost (hairline `--qcc-ctl`, hover fill); next is the brand button (`--btn-bg-enable` + `--btn-bg-glow`, hover `--btn-bg-hovered`). Both disable at the ends; focus-visible ring `--btn-bg-focused`.

## Surface and text pairing (hard rule)

- Everything sits on the dark section surface and dark cards. Invert text tokens only: `--color-text-primary-invert` for headings/names/active quotes, `--color-text-secondary-invert` for sub/idle quotes. Accents use `--btn-bg-enable` (badge, role, next control). Never dark text on these dark surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-quote-card-carousel">` with scoped `<style>`, markup, and a scoped IIFE `<script>` (cards built from a data array). No external dependencies; the card silhouette, quote glyph, and avatars are token CSS/SVG (no images).
