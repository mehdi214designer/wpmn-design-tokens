# Build Spec: WPMN Section — Mega Footer

Full-site mega footer imported from a reference design and fully tokenized. A soft grey stage holds a white rounded card with a 3-column grid: left has a medium-weight h4 heading, two stacked uppercase CTAs (ghost + primary) and a "Join the community" icon row (GitHub, Discord, WordPress); the middle nav has a 3-column-span Products group rendered as CSS columns plus Docs (with a nested sub-list), Resources, and Company groups, each headed by a square-dot uppercase label; right has a newsletter label, intro, underline-style email input with a primary Subscribe button, a right-aligned social icon row (Facebook, X, LinkedIn, YouTube), and pill trust badges. Below the grid, a giant full-width outline wordmark ("WPManageNinja") drawn as SVG text with a brand-derived gradient stroke. Under the card, a copyright row with square-separated legal links.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/mega-footer/section.html`

## Interaction rules (keep exactly as reference)

- Every text/icon link: `--color-text-secondary` resting, `--color-text-primary` on hover, `transition: color 0.15s`.
- Ghost CTA: `--color-surface-primary` bg, `--color-text-primary` text, 1px `--color-border-primary` ring; hover inverts to `--color-surface-secondary` bg + `--color-text-primary-invert` text (background/color/border-color 0.2s).
- Solid CTA and Subscribe button: `--btn-bg-enable` bg, `--color-text-primary-invert` text, `box-shadow: inset 3px 4px 4px 0 var(--btn-bg-glow, rgba(255,255,255,0.3))`, hover `--btn-bg-hovered`, active `--btn-bg-pressed`, background 0.2s. Radius `--radius-xsm`, never pill.
- Email input: transparent bg, bottom hairline only — `--input-stroke-default`, hover `--input-stroke-hover`, focus `--input-stroke-active`, border-color 0.2s.
- A scoped IIFE prevents default on the newsletter submit and on all `#` placeholder links.
- `prefers-reduced-motion: reduce` kills all transitions.

## Layout rules (WPMN design guideline)

- Section: stage bg `color-mix(in srgb, var(--color-text-primary) 4%, var(--color-surface-primary))` hoisted into `--mf-stage`, padding `96px 20px 0` desktop, `64px 16px 0` mobile.
- Card: 1200px max-width, `--color-surface-primary`, radius `--radius-md`, `padding-top: 60px`, overflow hidden.
- Grid: `1fr 1.5fr 1fr`, gap `48px 64px`, `0 40px` side padding. At ≤1199px: two columns, link nav spans both and drops below (order 3). At ≤767px: single column, Products list runs 2 CSS columns, copyright stacks.
- Heading: `--font-size-h4`/`--font-lh-h4`, `--font-weight-medium`, -0.02em, max-width 352px.
- Labels and badges: `--font-size-body-label`, medium, uppercase, 0.04em; labels carry a 4x4px `currentColor` square via `::before`. Pill radius (999px) only on badges/chips.
- Buttons: 42px tall, 12px/32px padding, `--font-size-btn-sm`, uppercase, 0.04em, radius `--radius-xsm`.
- Link lists: `--font-size-body-base`, line-height 1.69; nested lists indent 12px; Products group spans 3 grid columns with `columns: 3` (2 on mobile).
- Icons: Hugeicons Pro stroke.rounded only, 24 viewBox, 1.5px stroke, `currentColor`, rendered 20px. Social row uses the Facebook01/NewTwitter/Linkedin01/Youtube paths from `components/Icons/HugeIcons.jsx` verbatim; community row uses github01/discord/wordpress extracted via `scripts/extract-hugeicon.mjs`.
- Wordmark: SVG `<text>` (font `--font-family-base`, `--font-weight-bold`, font-size 150 in a 1376x210 viewBox, `textLength="1336"` `lengthAdjust="spacingAndGlyphs"`), `fill: none`, 2px gradient stroke. Gradient stops are CSS-driven: `--mf-g1: color-mix(in srgb, var(--btn-bg-enable) 55%, var(--color-surface-primary))`, `--mf-g2: var(--btn-bg-enable)`, `--mf-g3: color-mix(in srgb, var(--btn-bg-enable) 65%, var(--color-text-primary))` — it re-skins with brand and theme switches. Never hotlink fonts or reuse third-party logo vectors.
- Copyright row sits outside the card: 1200px, `40px 0` padding, body-base secondary text, legal links separated by 4x4px `currentColor` squares.

## Surface and text pairing (hard rule)

- The card and stage are light surfaces: dark text tokens only (`--color-text-primary` / `--color-text-secondary`).
- Brand/dark surfaces (solid CTA, Subscribe, ghost CTA hover state) use `--color-text-primary-invert` only, declared in the same rule as the dark background. Never dark on dark, never light on light.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-mega-footer">` with a scoped `<style>` (every rule prefixed with the section class), markup, and a scoped IIFE `<script>` resolving its root via `document.currentScript.parentElement`. No external dependencies — no hotlinked fonts, images, or scripts.
