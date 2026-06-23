---
name: wpmn-design-qna
description: Deep design-system QA against the WPMN design system. Audits any target — the repo's own section library, a standalone or built HTML file/page, or a live URL — for canonical Button anatomy, one primary per section, Hugeicons stroke.rounded icons, invert icons on dark surfaces, token purity, radii, the typography canon (heading→body pairing + gap), spacing scale, surface pairing, underlines, reduced-motion, and responsiveness, then fixes every issue and iterates until zero. Use whenever Mhasan says "run design QA", "audit the library", "audit this page/site/URL against our design system", "check this HTML against the design system", "find design system violations", "deep audit", "/wpmn-design-qna", reports something "isn't our design system's button/icon", or after any batch of imports lands. Also use on a single section or page when he flags one screenshot as off-system.
---

# WPMN Design QnA

Find every place a page breaks the design system, fix what you own, and iterate the audit
until it reports **0 issues** — anything legitimately non-standard gets documented as a
special case, never silently ignored. This is the loop that took the library from 104
findings to 0; run it the same way every time, against whatever target you're given.

## Pick the target (three modes)

The scanner (`scripts/design-qa.mjs`) takes the target as an argument. Same checks, same
output, same exit code in every mode.

1. **Library** — the repo's own sections. No argument:
   `node scripts/design-qa.mjs`
   Scans every `sections/<id>/section.html`. This is the default and the one you run after
   imports. You own these files, so here you *fix* until zero.

2. **Any HTML file or built page** — a standalone section, an exported page, or a full
   multi-section landing page:
   `node scripts/design-qa.mjs path/to/page.html`
   Globs and folders work: `node scripts/design-qa.mjs "build/*.html"` or `… dist/`.
   The scanner auto-detects the `.wpmn-sec-<id>` scopes in the file, so "one primary per
   section" and surface-pairing checks group per section even on a full page. Repo-only
   conventions (Unsplash-only assets, `wpmn-` keyframe prefix, namespaced ids, the
   `currentScript` fallback) are skipped here — they're repo housekeeping, not design rules.

3. **Live URL** — a page on the web:
   `node scripts/design-qa.mjs https://product.example.com/page`
   The scanner fetches the served HTML and audits it. This is reliable only when the page
   still ships the WPMN token CSS (a freshly built page, a preview deploy). On a compiled
   production site the tokens are gone, so token-purity findings turn into noise and the
   real check has to look at the *rendered* result. For that, use the rendered audit:

   **Rendered audit (compiled / JS-rendered pages).** Open the URL in Claude in Chrome,
   pull the computed styles and DOM, and check the rendered output against the canon below.
   Token purity can't be verified (the page doesn't expose tokens), so focus on what's
   visible in the render: surface/text pairing (no dark-on-dark, no light-on-light), button
   anatomy (one primary per section, no pills, no underlines, the secondary outline shape),
   icon style (one variant, 24-box, inverts on dark), the type scale and heading→body
   rhythm, the radius scale (8/12/16/32), the spacing scale, and a reduced-motion guard.
   You can't auto-fix someone else's live site — report the deviations grouped by severity
   so they can be handed back.

## The loop (run it exactly like this)

1. **Audit.** From the repo root, run the scanner for your target (above), plus:
   - `node scripts/audit-surface-pairing.mjs` — cascade-aware dark/light text pairing
     (library target; for a single file pass it the path the same way)
   - Balance check: `{`/`}`, `<div>`, `<span>`, `<svg>` open/close counts per file
     (JS-concatenated tags like `'<svg' +` are counting artifacts, not real imbalances)
   - jsdom smoke test: execute each section script with IO/matchMedia/canvas stubs,
     fire scroll + resize, assert no exceptions
2. **Triage every finding into exactly one bucket:**
   - **Real issue** → fix it (patterns in `references/fix-patterns.md` — read it before fixing)
   - **Scanner false positive** → fix the *scanner*, never loosen a rule to hide a real issue
   - **Legitimate special case** → add it to `scripts/design-qa-exceptions.json` with a
     reason a designer would accept (artwork geometry, mock-UI inside an illustration,
     fake logo marks). Exceptions show as ◇ in the report, visible forever.
   On an external/live page you don't own, you report instead of fix — buckets still apply.
3. **Fix in buckets, not one-offs.** Same violation across sections = one scripted patch
   applied everywhere. After editing, never trust the edit — rerun.
4. **Re-run the full gate suite** (step 1 again, plus `node --check` on changed scripts).
   New issues found → fix → repeat. Stop only at `0 issue(s)`.
