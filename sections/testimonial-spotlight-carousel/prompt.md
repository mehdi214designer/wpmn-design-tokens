# Build Spec: WPMN Section — Testimonial Spotlight Carousel

A dark testimonial slider built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). A rounded dark panel holds a centered header (outlined gold badge, large bold heading, muted sub) over a carousel of testimonial cards. One card is active and centered, brighter and full-size; its neighbors peek in at the panel edges, dimmed and slightly smaller. Each card has an avatar, name, a gold role line, the quote, a brand mark, and a star rating, plus a small folder tab. Dash pagination tracks position; the carousel auto-advances and re-centers the active card.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/testimonial-spotlight-carousel/section.html`

## Interaction rules (keep exactly as reference)

- The JS builds all cards and dashes from an `items` array; the middle item starts active.
- Header and carousel carry `.tsc-reveal` and fade up on first view (IntersectionObserver, threshold 0.15, adds `.is-inview`; `wpmn-tsc-up` 600ms cubic-bezier(.22,1,.36,1); carousel staggered 120ms via `.tsc-r2`).
- Centering is measured, not fixed: `center()` sets the track `translateX` to `viewport/2 - (activeCard.offsetLeft + activeCard.offsetWidth/2)` so the active card sits mid-viewport at any width. The active card animates to opacity 1 / scale 1 with the brighter `--tsc-card-on` fill; neighbors sit at opacity .45 / scale .94 (500-600ms).
- Auto-advance: `setInterval` calls `setActive(active+1)` every 5000ms; `setActive` wraps the index, toggles `is-active` on cards and `is-on` on dashes, re-centers with animation, and resets the timer.
- Clicking a card or a dash, or pressing Enter/Space on a focused card, calls `setActive` for that index. The active dash widens and turns `--btn-bg-enable`.
- On window resize, `center(false)` re-centers the active card without animation (120ms debounce).
- prefers-reduced-motion: the auto interval is skipped, CSS turns off track/card/tab/dash transitions, and reveals render in their final state.

## Layout rules (WPMN design guideline)

- Outer section `--color-surface-primary` with light padding; the content lives in a `.tsc-panel` (`--color-surface-secondary`, `--radius-lg`, 96px/40px padding, `overflow:hidden` so peeking neighbors clip to the panel), max-width 1360px.
- Header centered: an outlined pill `.tsc-badge` (1px `color-mix(--color-warning-primary 60%, transparent)` ring, warning text), an h1 heading (bold, -0.02em, `--color-text-primary-invert`), and a body-medium sub in `--color-text-secondary-invert`.
- Track is a flex row (24px gap) that translates horizontally; cards are full-size, the active one full opacity, neighbors dimmed to .4 and clipped at the panel edges. Cards are 560px wide (84vw cap; 82vw under 768px), `--tsc-card` fill (active `--tsc-card-on`), right corners `--radius-lg`, 32px padding with extra bottom room. The folder shape: a `.tsc-tab` (card-colored, `--radius-md` top) protruding at the top-left, and a `.tsc-notch` (a `--color-surface-secondary` block with a rounded top-right) cut into the bottom-left so the brand logo sits in the notch, half outside the card. Header row: a monogram `.tsc-avatar` (52px, `--tsc-avbg` = `color-mix(--btn-bg-enable 34%, surface-secondary)`, invert initials), name (h6 semibold invert) and role (body-small `--color-warning-primary`). Quote is body-medium `--color-text-secondary-invert`. Pinned to the card: `.tsc-logo` (a token-SVG brand mark tinted `--btn-bg-enable` + wordmark) in the bottom-left notch, and `.tsc-rating` (number + five `--color-warning-primary` stars) bottom-right.
- Pagination: pill dashes (`--tsc-dot`), the active one widened and `--btn-bg-enable`.
- Buttons: none. Dashes/badge/avatar use 999px (never buttons).

## Surface and text pairing (hard rule)

- Everything sits on dark surfaces (the panel and the cards). Use invert tokens only: `--color-text-primary-invert` for the heading, names, rating and logo wordmark; `--color-text-secondary-invert` for the sub and quotes; `--color-warning-primary` for the badge, role and stars. Card and tab fills, hairlines and the avatar background are derived custom properties mixed over `--color-surface-secondary`, hoisted on the section root so the audit reads every surface as dark. Never dark text on these dark cards.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-testimonial-spotlight-carousel">` with scoped `<style>`, a `.tsc-track` / `.tsc-dots` mount, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement` and queries within it. No external dependencies; avatars are monogram initials and brand marks are generic token-SVG placeholders (content is swapped on use), and no third-party brand logos are used. All sub-classes are `tsc-`-prefixed and the keyframe is `wpmn-tsc-`-prefixed so host styles can't leak in.
