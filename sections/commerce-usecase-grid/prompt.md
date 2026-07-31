# Build Spec: WPMN Section — Commerce Usecase Grid

A light 3x2 grid of commerce use-case cards recreated from a screenshot and built natively on WPMN tokens (all artwork is token CSS/SVG — no images). Each card is a device mock on a tinted panel above an icon + title + description: Ecommerce (product page + a cart popup with a dark Pay button), Marketplace (product grid with overlapping vendor avatars), Subscription Business (renewal rows with card + calendar chips), Order Management System (paid/unfulfilled rows + a line chart), B2B Store (segmented control + a figure block), and Point of Sales (a tap-to-pay phone beside a card).

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/commerce-usecase-grid/section.html`

## Motion rules

- Cards `.cug-reveal` fade up in a staggered sweep on first view (IntersectionObserver adds `.cug-inview`; `wpmn-cug-up` 600ms, 70ms per card via animation-delay).
- Cards lift `translateY(-3px)` and deepen their shadow (soft-300 -> soft-500) on hover, 250ms.
- prefers-reduced-motion: hover + reveal off; everything rendered in final state.

## Layout rules (WPMN design guideline)

- Section `--cug-bg` (`color-mix(text-primary 3%, surface-primary)`), 96px/32px padding (40px sides <1200, 64px/20px <600); container max-width 1200px. Grid `repeat(3,1fr)`, 24px gap; two columns < 900px, one < 600px.
- Cards: `--color-surface-primary`, `--cug-line2` border, `--radius-lg`, `--shadow-soft-300`, `overflow:hidden`. A 210px `.cug-mock` panel (`--cug-mock` gradient, hairline bottom) holds the device mock (which bleeds off the right edge); below, a padded `.cug-body` with an icon+title head (h5 bold) and body-medium description.
- Device kit (token CSS/SVG): a `.cug-win` browser frame (traffic dots + address skeleton), skeleton bars (`--cug-fill`), photo placeholders; per-card signature elements — cart popup with a `--color-surface-secondary` Pay button, monogram vendor avatars ringed in `--btn-bg-enable`, subscription rows with a `--btn-bg-enable`-tinted card chip + calendar tile, an OMS panel with green `Paid`/warning `Unfulfilled` tags and an SVG line chart, a segmented control, and a `--color-surface-secondary` phone with a light screen showing an NFC glyph + amount, plus a rotated card block.
- Derived props hoisted on the root for panels, hairlines, fills, muted text, and green/warning tints so the audit reads surfaces correctly.

## Surface and text pairing (hard rule)

- The section and cards/mocks are light: dark text tokens only (`--color-text-primary` titles/prices, `--color-text-secondary` descriptions/labels). The Pay button and the phone body are `--color-surface-secondary` (dark) and use `--color-text-primary-invert`; the phone's inner screen is light again with dark text. Status colors (`--color-success-primary`, `--color-warning-primary`) and `--btn-bg-enable` are used for tags, avatars, checkbox, and the chart line. Never dark text on the dark Pay button/phone body, never light text on the light cards.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-commerce-usecase-grid">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; every mock is token CSS/SVG. All sub-classes are `cug-`-prefixed so host styles can't leak in.
