# Build Spec: WPMN Section — Ecommerce Hero

Commerce hero recreated from a reference design and fully tokenized. Left: a brand-dash uppercase eyebrow, a display heading whose last words carry a hand-drawn SVG underline in the brand color, an intro paragraph, and a primary "Create Your Store" CTA with a circled diagonal arrow. Right: a floating dashboard collage over a tilted (10deg) soft-grey stage — a product card (photo, title, size chips with a dark selected chip, price + mini Add-to-Cart), a "Today's Sale" stat card and a "Total Orders" stat card (icon dot, count-up value, dark delta chip + caption), a brand-colored gauge card (conic semicircle with error/warning segments, "total Sale" count-up), and an "In Stock" tag card with a thumbnail. Below, a full-width soft band of five muted Logoipsum text marks.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/ecommerce-hero/section.html`

## Motion rules

- Collage cards: opacity 0 / translateY(20px) -> visible, 600ms cubic-bezier(.22,1,.36,1), 110ms per-card stagger, once at 25% viewport (IntersectionObserver).
- Count-ups: targets from `data-count` (+ `data-decimals`, `data-prefix`, `data-group` for thousands separators), 1s, ease `1-(1-p)^3`.
- The sale and orders cards float forever: `wpmn-ech-float` translateY 0 -> -8px -> 0, 6s and 7s ease-in-out with a 1s phase offset.
- CTA: design-system primary states (enable/hovered/pressed, `--btn-bg-glow` inset), radius `--radius-xsm`, never pill.
- prefers-reduced-motion: reveals and floats disabled, numbers set instantly.

## Layout rules (WPMN design guideline)

- Section 96px top padding, container 1200px, grid `1fr 1.1fr` gap 48px; single column at 980px (collage capped 560px), 64px/20px at 640px.
- Eyebrow: 36x3px brand dash + body-label semibold uppercase in `--btn-bg-enable`.
- Heading h1 bold; underline = absolutely positioned SVG path, stroke `currentColor`, color `--btn-bg-enable`, 5px round cap.
- Stage: `color-mix(text-primary 4%, surface-primary)`, radius `--radius-lg`, rotate(10deg).
- White cards: `--color-surface-primary`, radius `--radius-md`, `--shadow-soft-500`. Delta chips: `--color-surface-secondary` bg + invert text (pill chips allowed). Size chips: 1px `color-mix(text-primary 8%)` ring, selected chip dark with invert text. Mini Add-to-Cart: brand bg + invert text + glow, radius `--radius-xsm`.
- Gauge card: bg `--btn-bg-enable`; its texts use `--color-text-primary-invert` via element rules owned by `.gauge-card`; gauge = conic-gradient (invert-white sweep, `--color-error-primary` and `--color-warning-primary` segments) masked to a semicircle by an inner brand circle.
- In-Stock chip: `color-mix(warning-primary 22%, surface-primary)` with dark text. Logo band: soft bg, five muted (`color-mix(text-primary 35%, transparent)`) h6-bold marks with inline SVG glyphs.
- Images: two verified Unsplash shots (sneaker product, shirt thumbnail). Class scoping: every rule prefixed `.wpmn-sec-ecommerce-hero`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Light surfaces (white cards, soft stage, logo band): dark text tokens only.
- Brand/dark surfaces (gauge card, delta chips, selected size chip, CTA): invert text tokens only. Never dark on dark, never light on light.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-ecommerce-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies beyond the two images.
