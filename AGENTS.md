# AGENTS.md — start here

You are using the **WPMN Design System** to build marketing pages/sections for WPManageNinja
WordPress products (FluentForms, FluentCRM, etc.).

## Read these four files only (ignore the rest)
1. **`wpmn-bundle.css`** — all tokens in one file (colors, spacing, radius, type). Link/inline this.
2. **`registry.json`** — the 10 components + 56 ready-made sections, by role and tag.
3. **`COMPONENTS.md`** — component class names + examples.
4. **`llms.txt`** — the build rules (full version).

Do **not** load `WPMN-Design-System.md`, `wpmn-design-tokens-master-demo.md`, `About.md`, or
other large docs — they're reference noise that will bury the signal.

## The 4 rules people always miss
1. **Set `data-brand` on `<html>`** — REQUIRED, or you get the default WPManageNinja blue.
   `<html data-brand="fluentforms">`. (Dark mode: `data-theme="dark"`.)
2. **Compose from the section library first.** Pick sections from `registry.json` by role and
   drop in `sections/<id>/section.html` as-is. Hand-build only when nothing fits.
3. **Inline the real logo** from `logos/<brand>/logo-<type>.svg` — never draw or fake one.
4. **Tokens only** — `var(--color-*)`, `var(--primitive-space-*)`, `var(--radius-*)`, the
   `.text-*` classes. The real names are all in `wpmn-bundle.css`; grep it, never invent a name
   like `--fs-h1` or `--space-8` (those don't exist; it's `--font-size-h1`, `--primitive-space-8`).

Raw URL base: `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/<path>`
