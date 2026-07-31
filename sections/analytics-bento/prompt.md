# Build Spec: WPMN Section — Analytics Bento

A dark analytics dashboard bento recreated from a screenshot and built natively on WPMN tokens (all artwork is token CSS/SVG — no images). Left column: a Projects Stats card (table of icon rows with name/owner, budget, and a progress badge) above a Performance Analytic card (up/down bar chart split by a center baseline, two tooltip pills, a Daily selector chip). Right column: a tall Integration Analytic card with an area chart (peak dot + tooltip) over a list of platform integrations, each with an icon, name, description, and progress badge.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/analytics-bento/section.html`

## Motion rules

- Cards `.adb-reveal` fade up on first view (IntersectionObserver adds `.adb-inview`; `wpmn-adb-up` 600ms, staggered).
- Performance chart: `.adb-up` bars scaleY(0->1) from `transform-origin:bottom` and `.adb-dn` bars from `transform-origin:top`, 700ms cubic-bezier(.22,1,.36,1), per-bar `transition-delay`; heights via a `--h` percentage against a center baseline.
- Integration area chart: the `.adb-aline` path draws in with `stroke-dashoffset` (`wpmn-adb-draw`, 1.4s) over a `linearGradient` fill; a dot + tooltip mark the peak.
- Cards brighten their border on hover.
- prefers-reduced-motion: bar grow + line draw off; reveals rendered in place.

## Layout rules (WPMN design guideline)

- Section `--color-surface-secondary`, 96px/32px padding (40px sides <1200, 64px/20px <768); container max-width 1200px. Grid `1fr 1.02fr`, 24px gap, one column < 900px. Left is a flex column of two cards; right is one tall card.
- Cards `--adb-card` (`color-mix(text-primary-invert 4%, surface-secondary)`), `--adb-line` border, `--radius-lg`, 32px padding. Derived props hoisted on the root for panels, hairlines, muted/faint text, chart track, badge/tile/area tints so the audit reads every surface as dark.
- Progress badge `.adb-pct`: `--adb-badge` pill (brand mix over surface-secondary) with an up-right arrow in `--btn-bg-enable` and invert text.
- Projects table: uppercase body-label header, rows split by hairlines, 44px brand-gradient icon tiles, name body-base semibold + owner body-small secondary, budget body-base.
- Performance: center `.adb-baseline`, 12 columns each with a faint track; purple (`--btn-bg-enable`) up bars, orange (`--color-warning-primary`) down bars; tooltip pills bordered in the matching accent; 01–12 labels.
- Integration: h4 title + body-base subtitle; SVG area chart (line `--btn-bg-enable`, gradient fill via `--adb-area`); rows with 44px round icon, name/description, and a progress badge.

## Surface and text pairing (hard rule)

- Everything sits on dark surfaces. Invert text tokens only: `--color-text-primary-invert` for titles/names/values, `--color-text-secondary-invert` for owners/descriptions/labels. Accents `--btn-bg-enable` and `--color-warning-primary` are used for bars, arrows, and the chart line; badge backgrounds mix the accent over `--color-surface-secondary` so they read as dark with invert text. Never dark text on these dark surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-analytics-bento">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; all charts, tables, and icons are token CSS/SVG. All sub-classes are `adb-`-prefixed so host styles can't leak in.
