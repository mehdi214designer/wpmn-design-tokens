# Build Spec: WPMN Section — Commerce Features Bento

A light, diagonal-large 2x2 commerce feature bento recreated from a screenshot and built natively on WPMN tokens (all artwork is token CSS/SVG — no images). Two rows of two cards, each a headline + description paired with a product-UI mock: Global sales (a fulfillment provider list with drag handles + green toggles and a checkout panel with delivery segments and shipping radios), Cart & checkout (a Payment node listing Stripe/Klarna with checks, connected to a Cart node), Omnichannel ready (a Sales channels table with up/down trend badges and product thumbnails), and Powerful order management (an actions context menu with one item selected + a cursor tag, beside order status cards).

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/commerce-features-bento/section.html`

## Motion rules

- Cards `.cfb-reveal` fade up in a staggered diagonal on first view (IntersectionObserver adds `.cfb-inview`; `wpmn-cfb-up` 600ms cubic-bezier(.22,1,.36,1)).
- Cards lift `translateY(-3px)` and deepen their shadow (soft-300 -> soft-500) on hover, 250ms.
- prefers-reduced-motion: hover + reveal off; everything rendered in final state.

## Layout rules (WPMN design guideline)

- Section background `--cfb-bg` (a subtle `135deg` `--btn-bg-enable` tint over `--color-surface-primary`), 96px/32px padding (40px sides <1200, 64px/20px <768); container max-width 1200px. Two `.cfb-row` grids: r1 `1.35fr 1fr`, r2 `1fr 1.5fr` (the large cards sit on the diagonal). Both collapse to one column < 900px.
- Cards: `--color-surface-primary`, `--cfb-line2` border, `--radius-lg`, 32px padding, `--shadow-soft-300`. Derived props hoisted on the root for panels, hairlines, muted text, neutral fills, and green/red tints so the audit reads surfaces correctly.
- Headings h4 bold -0.01em `--color-text-primary`; descriptions body-medium `--color-text-secondary`.
- Mock kit (token CSS/SVG): light `--cfb-panel` sub-panels; 34px neutral letter tiles; pill toggles (`--color-success-primary` when on); brand radios (`--btn-bg-enable`); segmented tabs; trend badges (green `--cfb-tint-green`/`--color-success-primary` up, red down); a node diagram with green status dots and an elbow connector; a context menu with one `.cfb-sel` item and a cursor tag; order status cards with success/brand status icons.

## Surface and text pairing (hard rule)

- The section and all cards/panels are light: dark text tokens only (`--color-text-primary` headings/names/values, `--color-text-secondary` descriptions/labels). Status colors (`--color-success-primary`, `--color-error-primary`) and `--btn-bg-enable` are used for toggles, radios, trend badges, checks, and the node dots. The only dark surface is the `eCom Manager` cursor tag (`--btn-bg-enable` fill) which uses `--color-text-primary-invert`. Never dark text on that tag; never light text on the light cards.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-commerce-features-bento">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; every mock is token CSS/SVG. All sub-classes are `cfb-`-prefixed so host styles can't leak in.
