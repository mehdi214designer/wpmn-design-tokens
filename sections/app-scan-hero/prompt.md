# Build Spec: WPMN Section — App Scan Hero

A centered, dark product hero rebuilt from a self-contained HTML embed and fully tokenized. Top to bottom: a spinning atom mark, a mono uppercase delivery badge, an oversized heading with an inline brand tile mid-line, a muted sub, two CTAs (primary + dark), three feature tabs above a sweeping progress line, and a Mac-window mockup. Inside the window, a brand-tinted scan bar sweeps a circuit-node board over a glowing app-icon tile, a warning pill flags a missing security policy, and a small inner app window peeks up from the bottom.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/app-scan-hero/section.html`

## Interaction rules (keep exactly as reference)

- Atom mark: `wpmn-ash-spin` 8s linear infinite (three rotated ellipses + nucleus, stroke `currentColor`).
- Tab progress line: a 62%-wide gradient swept by `wpmn-ash-sweep` 4s ease-in-out infinite (`translateX(-30%) -> 70% -> -30%`).
- Window scan: `wpmn-ash-scan` `0% { translate(-50%,-213px) } 70%,100% { translate(-50%,400px) }`, 5s ease-out infinite, with a 1px bright edge.
- CTAs: primary enable/hovered/pressed; dark fill 4% -> 10%; both press down 1px.
- Container-keyed responsive (ResizeObserver, scoped via `document.currentScript.parentElement`): `is-narrow` < 820px (hide tab descriptions), `is-xs` < 560px (hide menu items + clock, wrap the warning). Mirrors the viewport media queries.
- prefers-reduced-motion: spin/sweep/scan off (scan parked at top:120px, .7 opacity), CTA transitions off.

## Layout rules (WPMN design guideline)

- Section 56px/16px top+side padding, 120px bottom (the window bleeds down); 40px/16px/80px under 560px. Background: a `radial-gradient` brand glow rising from the bottom (`--ash-glow` = `color-mix(--btn-bg-enable 40%, transparent)`) over `--color-surface-secondary`. Content `max-width:968px`, centered.
- Derived props hoisted on root (so the audit reads panels as dark): hairlines 8/14%, fills 4/6/10%, circuit wire + node colors, the scan tint + edge, and the brand tile gradient.
- Atom 64px; badge pill with `--ash-fill6` + hairline, bolt glyph in `--btn-bg-enable`, label body-label medium uppercase 0.14em in `--color-text-secondary-invert`.
- Heading h1 bold -0.02em invert, second line is a flex-wrap row with a `0.92em` inline brand tile (`--radius-sm`, brand gradient, `--btn-bg-glow`). Sub body-medium `--color-text-secondary-invert`, max 600px.
- CTAs: both `--radius-xsm` (never pill). Primary `--btn-bg-enable` + invert + glow; dark `--ash-fill4` + invert + hairline.
- Feature tabs: 3 equal columns, each with a pill icon chip (the active middle tab brightens chip + icon + title), body-medium title, body-base muted description. Below, a 592px 2px track with the swept gradient.
- Mac window: `--radius-md`, navy gradient (`surface-secondary -> color-mix(btn-bg-enable 12%, surface-secondary)`), `--shadow-soft-700`. Menubar (apple glyph, app name semibold, muted menu items + tabular clock). Window body 520px: a circuit SVG (wires `--ash-wire`, nodes `--ash-node`), the sweeping scan, an 100px brand app-icon tile, a warning pill (`--color-error-primary` x-badge + invert text + `--shadow-soft-500`), and a 760px inner window with red/yellow/green dots (`--color-error/warning/success-primary`), an input row, and a count badge.

## Surface and text pairing (hard rule)

- Everything sits on dark surfaces (`--color-surface-secondary`, the window gradient, the brand button). Invert text tokens only: `--color-text-primary-invert` for headings/strong, `--color-text-secondary-invert` for muted. Accents/decorative fills use `--btn-bg-enable` and the status tokens. Never dark text on these dark surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-app-scan-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; all artwork is token-based CSS/SVG (no images, no web fonts).
