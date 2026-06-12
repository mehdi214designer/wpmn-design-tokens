# Build Spec: WPMN Section — Notch Tabs Hero

Centered hero imported from a reference build. Badge with gradient NEW chip, h1, subline, two CTAs, a row of muted brand text marks, then a brand-gradient showcase band whose top edge carries a white notched tab bar — the notch grows 32px inverse-corner shoulders out of pure radial-gradients. Clicking a tab blurs the screenshot out, swaps it, and springs it back in. A three-up feature trio closes the section. Interactions preserved verbatim; every visual tokenized; hotlinked artwork replaced by a token gradient and verified Unsplash screenshots (one per tab).

The reference implementation is the source of truth. Fetch it and reproduce structure, geometry, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/notch-tabs-hero/section.html`

## Interaction rules (keep exactly as reference)

- Notch geometry (verbatim): 52px-tall bar, `border-radius: 0 0 var(--radius-lg) var(--radius-lg)`, centered with `left:50%; translate:-50%`, tabs top-aligned. Shoulders: 32x32 pseudo-elements at `left:-31px` / `right:-31px` filled with `radial-gradient(circle at 0% 100%, transparent 32px, var(--color-surface-primary) 32.5px)` (mirrored for the right side).
- Tab switch out-phase: `.out` = `transform: scale(.949) translateY(15px); opacity: 0; filter: blur(4px)` over `.25s cubic-bezier(.4,0,.2,1)` on all three properties.
- Swap: JS waits 260ms, swaps `src`/`alt` from the tab's `data-shot`/`data-alt`, then adds `.in`.
- In-phase: `.in` = transform back over `.35s cubic-bezier(.34,1.3,.64,1)` (the spring), opacity and blur over `.3s ease-out`. The `in` class is removed and the busy lock released 380ms later.
- A `busy` flag ignores clicks mid-animation; clicking the active tab is a no-op.
- Tab pill highlight (999px, `color-mix(text-primary 5%, transparent)`) fades opacity 150ms; tab text color crossfades `.15s cubic-bezier(.4,0,.2,1)` between muted, secondary (hover), and primary (active).
- Badge tint deepens on hover, `.15s cubic-bezier(.4,0,.2,1)`. Brand marks: opacity .4 to 1 on hover, 150ms.
- All five tab screenshots are preloaded with `new Image()` on init.
- `prefers-reduced-motion: reduce`: every transition off; a tab click swaps the image instantly with no out/in classes.

## Layout rules (WPMN design guideline)

- Section: `--color-surface-primary` bg, `--font-family-base`, padding 96px 0 64px desktop / 64px 0 48px mobile, flex column gap 64px (48px mobile).
- Derived tints hoisted onto the section root (audit-safe): badge tint `color-mix(btn-bg-enable 8%, surface-primary)` (hover 14%), icon-chip tint 8%, showcase artwork mixes at 30/12/20%. The NEW chip gradient references `var(--btn-bg-enable)` directly as its start color (so the audit reads it as a brand surface) and fades to the hoisted `color-mix(btn-bg-enable 55%, surface-primary)` end.
- Badge: pill chip, body-small medium, text `--btn-bg-enable`; NEW chip 20px tall, 999px, gradient bg, `--color-text-primary-invert`, body-label uppercase. 16px chevron (Hugeicons arrow-right-01, stroke.rounded).
- h1: `--font-size-h1`/`--font-lh-h1`, semibold, `--color-text-primary`, letter-spacing -0.03em, max-width 600px, text-wrap balance. Subline: body-medium medium, `--color-text-secondary`, max-width 480px.
- Buttons: radius `--radius-xsm` (never pill), btn-md type, padding 12px 24px, gap `--spacing-btn-gap-lg`. Primary: `--btn-bg-enable` bg, invert text, `inset 3px 4px 4px 0 var(--btn-bg-glow, rgba(255,255,255,0.3))`, hover `--btn-bg-hovered`, active `--btn-bg-pressed`. Secondary: surface-primary bg, text-primary, `--shadow-soft-300` + 1px color-mix ring, hover lifts to `--shadow-soft-500`.
- Brand row: six muted text marks (Fluent suite), body-medium semibold, text-primary at opacity .4.
- Showcase band: padding 112px 0 80px, background = two token radial-gradients + one linear over the hoisted art tints (replaces the reference's hotlinked webp).
- Screenshot: max-width 1024px container, radius `--radius-xsm`, shadow `0 1px 3px color-mix(text-primary 8%, transparent)` + 1px color-mix ring, `will-change: transform, opacity, filter`.
- Feature trio: 3-col grid (1-col under 900px), 40x36 pill icon chips on the 8% tint, 20px Hugeicons stroke.rounded icons (dashboard-speed-02, clock-01, favourite) in `--btn-bg-enable`; headings body-medium medium with the trailing sentence in a `--color-text-secondary` span.
- Notch hides under 900px (tabs are desktop-only, as in the reference).
- Class scoping: every rule prefixed `.wpmn-sec-notch-tabs-hero`; JS scoped via `document.currentScript.parentElement`; no ids.

## Surface and text pairing (hard rule)

- Everything sits on light surfaces (surface-primary or light brand tints): all text uses dark tokens (`--color-text-primary` / `--color-text-secondary`). The only invert text is on the brand-filled primary button and NEW chip (`--color-text-primary-invert`). Never dark-on-dark or light-on-light.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-notch-tabs-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies beyond the five verified Unsplash screenshots; no hotlinked artwork or fonts.
