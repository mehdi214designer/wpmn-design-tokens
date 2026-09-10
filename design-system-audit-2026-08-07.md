# WPMN Design System — Full Audit
**Date:** 2026-08-07 · **Auditor:** Claude (Design Strategist pass) · **Scope:** `wpmn-design-tokens` repo as of commit `5083b77`

---

## Method

Everything below is pulled from the live repo, not from the docs describing it — I read the token CSS, ran `scripts/design-qa.mjs`, counted components and sections on disk, computed real WCAG contrast ratios from the hex values in `tokens.css` and `brand-primitives.css`, and diffed the version numbers in `About.md`, `package.json`, and `CHANGELOG.md` against each other. Where docs and code disagreed, code wins and the doc drift is logged as a finding.

Benchmarked against: **Atlassian Design System**, **Apple Human Interface Guidelines**, **Google Material Design 3**, **Microsoft Fluent 2** — four systems chosen because they represent the current top tier on different axes (Atlassian = enterprise multi-product scale, Apple = native platform depth, Material 3 = cross-platform token engineering, Fluent 2 = enterprise + accessibility engineering culture).

---

## Top-line score

**5.9 / 10** — within WPMN's actual job (web marketing pages for 16 WordPress plugin brands, built fast by a 4-person team, increasingly AI-generated).
**5.6 / 10** — if held to the full standard those four benchmark systems set (cross-platform, enterprise governance, full component catalogs).

Read that gap as the headline finding: **WPMN is not a weak system, it's a narrow one that's excellent inside its lane and thin outside it.** The pattern-library and AI-consumption layers are genuinely ahead of the pack. Accessibility, component depth, and governance are behind, and one of the gaps below (a brand-color contrast failure) is a live bug, not a hypothetical.

---

## Dimension-by-dimension

### 1. Token architecture & foundations — 7.5/10
Four-layer cascade (`primitives.css` → `brand-primitives.css` → `tokens.css` → `typography.css`) is a textbook separation of raw values from semantic meaning — the same shape Atlassian and Material 3 use. Light/dark pairs exist for every semantic token. The standout: 16-brand theming off a single `data-brand` attribute, which is a genuinely sophisticated multi-tenant token setup for a team this size — most small design systems don't attempt this at all.

