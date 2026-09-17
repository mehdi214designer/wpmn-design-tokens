# Build Spec: WPMN Section — Enterprise Footer

A dark bordered-panel mega footer built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). A left brand panel (logo + star rating badge) sits beside a six-column link grid, over a bottom bar with follow, legal, and copyright, all separated by divider hairlines.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/enterprise-footer/section.html`

## Interaction rules (keep exactly as reference)

- Responsive is container-width, not viewport: a scoped script measures `root.clientWidth` and toggles `fch-md` (<900px) and `fch-sm` (<560px) via a `ResizeObserver` (falling back to a resize listener). The footer adapts to whatever container it sits in.
- `fch-md`: the top switches to a column, the left panel drops its max-width, the rating badge hides, and the link grid becomes two columns. `fch-sm`: panel padding tightens and the bottom bar wraps (legal full-width, copy unpinned).
- Links transition to a brand-tint hover color; social and legal links shift on hover (200ms). The script guards against double-init with `data-fch-init`.

## Layout rules (WPMN design guideline)

- Section `--color-surface-secondary`, `--color-text-primary-invert`, with top/bottom 1px `--fch-divider` (a `color-mix(invert 18%, surface-secondary)` hairline). `.fch-container` max-width 1298px with left/right divider borders; `.fch-top` uses a 1px gap over the divider color to draw the seam between panels.
- Left panel (max 392px): a `.fch-logo` (a `--btn-bg-enable` mark chip + h5 bold wordmark) and a rating badge (`--color-warning-primary` stars + body-small label). Right panel: a three-column grid (up to six lists) of a `--color-text-secondary-invert` title over `--color-text-primary-invert` links.
- Bottom bar: follow label + social icon, legal links, and copyright, body-small `--color-text-secondary-invert`. All sizing that shrinks is layout px; font sizes stay on tokens.

## Surface and text pairing (hard rule)

- Everything is on the dark footer surface: titles and muted text `--color-text-secondary-invert`, links and wordmark `--color-text-primary-invert`, hover a brand-tint mix, stars `--color-warning-primary`. The logo mark is a brand chip with an invert glyph and no text. Never dark text on the dark footer.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-enterprise-footer" data-fch>` with scoped `<style>`, the panel/grid/bottom markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies; the brand font falls back to `--font-family-base`, and the logo and rating badge are token placeholders (content swapped on use), no third-party logos. All sub-classes are `fch-`-prefixed so host styles can't leak in.
