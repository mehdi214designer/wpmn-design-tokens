# Changelog

All notable changes to the WPMN Design System. Format follows [Keep a Changelog]; versions
follow [Semantic Versioning].

## How we version (read before tagging)

`MAJOR.MINOR.PATCH` — e.g. `1.2.0`

- **PATCH** (`x.y.Z`) — fixes, doc updates, non-breaking section/style tweaks.
- **MINOR** (`x.Y.0`) — new sections / components / tokens, additive and backward-compatible.
- **MAJOR** (`X.0.0`) — **breaking**: a token or class renamed/removed, cascade order changed,
  anything a consumer must update for.

**Every release does all four:**
1. Bump `version` in `package.json`.
2. Add an entry below (move things out of `[Unreleased]`).
3. Tag it: `git tag -a v1.2.0 -m "v1.2.0"`
4. Push the tag: `git push origin v1.2.0`

## How to roll back to a version

- List restore points: `git tag -l`
- Look at one without changing anything: `git checkout v1.1.0` … then `git switch -` to come back.
- Move the branch back to a version (discards newer commits): `git reset --hard v1.2.0`
  (then `git push --force-with-lease` if it was already pushed).
- Undo one bad change but keep history (safest on shared branches): `git revert <commit>`.

---

## [Unreleased]

## [1.5.1] — 2026-08-06

### Added
- **Demo — one-click logo SVG copy** (2026-08-06). Every logo tile in a brand page's "Logos — All
  Variants" showcase (wordmark + icon, all 5 variants) is now click-to-copy. Clicking a tile fetches
  that variant's `.svg` source and writes the raw markup to the clipboard, with a "Copied SVG" flash;
  keyboard-accessible (Enter/Space). New `LogoCopyCard` component in `demo.html`, reusing the same
  `fetchTextLibSafe` + clipboard path the Hugeicons copy already used. Demo-only, no token/component
  or public API change.

### Fixed
- **Demo `Logo` component — GitHub RAW fallback** (2026-08-06). Logos now fall back to
  `RAW_LIB_BASE + src` when the local `logos/<brand>/…svg` path 404s (e.g. `demo.html` opened
  standalone, outside the local server) instead of just fading out. Fixes every logo rendering broken
  in a standalone preview; no effect when the demo is served normally. Demo-only.
- **`wpmn-live-redesign` skill** — hardened from real Paymattic + FluentBooking runs (2026-07-21).
  `scripts/tokenize.py` renamed to `scripts/snap_tokens.py`: the old name shadowed Python's stdlib
  `tokenize` module for anything importing it, breaking `mirror.py` with a misleading "unknown
  brand" error. `scripts/mirror.py`'s asset sweep now also catches
  `<dotlottie-player>`/`<lottie-player>` `src`/`data-src` (missed a 2MB Lottie animation on
  FluentBooking, previously had to be `curl`ed in by hand).
- **`scripts/snap_tokens.py` 3-digit hex color bug** (found 2026-07-22, live FluentSupport run) —
  the 3-digit hex regex excluded a trailing `;` from its lookahead, meaning `border:1px solid
  #ccc;` (the single most common real CSS shorthand pattern) silently never got snapped to a
  token, on every past retheme run, not just this one. 133 instances found unsnapped across one
  page's downloaded plugin CSS before the fix; 0 after. The `(?<!&)` lookbehind alone already
  fully disambiguates real hex from HTML entities (`&#038;`), so the extra `;` exclusion in the
  lookahead was unnecessary and wrong — removed, now matches the (already-correct) 6-digit
  pattern's lookahead. Verified: entity protection and the 6-digit case are both unaffected.

