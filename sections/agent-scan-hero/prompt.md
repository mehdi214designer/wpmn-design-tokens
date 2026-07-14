# Build Spec: WPMN Section — Agent Scan Hero

A contained product hero recreated from an HTML reference and fully tokenized. A centered column (spinning sync badge, h2 title, body-medium sub, one primary CTA) sits on a faint dotted grid inside a rounded stage. A brand-colored scanline sweeps the grid top to bottom on a loop, a field of floating integration tiles surrounds the copy, and four of those tiles light up with a brand ring and a dark tooltip in a repeating sequence.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/agent-scan-hero/section.html`

## Interaction rules (keep exactly as reference)

- Scan sweep, 3s linear infinite (verbatim): `.scangrid` is a brand-colored grid masked by a top-to-bottom alpha gradient and `.scanline` is a 2px brand bar; both travel `translateY(-180px..600px)`, full opacity to 35%, fading 50-60% of the cycle.
- Badge icon: `wpmn-ash-spin` 360deg every 1.4s linear.
- Four tiles ring + tooltip on a shared 12s timeline: keep the exact keyframe percentages for `ring1/tip1`, `ring2/tip2`, `ring3/tip3`, `ring4/tip4` (they fire in visual, not numeric, order).
- CTA hover: background `--btn-bg-enable` -> `--btn-bg-hovered`, chevron `translateX(6px)`, both .18s.
- A `ResizeObserver` on the stage hides `.field` below 680px so floating tiles never cover the copy.
- Re-scope all queries to the section root via `document.currentScript.parentElement`.
- prefers-reduced-motion: every animation and transition off; the hero reads as a static badge + title + sub + CTA.

## Layout rules (WPMN design guideline)

- Section padding 96px/32px desktop, 64px/20px mobile. Inner `.stage` is `max-width:1200px`, `min-height:600px` (480px mobile), `--radius-lg`, overflow hidden, background `color-mix(--color-text-primary 3%, --color-surface-primary)`.
- Grid + scan colors are hoisted derived props on the root: `--ash-grid` (10% text-primary hairline), `--ash-ring` and `--ash-scan` = `--btn-bg-enable`.
- Title: h2 tokens, bold, -0.02em, max 14ch, 12px below to the body-medium sub (`--color-text-secondary`, max 46ch), then 24px to the CTA.
- Floating tiles: 70px, `--radius-md`, `--color-surface-primary` bg, `--shadow-soft-300`, 32px inline icons in `--color-text-primary`, positioned by percentage.
- Badge: 80px, `--radius-md`, `--color-surface-secondary` bg, invert icon.
- CTA is the single primary button: `--btn-bg-enable` bg, invert text, inset glow `var(--btn-bg-glow, rgba(255,255,255,0.3))`, `--radius-xsm`, btn-sm type. No pill, no underline.

## Surface and text pairing (hard rule)

- Light stage surface: title `--color-text-primary`, sub `--color-text-secondary`, tile icons `--color-text-primary`.
- Dark elements (badge, tooltips) use `--color-surface-secondary` with `--color-text-primary-invert` content. The tooltip arrow color matches the bubble surface. Never place dark text on the dark badge/tooltip or light text on the light stage.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-agent-scan-hero" data-brand="...">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies: the third-party integration logos are replaced with inline stroke icons, all colors are tokens, every keyframe is prefixed `wpmn-ash-`.
