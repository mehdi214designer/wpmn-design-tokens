# Build Spec: WPMN Section — Security Scan Hero

A centered, dark product hero rebuilt from a scraped reference and fully tokenized. Top to bottom: a spinning shield brand mark, a mono uppercase delivery badge, an oversized heading with an inline brand tile mid-line, a muted sub, two CTAs (primary + dark), three auto-advancing feature tabs with filling progress tracks, and an animated app window. Inside the window, a brand-tinted scan line sweeps a mock app over a dotted node grid (guide lines, corner nodes, a central shield tile, a small ChatSphere-style window) and a pill flags a security warning.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and motion exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/security-scan-hero/section.html`

## Interaction rules (keep exactly as reference)

- Scan line: keyframe `wpmn-ssh-scan` `0% { translateY(-213px) } 70%,100% { translateY(400px) }`, `5s ease-out infinite`; a 2px bright edge sits on its bottom.
- Brand mark ring: `14s linear infinite` rotation carrying two dots (the lower one at 0.5 opacity).
- Feature tabs: JS auto-advances every `4000ms` after the section hits 20% viewport (IntersectionObserver). The active tab gets `.is-active` (body opacity .55 -> 1, icon bg tints with `--btn-bg-enable` 24%), and its `.ffill` track animates `inset:0 100% 0 0 -> 0 0 0 0` over `4s linear`. Clicking a tab calls `activate(k)` and restarts the interval.
- Stage: fades up via `wpmn-ssh-up` 700ms cubic-bezier(.22,1,.36,1) on first view.
- CTAs: primary follows enable/hovered/pressed at 120ms; dark hover lifts the fill 8% -> 12%.
- prefers-reduced-motion: ring + scan animations off (scan parked at top:120px, .7 opacity), no auto-advance, stage rendered in place.

## Layout rules (WPMN design guideline)

- Section 96px/32px top+side padding (40px sides <1200, 64px/20px <768), no bottom padding (the app window bleeds to the edge). Background: a `radial-gradient` brand glow rising from the bottom (`--ssh-glow` = `color-mix(--btn-bg-enable 34%, transparent)`) over `--color-surface-secondary`. Content `max-width:1000px`, centered.
- Derived props hoisted on root: app surface (`color-mix(text-primary-invert 4%, surface-secondary)`), white-on-dark fills at 6/8/12%, hairlines, the scan gradient, and the brand tile gradient — so the surface-pairing audit reads the panel as dark.
- Brand mark 64px: rounded tile (`--radius-md`, brand gradient, `--btn-bg-glow` inset), centered shield glyph, rotating ring with two dots.
- Badge: pill, `--ssh-fill8` bg + hairline border, lightning glyph in `--btn-bg-enable`, label body-label medium uppercase 0.14em in `--color-text-secondary-invert`.
- Heading h1 bold -0.02em `--color-text-primary-invert`, flex-wrap centered with a 40px inline brand tile (`--radius-sm`). Sub body-medium `--color-text-secondary-invert`, max 44ch.
- CTAs: both `--radius-xsm` (never pill). Primary `--btn-bg-enable` + invert text + `--btn-bg-glow` inset; dark `--ssh-fill8` + invert text + hairline border.
- Feature tabs: 3 equal columns split by hairlines, each with a 44px round icon chip, semibold title (body-base), muted description, and a 2px progress track pinned to the bottom. Stacks at 900px.
- App window: 560px tall, `--radius-lg` top corners, `--ssh-app` bg, hairline border (no bottom). macOS-style menubar (app name semibold invert, menu items + clock muted). Dotted node grid masked with a radial alpha mask, two horizontal + two vertical guide lines, four corner nodes (brand-dot centers), an 84px central shield tile, a 520px ChatSphere mock window, the sweeping scan, a warning pill (red `--color-error-primary` x-badge + invert text + `--shadow-soft-500`), and a bottom fade to `--color-surface-secondary`.

## Surface and text pairing (hard rule)

- Everything sits on dark surfaces (`--color-surface-secondary`, the app panel, the brand button). Use invert text tokens only — `--color-text-primary-invert` for headings/strong, `--color-text-secondary-invert` for muted. Accents and decorative fills use `--btn-bg-enable` / `--color-error-primary`. Never dark text on these dark surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-security-scan-hero">` with scoped `<style>`, markup, and a scoped IIFE `<script>`. No external dependencies; all artwork is token-based CSS/SVG (no images).
