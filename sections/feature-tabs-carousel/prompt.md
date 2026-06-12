# Build Spec: WPMN Section — Feature Tabs Carousel

Auto-advancing tabbed feature panel imported from a reference build. A 560px panel sits on a drifting 4-layer brand gradient; a white notch with inverse rounded corners hosts numbered pills whose labels expand when active; screenshots crossfade and rise on the right and bleed past the panel. Interactions preserved verbatim; all visuals tokenized; the reference's background video and hotlinked assets are replaced by the tokenized gradient and verified images.

The reference implementation is the source of truth. Fetch it and reproduce structure, geometry, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/feature-tabs-carousel/section.html`

## Interaction rules (keep exactly as reference)

- Auto-advance every 6000ms; hovering the panel pauses; leaving resumes; a manual pill click switches immediately and restarts the timer.
- IntersectionObserver at threshold 0.3 starts/stops cycling with visibility.
- Active pill: label animates `max-width 0 -> 180px`, opacity 0 -> 1, padding-left 0 -> 20px, 400ms ease; pill text color crossfades 400ms.
- Shots: opacity 0 -> 1 + translateY(12px) -> 0, 700ms ease with 50ms delay.
- Eyebrow text swaps behind a 200ms opacity fade (`is-switching`).
- Background drifts via `wpmn-ftc-bg-drift` 16s ease-in-out infinite alternate over background-size 160%.
- prefers-reduced-motion: drift, transitions, and auto-advance disabled.

## Layout rules (WPMN design guideline)

- Section 96px/20px padding; panel `min(1120px, 100%)` wide, 560px tall, radius `--radius-md`, overflow clip.
- Gradient (derived tokens): three radials + one linear built from `color-mix(btn-bg-enable 30/14/22%, surface-primary)` fading to transparent — re-skins per brand.
- Notch: `--color-surface-primary` with 16px inverse corners drawn by radial-gradients; pills `color-mix(text-primary 4%, surface-primary)`, radius `--radius-xsm`, body-base; inactive `--color-text-secondary`, active `--color-text-primary`.
- Slide: max-width 516px, padding 80/40/40; heading h3 semibold; copy body-base; eyebrow + feature rows body-base with 24px inline-SVG currentColor icons.
- Frosted CTA: `color-mix(surface-primary 24%, transparent)` bg, inset glow `color-mix(surface-primary 80%, transparent)`, hover to 40%, radius `--radius-xsm`, btn-md type.
- Shots: absolute at left 49.6% / top 80px, 1100px wide, radius `--radius-sm`, 1px stroke at text-primary 6%, `--shadow-soft-500`.
- Class scoping: every rule prefixed `.wpmn-sec-feature-tabs-carousel`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- The panel gradient is a light brand tint: all text uses dark tokens (--color-text-primary / secondary). Never invert text on it.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-feature-tabs-carousel">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies, no video.
