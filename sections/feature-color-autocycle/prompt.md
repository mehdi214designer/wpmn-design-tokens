# Build Spec: WPMN Section — Feature Color Autocycle

An auto-cycling feature showcase recreated from an HTML reference and fully tokenized. The left column is four feature cards (icon + bold lead + supporting line + progress bar); the right column is one sticky tall panel spanning all rows that auto-advances through brand-tinted states while crossfading its mockup. A progress bar on the active card fills over each interval; clicking jumps and restarts; hover pauses; it only runs while in view.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/feature-color-autocycle/section.html`

## Interaction rules (keep exactly as reference)

- Auto-advance every 4500ms: active card crossfades its `.layer` (`.5s`), panel fill tweens between brand tints via `data-active` (`.6s`), card bg tints (`.5s`).
- Active card progress bar fills `scaleX(0->1)` over the interval (`wpmn-fcac-fill var(--fcac-dur, 4500ms) linear`), force-restarted on each `show(i)` by resetting the animation.
- Click a card -> `show(i)` + restart the interval. Grid `mouseenter` stops, `mouseleave` starts.
- `IntersectionObserver` (threshold `.25`) starts/stops the cycle as the grid enters/leaves view; falls back to immediate start with no observer.
- No raw colors in JS: toggle `is-active` classes and set the panel `data-active`; CSS resolves tokens.
- Re-scope to the section root via `document.currentScript.parentElement`.
- prefers-reduced-motion: `start()` is a no-op (no auto-advance), transitions off, progress bar rendered full; clicking still switches.

## Layout rules (WPMN design guideline)

- Section padding 96px/32px desktop, 64px/20px mobile; container max-width 1200px. Grid `1fr 2fr`, `repeat(4,1fr)` rows, `--primitive-space-16` gap.
- Cards: `--primitive-space-16` padding, `--radius-sm`, idle fill `color-mix(--color-text-primary 4%, --color-surface-primary)`, hover 8%, min-height 150px. Active fills are per-index brand tints (14/22/30/38%).
- Card icon 32px (`--spacing-icon-size-lg`) in `--color-text-primary`; lead `<b>` bold; text body-base, max 34ch. Progress bar 3px, track 12% / fill 45% of `--color-text-primary`, `margin-top:auto`.
- Panel: `grid-row: 1 / -1`, sticky `top: --primitive-space-24`, aspect `5/4`, `--radius-sm`, overflow hidden; fills are brand tints (30/45/60/75%); layer images `object-fit: cover`, `--shadow-soft-400`, 6% padding.
- Below 768px: one column, panel above the cards (`order: -1`), progress bars hidden.

## Surface and text pairing (hard rule)

- Everything sits on the light section surface; card text uses `--color-text-primary` only. Active-card tints and panel fills are light brand tints. Panel images carry no text, so fills may use brand directly.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-feature-color-autocycle" data-brand="...">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies: the original four accent colors collapse to one brand accent at four tint strengths, card illustrations become inline stroke icons, the four panel mockups are verified Unsplash photos, and the fill keyframe is prefixed `wpmn-fcac-`.
