# Build Spec: WPMN Section — Gifting Feature Bento

A colorful, color-blocked bento for a gifting app, recreated from a screenshot and built natively on WPMN tokens (all artwork is token CSS/SVG — no images, no brand logos). Six vibrant tinted cards laid out in a `grid-template-areas` bento: Customization (a tilted card + an editor toolbar), Scheduling (a date-wheel with a Set Date button), Wallet (a dark cash card with a stacked card behind), Inbox (a list of message rows), Send Gifts (a scattered pile of gift-card rectangles), Reminders (a phone showing a birthday notification).

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/gifting-feature-bento/section.html`

## Motion rules

- Cards `.gvb-reveal` fade up in a staggered sweep on first view (IntersectionObserver adds `.gvb-inview`; `wpmn-gvb-up` 600ms, 70ms per card via animation-delay).
- Cards lift `translateY(-3px)` on hover, 250ms.
- prefers-reduced-motion: hover + reveal off; everything rendered in final state.

## Layout rules (WPMN design guideline)

- Section background `--gvb-bg` (a faint warning tint over `--color-surface-primary`), 96px/32px padding (40px sides <1200, 64px/20px <600); container max-width 1200px.
- Grid `1.1fr 1fr 1fr`, 24px gap, `grid-template-areas: "cust sched sched" / "cust wallet inbox" / "gifts gifts remind"`. Collapses to 2 columns < 900px and 1 column < 600px (areas re-listed per breakpoint).
- **Color mapping (key):** the six pastel blocks are hoisted as root props so the audit reads each card as a light surface — `--gvb-cust` (btn-bg-enable 20%), `--gvb-sched` (error 18%), `--gvb-wallet` (success 22%), `--gvb-inbox` (warning 26%), `--gvb-gifts` (warning 44%), `--gvb-remind` (btn-bg-enable 12%), each `color-mix(... over surface-primary)`. Card headings use matching hue-tinted dark colors `--gvb-h-*` = `color-mix(accent ~52%, text-primary)`.
- Cards: `--radius-lg`, 32px padding, `overflow:hidden`, `flex` column; heading h4 bold, description body-medium `--color-text-secondary`.
- Mock kit (token CSS/SVG): a white `--color-surface-primary` mini-card + a white editor toolbar of icon+label tools; a white date-wheel with a highlighted row and a `--color-surface-secondary` Set Date button; a `--color-surface-secondary` Wallet Cash card with a Redeem chip and a peeking card behind; message rows with monogram avatars + thumbnails; a scattered pile of gift-card rectangles tinted with accent/`surface-secondary` mixes (no brand marks); a `--color-surface-secondary` phone with a light screen holding a notification card.

## Surface and text pairing (hard rule)

- The section and all six tinted cards are light: dark text tokens only (`--color-text-secondary` descriptions/labels; headings use the hue-tinted `--gvb-h-*` mixes). The dark elements (Set Date button, Wallet card, phone body) are `--color-surface-secondary` and use `--color-text-primary-invert` / `--color-text-secondary-invert`; the phone's inner screen is light again with dark text. Never dark text on those dark elements, never light text on the light tinted cards.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-gifting-feature-bento">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; every mock is token CSS/SVG and no third-party brand logos are used. All sub-classes are `gvb-`-prefixed so host styles can't leak in.
