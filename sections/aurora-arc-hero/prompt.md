# Build Spec: WPMN Section — Aurora Arc Hero

A dark centered agency hero built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). A glowing aurora arc sits behind a status pill, a headline with slanted brand highlight blocks, a sub, a book-a-call CTA, and a bottom trust bar. The navbar is intentionally omitted (it is a separate component).

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/aurora-arc-hero/section.html`

## Interaction rules (keep exactly as reference)

- On first view an IntersectionObserver (threshold 0.15) adds `.is-inview`; the status pill, heading, sub, and CTA fade up with `wpmn-zv-up` (500-600ms cubic-bezier(.22,1,.36,1)) staggered 80 / 160 / 240ms.
- The `.zv-arc` breathes its opacity (`wpmn-zv-breathe` 6s ease-in-out infinite); the `.zv-live` status dot pulses (`wpmn-zv-pulse` 1.8s).
- The primary button shifts to `--btn-bg-hovered` on hover. The trust bar and logo row fade at the right edge with an alpha `mask-image`.
- A scoped IIFE builds the avatar stack, the star rating, and the logo row from arrays. prefers-reduced-motion: reveals render in place; arc and dot animations off.

## Layout rules (WPMN design guideline)

- Section `--color-surface-secondary`, `overflow:hidden; isolation:isolate`, 96px/32px top padding (64/24 under 768). `.zv-wrap` max-width 1080px, centered column.
- Aurora: `.zv-arc` is a large circle (`min(1500px,150%)`) pushed above the fold, drawn with a `radial-gradient` ring (transparent core → `--btn-bg-enable` → an invert-white rim → transparent) and blurred; `.zv-glow` is a soft brand radial behind the heading. Both are `z-index:-1` decorative.
- Status pill: a `--zv-panel` translucent pill with an inner white `.zv-open` chip (surface-primary + text-primary + a `--color-success-primary` pulsing dot), muted invert label, and a white arrow chip.
- Heading h1 (bold, -0.02em, 1.06 line-height, invert). Highlight blocks `.zv-hl` are `skewX(-9deg)` brand parallelograms (`--radius-xsm`) with an inner `skewX(9deg)` span; `.zv-hl-a` is `--btn-bg-enable`, `.zv-hl-b` a darker brand mix, both with a light invert-brand-mixed text (element rules owned by the block class).
- Sub: body-medium `--color-text-secondary-invert`. CTA: a monogram `.zv-face` tile beside a `.zv-btn` (button tokens, `--radius-xsm`, glow inset, invert label) with a white `.zv-circ` arrow chip.
- Trust bar: a top hairline row with an overlapping monogram avatar stack, a star rating (`--color-warning-primary` stars + invert label) over a muted client-count, and a row of muted placeholder wordmark logos.

## Surface and text pairing (hard rule)

- Everything sits on the dark section: heading, button label, rating and avatar initials use `--color-text-primary-invert`; sub, client count and logos use `--color-text-secondary-invert` or a muted invert mix. The highlight blocks are brand surfaces with light invert-mixed text written as `.zv-hl-a > span` / `.zv-hl-b > span`. The only light islands are the white status chip and the button arrow chip, which use `--color-text-primary`. Never dark text on the dark section outside those chips.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-aurora-arc-hero">` with scoped `<style>`, the arc/content markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies; avatars are monogram initials and logos are generic token-SVG placeholders (content swapped on use), no third-party logos. All sub-classes are `zv-`-prefixed and keyframes are `wpmn-zv-`-prefixed so host styles can't leak in.
