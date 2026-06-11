# Build Spec: WPMN Section — Pricing Toggle

Three-plan pricing imported from a reference build: sliding monthly/yearly toggle, light plan cards with floating name headers, a dark featured middle card, dashed SVG dividers, icon feature lists, and a full-width enterprise row. Interactions are preserved exactly from the reference; all visuals are tokenized.

The reference implementation is the source of truth. Fetch it and reproduce structure, geometry, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/pricing-toggle/section.html`

## Interaction rules (keep exactly as reference)

- Toggle: white pill (width 50% - 3px) slides translateX(0) <-> translateX(160px), 300ms cubic-bezier(.4,0,.2,1). Buttons (min-width 160px) crossfade color/weight 300ms; the -20% badge flips from grey to brand tint on the active button.
- Prices swap textContent from `data-monthly` / `data-yearly` attributes on `.price`.
- Buttons transition all 200ms cubic-bezier(.6,.6,0,1); `:active` shortens to 50ms.
- prefers-reduced-motion: toggle and button transitions disabled.

## Layout rules (WPMN design guideline)

- Section: 96px/32px padding; cards grid `repeat(3, 360px)` gap 24px centered (max-width 1200px); enterprise row max-width 1128px, 24px top margin.
- Card shells: 4px padding, radius `--radius-lg`, bg `color-mix(in srgb, var(--color-text-primary) 4%, transparent)`. Name headers: bg `--color-surface-primary`, radius `calc(var(--radius-lg) - 4px)`, `--shadow-soft-300`.
- Dark featured card: shell `--color-surface-secondary`; name header `color-mix(text-primary-invert 8%, transparent)` with invert inset glows; all text via `--color-text-primary-invert` / `--color-text-secondary-invert`; dashed divider at invert 12%.
- Type: title h2 semibold centered; plan names h5 semibold; prices h3 semibold; descriptions/features body-base; mono labels and kicker body-label uppercase medium; per-period body-base secondary.
- Buttons (design-system): primary = `--btn-bg-enable` + invert text + inner glow `var(--btn-bg-glow)`, hover `--btn-bg-hovered`, active `--btn-bg-pressed`; light = `--color-surface-primary` + `--shadow-soft-300` + 1px stroke ring, hover lifts to `--shadow-soft-500`; dark = `--color-surface-secondary` + invert text, hover lightens via color-mix. All radius `--radius-xsm`.
- Feature icons: inline SVGs (geometry verbatim), `currentColor`, colored `color-mix(text-primary 36%, transparent)` on light / invert 45% on dark.
- Dashed dividers: SVG line, stroke-dasharray "0.01 6", round caps, colored via currentColor token mixes.
- Class scoping: every rule prefixed `.wpmn-sec-pricing-toggle`; JS scoped via `document.currentScript.parentElement`; no ids.

## Surface and text pairing (hard rule)

- Light surfaces (--color-surface-primary, soft grey fills): dark text tokens only. Never white or invert text on light surfaces.
- Dark surfaces (--color-surface-secondary): invert text tokens only. Light elements (white name header, light buttons) on dark are correct; dark text on dark is always wrong.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-pricing-toggle">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies, no libraries.
