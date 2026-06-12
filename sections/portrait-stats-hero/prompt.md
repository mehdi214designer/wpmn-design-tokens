# Build Spec: WPMN Section — Portrait Stats Hero

Split hero recreated from a reference design and fully tokenized. Left: outline "Bold Brand" badge, two-line display heading, intro paragraph, primary "Let's Talk" CTA with a circled-arrow icon beside a light "Our Work" CTA, then a "Trusted by the Best" label over a row of muted text logos. Right: a 2x2 visual grid — two soft stat tiles on top (count-up 80K New Users with a green +120% delta; 4.9 rating with a warning-color star and "10K+ Happy Clients"), and a full-width portrait photo card below with a radial brand glow behind the subject.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/portrait-stats-hero/section.html`

## Motion rules

- Stat tiles: opacity 0 / translateY(16px) -> visible, 600ms cubic-bezier(.22,1,.36,1), 120ms per-tile stagger, triggered once at 30% viewport (IntersectionObserver).
- Count-up: targets from `data-count` (+ optional `data-decimals`, `data-suffix`), 900ms, ease `1-(1-p)^3`, runs once on reveal.
- Buttons: design-system states — primary enable/hovered/pressed at 120ms with the `--btn-bg-glow` inset; light button ring + `--shadow-soft-300` lift on hover. Radius `--radius-xsm`, never pill.
- prefers-reduced-motion: tiles render in place, numbers set instantly, transitions off.

## Layout rules (WPMN design guideline)

- Section 96px/32px padding (40px sides <1200px, 64px/20px <768px); container 1200px; grid `1.05fr 1fr`, gap 64px, single column at 900px.
- Badge: 1px `color-mix(text-primary 12%, transparent)` ring, 999px radius (chip, not a button), body-label medium secondary.
- Heading h1 bold, -0.02em; intro body-medium `--color-text-secondary` max-width 480px.
- Trusted label h6 semibold; logos are bold h6 text marks at `color-mix(text-primary 32%, transparent)`, 36px gaps.
- Visual grid: stat tiles bg `color-mix(text-primary 3%, surface-primary)`, radius `--radius-md`, centered; number h2 bold; delta `--color-success-primary` with triangle glyph; star `--color-warning-primary`. Photo card spans both columns, radius `--radius-md`, min-height 420px, with a 520px radial glow of `color-mix(btn-bg-enable 10%, surface-primary)` behind the subject; one verified Unsplash portrait, object-position top.
- Class scoping: every rule prefixed `.wpmn-sec-portrait-stats-hero`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Everything here is a light surface: dark text tokens only (--color-text-primary / secondary). The only invert text is on the primary button (brand surface). Never light text on light surfaces, never dark on dark.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-portrait-stats-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; the only asset is one image.
