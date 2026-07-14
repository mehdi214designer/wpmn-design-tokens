# Build Spec: WPMN Section — Dark Feature List

A dark two-column section recreated from a Figma frame ("Full Card Stacking Dark") and fully tokenized. A large heading sits on the left over a faint grid and a soft brand corner glow; the right column is a list of four feature items, each a brand dot + title + description separated by hairline brand dividers.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/dark-feature-list/section.html`

## Interaction rules (the Figma is static; this motion is intentional and on-brand)

- Entrance reveal: heading + items start `opacity:0; translateY(24px)` and settle when the section scrolls into view (`IntersectionObserver`, threshold 0.2, fired once), staggered 60 / 140 / 220 / 300ms per item, `.7s cubic-bezier(0,0,0,1)`.
- Item hover: divider brightens from `color-mix(--btn-bg-enable 55%, transparent)` to full `--btn-bg-enable`, the item nudges `translateX(4px)`, and the dot scales `1.18`, all `.25s`.
- Re-scope to the section root via `document.currentScript.parentElement`.
- prefers-reduced-motion: all transitions off; heading and items render in their final state.

## Layout rules (WPMN design guideline)

- Section padding 96px/32px desktop, 64px/20px mobile; container max-width 1200px. The root is the dark surface; content sits above the decorative layers (`z-index:1`).
- Wrap is a flex row, `justify-content:space-between`, `gap:64px 80px`. Heading column and list column are each `flex:1 1 0` (`min-width` 280 / 320). Below 768px they stack to one column.
- Heading: h2 tokens, semibold, -0.01em, max 14ch, text-wrap balance.
- Each item: column, `gap:24px`, `padding-bottom:32px`, `border-bottom:1px` brand divider. Row = 12px brand dot + h5 title (semibold). Description body-base.
- Decorative layers are derived props on the root: `--dfl-grid` (7% invert hairline grid, masked to fade from top-left), `--dfl-glow` (26% brand radial glow in the top-left corner), `--dfl-divider` (55% brand). Rebuild them as CSS — do not hotlink the Figma bitmap.

## Surface and text pairing (hard rule)

- This is a dark section: root `background: var(--color-surface-secondary)` with `color: var(--color-text-primary-invert)`. Heading and titles use `--color-text-primary-invert`; descriptions use `--color-text-secondary-invert`. Dots and dividers use the brand accent `--btn-bg-enable`. Never place dark text on this surface.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-dark-feature-list">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies and no hardcoded `data-brand` (it inherits the page brand). The Figma grid + glow are rebuilt as token-based CSS so the section re-skins per brand; every keyframe-free transition is guarded by `prefers-reduced-motion`.
