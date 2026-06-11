# Build Spec: WPMN Section — Sticky Feature Switcher

Pinned two-panel scroll story imported from a reference build. Left text panel crossfades 7 feature slides (per-word staggered fade) above a lerped tab strip with width-clipped fills; right media panel wipes image layers upward as the user scrolls an 810vh track. Interactions are preserved exactly from the reference; all visuals are tokenized.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/sticky-feature-switcher/section.html`

## Interaction rules (keep exactly as reference)

- Outer track is 810vh tall; inner pin wrapper is `position: sticky; top: 0; height: 100vh`.
- Scroll progress `u = clamp(-rect.top / (trackH - innerHeight), 0, 1) * (N-1)` drives all states; updated on both a passive scroll listener and a permanent rAF loop.
- Media layers (z-index 1..7) wipe up: `p = clamp((u-(k-0.45))/0.4, 0, 1)`, ease `e = 1-(1-p)^3`, `translateY((1-e)*100%)`. Layer 0 is static.
- Slides crossfade with fadeIn/fadeOut windows; each body word gets a seeded random delay (LCG 16807) and fades in across a 0.4 progress window.
- Tab strip: active tab index = `round(u)`; strip translateX lerps `x += (target-x)*0.12`; each tab has an absolutely positioned dark copy clipped by animated width (fillIn * fillOut * 100%).
- Below 900px: track unpins, media panel hidden, slides stack vertically.
- CTA hover transitions background 400ms cubic-bezier(0,0,0.2,1).

## Layout rules (WPMN design guideline)

- Fluid unit `--sfs-u: 0.69444vw` retained from reference for panel spacing only; all colors, type, radii via tokens.
- Left panel bg: `color-mix(in srgb, var(--color-text-primary) 4%, var(--color-surface-primary))` with a token-based radial-gradient dot texture at 10% text-primary. Radius `--radius-lg`.
- Slide title: `--font-size-h2`, weight semibold. Body: body-base size, `--color-text-secondary`. Tabs: body-label, uppercase, medium; inactive at 55% text-secondary via color-mix, fill copy `--color-text-primary`.
- CTA: full-width primary button — `--btn-bg-enable`, hover `--btn-bg-hovered`, text `--color-text-primary-invert`, radius `--radius-xsm`, btn-md type, uppercase, inset highlight shadow.
- Media panel: radius `--radius-lg`, bg `--color-surface-secondary`, layers are object-fit cover images.
- Class scoping: every rule prefixed with `.wpmn-sec-sticky-feature-switcher`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Light surfaces (--color-surface-primary, soft grey fills): headings use --color-text-primary, body uses --color-text-secondary. Never white or invert text on light surfaces.
- Dark surfaces (--color-surface-secondary) and brand-color surfaces: use --color-text-primary-invert / --color-text-secondary-invert. Never dark text or dark elements on these surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` (primitives -> brand-primitives -> tokens -> typography) before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-sticky-feature-switcher">` containing a scoped `<style>` block, the markup, and a scoped IIFE `<script>`. No external dependencies, no libraries.
