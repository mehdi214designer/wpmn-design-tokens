# Build Spec: WPMN Section — Project Feature Bento

A dark project-management feature bento recreated from a screenshot and built natively on WPMN tokens (all artwork is token CSS/SVG — no images, no third-party logos). Two rows: row one holds Kanban Boards and VCS Automations; row two holds Collaborative Docs, Sprints, and Speed & Efficiency. Each card is a headline + description with a top-right circular arrow button and a mock at the bottom.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/project-feature-bento/section.html`

## Motion rules

- Cards `.pfb-reveal` fade up on first view (IntersectionObserver adds `.pfb-inview`; `wpmn-pfb-up` 600ms, staggered).
- VCS connectors: dashed SVG strokes flow via `wpmn-pfb-dash` (stroke-dashoffset, 1.4s linear infinite).
- Sprints: the active sprint bar `.pfb-sbar i` fills width `0 -> 62%` when `.pfb-inview`, 1s cubic-bezier(.22,1,.36,1).
- Cards brighten their border + lift `translateY(-3px)` on hover; arrow buttons fill on hover (120ms).
- prefers-reduced-motion: dash flow + bar fill off; reveals rendered in place.

## Layout rules (WPMN design guideline)

- Section `--color-surface-secondary`, 96px/32px padding (40px sides <1200, 64px/20px <768); container max-width 1200px. `.pfb-row1` is a 2-column grid, `.pfb-row2` a 3-column grid; both collapse to one column < 900px.
- Cards: `--pfb-card` (`color-mix(text-primary-invert 4%, surface-secondary)`), `--pfb-line` border, `--radius-lg`, 32px padding. Heading h4 bold; description body-base `--color-text-secondary-invert`; a 38px round `.pfb-arrow` pinned top-right. Derived props hoisted on the root for panels, tiles, hairlines, and muted/faint text so the audit reads every surface as dark.
- Mock kit (token CSS/SVG): kanban columns with story cards (left accent bar via `--pfb-bar` = warning/brand/error/success, one tilted), a `#` ticket badge (error mix) and an `In Progress` pill (brand mix); a VCS row of 76px node tiles with generic branch/merge/commit glyphs joined by an animated dashed connector SVG; a doc card with skeleton lines and floating comment tags (warning/brand/error mixes); sprint rows (the active one elevated with a `--color-success-primary` progress bar); and keyboard keycaps with a bottom-edge shadow.

## Surface and text pairing (hard rule)

- Everything sits on dark surfaces. Invert text tokens only: `--color-text-primary-invert` for headings/titles, `--color-text-secondary-invert` for descriptions/meta. Accents (`--btn-bg-enable`, `--color-warning/error/success-primary`) fill bars, pills, tags, and the progress bar; pill/tag backgrounds mix the accent over `--color-surface-secondary` so they read as dark with invert text. Never dark text on these dark surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-project-feature-bento">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; every mock is token CSS/SVG and no third-party brand logos are used (version-control marks are generic git glyphs). All sub-classes are `pfb-`-prefixed so host styles can't leak in.
