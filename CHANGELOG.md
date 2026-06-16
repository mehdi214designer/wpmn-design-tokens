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
