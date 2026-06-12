# Steps Card Stack — WPMN section prompt

Build a "How It Works" section of four full-viewport gradient step cards. Each card pins to the top of the viewport with `position:sticky` while its spacer scrolls, then squashes away (scales down, tips back on rotateX, tilts on rotateZ, fades late) as the next card slides over it. A bordered title row sits above the stack, every card carries a step code, a big numeral, two tag rows, a short indented copy block, a "Get started" button with a per-letter roll-up hover, and a photo melting into the card's bottom gradient.

The reference implementation is the source of truth:
https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/steps-card-stack/section.html

## Interaction rules (keep exactly as reference)

- Pin distance is **942px** per card. Each slide wrapper is `height: calc(100vh + 942px)`; the last slide is `height: 100vh`. The card inside is `position: sticky; top: 0; height: 100vh; overflow: hidden`.
- Per-card progress: `p = clamp((scrollY - slideTop) / 942, 0, 1.35)` where `slideTop = slide.getBoundingClientRect().top + scrollY`.
- With `pc = min(p, 1)`:
  - `scale = 1 - 0.3 * pc^2` (1 → 0.70)
  - `rotateX = 27deg * pc^1.6` — **no perspective**, pure squash
  - `rotateZ = tilt * pc^2`, per-card tilts: **-3.5 / 0 / +4.3 / 0 deg** (from `data-tilt`)
- Opacity: 1 while `p < 0.85`, then `clamp(1 - (p - 0.85) / 0.45, 0, 1)` — fade completes at p ≈ 1.3, past the pin end. The last card never transforms.
- When `p <= 0`, clear inline transform/opacity.
- Word flash-in: words wrapped in inline-block spans with `transition: opacity 0.12s linear`. JS hides them (`opacity: 0`) and assigns `transition-delay: i * 70ms` per word inside its block; a block reveals when its top crosses `innerHeight * 0.75` (and bottom > 0), checked from the same update loop — no IntersectionObserver. Text stays visible if JS never runs.
- Button roll: JS splits the label into per-char `<div>`s duplicated in two stacked rows inside an overflow-hidden line; row height equals `--font-lh-btn-md`; hover shifts every char `translateY(-1 line)` with `transition: transform 0.45s cubic-bezier(0.6, 0, 0.2, 1)` and `transition-delay: i * 18ms`.
- Drive: passive `scroll` listener **plus** a `requestAnimationFrame` loop (rAF dies in hidden documents, scroll covers embeds).
- `prefers-reduced-motion: reduce`: no transforms, no word hiding, no char roll, no rAF loop — content rendered in final state.

## Layout rules (WPMN design guideline)

- Section: `background: var(--color-surface-primary)`, `font-family: var(--font-family-base)`, 96px top padding (64px under 768px). Cards are full-bleed 100vh; title row and card content cap at 1200px.
- Title row: hairline `border-top: 1px solid var(--color-border-primary)`, heading at `--font-size-h1`/`--font-lh-h1` `--font-weight-semibold` `--color-text-primary`, right copy at body-medium `--color-text-secondary`. Stacks left-aligned under 768px.
- Card gradients all melt into the same brand color at the bottom: every gradient ends in `var(--btn-bg-enable)` (written literally in the `background:` declaration so surfaces audit as dark). Tops are derived custom properties hoisted on the section root: card 1 `color-mix(in srgb, var(--btn-bg-hovered) 80%, var(--btn-bg-enable))`, card 2 `color-mix(in srgb, var(--btn-bg-enable) 55%, var(--color-brand-surface))`, card 3 three stops `var(--btn-bg-pressed)` → `color-mix(in srgb, var(--btn-bg-hovered) 55%, var(--btn-bg-enable))` at 23% → enable, card 4 `color-mix(in srgb, var(--color-surface-secondary) 55%, var(--btn-bg-enable))`.
- Card type: step code at h6 medium, 0.4 opacity; card title at `--font-size-h2` semibold (50% width desktop); numeral at `calc(var(--font-size-h1) * 1.8)`, line-height 1, right-aligned; tag rows body-small medium over a `color-mix(in srgb, var(--color-text-primary-invert) 20%, transparent)` hairline with a 7px dot (`border-radius: calc(var(--radius-xsm) / 4)`); copy block at h5 medium with a 28px first-line indent and a dim span at `color-mix(in srgb, var(--color-text-primary-invert) 55%, transparent)`.
- Button: DS light button — `var(--color-surface-primary)` bg, `var(--color-text-primary)` text, `--radius-xsm` (never pill), btn-md type tokens, `box-shadow: var(--shadow-soft-300), 0 0 0 1px <12% text-primary ring>`, hover lifts to `--shadow-soft-500`.
- Art: Unsplash photo per card (no hotlinked media), absolutely positioned, centered, 1080px wide (card 2: 1400px, card 4: 1240px, top 96px), `--radius-md` + `--shadow-soft-500`, with a 160px bottom overlay `linear-gradient(transparent, var(--btn-bg-enable))` melting it into the card.
- Info columns are 224px tall on desktop, auto under 992px; everything stacks single-column under 768px. Never write raw mobile font-size overrides — typography.css swaps tokens at 768px.

## Surface and text pairing (hard rule)

The cards are brand surfaces: every text element inside them uses `--color-text-primary-invert` (dim variants via color-mix of the invert token over transparent). Never `--color-text-primary` or `--color-text-secondary` on the gradient cards. The title row sits on `--color-surface-primary` and uses `--color-text-primary` / `--color-text-secondary`. The button is a light surface inside a dark card: `--color-surface-primary` bg with `--color-text-primary` text.

## Required token CSS

Load the design system first:
https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css

## Output format

A single self-contained `<section class="wpmn-sec-steps-card-stack">` containing one scoped `<style>` block (every rule prefixed with the section class), the markup, and one scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No ids, no external fonts/scripts/media beyond the listed Unsplash images, no raw hex/rgb values — tokens and color-mix over tokens only.
