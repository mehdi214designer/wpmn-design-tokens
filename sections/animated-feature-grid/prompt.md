# Build Spec: WPMN Section — Animated Feature Grid

2x2 illustrated feature cards imported from a reference build, each topped with a living micro-scene: (1) a signature squiggle + pen over a fading binary canvas, (2) an analytics chart whose active column cycles with bouncing token-colored bars, (3) a macbook whose lid opens before app icons fly in and wobble forever, (4) drifting latency labels behind a frosted panel and a live speedometer. All motion is preserved verbatim; all visuals are tokenized and every asset is inline (no external images).

The reference implementation is the source of truth. Fetch it and reproduce structure, geometry, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/animated-feature-grid/section.html`

## Motion rules (keep exactly as reference)

- Keyframes (prefixed `wpmn-afg-`): bar-active bounce via `calc((3 - var(--bar-index)) * -4px)`; badge arrow bounce 1.5s infinite; macbook lid `rotate3d(-1,0,0,90.1deg) -> 0` 1.5s cubic-bezier(.76,0,.24,1) 1s delay; app icons fly in 1.4s springy cubic-bezier(.87,-.41,.19,1.44) at 2/2.2/2.1s with blur(10px)->0; icons wobble 20s linear infinite (staggered negative delays); perf labels drift 7s with per-span inline delays/durations.
- Chart JS: active column cycles every 2s; bars restart their bounce via `animation:none; void offsetWidth`; indicator slides `translateX(63*i)` and resizes to `data-h + 16`, 450ms cubic-bezier(.6,.6,0,1).
- Speedometer JS: needle retargets to 55-110deg every 1.2s; shade always = needle + 117.5deg; both rotate with 400ms cubic-bezier(.6,.6,0,1).
- Binary canvas: 14x8 grid of seeded 0/1 glyphs (LCG 16807), drawn in `--color-text-primary` via globalAlpha 0.25-0.75, masked to fade at 40%.
- prefers-reduced-motion: all keyframes and JS intervals disabled.

## Layout rules (WPMN design guideline)

- Section 96px/32px padding; grid max-width 960px, 2 cols, 24px gap; cards 421px, bg `color-mix(text-primary 4%, transparent)`, radius `--radius-lg`.
- Text block: title h6 semibold, hairline divider at text-primary 6%, description body-base secondary, centered, illustration zone is the top 240px.
- Micro-scene surfaces are `--color-surface-primary` panels with `--shadow-soft-300`; hairlines/dots via 6%/12% text-primary mixes; accents: chart bars `--color-warning-primary` / `--btn-bg-enable` / `--color-surface-secondary`, badge + seal + meter shade `--btn-bg-enable`, macbook screen a brand-tinted gradient.
- All icons inline SVG via currentColor; the meter is pure CSS (border ring, conic-gradient shade, needle div) — no images anywhere.
- Class scoping: every rule prefixed `.wpmn-sec-animated-feature-grid`; JS scoped via `document.currentScript.parentElement`.

## Surface and text pairing (hard rule)

- Light surfaces (--color-surface-primary, soft grey fills): dark text tokens only. Dark/brand fills (chart bar 3, meter needle) carry no text. Never dark text on dark, never light text on light.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-animated-feature-grid">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies, no images.
