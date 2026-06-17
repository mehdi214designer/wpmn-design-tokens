# Typography + Gap Conformance — living tracker

The recurring process for making every section follow the canonical type pairings and the three
gap-token families. **Update the Status + Session log below every time we work on this.**

## How to run the process

```
npm i              # once, installs jsdom for the audit
npm run audit:typo # lists pending pairing + gap violations (excludes known exceptions)
npm run qa         # full design QA (tokens, buttons, spacing, etc.)
```

The loop each session:
1. `npm run audit:typo` → see what's still pending.
2. Triage each flagged item with the rule below (real heading→body vs stat/label/name).
3. Fix one bucket. Log decisions + move items to "Fixed".
4. Re-run the audit, run `npm run qa` (must stay 0 issues).
5. Commit + push, tag a patch version, update this file.

## The canon

**Heading → body pairing** (and the gap token):

| Heading | Body | Gap token | Gap |
|---|---|---|---|
| h1 (xxl) | body-large | `--spacing-h-xxl-to-large` | 16 |
| h2 (xl) | body-medium | `--spacing-h-xl-to-medium` | 12 |
| h3 (l) | body-medium | `--spacing-h-l-to-medium` | 12 |
| h4 (m) | body-base | `--spacing-h-m-to-base` | 8 |
| h5 (s) | body-base | `--spacing-h-s-to-base` | 8 |
| h6 (xs) | body-small | `--spacing-h-xs-to-small` | 8 |

**Three gap families, each keyed differently:**
- `--spacing-h-*-to-*` — heading → its body. Keyed by **heading** size.
- `--spacing-content-gap-*` — text block → image/graphic/next block. Keyed by the **block's heading** (xxl 48 / xl 48 / l 40 / m 24 / s 20 / sm 16).
- `--spacing-btn-in-section-*` — button ↔ adjacent block. Keyed by **button** size (xl 32 / lg 32 / md 24 / sm 20 / xs 16). Button size itself is a free design choice.

## Triage rule (the audit is noisy — read this before fixing)

The audit flags any body-size element after a heading. **Only fix it if it's a real heading and
its supporting paragraph.** It is NOT a heading→body pair (leave it) when it's:
- a **stat number + label** (big number + caption)
- a **name + role** (team card)
- an **eyebrow / meta label** (small label above/below a heading)
- a **price / spec** line

When unsure, look at the markup before changing.

## Decisions & exceptions (kept in sync with the EXCEPTIONS list in the audit script)

| Section | Decision | Reason |
|---|---|---|
| `asymmetric-grid` | exception | editorial 12-col grid, not a header stack |
| `stats-counter` | leave | stat number + label, not heading→body |
| `team-grid` | leave | member name + role |
| `work-portfolio` | leave | h1 + eyebrow/meta label |
| `ecommerce-hero` | leave | label pair |
| `portrait-stats-hero` | leave | stat number + label |
| `product-showcase` (pairing flag) | leave | price/spec text (its gap fix WAS applied) |
| `pricing-table` | leave | per Mhasan's call |
| `pricing-toggle` (h3 flag) | leave | the flag is `.price` ($ amount) + per-text, not heading→body |
| `floating-stats-cta` | exception | `.stat-num` (h2) + `.stat-cap` (body-base) is a stat number + caption, not heading→body. Main h1+lead pairing FIXED (body-large). |

### Audit limitations (known)
- **Tag-selector cards not auto-detected:** sections styling card text via `.card h3` / `.card p`
  (tag selectors) instead of classes aren't caught — e.g. `multi-column-cards` cards. Check these
  manually.
