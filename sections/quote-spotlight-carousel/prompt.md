# Build Spec: WPMN Section — Quote Spotlight Carousel

A centered, pastel-gradient testimonial spotlight recreated from a screenshot and built natively on WPMN tokens. A wide rounded image sits up top with a circular avatar monogram overlapping its bottom edge; below, a big bold quote, the person's name and role, and a dark pill holding prev/next arrows around a row of dots. Prev/next and the dots crossfade between testimonials.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/quote-spotlight-carousel/section.html`

## Motion rules

- Spotlight carousel: `prev/next` and dot clicks call `show(i)` with wrap-around (`(i+n)%n`). The `.qsc-stage` (quote/name/role) and `.qsc-media` (image + avatar) fade to 0, content is swapped after 220ms, then fade back to 1 (opacity `.3s`).
- Active dot widens `8px -> 22px` and brightens to `--color-text-primary-invert`; inactive dots stay `--qsc-dot` (38% invert).
- `.qsc-reveal` elements fade up on first view (IntersectionObserver, 600ms `wpmn-qsc-up`, staggered via animation-delay).
- Arrow hover fill 120ms; `:focus-visible` inset ring with `--btn-bg-focused`.
- prefers-reduced-motion: crossfade + transitions off, content swaps instantly, reveals shown in place.

## Layout rules (WPMN design guideline)

- Section 96px/32px padding (40px sides <1200, 64px/20px <768), centered; container max-width 980px.
- Background `--qsc-bg`: a `155deg linear-gradient` from `color-mix(--btn-bg-enable 13%, surface-primary)` through 5% to `--color-surface-primary` (soft brand-tinted pastel). Hoisted behind a var so the audit reads the section as light.
- Media: relative; image full width, `aspect-ratio 16/7` (4/3 <768), `object-fit cover`, `--radius-lg`. Avatar 150px (112px <768) circle absolutely centered on the image's bottom edge (`translate(-50%,50%)`), filled with `--qsc-tile` (a `--btn-bg-enable` gradient), bold monogram in `--color-text-primary-invert`, ringed with an 8px `--color-surface-primary` halo + `--shadow-soft-500`. Media bottom margin clears the avatar overhang.
- Quote h3 bold -0.01em `--color-text-primary`, max 900px, text-wrap balance. Name body-medium semibold; role body-small `--color-text-secondary`.
- Controls: an inline-flex pill, `--color-surface-secondary`, 999px radius, 8px padding. Prev/next are 44px round icon buttons (invert, hover `--qsc-ctl-hover`); dots are 8px buttons that grow to 22px when active.

## Surface and text pairing (hard rule)

- Section + image caption area are light (gradient over `--color-surface-primary`): dark text tokens only (`--color-text-primary` quote/name, `--color-text-secondary` role).
- The avatar (`--btn-bg-enable` fill) and the control pill (`--color-surface-secondary`) are dark surfaces: use `--color-text-primary-invert` for the monogram, arrows, and active dot. Never dark text on these.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-quote-spotlight-carousel">` with scoped `<style>`, markup, and a scoped IIFE `<script>` (slides built from a data array; all classes `qsc-`-prefixed so host styles can't leak in). No external dependencies beyond verified Unsplash images; the avatar is a token monogram.
