# Build Spec: WPMN Section — Motion Format Bento

A dark 3-column motion feature set recreated from a screenshot and built natively on WPMN tokens (all artwork is token CSS/SVG — no images). Left: a card with floating gradient app-icon tiles above a headline + description. Center (hero): a filled brand-purple card with a small kicker, a beating gradient heart inside concentric orbit rings (a dot circling), and a headline + description. Right: a column of two folder-notch cards — a dark card with browser-icon tiles, and an accent card carrying a "Lottie" wordmark.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/motion-format-bento/section.html`

## Motion rules

- Cards `.mfb-reveal` fade up on first view (IntersectionObserver adds `.mfb-inview`; `wpmn-mfb-up` 600ms, staggered 80ms via animation-delay).
- Left app tiles: `wpmn-mfb-float` translateY +/-8px, 5.5s ease-in-out infinite, per-tile delay (each keeps its rotation via a `--mfb-rot` var).
- Center heart: `wpmn-mfb-beat` 2.4s (an off-beat scale pulse) with a warning-colored glow; a dot orbits the rings via `wpmn-mfb-spin` 14s linear infinite.
- Cards lift `translateY(-3px)` on hover.
- prefers-reduced-motion: float/beat/orbit off; reveals rendered in place.

## Layout rules (WPMN design guideline)

- Section `--color-surface-secondary`, 96px/32px padding (40px sides <1200, 64px/20px <768); container max-width 1200px. Grid `1fr 1.12fr 1fr`, 24px gap, `align-items:stretch`; the right column is a flex column of two `flex:1` cards; collapses to one column < 900px.
- Cards: `--radius-lg`, 32px padding, `overflow:hidden`. Dark cards use `--mfb-card` (`color-mix(text-primary-invert 4%, surface-secondary)`) + `--mfb-line` border; the hero card is filled `--btn-bg-enable`. Headings h4 bold; descriptions body-medium.
- Right cards use an inline `<svg class="mfb-shape" preserveAspectRatio="none">` behind the content (`z-index:-1`) whose fill path is a folder-notch silhouette (raised top-right tab) filled `--mfb-card` (browser card) or `--color-success-primary` (accent card); the card box has `border-radius:0` so the SVG defines the shape and the notch reveals the dark section.
- Decorative kit: 64px app tiles with `--mfb-t-warn`/`--mfb-t-succ`/`--mfb-t-brand` gradients (accent mixed over surface-secondary); orbit rings `--mfb-ring`; the heart is a gradient (`--color-warning-primary` -> mix toward `--color-error-primary`); 52px browser tiles `--mfb-tile`; a bold `Lottie` wordmark (h3).

## Surface and text pairing (hard rule)

- Every card is a dark or accent surface. Invert text tokens only: `--color-text-primary-invert` for headings/wordmark, `--color-text-secondary-invert` for descriptions/kicker. Accents (`--btn-bg-enable`, `--color-warning-primary`, `--color-error-primary`, `--color-success-primary`) fill the hero card, heart, tiles, and accent card. Never dark text on these dark/accent surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-motion-format-bento">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; tiles, heart, browser icons, notch shapes, and wordmark are token CSS/SVG. All sub-classes are `mfb-`-prefixed so host styles can't leak in.
