# Build Spec: WPMN Section — Agency Hero

Agency-style hero recreated from a reference design and fully tokenized. An outline "About Us" badge sits above a split top row: an oversized two-line h1 on the left, intro paragraph + pill CTA on the right. Below, a media row pairs a large team photo (with a spinning circular CONTACT US badge overlapping its left edge) with a stacked right column: a soft-grey growth card (heading, year + dark percentage pill, animated rounded bar chart) and a dark stat card (dash-prefixed label, heading, three brand bars rising from the bottom edge).

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/agency-hero/section.html`

## Motion rules

- Bars: `scaleY(0) -> 1` from the baseline once the section reaches 25% viewport (IntersectionObserver), 700ms cubic-bezier(.22,1,.36,1); growth bars stagger 45ms each, dark-card bars 90ms each with a 200ms head start.
- Circular badge: SVG textPath on a 46px-radius circle, container rotates 18s linear infinite; static arrow (28px inline SVG) centered above it.
- CTA: design-system primary states (enable/hovered/pressed) at 120ms.
- prefers-reduced-motion: spin disabled, bars render at full height.

## Layout rules (WPMN design guideline)

- Section 96px/32px padding (40px sides <1200px, 64px/20px <768px); container max-width 1200px.
- Badge: 1px border at `color-mix(text-primary 12%, transparent)`, radius 999px, body-label medium, `--color-text-secondary`.
- Top row: grid `1.25fr 1fr`, gap 48px; h1 tokens bold with -0.02em tracking; aside max-width 420px, body-medium secondary text, then a primary button (radius `--radius-xsm`) (`--btn-bg-enable`, invert text, `--btn-bg-glow` inset).
- Media row: grid `1.75fr 1fr`, gap 24px. Photo: radius `--radius-md`, min-height 480px, object-fit cover. Spin badge: 128px circle fully inside the photo (left/bottom 24px so the rounded clip never cuts it), `--color-surface-primary` bg, `--shadow-soft-500`, text fill `var(--color-text-primary)`.
- Growth card: bg `color-mix(text-primary 3%, surface-primary)`, radius `--radius-md`, padding 32px; h4 heading; year body-base secondary; pill `--color-surface-secondary` bg + invert text; 14 pill-shaped bars in `--btn-bg-enable`, heights via per-bar `--h` custom property.
- Dark card: bg `--color-surface-secondary`; label body-small `--color-text-secondary-invert` with a 28px dash; heading h5 `--color-text-primary-invert` (element-owned rules: `.dark-card p`, `.dark-card h3`); three bottom-anchored bars tinted by color-mix steps of `--btn-bg-enable` over the dark surface.
- Stacks single-column at 900px.
- Class scoping: every rule prefixed `.wpmn-sec-agency-hero`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Light surfaces (--color-surface-primary, soft grey card): dark text tokens only.
- Dark surfaces (--color-surface-secondary: dark card, percentage pill): invert text tokens only. Never dark on dark, never light on light.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-agency-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; the only asset is one image.
