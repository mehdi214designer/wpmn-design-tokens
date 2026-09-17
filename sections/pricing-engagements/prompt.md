# Build Spec: WPMN Section — Pricing Engagements

A warm pricing band on WPMN tokens: a left intro, three engagement cards (middle recommended), and a real photo bleeding off the right edge. Orange accent maps to `--color-warning-primary`.

The reference implementation is the source of truth:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/pricing-engagements/section.html`

## Interaction rules (keep exactly as reference)
- IntersectionObserver (0.12) adds `.is-inview`; the intro and three cards fade up with `wpmn-pe-up` (600ms), staggered 80/160ms. prefers-reduced-motion renders in place.

## Layout rules (WPMN design guideline)
- Section `color-mix(--color-warning-primary 5%, surface-primary)`, 96/32 padding. `.pe-wrap` max-width 1280px, columns (.82fr / 2.2fr / .5fr): intro, cards, bleed photo.
- Cards: surface-primary, hairline, `--radius-lg`, 28px padding; an icon tile (`--radius-md`), h5 title, body-small desc, a hairline divider, a feature list with warning dots, and a "Learn more" button at `--radius-xsm`. The `.pe-reco` card gets a `--color-warning-primary` border, a warning glow, a Recommended pill badge, a warning icon tile, and a solid warning button; the others use ghost buttons.
- The right `.pe-vis` photo has a negative right margin (bleeds past the section padding), `--radius-lg` on the left corners, cover, and a warning-tint overlay; it hides under 1080px.

## Surface and text pairing (hard rule)
- Light warm surface: headings/features `--color-text-primary`, copy `--color-text-secondary`, accents `--color-warning-primary`. Solid buttons and the badge use invert text. Never light text on the light cards.

## Required token CSS
Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format
A single self-contained `<section class="wpmn-sec-pricing-engagements">` with scoped `<style>`, markup, and a scoped IIFE. Photo is a verified Unsplash image; orange is the warning token (content swapped on use). Sub-classes `pe-`-prefixed, keyframes `wpmn-pe-`-prefixed.
