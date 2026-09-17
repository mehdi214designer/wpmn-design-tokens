# Build Spec: WPMN Section — Sticky Stagger Cards

A dark split section built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). A sticky left intro sits beside a right column of five cards that pin at staggered tops and pile up leaving small lips, driven purely by CSS sticky positioning.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/sticky-stagger-cards/section.html`

## Interaction rules (keep exactly as reference)

- The left `.alt-intro` is `position:sticky; top:100px`. The right `.alt-card`s are each `position:sticky` with staggered tops 100 / 120 / 140 / 160 / 180px, so as you scroll they pin and stack, each leaving a 20px lip. This is pure CSS — no JS transforms, no appear effects.
- The `.alt-btn` label rolls per-letter on hover: a scoped script splits the label (`aria-label`) into `<span>`s, each with `--i` its index; on hover every span translateY -100% with an 18ms-per-index delay, revealing its duplicate rendered via `::after`.
- Under 999px the grid collapses to one column, the intro stops being sticky, and cards go full width. prefers-reduced-motion disables the letter-roll transition.

## Layout rules (WPMN design guideline)

- Section `--color-surface-secondary`, 150px/24px padding (64px under 768). `.alt-container` max-width 1400px; `.alt-grid` two equal columns, 20px gap.
- Meta row: four columns (title with a token-SVG glyph, spacer, edition label, a top-right arrow glyph), all `--color-text-primary-invert`, body-base.
- Intro: h2 (h1 token, semibold, -1px, invert), sub (h6, semibold, `--color-text-secondary-invert`), a CTA row with the button and social proof. The button uses the button tokens at `--radius-xsm` (never a pill): surface-primary bg, text-primary, `--shadow-soft-300`. Social proof: overlapping monogram avatars (`--radius-xsm`, brand-tint and `--alt-chip` fills, 2px surface-secondary ring) plus a caption.
- Cards: 420x350, `--color-surface-secondary`, 1px `--alt-border`, `--radius-xsm`, 25px padding; a 60px invert token-SVG icon at top, then title (h6 semibold invert) and body (body-base `--color-text-secondary-invert`). Icon and card-text rules are element rules owned by the dark card classes so the audit attributes them.

## Surface and text pairing (hard rule)

- Everything sits on dark surfaces: headings, titles, icons and meta use `--color-text-primary-invert`; sub, card body use `--color-text-secondary-invert`. The button is the one light island (surface-primary + `--color-text-primary`). Card and border fills are derived from invert-over-surface mixes. Never dark text on the dark cards.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-sticky-stagger-cards">` with scoped `<style>`, markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies; icons are token-SVG glyphs, avatars are monogram initials (content swapped on use), no third-party logos. All sub-classes are `alt-`-prefixed so host styles can't leak in.
