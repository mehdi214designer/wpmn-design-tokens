# About — WPMN Design System

**Project:** React component library + CSS design token system for WPManageNinja products.
**Designer:** Mhasan, UI/UX Designer at WPManageNinja
**Stack:** Plain CSS custom properties + React. No build step required for development.
**Figma file:** `54BG58iHusICXloB0fauSM` (WPMN Design System Beta)
**GitHub:** https://github.com/mehdi214designer/wpmn-design-tokens (branch: master)
**Current version:** v1.1.0

---

## Token Files

| File | Purpose |
|------|---------|
| `primitives.css` | All raw base values — light, dark, accent, primary, success, warning, error, spacing, radius. WPManageNinja brand mode. Do not use directly in components. |
| `tokens.css` | Semantic tokens mapped from primitives. Light (`:root`) + dark (`[data-theme="dark"]`) + mobile overrides. Includes shadow tokens (hard 100–1000, soft 100–800) and input states. |
| `brand-primitives.css` | All 15 brand overrides via `[data-brand="x"]`. Each brand overrides `--primitive-primary-*` (50–950) and `--primitive-accent-*` (50–950). |
| `typography.css` | Type scale + utility classes. |
| `index.css` | Main entry — imports all four in the correct order. |

**Brands with both primary + accent scales:**
wpmanagenia, fluentforms, fluentcrm, ninjatables, wpsocialninja, fluentsupport, fluentaffiliate, fluentboards, fluentcart, fluentplayer

**Brands with primary only (accent files not yet provided):**
fluentbooking, fluentcommunity, paymattic, fluentsmtp, azonpress

---

## Components Built

| Component | Files | Notes |
|-----------|-------|-------|
| `Button` | `Button.jsx` + `Button.css` | Types: primary/secondary/tertiary. Sizes: xl/lg/md/sm/xs. States: enabled/hovered/pressed/focused/disabled. Loading spinner. |
| `Input` | `Input.jsx` + `Input.css` | Variants: stroke/fill. Sizes: lg/md/sm. Label, hint, error, success, iconLeft, iconRight. Inline SVG icons. |
| `NavBar` | `NavBar.jsx` + `NavBar.css` | Logo + nav links + CTA. Responsive: desktop full nav, mobile hamburger drawer. |
| `Badge` | `Badge.css` (no JSX yet) | Variants: pill/soft. Types: in_progress/completed/experimental/deprecated/handoff_ready. Light + dark. |
| `Logo` | `Logo.css` (no JSX yet) | SVG logos per brand. Variants: logo/icon. Types: primary/dark/inverted/black/white. |
| `Text` | `Text.jsx` | Typography scale component. |
| `Footer` | `Footer.jsx` + `Footer.css` | Full site footer, social icons, nav columns, logo. Inline SVGs for 7 social icons. |
| `SocialIcons` | `SocialIcons.jsx` + `SocialIcons.css` | Standalone social icon row. 7 inline SVGs. |
| `Breadcrumbs` | `Breadcrumbs.jsx` + `Breadcrumbs.css` | Variants: border/flat/transparent/text. Inline SVG icons (_Home01, _ArrowRight01). |

---

## Demo Files

- `demo.html` — older single-file in-browser React demo (Babel standalone, no build step). Loads JSX via fetch, strips imports/exports, wraps in IIFE. CSS for each component is duplicated inline in the `<style>` block.
- `showcase_v2/index.html` — newer dynamic loader demo. Loads component JSX files via fetch from `../components/`. Cleaner, with sidebar nav, token inspector, and theme toggle.

---

## Pending / Not Done

- Accent scales for 5 brands (FluentBooking, FluentCommunity, FluentSMTP, AzonPress, Paymattic) — waiting on token JSON files
- `Badge.jsx` — component file not yet created
- `Logo.jsx` — component file not yet created
- `package.json` exports properly structured for Claude Design / GitHub connection
- Claude Design (claude.ai/design) connection via GitHub — long-term goal
- More components: cards, modals, dropdowns, tooltips, tabs, etc.

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| v1.1.0 | 2026-04-27 | Design guidelines + context files + `--color-text-secondary-invert` token |
| v1.0.0 | 2026-04-24 | Initial commit — token system + core components + logos |

---

## Icons

- Library: `@hugeicons/react-pro` v0.3.2 in `node_modules/`
- Variant: solid.rounded
- Usage: always inline as SVG path data directly in JSX — no runtime import, no bundler
- Pattern: `const _IconName = ({ s, c }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="..." fill={c} /></svg>`
- Reference file (to be created): `components/Icons/HugeIcons.jsx`

---

## Logos

- Location: `logos/<brand>/` — each brand has 5 logo files + 5 icon files
- Types: primary, dark, inverted, black, white
- Manifest: `logos/manifest.json`
- Export script: `scripts/export-logos.mjs`
