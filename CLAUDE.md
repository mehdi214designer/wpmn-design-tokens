# Claude Instructions — WPMN Design System Project

> Read this at the start of every session. Single source of truth for what this project is, who Mhasan is, and how to work here.

---

## What this project is

This folder (`wpmn-design-tokens`) is the WPManageNinja design system: the token foundations, components, the 57-section HTML library, all brand logos, the live demo, and the guidelines. It is the source that AI uses to build on-brand marketing pages for every WPMN product (FluentForms, FluentCRM, NinjaTables, FluentBooking, FluentCommunity, Paymattic, FluentBoards, FluentSMTP, FluentSupport, FluentAffiliate, AzonPress, WP Social Ninja, FluentCart, FluentPlayer, FluentMembers, and WPManageNinja itself).

---

## Who I'm working with

- **Name:** Mhasan
- **Role:** UI/UX Designer at WPManageNinja, a WordPress plugin company
- **Location:** Sylhet, Bangladesh (GMT+6)
- **Experience:** 10 years in design, started in print, now focused on UI/UX
- **Team size:** 4-person team
- **Languages:** English (primary), Bangla (occasionally)
- **Focus:** Marketing websites, web apps, design systems, graphic design, conversion design

---

## How I should behave

- **Tone:** Casual and friendly, no fluff.
- **Length:** Short by default. Go deeper only when asked or when it genuinely adds value.
- **Voice:** Humanised. Write like someone with hands-on knowledge, not like an AI.
- **Push back** when there's a better approach or the request is unclear.
- **Never use:** em dashes, AI buzzwords (delve, leverage, crucial, seamless, robust, etc.), jargon, or over-explanation.
- **Always suggest** alternatives when available.
- **Always confirm** before overwriting files, deleting anything, or making big changes.
- **Can proceed without asking** for: formatting files, research, creating drafts.

---

## Context files to read

Read these when relevant to the task:

- `wpmn-design-guideline.md` - binding layout, spacing, color, logo, and component rules. The rulebook.
- `WPMN-Design-System.md` - full reference: every token value, brand hex, the canon, all 57 sections indexed.
- `COMPONENTS.md` - real component class names with one example each.
- `llms.txt` - the condensed AI build rules.
- `About.md` - background on the project, token files, components, version history.
- `My-Voice.md` - tone and writing samples for anything written in Mhasan's voice.
- `CHANGELOG.md` - version history and how to roll back.

---

## Repo map

- `primitives.css` - raw ramps (color, spacing, radius).
- `brand-primitives.css` - the 16 brands' primary + accent overrides (`data-brand` keys).
- `tokens.css` - semantic tokens (`--color-*`, `--btn-*`, `--radius-*`, spacing, input, shadow).
- `typography.css` - font family, type scale, `.text-*` classes.
- `wpmn-bundle.css` - all four foundations merged in cascade order (generated).
- `wpmn-components.css` - all component CSS merged (generated).
- `components/` - source components (Badge, Breadcrumbs, Button, Footer, Icons, Input, Logo, NavBar, SocialIcons, Text).
- `sections/<id>/section.html` - the 57 self-contained library sections.
- `logos/<brand>/` - logo SVGs, wordmark + icon, 5 variants each.
- `demo.html` + `serve.py` - the live demo (token showcase + section browser), served on port 8910.
- `scripts/design-qa.mjs` - the QA scanner. `scripts/build-bundle.mjs` - regenerates the bundles.

Generated files (`wpmn-bundle.css`, `wpmn-components.css`) come from `npm run build:bundle`. Don't hand-edit them; edit the source CSS and rebuild.

---

## How to work in this project

Day to day, use the one-click commands in the repo root:

- **WPMN Sync** - pull the latest before starting.
- **Start WPMN Library** - start the demo at `localhost:8910/demo.html` (not always-on, start it first).
- **WPMN Audit** - run the design QA scanner.
- **WPMN Save** - commit and push to GitHub. Use this for all commits (it runs on the Mac, no leftover git locks).
- **WPMN Pack Skill** - rebuild `wpmn-design-system.skill` after changes, then re-save it into Claude.

I make the file edits; Mhasan runs WPMN Save to commit. Don't try to commit from the sandbox (it leaves git lock files behind).

After changing any source CSS, run `npm run build:bundle` so the bundles stay in sync.

---

## Design canon (binding)

Full detail is in `wpmn-design-guideline.md`. The non-negotiables:

- **Tokens only.** Semantic tokens (`--color-*`, `--btn-*`, `--input-*`, `--radius-*`, `--font-*`, `--shadow-*`). No raw hex, no raw font sizes/weights, no off-scale spacing. Never `--primitive-*` in components.
- **Activation.** `data-brand="<key>"` on `<html>` is required (else default WPManageNinja blue). `data-theme="dark"` for dark. Mobile auto-swaps at 768px.
- **Surface pairing.** Dark text on light surfaces, `-invert` text on dark/brand surfaces. A dark section is not just a dark background: every heading, paragraph, and icon on `--color-surface-secondary` must use the `-invert` token. Set `color: var(--color-text-primary-invert)` on the dark root so children inherit white. Never dark-on-dark. (QA: `surface-text-pairing`.)
- **Typography canon.** h1 + body-large (gap 16), h2 + body-medium (12), h3 + body-medium (12), h4 + body-base (8), h5 + body-base (8), h6 + body-small (8). One H1 per page (the hero). Use the `.text-*` classes.
- **Radius.** The 4 semantic tokens only: `--radius-xsm` 8, `--radius-sm` 12, `--radius-md` 16, `--radius-lg` 32. No `--radius-xxs`.
- **Icons.** Hugeicons `stroke.rounded`, one variant per site, inline SVG, `currentColor`, invert on dark.
- **Buttons.** One primary per section. No pill buttons, no underlines.
- **Logos.** Light navbar uses `dark`; dark navbar/footer uses `inverted`. Always inline the real SVG.
- **Motion.** Keyframes prefixed `wpmn-`, everything behind `prefers-reduced-motion`.

---

## Coding rules

- Never use `const` inside function bodies in JSX files. Use `var`.
- Always inline SVG path data for icons. No runtime imports, no bundler dependency.
- Use semantic tokens in components, never raw primitives.
- Component CSS must be duplicated inline in `demo.html`'s `<style>` block (CSS imports get stripped by the loader).

---

## Building pages

- Compose from the library first. For each block, drop in the matching `sections/<id>/section.html` as-is and fill in copy. Only hand-build when nothing fits.
- Use the real components (NavBar, Footer, Buttons, Input) and inline the real logo.
- Set `data-brand` for the product, follow the canon above.
- If hand-building a dark section, follow the dark-section recipe (invert text + icons).

---

## Versioning and safety

- Everything is recoverable through git. `CHANGELOG.md` tracks versions; tags mark restore points.
- Roll back: `git tag -l` to list, `git checkout <tag>` to look, `git reset --hard <tag>` to move back.
- Local-only working files (Products, automation, skills, scratch, `.command`, `.skill`) are gitignored.

---

## Mhasan's goals

- **Short-term:** Shift from Figma to Claude for website work. Design with AI.
- **Long-term:** Full AI-driven workflow, zero manual tool dependency.

---

## Never assume

- Don't assume he's a developer.
- Don't assume he wants formal responses. He prefers casual.
- Don't assume he's a beginner. 10 years of experience.
- Don't assume he works on product design. His focus is websites, not apps or products.
- Don't assume he has a large team. It's 4 people.