- **"null gap" rows:** when the heading→body gap lives on a flex parent or a heading's
  `margin-bottom` (not the body's `margin-top`), the audit reports the gap as `null`. Verify by
  hand before assuming it's wrong (e.g. `feature-card-stack`, `product-compare-table` are correct).

## Status

### Fixed
| Section | Fix |
|---|---|
| `cta-banner` | h2+large → medium; gap → `--spacing-h-xl-to-medium` |
| `before-after-slider`, `collapsible-drawer`, `content-accordion`, `faq-accordion`, `integration-grid`, `masonry-grid`, `multi-column-cards`, `stacking-cards` | h2 subtext gap 16 → `--spacing-h-xl-to-medium` (12) |
| `pricing-toggle` | card-title gap 12 → `--spacing-h-s-to-base` (8); section subtext body-base → body-medium |
| `product-showcase` | ps-info gap 4 → `--spacing-h-xs-to-small` (8) |
| `product-compare-table` | subtext body-large → body-medium |
| `feature-tabs-carousel` | copy body-base → body-medium; gap → `--spacing-h-l-to-medium` (12) |
| `feature-card-stack` | card-p body-large → body-medium; flex gap → `--spacing-h-l-to-medium` (12) |
| `animated-feature-grid` | card title h6 → h5 (Option B); desc body-base kept; gap → `--spacing-h-s-to-base` (8) |
| `multi-column-cards` (cards) | card title h6 → h5 (Option B); desc body-base kept; gap → `--spacing-h-s-to-base` (8) |
| `floating-stats-cta` | h1+lead → body-large, gap → `--spacing-h-xxl-to-large`; stat-num+stat-cap exception added |

### Pending
- **Heading→body PAIRING: ✅ complete** (audit shows 0 wrong pairings across 57 sections; 2 "null gap" rows are detection artifacts, verified correct).
- **Bucket C (partial):** content-gap coverage 23/57, btn-in-section 6/57. Remaining 34 sections need per-section layout judgment (values don't always match token values, or sections have no visual content block). See session log.
- **Docs/demo:** ensure guideline + demo fully show the 3-gap within-section sequence.

### Done (formerly Pending)
- **Navbar: ✅** `FluentForms-FullPage.html` navbar swapped to canonical `wpmn-navbar__*` classes with mobile drawer. `wpmn-components.css` bundle added via `build-bundle.mjs`.
- **Enforcement: ✅** `scripts/design-qa.mjs` check #14 — heading→body pairing + heading-gap token enforcement via jsdom. Runs as part of `npm run qa`. Two null-gap false positives documented in exceptions.json.

## Component / layout fixes (from the screenshot review)
- **CTA secondary button** (`cta-banner`): faint border → clear 1.5px invert border, fills on hover. ✓
- **Footer** (`mega-footer`): removed the inner white card frame (now full-width, content at 1200);
  CTAs sm→xs (32px); newsletter input 45→40. ✓
- **Navbar / components**: `wpmn-components.css` now bundles all component CSS so `.wpmn-navbar` /
  `.wpmn-btn--primary` / `.wpmn-footer` etc. render; docs tell agents to load it and use the real
  components instead of hand-building. ✓

## Session log
- **2026-06-13 (1)** — Confirmed canon + 3-gap model. Fixed cta-banner, the 8 h2-subtext sections,
  pricing-toggle (×2), product-showcase, product-compare-table, feature-tabs-carousel. Logged 8
  exceptions. Built `npm run audit:typo` + this tracker.
- **2026-06-13 (2)** — Fixed feature-card-stack (card-p → medium, flex gap → semantic). Added
  pricing-toggle to exceptions (price+descriptor). Documented audit limitations.
- **2026-06-13 (3)** — h6 cards via Option B: animated-feature-grid + multi-column-cards card
  titles h6 → h5 (body-base now canon), gaps → `--spacing-h-s-to-base`. **Heading→body pairing
  is 100% conformant** (0 violations across 56 sections at the time). Next: screenshot issues.
- **2026-06-16 (4)** — Fixed remaining screenshot issues: cta-banner ghost-invert button (visible border + fill-hover), mega-footer (removed card-wrapper surface, resized button to xs). Fixed floating-stats-cta: h1+lead → body-large, gap → `--spacing-h-xxl-to-large`; stat pattern added to exceptions. Fixed audit script URL-encoding bug (`fileURLToPath`). QA: 0 issues, 13 documented cases, 57 sections.
- **2026-06-16 (5)** — Bucket C (partial): 23 sections → `--spacing-content-gap-xl/xxl/l`; 6 sections → `--spacing-btn-in-section-lg`. NavBar swap: `FluentForms-FullPage.html` → `wpmn-navbar__*` classes + mobile drawer; `wpmn-components.css` bundle. Scanner enforcement: design-qa.mjs check #14 (typo-pairing + typo-gap via jsdom). QA: 0 issues, 15 special cases, 57 sections.