5. **Verify nothing visual broke** where the fix touched markup (the smoke test catches
   runtime errors, not taste — flag anything that changed an interaction for Mhasan).
6. **Sync the docs.** Any fix that changes or adds a rule updates the matching doc in the
   same commit (`wpmn-design-guideline.md`, `docs/icons.md`, `docs/spacing.md`, `About.md`,
   `README.md`) — a guideline that contradicts the code confuses every AI that reads it.
7. **Ship:** commit as Mhasan (`user.name="Mhasan" user.email="authlabasif@gmail.com"`),
   push `origin master`. The repo is what AI consumers fetch; unpushed fixes don't exist.

## What "on-system" means (the rules the scanner enforces)

- **Buttons** follow `components/Button/Button.css` exactly: primary = `--btn-bg-enable` +
  invert text + `--btn-bg-glow` inset + hovered/pressed; **secondary = transparent bg +
  1.5px solid brand border + brand text, hover fills brand with invert text** (on dark
  surfaces: the same anatomy with `--color-text-primary-invert` border/text — documented
  variant); tertiary = text-only brand. Radius `--radius-xsm`/`--primitive-radius-xs`.
  Never pills, never underlined text (anchor-wrapped buttons need `a{text-decoration:none}`),
  **one primary per section** (checks: `btn-primary-anatomy`, `btn-secondary-anatomy`,
  `btn-outline-border`, `btn-pill`, `btn-underline`, `underline`, `btn-multiple-primary`).
- **Icons**: Hugeicons Pro only (`node scripts/extract-hugeicon.mjs <name> stroke.rounded`,
  `--find <term>` to search 7,800+), one unified variant per site (library standard
  stroke.rounded), 24 viewBox, currentColor; **invert color on dark surfaces, never brand**.
  Logo marks, chart glyphs, and illustration artwork are not icons — exceptions, not fixes
  (checks: `icon-not-hugeicons`, `icon-brand-on-dark`).
- **Tokens only**: no raw hex/rgb(a) outside masks and the `--btn-bg-glow` fallback, no raw
  font sizes/weights/families, radii via tokens or `calc()` over tokens (999px chips OK),
  padding/margin/gap via `--primitive-space-*` / `--spacing-*` tokens (0/auto/negatives/
  calc/clamp and 320/360/480px structural widths allowed), tints via `color-mix()` over
  tokens, every `var()` defined (checks: `raw-color`, `raw-font`, `raw-radius`,
  `raw-spacing`, `undefined-token`).
- **Typography canon**: each heading pairs with exactly one body size and one gap token —
  h1+body-large (16), h2+body-medium (12), h3+body-medium (12), h4+body-base (8),
  h5+body-base (8), h6+body-small (8). One H1 per page (the hero). A stat number+label,
  name+role, eyebrow, or price line is not a heading→body pair (checks: `typo-pairing`,
  `typo-gap`).
- **Surface pairing**: dark text on light, invert text on dark — never crossed. A dark
  section is not just a dark background: the section root sets
  `color: var(--color-text-primary-invert)` and every heading/paragraph/icon inside uses
  the `-invert` token. Hover tint/blur layers live on `::before` under the text, never on
  the text's own element (check: `surface-text-pairing`).
- **Motion**: real motion (keyframes, rAF, intervals, transform transitions) always behind
  `prefers-reduced-motion`; keyframes prefixed `wpmn-` (checks: `reduced-motion`,
  `keyframe-prefix`). Every section ships a `max-width` media query (check: `responsive`).
- **Structure (repo target only)**: scoped `.wpmn-sec-<id>` rules, no bare DOM ids (only
  `wpmn-`-namespaced SVG plumbing), `document.currentScript ? .parentElement : querySelector`
  root fallback, external assets limited to verified Unsplash images (checks: `dom-id`,
  `script-root`, `external-asset`).

## Scope notes

- Run on the whole library by default. For a single flagged section, run the same gates and
  read only that section's findings — but fix the same violation everywhere it exists, not
  just where he saw it.
- For an external file or live URL, you audit and report; you only auto-fix files inside
  this repo. Don't edit someone else's site.
- Never modify core design-system files (`tokens.css`, `primitives.css`,
  `brand-primitives.css`, `typography.css`, `index.css`, `components/`) without asking.
  If a fix seems to require a core change, that's a question for Mhasan, not a patch.
- When a fix encodes a *new* rule (like "one primary per section" did), add it to both this
  skill's rules and the wpmn-section-import skill so imports stop producing the issue.
