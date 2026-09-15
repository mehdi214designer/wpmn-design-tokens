# Build Spec: WPMN Section — Agent Carousel Hero

A "set up once, runs itself" hero built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). A centered header (badge, heading, sub) sits over a horizontal rail of five automation-agent cards. Four cards are collapsed vertical tiles showing a rotated name/role label and a token-SVG bust; one card is expanded, showing a headline, a larger bust, and an FluentCRM-style activity panel with a typewriter tooltip. The rail auto-cycles which card is open, and any card opens on click.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/agent-carousel-hero/section.html`

## Interaction rules (keep exactly as reference)

- Header and rail carry `.ach-reveal` and fade up on first view: an IntersectionObserver (threshold 0.2) adds `.is-inview`, running `wpmn-ach-up` 600ms cubic-bezier(.22,1,.36,1); the rail is staggered 120ms via `.ach-r2`.
- The carousel auto-cycles: every 4600ms the next card opens. Opening toggles `.is-open` on the card, animating `flex-grow`, `flex-basis` and `min-width` over 600ms cubic-bezier(.22,1,.36,1); the collapsed layer cross-fades out (250ms) and the expanded layer fades in (400ms, 100ms delay).
- Clicking a collapsed card, or focusing it and pressing Enter/Space, opens it and restarts the 4600ms cycle timer. `aria-selected` tracks the open card.
- The open card's `.ach-tip` types its `data-type` string one character at a time (32ms/char) followed by a blinking caret (`wpmn-ach-caret` 1s step-end infinite). Typing restarts each time a new card opens.
- The `.ach-live` status dot pulses (`wpmn-ach-pulse` 1.8s ease-in-out infinite).
- Cards lift their background on hover (120ms).
- prefers-reduced-motion: no auto-cycle, no typewriter (the full tooltip text is shown), no pulse or caret; reveals render in their final state and all transitions are off.

## Layout rules (WPMN design guideline)

- Section `--color-surface-primary`, 96px/32px padding (40px sides <1100, 64px/24px <768); container max-width 1200px, `ach-wrap` a 40px-gap column.
- Header centered: a pill `.ach-badge` (surface-primary, `--ach-line` border, `--shadow-soft-300`, small play glyph tinted `--btn-bg-enable`), an h4 heading (semibold, -0.01em), and a body-base sub in `--color-text-secondary`.
- Rail is a 440px-tall flex row, 16px gap. Collapsed cards `flex:0 0 96px`, `--ach-muted` fill (`color-mix(text-primary 5%, surface-primary)`), `--radius-md`. The open card `flex:1 1 auto`, `min-width:600px`, surface-primary fill, `--ach-line` border, `--shadow-soft-500`.
- Collapsed layer: a vertical `writing-mode:vertical-rl` label (name bold, role secondary) at the top and a token-SVG bust anchored to the bottom in a tinted tile. Each agent sets `--ach-hue` (warning, brand, coral, success, error); the tile is `color-mix(hue 24%, surface-primary)` and the bust is `color-mix(hue 55%, text-primary)`, both hoisted into `--ach-tile` / `--ach-fig-c` so the audit reads the section as light.
- Expanded layer: a two-column grid (left headline + larger bust tile, right the CRM panel). The panel is a white card (`--radius-md`, `--shadow-soft-500`, `--ach-line` border) with a header (a brand-tinted logo chip + "FluentCRM"), a left sub-column (contact, pipeline/tags/order/invoice fields, pill chips), and a right sub-column (Activity/Notes/Task/Email tabs with a `--btn-bg-enable` underline, and a timeline of steps with round status icons). A dark `.ach-tip` tooltip overlaps between the bust and the panel.
- Buttons: none. Chips/badges use 999px radius (never buttons).

## Surface and text pairing (hard rule)

- The section and every card, panel and chip sit on light surfaces: headings `--color-text-primary`, meta/labels `--color-text-secondary`. Success chips use a light `color-mix` of `--color-success-primary` over surface-primary with a darker success-mixed text. The only dark surface is the `.ach-tip` tooltip (`--color-surface-secondary`): its text and caret use `--color-text-primary-invert`, written as rules owned by the `.ach-tip` class. Agent-hue tokens (`--btn-bg-enable`, warning/success/error) only fill decorative busts, tiles, dots and underlines that contain no text. Never dark text on the tooltip, never light text on the light cards.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-agent-carousel-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement`. No external dependencies; every portrait, logo and icon is token CSS/SVG and no third-party brand logos are used. All sub-classes are `ach-`-prefixed and every `@keyframes` is `wpmn-ach-`-prefixed so host styles can't leak in.
