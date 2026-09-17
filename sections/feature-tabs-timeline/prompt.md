# Build Spec: WPMN Section — Feature Tabs Timeline

A dynamic feature-tabs section built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). Three tabs each drive a five-step vertical timeline that auto-advances and swaps a big tinted card with copy, two buttons, and a floating product mock.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/feature-tabs-timeline/section.html`

## Interaction rules (keep exactly as reference)

- The JS builds tabs and steps from a `TABS` model (3 tabs x 5 steps). Clicking a tab resets to step 0, re-renders the steps, and restarts.
- The active step's `.wsf-fill` animates `height: 0 → 100%` over `var(--auto)` (7s) linear; after 7s `auto()` advances to the next step (index wraps mod 5). The fill is hard-reset (transition none, height 0, reflow, then transition back) on every `setStep` so it always restarts cleanly.
- Clicking a `.wsf-step` jumps to it and restarts the timer. The active dot fills brand with a 4px brand-tint ring; the active step's `h4` goes semibold.
- On each `setStep`, `renderCard()` sets the card tint per tab (`--wsf-card`), toggles `.wsf-swap` (reflow between remove/add) so `.wsf-text` fades (`wpmn-wsf-fade` 400ms) and `.wsf-shot` fades (`wpmn-wsf-fadeShot` 450ms).
- The primary button's arrow slides `translateX(4px)` on hover. Expose `window.__sectionStep(n)` to drive the step externally.
- Under 900px the grid stacks, the card left-aligns, and the mock goes static (no shot fade). prefers-reduced-motion drops the swap fades and renders the fill full.

## Layout rules (WPMN design guideline)

- Section `--color-surface-primary`; `.wsf-wrap` max-width 1240px, 64/24/96 padding. Head centered: h2 (semibold, -0.5px) and a body-medium `--color-text-secondary` sub.
- Tabs row: a bottom hairline, three equal tabs (max 380px) at h5 semibold; inactive `--color-text-secondary`, active `--btn-bg-enable` with a 3px `--btn-bg-enable` underline (999px).
- Grid: `minmax(0,1fr)` / `minmax(0,400px)`, 56px gap. Card: a per-tab tint (`color-mix` of success/error/brand over surface, hoisted into `--wsf-card`), `--radius-lg`, 56/48 padding, min-height 520; text capped at 50% so the mock floats in the right half. h3 title, body-base `--color-text-secondary` copy, then two buttons.
- Buttons use the button tokens at `--radius-xsm` (never pills): primary `--btn-bg-enable` + invert text + glow inset + hover `--btn-bg-hovered`; secondary a `--wsf-learn` (brand-tint) fill with `--color-text-primary`.
- Mock (`.wsf-shot`): a floating surface-primary panel at `--radius-md` with a token drop-shadow, a dot header, an accent block (`--wsf-accent` per tab) and skeleton rows. Timeline: a 15px dot (2px `--wsf-dotline` ring, brand when active) over a 2px track whose `.wsf-fill` is brand; step body h6 title + body-small copy.

## Surface and text pairing (hard rule)

- Everything sits on light surfaces: headings/titles `--color-text-primary`, copy `--color-text-secondary`, active tab/dots/fill `--btn-bg-enable`. Card tints, the learn-button fill, the mock accent and skeleton greys are `color-mix`es hoisted into custom properties so the audit reads them as light. The primary button is the one filled brand surface (`--color-text-primary-invert` label). Never light text on the light card.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-feature-tabs-timeline">` with scoped `<style>`, the head/tabs/grid mounts, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement` and queries within it. No external dependencies; the brand font falls back to `--font-family-base`, and the screenshots are replaced by a token-SVG skeleton mock (content swapped on use), no third-party logos. All sub-classes are `wsf-`-prefixed and keyframes are `wpmn-wsf-`-prefixed so host styles can't leak in.
