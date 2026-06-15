# Build Spec: WPMN Section — Floating Stats Hero

A dark, rounded hero panel recreated from a reference design and fully tokenized. Inside a `--color-surface-secondary` panel, a left photo collage pairs a tall main photo with three floating elements (a white "12+ Years" stat card, a smaller overlapping portrait, and a translucent glass "experience" card with an icon tile). The right column stacks an outline badge, an oversized heading, an intro paragraph, a large review counter split by a vertical divider, and a primary CTA with a circular-arrow icon.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/floating-stats-hero/section.html`

## Motion rules

- Right-column items carry `.reveal` (opacity 0 + 16px translateY) and animate to rest once the section reaches 20% viewport (IntersectionObserver), 600ms cubic-bezier(.22,1,.36,1), staggered 90ms each.
- Collage items carry `.pop` and run a pop keyframe (opacity + translateY 14px + scale .96 to 1), 600ms, with per-element delays 0 / 160 / 240 / 320ms set from a `--d` custom property.
- card-stat, card-exp and portrait lift `translateY(-4px)` on hover, 200ms.
- CTA: design-system primary states (enable/hovered/pressed) at 120ms; focus-visible 3px `--btn-bg-focused` ring.
- prefers-reduced-motion: reveals and pops render in their final state, hovers and transitions off.

## Layout rules (WPMN design guideline)

- Section 96px/32px padding (40px sides <1200px, 64px/20px <768px); the panel is `max-width:1200px`, `--color-surface-secondary`, `--radius-lg`, `--shadow-soft-500`, 64px inner padding (48px <1200, 32px <768).
- Panel grid `1fr 1.05fr`, gap 64px, vertically centered.
- Media: relative, min-height 540px. Main photo absolute `inset:0 22% 0 0`, `--radius-md`, object-fit cover. Portrait absolute top-right, 188x152, `--radius-md`, `--shadow-soft-500`, 1px invert ring. White stat card absolute (`--color-surface-primary`, `--radius-md`, `--shadow-soft-500`); its number is h4 bold `--color-text-primary`. Glass card absolute: background `color-mix(--color-text-primary-invert 14%, transparent)` with a matching 22% border and 10px backdrop blur, `--radius-lg`; icon tile is a `--color-surface-primary` square (`--radius-md`) holding a 28px `--btn-bg-enable` stroke icon; label h5 semibold `--color-text-primary-invert`.
- Content: badge with 1px invert border, radius 999px, body-label medium, text in `--btn-bg-enable`. Heading h1 bold, -0.02em tracking, `--color-text-primary-invert`. Lead body-medium `--color-text-secondary-invert`, max 46ch. Stats row: h2 bold counter `--color-text-primary-invert`, a 1px vertical divider at `color-mix(--color-text-primary-invert 26%, transparent)`, caption body-base semibold `--color-text-secondary-invert`. CTA: primary button, radius `--radius-xsm` (never a pill), `--btn-bg-enable` bg, invert text, `--btn-bg-glow` inset, 22px circular-arrow SVG.
- At 900px the panel goes single-column and the media becomes a stacked flex column (cards reset to static); 768px tightens padding.
- Class scoping: every rule prefixed `.wpmn-sec-floating-stats-hero`; keyframes prefixed `wpmn-fsh-`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Light surfaces (`--color-surface-primary`: page, white stat card, icon tile): dark text tokens only.
- Dark surface (`--color-surface-secondary` panel) and the translucent glass card over it: invert text tokens only. Never dark on dark, never light on light. The accent badge and icon use `--btn-bg-enable` (decorative/accent, follows the active brand).

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-floating-stats-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; the only assets are two images.
