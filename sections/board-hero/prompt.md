# Build Spec: WPMN Section — Board Hero

Dark product hero imported from a reference build (FluentBoards). Centered column: pulsing brand badge, h1 with one brand-highlighted word, intro paragraph, primary + ghost-invert CTA pair. Below, a perspective-tilted browser window (traffic lights, locked URL bar) holding a kanban board mockup — three columns (To Do / In Progress / Done) of task cards with tag chips, progress bars, priority dots, due dates and avatar stacks — fading into the section at the bottom, with three floating stat tiles above it. Background: masked dot grid plus brand and secondary-accent ambient glows. The reference's GSAP timeline and nav were dropped: the nav is the NavBar component's job, and the timeline is rebuilt dependency-free.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/board-hero/section.html`

## Motion rules (timings preserved from the reference timeline)

- Entrance plays once at 15% viewport (IntersectionObserver): each `.anim` element transitions opacity/translateY with per-element custom properties — badge y10 .6s@0s, headline y20 .7s@.3s, sub y16 .6s@.6s, CTAs y14 .55s@.85s, board y32 .9s@1.15s — easing cubic-bezier(.215,.61,.355,1).
- Badge dot: `wpmn-bh-pulse` 2.4s infinite, ring from `color-mix(btn-bg-enable 50%, transparent)` to transparent at 6px.
- Stat tiles float forever: `wpmn-bh-float-a/b/c`, -6/-8/-5px, 4.8/5.2/4.4s, offset phases.
- Card hover: border brightens + translateY(-1px), 150ms. Primary CTA arrow nudges 3px.
- prefers-reduced-motion: all of it off, final state rendered.

## Layout rules (WPMN design guideline)

- Section: dark stage — bg `--color-surface-secondary`, all text via invert tokens. 96px top padding (64px <768px), inner column max 860px centered, board max 1060px; window bleeds off the section bottom with a gradient fade into the surface.
- Derived props on the root (`--bh-*`): panel/bar/card fills as 3/4/6% invert mixes over the surface, hairlines 5-14% invert mixes, brand tints via `color-mix` over `--btn-bg-enable`, secondary accent `--color-brand-surface-secondary` for the purple glow/tags/avatar.
- Badge: 999px chip, brand-tint fill + line, body-label semibold uppercase in `--btn-bg-enable`, 6px pulsing dot.
- Headline: h1 tokens bold, -0.03em; highlight word `--btn-bg-enable`. Sub: body-medium `--color-text-secondary-invert`, max 560px.
- Buttons: design-system anatomy — primary `--btn-bg-enable` + invert text + `--btn-bg-glow` inset + hovered/pressed, radius `--radius-xsm`, Hugeicons ArrowRight01 20px; secondary = ghost-invert (transparent, 1.5px `--color-text-primary-invert` border, fills invert with `--color-text-primary` on hover). One primary per section — the board's "+ Add Task" chip is mock-UI artwork (documented exception).
- Board mockup: window radius `--radius-sm` (top corners), traffic lights = error/warning/success tokens, URL bar with Hugeicons lock; columns radius `--radius-sm`, cards `--radius-xsm`; column dots, priority dots, tag chips, avatars and mini bars all from brand/success/warning/error tokens and invert mixes; progress bars `--btn-bg-enable`.
- Dot grid via masked radial-gradient of 12% invert; mask-image is alpha-only and exempt from token rules.
- Responsive: 768px (2 columns, team tile hidden, 4deg tilt), 560px (1 column, tiles hidden).
- Class scoping: every rule prefixed `.wpmn-sec-board-hero`; JS scoped via `document.currentScript.parentElement`; keyframes prefixed `wpmn-bh-`.

## Surface and text pairing (hard rule)

- The entire section is a dark surface: invert text tokens only. The primary button is a brand surface (invert text); the ghost button's hover fill is a light surface (switches to `--color-text-primary`). Never dark text or dark elements on the dark stage.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-board-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies, no GSAP, no images.
