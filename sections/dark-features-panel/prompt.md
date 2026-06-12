# Build Spec: WPMN Section — Dark Features Panel

Features section imported from a reference build: a full-bleed dark rounded panel (10px light inset around it) holding a small chip flanked by gradient hairlines, a centered h2 + highlighted subline, and a 3x3 icon-feature grid. The grid is cut at its thirds by 1px gradient-fading divider lines whose crossings are hidden by thick panel-colored ring "dots" (box-shadow masking trick). At >=1440px the panel grows rotated number rulers down both sides, two faint edge lines, and a brand-colored spark streak that slides down each edge line on an endless loop.

The reference implementation is the source of truth. Fetch it and reproduce structure and spacing exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/dark-features-panel/section.html`

## Interaction rules (keep exactly as reference)

- Spark streak: `width: 1px; height: 300px`, background `linear-gradient(transparent, var(--btn-bg-enable))`, animation `wpmn-dfp-spark 6s ease infinite both`; keyframes `0% { translateY(-100%) }` to `100% { translateY(1250px) }`. Right spark starts immediately, left spark gets `animation-delay: 1s`. Never change the 6s duration, the 1s offset, or the 1250px travel.
- Divider gradients: every hairline (chip row flanks, grid dividers, edge lines) is `linear-gradient(transparent 0%, line 32%, line 68%, transparent 100%)` — vertical by default, `90deg` for horizontal ones.
- Intersection dots: 7x7 transparent squares at the four crossings (33.333% / 66.666%) with `box-shadow: 0 0 0 6px` in the panel ring color — the thick ring masks the line crossing, the square center reads as a dot. No border-radius.
- Side rulers: 15 numbers (0–700 in 50s) per side, each in a 48x56px rotated cell (`rotate(-90deg)` left, `rotate(90deg)` right) with a 1px x 4px tick drawn by `::before`; rulers sit at `top: 104px`, `calc(50% ∓ 704px)`. Edge lines and sparks sit at `calc(50% ∓ 632px)`. All deco only at `min-width: 1440px`.
- `prefers-reduced-motion: reduce` kills the spark animation and hides the sparks; everything else is static.

## Layout rules (WPMN design guideline)

- Section root: `--color-surface-primary` background, 10px padding; inside it the dark panel uses `border-radius: var(--radius-lg)`, `overflow: hidden`, background `linear-gradient` from `color-mix(text-primary-invert 3%, surface-secondary)` to `--color-surface-secondary`, padding `var(--spacing-section-padding-tb-desktop) 0` (mobile swaps to the mobile token).
- Chip: 28px tall, `--radius-xsm`, bg `color-mix(text-primary-invert 3%, transparent)`, 1px ring + inset highlight via color-mix shadows, body-small medium text in `--color-text-secondary-invert`, 20px Hugeicons stroke.rounded rocket at `color-mix(text-primary-invert 45%, transparent)`.
- Head: centered column, gap `--spacing-h-xxl-to-large`, h2 tokens semibold with `-0.025em` tracking in `--color-text-primary-invert`; subline body-medium `--color-text-secondary-invert`, max-width 564px, `<strong>` highlights medium weight in `--color-text-primary-invert`.
- Grid: max-width 1200px, 3 columns, gap `56px 24px`; each feature is a centered column (16px padding) with a 24px Hugeicons stroke.rounded icon in `--btn-bg-enable`, body-base medium title in `--color-text-primary-invert` (20px above), body-small description in `--color-text-secondary-invert` (max-width 272px).
- Hairline/ring colors are derived custom props on the section root: line = `color-mix(text-primary-invert 8%, surface-secondary)`, ring = 2% mix, mobile hairlines = `color-mix(text-primary-invert 10%, transparent)`.
- Responsive: <=1279px the grid drops to 2 columns (24px gap, 768px max) and all dividers hide; <=767px it becomes a single-column bordered list (icon-left rows, 20px icons), the head left-aligns, and panel padding uses the mobile token. Never write raw mobile font-size overrides — typography tokens swap at 768px on their own.
- Bottom fade: 400px tall gradient to the panel-top color at 0.6 opacity, pointer-events none.
- Class scoping: every rule prefixed `.wpmn-sec-dark-features-panel`; keyframes prefixed `wpmn-dfp-`. No script.

## Surface and text pairing (hard rule)

- The entire panel is a dark surface (`--color-surface-secondary`): only invert text tokens (`--color-text-primary-invert`, `--color-text-secondary-invert`) or color-mixes of them inside. Never `--color-text-primary`/`--color-text-secondary` inside the panel.
- The orange accent of the reference maps to `--btn-bg-enable` (icons, spark) — decorative only, no text on it.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-dark-features-panel">` with scoped `<style>` and markup. No external dependencies, no images, no ids — icons are inline Hugeicons stroke.rounded SVG paths.
