# Token translation table

How to map raw values from reference files/screenshots to WPMN tokens.
Load `index.css` order: primitives → brand-primitives → tokens → typography.

## Colors

| Reference value | Token |
|---|---|
| Page/card white, #fff, #f8f6f0-ish creams | `--color-surface-primary` |
| Near-black surfaces (#141414, #1c1c1c, dark cards) | `--color-surface-secondary` |
| Headings / strong dark text | `--color-text-primary` |
| Muted/secondary text (60-70% blacks) | `--color-text-secondary` |
| Text on dark or brand surfaces | `--color-text-primary-invert` / `--color-text-secondary-invert` |
| Brand accents (blues, oranges — any accent) | `--btn-bg-enable` (follows the active brand) |
| Button hover / pressed | `--btn-bg-hovered` / `--btn-bg-pressed` |
| Success/warning/error accents | `--color-success-primary` / `--color-warning-primary` / `--color-error-primary` |
| Soft grey card fills (#f4-f8 greys) | `color-mix(in srgb, var(--color-text-primary) 3-5%, var(--color-surface-primary))` |
| Hairlines/borders (rgba black 6-12%) | `color-mix(in srgb, var(--color-text-primary) 6-12%, transparent)` |
| Light brand tints (pastel fills) | `color-mix(in srgb, var(--btn-bg-enable) 4-30%, var(--color-surface-primary))` |
| White elements over dark (8-40% whites) | `color-mix(in srgb, var(--color-text-primary-invert) N%, transparent)` |

`color-mix()` over tokens is the approved pattern for tints, never a raw literal.

## Typography (Work Sans, tokens swap automatically at 768px)

| Reference | Token pair |
|---|---|
| 56-64px display | `--font-size-h1` / `--font-lh-h1` |
| 44-52px | h2 (49px) |
| 34-42px | h3 (39px) |
| 28-33px | h4 (31px) |
| 22-27px | h5 (25px) |
| 18-21px | h6 (20px) |
| 18-20px body | body-large / body-medium |
| 14-16px body | `--font-size-body-base` |
| 12-13px small | body-small |
| 10-11px uppercase labels/badges | `--font-size-body-label` |
| Weights 300/400 → regular, 500 → medium, 600 → semibold, 700+ → bold | `--font-weight-*` |

Never write raw mobile font-size overrides — typography.css already handles 768px.
Mono/serif/display fonts in references → `--font-family-base` with letter-spacing/uppercase
to keep the intent.

## Radius / shadows / buttons

- 4-9px → `--radius-xsm` (8) · 10-13px → `--radius-sm` (12) · 14-20px → `--radius-md` (16)
  · 22px+ → `--radius-lg` (32). Tags/chips may use 999px; **buttons always `--radius-xsm`**.
- Soft shadow stacks → `--shadow-soft-300` / `--shadow-soft-500`; harder → `--shadow-hard-*`.
- Primary button: `--btn-bg-enable` bg, `--color-text-primary-invert` text,
  `box-shadow: inset 3px 4px 4px 0 var(--btn-bg-glow, rgba(255,255,255,0.3))`,
  hover `--btn-bg-hovered`, active `--btn-bg-pressed`, btn-md type tokens.
- Light/secondary button: surface-primary bg, text-primary, `--shadow-soft-300` + 1px
  color-mix ring, hover lifts to soft-500.
- Dark button: surface-secondary bg + invert text, hover
  `color-mix(in srgb, var(--color-surface-secondary) 86%, var(--color-text-primary-invert))`.

## Surface pairing & the audit

`scripts/audit-surface-pairing.mjs` enforces the pairing rule with a cascade-aware static
analysis. Two patterns it can't follow — write around them:

1. **Dark variant overrides must be element rules owned by the dark class.**
   Wrong: `.card--dark .card-title { color: invert }` (the audit attributes this to
   `.card-title` everywhere and flags light cards).
   Right: give the dark card's children element tags and write `.name-dark h3 { ... }`,
   `.body-dark p { ... }`, `.body-dark b { ... }` — rules whose last selector segment is an
   element, owned by a class that only exists inside the dark container.
2. **Light brand tints that mention `--btn-bg-enable` inside `background:` get misread as
   dark surfaces.** Hoist them into derived custom properties on the section root
   (`--xx-tint: color-mix(...)`) and use `background: var(--xx-tint)`.

Decorative fills with no text inside (chart bars, meter needles) may use brand/dark tokens
directly — the audit only checks text rules.