Gaps: tokens exist only as CSS custom properties. There's no [W3C DTCG](https://design-tokens.github.io/community-group/format/) JSON export, no Style Dictionary pipeline — so nothing outside a browser can consume these tokens programmatically (a native app, a design tool sync, a second web stack). Five of 16 brands (FluentBooking, FluentCommunity, Paymattic, FluentSMTP, AzonPress) still ship primary-only, silently falling back to the default accent — confirmed in `brand-primitives.css` and flagged in `About.md`'s own "Pending" list. Brand ramps are hand-set per brand rather than algorithmically derived from a seed color (Material 3's approach), so consistency across 16 brands depends on manual discipline, not math.

### 2. Component coverage — 4/10
Nine real components: Badge, Breadcrumbs, Button, Footer, Input, Logo, NavBar, SocialIcons, Text (plus an Icons library). Verified on disk. `Badge.jsx` and `Logo.jsx` are explicitly listed as not-yet-built in `About.md` — those two are CSS-only with no interactive JSX layer.

This is the single largest gap against every benchmark. There's no modal, dropdown/select, tooltip, tabs, data table, checkbox/radio/switch, alert/toast, pagination, avatar, or date picker as a reusable primitive. Accordion and tab behavior exist, but only baked into specific sections (`content-accordion`, `content-tabs`) — not extractable as components. Atlassian ships 100+, Material 3 ~50 fully spec'd, Fluent 2 ~65. WPMN's component layer covers marketing-page furniture; it has no answer for product UI (settings screens, in-app dashboards) if a WPMN product ever needed one built from this system.

### 3. Section / pattern library — 8.5/10
75 self-contained sections on disk (`ls sections/ | wc -l`) — the docs still say "57-section library" in both `wpmn-design-guideline.md` and `WPMN-Design-System.md`, so the library has grown 32% since the reference docs were last synced. Each section ships with `section.html`, `prompt.md`, and `meta.json`, re-skins automatically via `data-brand`, and is categorized by role (hero, features, CTA, pricing, FAQ, etc.).

This is WPMN's clearest structural strength and it doesn't have a real analog in any of the four benchmarks — they ship components, not finished marketing sections. It's closer in spirit to a page-builder block library than a classic design system, and that's the right shape for what WPMN is actually used for: shipping on-brand pages fast. The doc drift (57 vs. 75) is a one-line fix, not a design problem.

### 4. Accessibility — 3.5/10
This is the dimension where "looks fine" and "is fine" diverge, and I checked the math rather than eyeballing it.

**Verified real contrast ratios** (computed from the actual hex values in `tokens.css` / `brand-primitives.css`, WCAG 2.1 formula):

| Pairing | Ratio | AA normal (4.5:1) | AA large (3:1) |
|---|---|---|---|
| `--color-text-secondary` on `--color-surface-primary` | 6.64:1 | ✅ | ✅ |
| `--color-text-secondary` on `--color-surface-alt` | 6.19:1 | ✅ | ✅ |
| `--color-text-secondary-invert` on `--color-surface-secondary` (dark) | 14.79:1 | ✅ | ✅ |
| `--color-text-brand` accent-300 on white | **2.74:1** | ❌ | ❌ |
| FluentBoards primary `#F1EB62` + invert white button text | **1.25:1** | ❌ | ❌ |
| `--input-stroke/text-*` placeholder on `--input-fill-default` | 1.93:1 | ❌ | ❌ |

The second row is a **live bug, not a theoretical one**: FluentBoards' brand primary-500 is a pale yellow (`#F1EB62`). The design guideline's own button rule says primary buttons use brand background + `--color-text-primary-invert` (white) text. Run that rule with FluentBoards active and you get white text on pale yellow at 1.25:1 — unreadable, and it fails even the most lenient large-text AA threshold by a wide margin. This isn't a one-off section mistake; it's the token system's own default button recipe breaking on one of its 16 brands. The accent-text token (used for the "highlighted word in a heading" pattern shown in the guideline itself) fails AA too, at 2.74:1.

Beyond contrast: across all 9 components combined there are only 9 `:focus`/`:focus-visible` rules and 16 `aria-*` references (`grep -r`). There's no documented keyboard-interaction spec per component, no screen-reader pattern notes, no minimum target-size (44px) audit despite the button size table going down to 32px height. `design-review.md` lists "WCAG 2.1 AA contrast, focus states, target sizes ≥44px" as criteria WPMN uses to audit *other people's* websites — that same bar isn't yet applied to WPMN's own components.

### 5. Responsive system — 5/10
One real breakpoint exists in the CSS: `max-width: 768px` (confirmed — it's the only `@media` query in `typography.css` and `tokens.css`). The mobile type-scale swap and spacing overrides that ride on it work cleanly. But the guideline document describes a distinct tablet behavior (768px–1199px, "container fills width with 40px side padding") that has **no corresponding CSS** — it's prose-only, a doc/code mismatch, not a real tablet breakpoint. Material 3 defines 5 window size classes; Fluent 2 documents 6 breakpoints; Apple's size-class system is native and automatic. WPMN's binary mobile/desktop split is workable for marketing pages but is the thinnest responsive model of the five systems compared here.

### 6. Documentation & governance — 6/10
`WPMN-Design-System.md` is a genuinely well-made single-file reference — "one file, the whole system," organized, cross-referenced, every value traceable to source CSS. That's better packaging than most 4-person teams manage. `CHANGELOG.md` follows Keep a Changelog + SemVer conventions correctly.

But the version story is broken: `About.md` says "Current version: v1.1.0," `package.json` says `1.5.1`, and `CHANGELOG.md`'s newest entry is `1.2.1` — three different numbers, none agreeing, with git log showing unversioned "checkpoint" commits accumulating past all of them. There's no `CONTRIBUTING.md`, no stated design principles or brand-personality doc (the "why" behind decisions — the thing Material calls "adaptable, bold, intentional" and Fluent calls "human, universal, intelligent"), no deprecation policy, no change-proposal process. For a 4-person team this is proportionate, but it's real governance debt versus the benchmarks, all of which run dedicated docs sites with versioned release notes and RFC processes.

### 7. Tooling & automation — 7/10
`scripts/design-qa.mjs` is a real, custom-built linter — I ran it live: 27 open issues and 22 documented, justified exceptions across 75 sections. It checks token misuse, dark/light surface-text pairing, spacing and radius drift, typography heading-to-body pairing, icon-variant mixing, and button anatomy. That's a disciplined signal-to-noise ratio and more automated design QA than most teams this size build at all. `build-bundle.mjs` keeps the generated CSS bundles in sync with source.

Gaps: no CI (no `.github/workflows` — the QA scanner only runs when someone remembers to run it locally, and 27 issues currently sit unresolved in the checked-in library), no visual regression testing, no automated accessibility testing (no axe-core/pa11y despite WCAG being a stated concern elsewhere), and `npm test` is a literal stub (`"Error: no test specified"`).

### 8. AI-readiness — 9/10
This is WPMN's most distinctive strength, and it's arguably ahead of all four benchmarks on this specific axis, not just "good for a small team." `llms.txt`, `AGENTS.md` (a deliberately lean AI entry point), `COMPONENTS.md` (real class names, one example each, copy-pasteable), explicit "For AI" instructions written directly into the reference doc, a single-file `wpmn-bundle.css` for connectors with import limits, a QA scanner that can gate generated output, and a set of purpose-built Claude skills wrapping the whole system. None of Atlassian, Apple, Material, or Fluent currently ship an equivalent machine-first consumption layer — their docs are built for humans first, with AI access as an afterthought (scraping their sites, at best). WPMN inverted that on purpose, and it shows.

### 9. Design-tool integration (Figma) — 3/10
A Figma file is referenced (`54BG58iHusICXloB0fauSM`, labeled "WPMN Design System Beta" in both `About.md` and `README.md`) but there's no token-sync pipeline — no Figma Variables export/import script, no Style Dictionary bridge, no Code Connect mapping. Code and Figma are two disconnected sources of truth, and the Figma side is explicitly still "Beta." Atlassian, Material, and Fluent all run bidirectional token sync between Figma and code as core infrastructure. (Worth flagging: this session has a Figma MCP connector available that could programmatically diff the two files against each other — a concrete next step, not something I did here since this pass was audit-only.)

### 10. Cross-platform reach — 2/10 (context matters here)
CSS custom properties + a thin React layer, web only. No iOS/Android/Flutter token output. This looks like a bad score next to Material 3 or Fluent 2, but those systems are cross-platform *by mandate* — WPMN's actual job is WordPress plugin marketing sites, not native apps. I'm logging this as a real gap only if WPMN's ambitions ever extend past web; as things stand, it's not really a fair deduction, it's a scope note.

---

## Comparative benchmark

Tier legend: 🔴 Emerging · 🟡 Developing · 🟢 Mature · 🔵 Best-in-class · — Not applicable / different product shape

| Dimension | **WPMN** | Atlassian DS | Apple HIG | Material 3 | Fluent 2 |
|---|---|---|---|---|---|
| Token architecture | 🟡 Developing | 🔵 | 🟢 | 🔵 | 🔵 |
| Component coverage | 🔴 Emerging (9) | 🔵 (100+) | 🔵 (full native) | 🔵 (~50) | 🟢 (~65) |
| Pattern/section library | 🔵 (75, unique to WPMN) | — | — | — | — |
| Accessibility | 🔴 Emerging | 🔵 | 🔵 | 🔵 | 🔵 |
| Responsive/breakpoints | 🟡 Developing (1) | 🟢 | 🔵 (size classes) | 🔵 (5 classes) | 🟢 (6) |
| Documentation & governance | 🟡 Developing | 🔵 | 🔵 | 🔵 | 🔵 |
| Tooling & automation | 🟡 Developing | 🔵 | 🔵 | 🔵 | 🔵 |
| AI-readiness | 🔵 Best-in-class | 🔴 | 🔴 | 🟡 | 🟡 |
| Design-tool sync (Figma) | 🔴 Emerging | 🔵 | — | 🔵 | 🔵 |
| Cross-platform reach | — (web-only, by scope) | 🟢 | 🔵 | 🔵 | 🔵 |

---

## What WPMN genuinely does better than the big four

Being critical doesn't mean pretending these aren't real:

1. **The 75-section library has no equivalent in any of the four benchmarks.** They ship components and let you assemble pages; WPMN ships finished, re-skinnable pages. For the actual job (16 product marketing sites, small team, fast turnaround) that's the correct architecture, not a lesser one.
2. **16-brand token theming off one attribute** is a harder problem than any single-brand system (Apple, most of Material) ever has to solve, and it's solved cleanly.
3. **The AI-consumption layer is ahead of the industry, not just ahead of small teams.** `llms.txt` + `AGENTS.md` + a single bundle file + a gating QA scanner is a more deliberate machine-readable design system than Atlassian, Apple, Material, or Fluent currently publish.

## Where it's genuinely behind, ranked by impact

1. **Accessibility** — the FluentBoards contrast failure (1.25:1) is a live, verifiable bug in the token system's own default button recipe, not a hypothetical risk. Zero automated a11y testing compounds it.
2. **Component coverage** — no modal, dropdown, tabs, tooltip, table, or form-control primitives beyond Input. Fine for marketing pages; a hard wall the moment any product UI work is asked of this system.
3. **Documentation integrity** — three disagreeing version numbers (`v1.1.0` / `1.5.1` / `1.2.1`) and a stale section count (57 vs. 75 actual) undermine trust in the docs as source of truth, which matters more here than most systems since AI tools are told to trust these files literally.
4. **Responsive depth** — one real breakpoint; the documented tablet behavior doesn't exist in CSS.
5. **Governance & CI** — no automated pipeline enforcing the QA scanner (27 issues currently unresolved in the live library), no visual regression testing, no contribution/deprecation policy.
6. **Design-tool sync** — Figma and code are disconnected; the Figma file is still "Beta."

This list is ordered for planning, not yet a fix plan — ready to map into phases whenever you want to go there.
