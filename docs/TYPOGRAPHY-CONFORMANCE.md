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

### Pending
- **Middle group (awaiting Mhasan's yes/no):** `feature-card-stack` (h3+large→medium), `animated-feature-grid` (h6+base→small), `pricing-toggle` plan-tiers (h3+base→medium).
- **Issue 3:** `multi-column-cards` CARD titles (h6 + body-base → body-small).
- **Bucket C (big):** convert content-gap + button-gap to semantic tokens (0/56 today). Needs per-section layout judgment.
- **Original screenshot issues:** CTA secondary-on-dark faint border; `mega-footer` layout + button sizes; navbar → use NavBar component + bundle component CSS.
- **Enforcement:** add typography + heading-gap checks to `scripts/design-qa.mjs`.
- **Docs/demo:** ensure guideline + demo fully show the 3-gap within-section sequence.

## Session log
- **2026-06-13** — Confirmed canon + 3-gap model. Fixed cta-banner, the 8 h2-subtext sections,
  pricing-toggle (×2), product-showcase, product-compare-table, feature-tabs-carousel. Logged 8
  exceptions. Built `npm run audit:typo` + this tracker. Heading-gap coverage 2 → 15+/56.