### Changed
- **`wpmn-live-redesign` SKILL.md** — added: content-gap vs heading→body gap guidance (content-gap
  lives on the supporting paragraph's `margin-bottom`, not the heading's — biggest time-sink on
  both runs), a note that the visual gap includes inherited margin from the preceding element,
  explicit scope caveat on `check.mjs` (token-membership only, doesn't check heading→body gap,
  line-height pairing, button anatomy, or shadow/single-primary rules), a "how to actually swap in
  real components" method (classify buttons by computed fill not class, theme selectors outrank
  single-class rules, `:is(a,button)` for submit buttons, `data-brand` must be on `<html>`), a
  "what is NOT a button" category guard (accordion triggers, social icon links, tab labels), and
  caveats for Work Sans reflow and `file://` blocking JSON/media fetches. Phase 5's concrete
  patterns list grew with verified examples from both runs. Nothing removed — the core method
  (mirror-then-reskin, the Phase 4 scoping rules, Phase 5's not-a-token list) held up both times.

## [1.5.0] — 2026-07-21

### Added
- **`wpmn-live-redesign` skill** — retheme a *live* website onto the design system with layout
  kept 1:1 by mirroring the real page (actual DOM/screenshots) and re-skinning it in place,
  instead of reconstructing it section-by-section from scratch. Ships with its own tooling
  (`scripts/mirror.py`, `tokenize.py`, `aspect.py`, `check.mjs`) and a `brand-ramps.json`
  reference. Use for any request that includes a live URL.
- **`wpmn-redesign` and `wpmn-live-redesign` both tracked in git and listed in the Skill
  Library** (`demo.html`) so the team can download either directly. `wpmn-redesign` handles
  uploaded HTML files/screenshots with no live source; `wpmn-live-redesign` handles a live URL
  by mirroring the real page instead of reconstructing it. `wpmn-redesign` briefly sat in
  `Junk/` mid-session before this decision — it's back in `skills-src/` and tracked normally,
  nothing was lost.
- **Plugins & Extensions page** (`demo.html`) — new nav tab for internal WPMN plugins/extensions
  that each live in their own private GitHub repo. Metadata (id, name, description, repo, optional
  branch) lives in `plugins-registry.json` at the repo root — an entry with no `repo` renders as
  "Coming soon". Download button hits `api/plugin-download.js`, a new Vercel serverless function
  that reads a `GITHUB_TOKEN` environment variable server-side and streams back a zip of the
  repo's branch straight from GitHub's zipball API — no GitHub Release needs to exist, it just
  zips whatever's on the branch right now. The token and the private repos are never exposed to
  the browser. This route only exists on the live deployment (`wpmn-design-tokens.vercel.app`),
  not local dev (`serve.py` has no equivalent on purpose, by choice — the token only lives in
  Vercel). `GITHUB_TOKEN` is now set in Vercel; seeded with two real entries, `wpmn-design-checker`
  and `wpmn-demo-seeder` (`mehdi214designer/<repo>`) — both descriptions are placeholders since
  those repos are private and couldn't be read to write real ones, worth a pass to tighten the
  wording.

## [1.4.0] — 2026-07-14

Live Vercel hosting + Skill/Prompt Library + git-tracking fixes.

### Added
- **Live hosting on Vercel** — `wpmn-design-tokens.vercel.app`, auto-redeploys on every push to
  `master`. `vercel.json` rewrites `/` to `/demo.html`. The icon browser now works there too:
  `api/hugeicons.js` and `api/icon-raw.js` (Vercel serverless functions) read the licensed
  `@hugeicons/react-pro` package during the build (auth via an `NPM_TOKEN` environment variable),
  serving the same data the local dev server already did.
- **Skill Library** (`demo.html`) — new nav page listing the 5 WPMN Claude Skills
  (`wpmn-design-system`, `wpmn-landing-page-design`, `wpmn-section-import`, `wpmn-design-qna`,
  `wpmn-visual`) with descriptions read live from each `SKILL.md`, a detail popup with the full
  "how to use" text, and a one-click download of the packaged `.skill`.
- **Prompt Library** (`demo.html`) — new nav page listing every section's `prompt.md` from
  `registry.json`, searchable by name, with a detail popup and download button.
- **5 packaged `.skill` files now tracked in git** (previously gitignored) so they're downloadable
  from the live site: `wpmn-design-system.skill`, `wpmn-landing-page-design.skill`,
  `wpmn-section-import.skill`, `wpmn-design-qna.skill`, `wpmn-visual.skill`. `ui-ux-pro-max.skill`
  (third-party, not WPMN-authored) intentionally stays out of git and out of the library.
- **6 sections that existed locally but never reached GitHub** are now tracked: `agent-scan-hero`,
  `animated-bento-showcase`, `dark-feature-list`, `feature-color-autocycle`,
  `feature-color-switcher`, `stack-scroll-reveal`.
- **New `wpmn-redesign` skill** — retheme-only 1:1 layout preservation for existing pages/designs
  (typo, colors, spacing, buttons, inputs, icons mapped to tokens/components, nothing added,
  removed, or rearranged). Separate from `wpmn-section-import` (which registers new library
  sections) and `wpmn-page-builder` (which composes new pages from the library) — neither fits
  "redesign this existing page, keep the layout exactly."

### Fixed
- **Stale `index.html` removed** — a pre-`demo.html` legacy file at the repo root had a JSX syntax
  bug and was silently winning over the `/` → `/demo.html` rewrite on Vercel (blank screen on the
  live site). Replaced with a one-line redirect stub.
- **`WPMN Save` was silently dropping new files** — it ran `git add -u` (tracked-file edits only),
  so any brand-new file never made it to GitHub (this is how the above 6 sections, `vercel.json`,
  and the skill packages all went missing). Switched to `git add -A`. `.gitignore` cleaned up
  first (`scratch/`, `.trash/`, `__pycache__/` now properly excluded) so this doesn't sweep in junk.
- **`demo.html` missing `--color-surface-icon-brand`** — present in `tokens.css` but never synced
  into `demo.html`'s duplicated `<style>` block, so brand-tinted icon chips silently rendered
  transparent. Added to both light and dark token blocks.

### Changed
- `WPMN Pack Skill.command` now also drops a loose copy of the generated `SKILL.md` at
  `skills-src/wpmn-design-system/SKILL.md` so the Skill Library page can read its description live
  without unzipping the package.
- `skills/wpmn-visual/` (a skill source sitting outside the tracked-source convention) folded into
  `skills-src/wpmn-visual/` alongside the other skill sources.

### Removed
- **Repo-wide cleanup** — moved everything that wasn't the design system itself out to
  `Claud Cowork/Junk/wpmn-design-tokens-cleanup-2026-07-15/` or the right `Products/` folder:
  - Stray product output that had leaked into the repo (some even committed to git):
    `FluentForms-FullPage.html`, `FluentForms-Hero.html` → `Products/FluentForms/`;
    3 `FluentPlayer-Home_*_2026-06-23.html` files → `Products/FluentPlayer/`.
  - Dead/superseded experiments: `showcase_v2/` (an old demo prototype superseded by `demo.html`),
    `library.html` and `preview.html` (orphaned, nothing referenced them), `netlify.toml` (dead
    since hosting moved to Vercel).
  - Backup/scratch cruft: `demo.html.bak`, `_wt_test`, `_conv_hgap.mjs`, `__pycache__/`, an orphaned
    root-level `SKILL.md` duplicate, and `ui-ux-pro-max.skill` (third-party, never belonged in this
    repo).
  - `.gitignore` trimmed to drop the one-off exclusion rules for files that no longer exist.

## [1.3.0] — 2026-07-06

Icon browser in the demo + four new sections + surface-pairing enforcement.

### Added
- **Icon browser** (`demo.html` + `serve.py`) — new **Icons** view in the demo. Browses the full
  Hugeicons Pro set live from the locally installed `@hugeicons/react-pro` package: name search,
  **Style** (stroke / solid / duotone / bulk / twotone) and **Type** (rounded / sharp) dropdowns
  showing only variants that exist, infinite scroll, a per-icon variant strip, click-to-copy inline
  SVG, and a brand/neutral color picker that bakes the chosen color into the copied SVG. New
  `GET /api/hugeicons` endpoint lists icon names + variants from local `node_modules`. **No icon
  data is committed** — a clone without the licensed package shows a "not installed" note
  (public-repo / Pro-license safe).
- **4 sections** (all tokenized): `app-scan-hero` (ToDesktop Electron hero — atom spinner, feature
  tabs, app-scan window), `scrollspy-accordion` (sticky numbered nav synced to scrolling image
  cards), `testimonial-carousel` (peek carousel of tinted quote cards), `quote-card-carousel`
  (dark folder-notch testimonial slider).
- **`WPMN-Design-System.md`** — full single-file reference: every token value, brand hex, the
  canon, and all sections indexed.
- **`scripts/design-qa.mjs` — `surface-text-pairing` check** — flags dark sections
  (`--color-surface-secondary`) that use non-invert text (the "invisible heading" bug).

### Changed
- `scripts/design-qa.mjs`: now audits any target, not just the repo library. Pass an HTML
  file, a glob, a folder, or a live URL (`node scripts/design-qa.mjs page.html` /
  `"build/*.html"` / `dist/` / `https://…`). Full multi-section pages get per-section scoping
  for "one primary per section" and surface pairing; repo-only conventions (Unsplash assets,
  `wpmn-` keyframe prefix, namespaced ids, `currentScript` fallback) are skipped on external
  targets. Default no-arg library run is unchanged (byte-identical findings).
- `wpmn-design-guideline.md` / `llms.txt` / `CLAUDE.md`: documented the dark-section recipe
  (invert text + icons) and expanded the surface-pairing rule.
- `wpmn-design-qna` skill: documents the three audit modes (library / HTML file / live URL)
  plus the rendered Chrome audit for compiled pages; rules list now spells out the typography
  canon (`typo-pairing`, `typo-gap`), spacing scale (`raw-spacing`), and the full check names.
- `demo.html`: navbar uses the dark logo variant on the light bar (matches the logo rule).

## [1.2.6] — 2026-06-17

### Added
- `./components` package export for `wpmn-components.css`.

### Changed
- `AGENTS.md` / `COMPONENTS.md` / `llms.txt`: instruct agents to load `wpmn-components.css` and use
  the real NavBar / Footer / Button components instead of hand-building them.
- `hero-standard`: heading→body gap → semantic `--spacing-h-xxl-to-large` (pixel-identical).

## [1.2.5] — 2026-06-16

Bucket C semantic gap tokens + NavBar component swap + scanner enforcement.

### Added
- **`wpmn-components.css`** — new component CSS bundle (all `components/<Name>/<Name>.css` concatenated). Load after `wpmn-bundle.css` for full-page HTML.
- **`scripts/build-bundle.mjs`** — now also generates `wpmn-components.css`.
- **`scripts/design-qa.mjs` check #14** — typography pairing + heading-gap enforcement using jsdom. Verifies heading→body size canon and `--spacing-h-*-to-*` gap tokens for all 57 sections. Two flex-container null-gap false positives documented in `design-qa-exceptions.json`.

### Changed
- **23 sections** — `--spacing-content-gap-xl` (h2) and `--spacing-content-gap-xxl` (h1) applied: bento-grid, blog-cards, collapsible-drawer, comparison-table, content-tabs, dark-features-panel, expandable-table, faq-accordion, fibonacci-bento, hero-standard, integration-grid, masonry-grid, mockup-showcase, multi-column-cards, pricing-table, product-showcase, stacking-cards, stats-counter, steps-walkthrough, team-grid, testimonial-grid, timeline-roadmap, zigzag-features.
- **1 section** — `feature-tabs-carousel`: `--spacing-content-gap-l` (h3).
- **6 sections** — `--spacing-btn-in-section-lg` applied: hero-standard, hero-typographic, cta-banner, comparison-table, feature-tabs-carousel, split-screen.
- **`FluentForms-FullPage.html`** — navbar swapped from custom `.navbar` classes to canonical `wpmn-navbar__*` component classes with mobile hamburger drawer.
- **`scripts/design-qa-exceptions.json`** — two `typo-gap` null-gap false positives added (feature-card-stack, product-compare-table).

## [1.2.4] — 2026-06-16

Typography conformance passes 2-3 + screenshot issue fixes.

### Fixed
- `floating-stats-cta` — headline→lead pairing h1+medium → h1+large; gap → `--spacing-h-xxl-to-large`; icon exception documented.
- `animated-feature-grid`, `multi-column-cards` — card title h6 → h5 (fits body-base canon); desc gap → `--spacing-h-s-to-base`.
- `feature-card-stack` — card-p body-large → body-medium; flex gap → `--spacing-h-l-to-medium`. Heading→body pairing now 100% conformant across all 57 sections.
- `cta-banner` — ghost-invert button: border `color-border-primary-invert` → `color-text-primary-invert` (visible on brand surface); hover now fills with invert text.
- `mega-footer` — remove card-wrapper surface (background/border-radius/padding-top); button resized to xs (height 32px, font btn-xs); input height 45 → 40px.

### Changed
- `scripts/typo-gap-audit.mjs` — fixed URL-encoding bug (`fileURLToPath` instead of `.pathname`); added `floating-stats-cta` stat-number exception.
- `docs/TYPOGRAPHY-CONFORMANCE.md` — session log updated; floating-stats-cta decisions added.
- `scripts/design-qa-exceptions.json` — documented `floating-stats-cta` icon-brand-on-dark false positive.
- `serve.py` — port 8001 → 8910.

## [1.2.3] — 2026-06-13

Typography/gap conformance — pass 1 + a recurring, resumable process.

### Added
- `npm run audit:typo` (`scripts/typo-gap-audit.mjs`) — re-runnable audit of heading→body
  pairings and gap tokens; skips documented exceptions (stat/label/name patterns).
- `docs/TYPOGRAPHY-CONFORMANCE.md` — living tracker: canon, process loop, triage rule,
  decisions/exceptions, and Fixed/Pending status (update every session).
- `jsdom` devDependency (the audit parses section DOM).

### Changed (13 sections to canon)
- `cta-banner`, the 8 h2-subtext sections (before-after-slider, collapsible-drawer,
  content-accordion, faq-accordion, integration-grid, masonry-grid, multi-column-cards,
  stacking-cards), `pricing-toggle`, `product-showcase`, `product-compare-table`,
  `feature-tabs-carousel` — brought to canonical heading→body pairing / gap tokens. Details in
  the tracker. Conformance is ongoing (see Pending).

## [1.2.2] — 2026-06-13

Verification feedback from a consuming agent: the raw primitives were still grep-able and
typography had two equally-promoted approaches.

### Fixed
- `primitives.css`: guard comment on the `--primitive-radius-*` block ("RAW — do not use in
  components; use semantic `--radius-*`"), so an agent grepping the bundle is warned at the
  definition, not just in the rules. Rebuilt `wpmn-bundle.css`.
- Typography: picked a canonical approach — use the `.text-*` classes in markup; `--font-size-*`
  vars are for custom CSS only. Documented in `COMPONENTS.md`, `llms.txt`, and the bundle header.

## [1.2.1] — 2026-06-13

### Changed
- `docs/brands.md`: sync the FluentMembers entry to its current CSS values — Primary "Vivid
  Fandango" `#824EEB`, Accent "Vivid Lavender" `#611CEB` (the doc still listed the old pink /
  golden-yellow; `brand-primitives.css` was already purple).
- `docs/mockup.md`: mockup treatment rule is now "float directly on the section background"
  (removed the "always wrap in a surface container / never float on white" rule), matching the
  current sections and the page-builder skill.

## [1.2.0] — 2026-06-13

Spacing tokenized + enforced across the whole library, and the design system made
AI-consumable (single bundle, clear entry, real token names). Non-breaking: no public token or
class was renamed or removed.

### Added
- `wpmn-bundle.css` — the entire token system in one file (primitives + brand + tokens +
  typography, cascade order), so connectors with a file-import cap can't drop a piece.
  Generated by `scripts/build-bundle.mjs`.
- `--spacing-icon-size-sm/md/lg` (20/24/32px) in `tokens.css`.
- `AGENTS.md` — lean AI entry point (read only bundle/registry/COMPONENTS/llms; ignore the rest).
- `COMPONENTS.md` — every component's real class names + one example each.
- `scripts/design-qa.mjs` check #13 (`raw-spacing`) — enforces spacing tokens.
- `/reference/` folder for heavy background docs (kept out of git; agents told to ignore it).
- `.skill` rewrites (delivered separately, not in repo): `wpmn-page-builder`,
  `wpmn-landing-page-design` — both now library-first + real-logo + tokens-only.

### Changed
- All 56 sections: every `padding/margin/gap` is now a `--primitive-space-*` token
  (824 pixel-identical swaps + 137 approved off-scale snaps; `320/360/480px` and negative
  offsets kept as documented exceptions).
- `steps-card-stack`: card layout rebuilt (left content / right number+CTA, 64px gap to image,
  image fills the card).
- Docs synced — `wpmn-design-guideline.md`, `llms.txt`, demo Guidelines page — spacing token
  families + decision order + fallback, hero-vs-section heading rule.
- `README.md` + `brand-primitives.css` — prominent `data-brand` activation guidance.

### Fixed
- Radius naming clarified everywhere: use the 4 semantic tokens `--radius-xsm/sm/md/lg`
  (8/12/16/32); `--primitive-radius-*` is the raw layer, not for component use; there is no
  `--radius-xxs`.

## [1.0.0] — 2026-04-24

Initial foundation: tokens, primitives, brand primitives, typography, the React components,
and the first sections. (The `v1.0.0` and `v1.1.0` tags both point here — versioning wasn't
maintained between this and 1.2.0; treat git history as the record for that gap.)

[Keep a Changelog]: https://keepachangelog.com/en/1.1.0/
[Semantic Versioning]: https://semver.org/spec/v2.0.0.html
