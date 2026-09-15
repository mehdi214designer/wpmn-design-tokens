# Build Spec: WPMN Section — Hire Carousel

A "set up once, runs itself" hero built natively on WPMN tokens (all artwork is token CSS/SVG, no images and no third-party logos). A centered header (badge, heading, sub) sits over a horizontal rail of five automation-agent cards. One card is open at a time: it expands to show a headline, a large token-SVG character, and an FluentCRM-style app window with a typewriter tooltip. The other four stay as narrow vertical tabs (rotated name + role over a token-SVG character). The rail auto-advances, and any card opens on click, keyboard, or a mobile dot.

This spec is the source of truth. Fetch the reference implementation and reproduce structure, spacing, and motion:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/hire-carousel/section.html`

## Interaction rules (keep exactly as reference)

- The JS builds all five cards from a `people` data model. Exactly one card carries `is-open`; index 2 (Vera) starts open.
- Opening a card animates `flex-basis` and `width` from 96px to 1000px over 700ms cubic-bezier(.65,.05,.2,1); the character grows from 150px to 300px and slides left over 600ms; the `.hc-content` cross-fades in over 400ms with a 150ms delay; the collapsed `.hc-tab` fades out.
- Auto-advance: `setInterval` calls `setActive(active+1)` every 5000ms. `setActive` toggles `is-open` on the card and `is-on` on the dot, restarts typing, and resets the auto timer.
- Clicking any card, pressing Enter/Space on a focused card, or clicking a mobile dot calls `setActive` for that index.
- The open card's `.hc-typed` types `people[active].tooltip` one character at a time on a 32ms interval, followed by a blinking cursor (`wpmn-hc-blink` 1s steps(1) infinite). Typing restarts on every `setActive`.
- Keep the `window.__sectionType` test hook (fills the active tooltip instantly for hidden/throttled previews).
- Vera renders the full two-column FluentCRM panel (`veraCRM()`); the other four render the single-column `genPanel()` fill. Feed rows come from `row()`; simple status dots from `dot()`.
- Responsive: 1040-760px scales the whole rail via `transform:scale(calc((100vw - 32px)/1000))`; under 760px only the open card shows, as a stacked block, with the `.hc-dots` switcher visible.
- prefers-reduced-motion: no auto-advance (the interval is skipped), no typewriter (the full tooltip text is set at once), and CSS turns off card/character/content transitions and the cursor blink.

## Layout rules (WPMN design guideline)

- Section `--color-surface-primary`, padding 64px/20px/96px (48/16/72 <1180). Header `.hc-head` max-width 640px, centered: a 999px `.hc-pill` (surface-primary, `inset 0 0 0 1px var(--hc-border)` ring, a play glyph tinted `--color-warning-primary`), an h4 heading (semibold, -0.3px), a body-base sub in `--color-text-secondary`.
- Rail is a 440px-tall flex row, 12px gap. Cards are `--radius-md`, `--hc-muted` fill (`color-mix(text-primary 5%, surface-primary)`), 96px collapsed / 1000px open, `overflow:hidden`.
- Collapsed tab: `writing-mode:vertical-rl`, name (body-small semibold) + role (body-small `--color-text-secondary`). Character: the reference character illustration `<img>` anchored bottom-left (148px collapsed, 300px open, sliding left), kept as provided.
- Open content: a headline block (top-left, kicker + h6 line) and the app window `.hc-win` (white surface-primary card, top corners `--radius-md`, `--shadow-soft-500`, `--hc-border`, a bottom fade to `--hc-muted`). The window has a header (a brand `.hc-logo` chip + app name), a left contact column (contact, pipeline/tags/order/invoice, `--radius-xsm` chips) and a right activity column (Activity/Notes/Task tabs with a `--color-text-primary` underline, timeline rows with round status icons). A dark `.hc-tooltip` overlaps the character.
- Buttons: none. Chips/badges/dots use 999px (never buttons). All icons are inline token SVG.

## Surface and text pairing (hard rule)

- The section, cards, window and chips are all light surfaces: headings `--color-text-primary`, meta/labels `--color-text-secondary`, panel body on white. The only dark surface is the `.hc-tooltip` (`--color-surface-secondary`): its text uses `--color-text-primary-invert` and the cursor a `color-mix` of the invert token, both written on the `.hc-tooltip` class so the audit attributes them correctly. Agent-hue tokens (`--btn-bg-enable`, warning/success/error) and the success check fill only decorative characters, dots, chips and icons that contain no text. Never dark text on the tooltip, never light text on the light cards.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-hire-carousel">` with scoped `<style>`, a `.hc-rail` / `.hc-dots` mount, and a scoped IIFE `<script>` that resolves its root via `document.currentScript.parentElement` and queries within it. Fonts fall back to `--font-family-base`, and the CRM logo and all feed icons are token CSS/SVG; the character portraits are the original reference `<img>` illustrations kept as-is. All sub-classes are `hc-`-prefixed and the keyframe is `wpmn-hc-`-prefixed so host styles can't leak in.
