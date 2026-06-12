---
name: wpmn-design-qna
description: Deep design-system QA for the WPMN library (wpmn-design-tokens repo). Audits every section against the design system — canonical Button anatomy, one primary per section, Hugeicons stroke.rounded icons, invert icons on dark surfaces, token purity, radii, surface pairing, underlines, reduced-motion, responsiveness — then fixes every issue and iterates until zero. Use this skill whenever Mhasan says "run design QA", "audit the library", "find design system violations", "check the sections", "deep audit", "/wpmn-design-qna", reports something "isn't our design system's button/icon", or after any batch of imports lands. Also use on a single section when he flags one screenshot as off-system.
---

# WPMN Design QnA

Find every place the library breaks the design system, fix them all, and iterate the audit
until it reports **0 issues** — anything legitimately non-standard gets documented as a
special case, never silently ignored. This is the loop that took the library from 104
findings to 0; run it the same way every time.

## The loop (run it exactly like this)

1. **Audit.** From the repo root:
   - `node scripts/design-qa.mjs` — the deep design-system scanner (buttons, icons, tokens,
     radii, underlines, motion guards, responsiveness, script pattern, keyframes, ids, assets)
   - `node scripts/audit-surface-pairing.mjs` — cascade-aware dark/light text pairing
   - Balance check: `{`/`}`, `<div>`, `<span>`, `<svg>` open/close counts per section
     (JS-concatenated tags like `'<svg' +` are counting artifacts, not real imbalances)
   - jsdom smoke test: execute each section script with IO/matchMedia/canvas stubs,
     fire scroll + resize, assert no exceptions
2. **Triage every finding into exactly one bucket:**
   - **Real issue** → fix it (patterns in `references/fix-patterns.md` — read it before fixing)
   - **Scanner false positive** → fix the *scanner*, never loosen a rule to hide a real issue
   - **Legitimate special case** → add it to `scripts/design-qa-exceptions.json` with a
     reason a designer would accept (artwork geometry, mock-UI inside an illustration,
     fake logo marks). Exceptions show as ◇ in the report, visible forever.
3. **Fix in buckets, not one-offs.** Same violation across sections = one scripted patch
   applied everywhere. After editing, never trust the edit — rerun.
4. **Re-run the full gate suite** (step 1 again, plus `node --check` on changed scripts).
   New issues found → fix → repeat. Stop only at `0 issue(s)`.
5. **Verify nothing visual broke** where the fix touched markup (the smoke test catches
   runtime errors, not taste — flag anything that changed an interaction for Mhasan).
6. **Ship:** commit as Mhasan (`user.name="Mhasan" user.email="authlabasif@gmail.com"`),
   push `origin master`. The repo is what AI consumers fetch; unpushed fixes don't exist.

## What "on-system" means (the rules the scanner enforces)

- **Buttons** follow `components/Button/Button.css` exactly: primary = `--btn-bg-enable` +
  invert text + `--btn-bg-glow` inset + hovered/pressed; **secondary = transparent bg +
  1.5px solid brand border + brand text, hover fills brand with invert text** (on dark
  surfaces: the same anatomy with `--color-text-primary-invert` border/text — documented
  variant); tertiary = text-only brand. Radius `--radius-xsm`/`--primitive-radius-xs`.
  Never pills, never underlined text (anchor-wrapped buttons need `a{text-decoration:none}`),
  **one primary per section**.
- **Icons**: Hugeicons Pro only (`node scripts/extract-hugeicon.mjs <name> stroke.rounded`,
  `--find <term>` to search 7,800+), one unified variant per site (library standard
  stroke.rounded), 24 viewBox, currentColor; **invert color on dark surfaces, never brand**.
  Logo marks, chart glyphs, and illustration artwork are not icons — exceptions, not fixes.
- **Tokens only**: no raw hex/rgb(a) outside masks and the `--btn-bg-glow` fallback, no raw
  font sizes/weights/families, radii via tokens or `calc()` over tokens (999px chips OK),
  tints via `color-mix()` over tokens, every `var()` defined.
- **Surface pairing**: dark text on light, invert text on dark — never crossed. Hover
  tint/blur layers live on `::before` under the text, never on the text's own element.
- **Motion**: real motion (keyframes, rAF, intervals, transform transitions) always behind
  `prefers-reduced-motion`; keyframes prefixed `wpmn-`.
- **Structure**: scoped `.wpmn-sec-<id>` rules, no bare DOM ids (only `wpmn-`-namespaced
  SVG plumbing), `document.currentScript ? .parentElement : querySelector` root fallback,
  external assets limited to verified Unsplash images.

## Scope notes

- Run on the whole library by default. For a single flagged section, run the same gates and
  read only that section's findings — but fix the same violation everywhere it exists, not
  just where he saw it.
- Never modify core design-system files (`tokens.css`, `primitives.css`,
  `brand-primitives.css`, `typography.css`, `index.css`, `components/`) without asking.
  If a fix seems to require a core change, that's a question for Mhasan, not a patch.
- When a fix encodes a *new* rule (like "one primary per section" did), add it to both this
  skill's rules and the wpmn-section-import skill so imports stop producing the issue.
