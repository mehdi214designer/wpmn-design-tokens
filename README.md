# WPMN Design System

React component library and CSS design token system for WPManageNinja products.

Built with plain CSS custom properties and React — no build step required for development.

> **🤖 AI agents / tools:** start with **`AGENTS.md`** (or `llms.txt`). Read only
> `wpmn-bundle.css`, `registry.json`, `COMPONENTS.md`, and `llms.txt` — and set
> `data-brand="<product>"` on `<html>` or everything renders the default blue.

---

## Products

16 brands, all driven by a single token system with per-brand overrides via `[data-brand="x"]` on the root element:

`wpmanagenia` · `fluentforms` · `fluentcrm` · `fluentbooking` · `fluentcommunity` · `ninjatables` · `paymattic` · `fluentboards` · `fluentsmtp` · `fluentsupport` · `fluentaffiliate` · `azonpress` · `wpsocialninja` · `fluentcart` · `fluentplayer` · `fluentmembers`

---

## Tokens

All tokens live in CSS custom properties. Import order matters:

```css
@import 'wpmn-design-tokens/primitives';        /* raw values */
@import 'wpmn-design-tokens/brand-primitives';  /* brand-specific primitives */
@import 'wpmn-design-tokens/tokens';            /* semantic tokens — use these in components */
@import 'wpmn-design-tokens/typography';        /* type scale */
```

**Token categories in `tokens.css`:**
- `--color-text-*` — text colors
- `--color-surface-*` — backgrounds
- `--color-border-*` — borders
- `--color-success-*`, `--color-warning-*`, `--color-error-*` — feedback
- `--btn-*` — button states
- `--shadow-hard-100` through `--shadow-hard-1000` — hard shadows (10 steps)
- `--shadow-soft-100` through `--shadow-soft-800` — soft floating shadows (8 steps)

Light mode is default (`:root`). Dark mode via `[data-theme="dark"]`.

---

## Components

```js
import { Button, Badge, Input, Text, NavBar, Logo, Footer, Breadcrumbs, SocialIcons } from 'wpmn-design-tokens';
```

| Component | Key Props |
|-----------|-----------|
| `Button` | `type` (primary/secondary/tertiary), `size` (xl/lg/md/sm/xs) |
| `Badge` | `variant` (pill/soft), `type` (in_progress/completed/experimental/deprecated/handoff_ready) |
| `Input` | standard input props |
| `Text` | typography scale |
| `NavBar` | navigation bar |
| `Logo` | `brand` (any of 16 brands), imports `BRANDS` constant |
| `Footer` | nav columns, social icons, brand logo |
| `Breadcrumbs` | `variant` (border/flat/transparent/text), `theme` (light/dark) |
| `SocialIcons` | standalone social icon group |

---

## Icons

Icons are inlined SVGs from `@hugeicons/react-pro` (v0.3.2), one unified variant per site — library standard stroke.rounded. Extract paths with `node scripts/extract-hugeicon.mjs <name> stroke.rounded`.

Icon components use `({ s, c })` props — size and color. Named with `_` prefix (e.g. `_Facebook`, `_Home01`).

Reference file: `components/Icons/HugeIcons.jsx`

---

## Figma Source

Figma file: `54BG58iHusICXloB0fauSM` (WPMN Design System Beta)

---

## Dev demo

Open `demo.html` directly in a browser — uses Babel standalone, no build needed.
