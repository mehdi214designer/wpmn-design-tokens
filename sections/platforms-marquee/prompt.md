# Build Spec: WPMN Section — Platforms Marquee

A platforms/integrations marquee built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). A two-column heading row sits above two infinite logo marquees that scroll in opposite directions, fade at both edges, and pause on hover.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/platforms-marquee/section.html`

## Interaction rules (keep exactly as reference)

- Two rows scroll infinitely with a pure-CSS transform loop: `wpmn-pm-scroll` animates the track `transform: translateX(calc(-50% - var(--pm-gap)/2))` over `var(--pm-speed)` (55s) linear infinite. Each `.pm-track` holds the tile set duplicated (set + set) so the loop is seamless.
- The second row carries `.pm-rev`, which sets `animation-direction: reverse` so it scrolls the other way.
- Hovering `.pm-rows` pauses every track (`animation-play-state: paused`).
- Each `.pm-logo` scales to 1.05 and casts a `color-mix(--color-text-primary 15%, transparent)` drop-shadow on hover (300ms). The `.pm-link` arrow slides `translateX(6px)` on hover.
- Both row edges are faded with an alpha `mask-image` (linear-gradient, transparent → black 6%/94% → transparent).
- The tiles are injected by a scoped IIFE: 20 token-SVG glyph tiles on rotating token tints, duplicated per row (the reverse row uses the reversed set). Keep `--pm-card` 100px, `--pm-gap` 25px, `--pm-speed` 55s (card/gap shrink at 560px).
- prefers-reduced-motion: the marquee animation and tile transitions are turned off (tracks render static).

## Layout rules (WPMN design guideline)

- Section `--pm-bg` (`color-mix(--color-error-primary 8%, surface-primary)`), 100px vertical padding (64px under 900). `.pm-head` max-width 1220px, a two-column grid (minmax(0,646px) / 1fr, 48px gap) that stacks under 900px.
- Heading h3, regular weight with a `--font-weight-bold` `<strong>`, -0.2px tracking, `--color-text-primary`. Right column: a body-medium paragraph `--color-text-secondary` and a `.pm-link` (h6, medium, `--btn-bg-enable`, hover `--btn-bg-hovered`) with a trailing arrow.
- Tiles: `--pm-card` square, `--radius-sm`, a token-tinted background, `--shadow-soft-300`, an invert token-SVG glyph at 46%. Never raw mobile font-size overrides — the font tokens swap at 768px on their own.

## Surface and text pairing (hard rule)

- The heading and copy sit on the light tinted section surface: heading `--color-text-primary`, paragraph `--color-text-secondary`, link `--btn-bg-enable`. Each tile is a saturated token-tinted surface carrying an invert-colored glyph with no text, so the pairing stays light-on-tint decoratively. Never light text on the light section, never dark glyphs on the tinted tiles.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-platforms-marquee">` with scoped `<style>`, the heading markup, two `.pm-track` mounts, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies; the brand font falls back to `--font-family-base`, and every tile is a generic token-SVG placeholder (content swapped on use) with no third-party brand logos. All sub-classes are `pm-`-prefixed and the keyframe is `wpmn-pm-`-prefixed so host styles can't leak in.
