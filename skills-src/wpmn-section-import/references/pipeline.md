# Finishing pipeline

Run from the wpmn-design-tokens repo root. Section id is kebab-case and descriptive
(`feature-scrollspy`, not `section7`).

## 1. meta.json template

```json
{
  "id": "<id>",
  "name": "<Human Name>",
  "type": "html",
  "status": "stable",
  "description": "<one sharp sentence: what it is + what moves>",
  "files": { "html": "sections/<id>/section.html" },
  "prompt": "sections/<id>/prompt.md",
  "dependsOn": ["index.css"],
  "baseClass": "wpmn-sec-<id>",
  "interactions": ["<each interaction with exact timings/easings>"],
  "tokensUsed": ["<every token the section consumes>"],
  "brands": "all",
  "themes": ["light", "dark"],
  "category": "Sections",
  "subcategory": "<Banners & Impact|Grids|Scroll & Motion|Interactive|Disclosure|Lists & Feeds|Trust & Social Proof>",
  "role": "<Hero|Features|Content|Showcase|How It Works|Stats|Pricing|Comparison|Testimonial|Clients|Team|FAQ|Roadmap|Blog|Integrations|Newsletter|CTA|Footer|Announcement>",
  "span": 2,
  "tags": ["<search terms>"]
}
```

## 2. prompt.md structure (the Copy Prompt payload)

Sections, in order: title + one-paragraph summary · "The reference implementation is the
source of truth" + raw URL `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/<id>/section.html`
· **Interaction rules (keep exactly as reference)** with literal numbers ·
**Layout rules (WPMN design guideline)** with token names ·
**Surface and text pairing (hard rule)** block · **Required token CSS** (raw index.css URL) ·
**Output format** (single self-contained section, scoped style + IIFE script, no external deps).

## 3. Validation gates — all must pass

```bash
node scripts/build-registry.mjs            # registers the section, must report no warnings
node scripts/audit-surface-pairing.mjs     # must end "N sections clean" (needs: npm i --no-save linkedom)
```

Token purity + structure (inline python): no raw `#hex`/`rgb(a)` outside masks and the
btn-bg-glow fallback; no raw `font-size: Npx` / `font-weight: N`; every `var(--x)` defined in
the four token files or as a section-local derived property; `{`/`}` counts match;
`<div>`-open count equals `</div>` count; `node --check` on the extracted script.

If a browser-level check is wanted, smoke-test with jsdom: execute the script with
IntersectionObserver/matchMedia/canvas stubs, fire scroll + resize, assert no exceptions.

## 4. Publish (keeps the local↔GitHub bridge)

```bash
git add sections/<id> registry.json
git -c user.name="Mhasan" -c user.email="authlabasif@gmail.com" commit -m "Add <id> section (...)"
git push origin master
```

Push is pre-approved as the final step of every change. Never commit unrelated untracked
files sitting in the repo folder. If push is rejected (remote ahead): stash → pull --rebase
→ pop → push.
