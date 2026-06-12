---
name: wpmn-section-import
description: Imports or recreates website sections into the WPMN design-system library (wpmn-design-tokens repo) as token-pure, responsive, registered sections. Use this skill whenever Mhasan uploads an HTML file, a PNG/JPG screenshot, or a design image and asks to "import this section", "add to our library", "convert to our design system", "create this section", "redesign with our tokens", or anything similar — even if he only says "do this one too" with a file attached. Auto-detects mode by file type, HTML files trigger HTML import mode (keep interactions exactly, retheme every visual to tokens). Images trigger image mode (recreate the layout 1:1 with the design system, motion is Claude's call). Also use when he asks to fix, audit, or re-verify an existing library section.
---

# WPMN Section Import

Convert outside section designs into the WPMN design-system library. The library lives in the
`wpmn-design-tokens` folder (a git repo, branch `master`). Each section ships as
`sections/<id>/section.html` + `meta.json` + `prompt.md`, gets registered in `registry.json`,
and is browsable in `demo.html` with Copy Prompt / Copy Code buttons.

## Mode detection

Look at what was uploaded:

- **`.html` file → HTML import mode.** The file is a working reference. Its interactions
  (scroll logic, timers, easings, lerp factors, thresholds, keyframes) are the product —
  preserve them verbatim. Everything visual (color, typography, spacing, buttons, borders,
  radius, shadows, elements) is retranslated to WPMN tokens.
- **`.png` / `.jpg` / screenshot → image mode.** The image is the spec. Recreate the layout
  100% — same structure, proportions, and content blocks — but built natively from the design
  system. Motion is your call: add tasteful, on-brand motion (reveals, staggers, hovers)
  unless told otherwise.
- Both modes end at the same pipeline: meta + prompt + registry + audits + commit + push.

## Ground rules (non-negotiable)

1. **Never modify core design-system files** (`tokens.css`, `primitives.css`,
   `brand-primitives.css`, `typography.css`, `index.css`, anything in `components/`)
   without asking first. New section folders, `registry.json`, and `demo.html` are fair game.
2. **Tokens only.** No raw hex, rgb(a), raw font sizes/weights/families, or raw radii.
   Derived values use `color-mix()` over tokens. The one allowed literal is the core Button
   glow: `var(--btn-bg-glow, rgba(255,255,255,0.3))`. Masks (`mask-image`) are alpha-only and
   exempt. Read `references/token-map.md` for the full translation table before writing CSS.
3. **Surface pairing.** Never dark text/elements on dark surfaces, never light on light.
   Dark surfaces use `--color-text-*-invert`. Write dark-variant overrides as *element rules
   owned by the dark-scoped class* (`.dark-card h3 { ... }`, never `.card--dark .card-title`)
   so the audit can attribute them — details and audit-dodge patterns in token-map.md.
4. **No external dependencies.** No hotlinked images/videos/fonts/scripts, no Lottie, no CDNs.
   Replace media with verified Unsplash images (list in `references/assets-images.md`) or
   rebuild artwork as token-based CSS/SVG/canvas.
5. **No pill buttons.** Buttons use `--radius-xsm` and the btn tokens, exactly like the core
   Button component. Pill shape (999px) is fine for tags, chips, and badges — never buttons.
   **Icons come from the design system's Hugeicons Pro library** — the FULL package (7,800+
   icons, every variant) is installed at `node_modules/@hugeicons/react-pro`. Never freehand
   an icon — extract the real path with
   `node scripts/extract-hugeicon.mjs <icon-file-name> stroke.rounded`
   (`--find <term>` lists matches).
   **One unified variant rule:** a site uses exactly ONE Hugeicons variant everywhere. The
   library's established variant is `stroke.rounded` (it's what components/Icons, Footer and
   NavBar already use) — every section icon uses it too. Never mix stroke and solid icons in
   the same build; if a project explicitly chooses a different variant, switch ALL icons, not
   some. Sizes per `docs/icons.md`: 24 viewBox, currentColor, 20px in buttons, 24px default,
   32-40px feature icons.
6. **Responsive without fighting the tokens.** `typography.css` already swaps every font token
   at 768px — never write raw mobile `font-size` overrides. Section padding: 96px desktop,
   64px mobile, 1200px container per the guideline. Every section needs working tablet and
   mobile layouts (single breakpoint that stacks everything is acceptable when fluid).
7. **Reduced motion.** Every animation and JS interval gets a `prefers-reduced-motion` guard:
   transitions off, content rendered in its final state.
8. **One primary button per section.** Only one element gets the primary treatment
   (`--btn-bg-enable`); every other action is the light/ghost/secondary style. Two primaries
   on one screen is a hierarchy bug.
9. **Icons on dark surfaces use `--color-text-primary-invert`, never the brand color** —
   brand-colored icons on dark backgrounds break the light/dark theme toggle. Brand color is
   for actions and accents on light surfaces.
10. **Hover layers never sit on text.** Tint/blur overlays go on a `::before` (z-index 0)
   with the text lifted above (`position:relative; z-index:1`) — never blend or tint the
   element that contains the copy.
11. **Docs stay in sync.** If an import decision establishes or changes a rule, update
   `wpmn-design-guideline.md` / the matching `docs/*.md` in the same commit — code and
   guideline must never contradict each other.

## HTML import mode

1. Read the uploaded file fully. Identify: the interaction engine (keep), the visual skin
   (replace), and external assets (replace).
2. Create `sections/<id>/section.html`: one self-contained
   `<section class="wpmn-sec-<id>">` containing a scoped `<style>` (every rule prefixed with
   the section class), markup, and a scoped IIFE `<script>` that resolves its root via
   `document.currentScript.parentElement`. Prefix all `@keyframes` names `wpmn-<abbr>-` to
   avoid global collisions. Replace ids with classes (sections must coexist on one page).
3. Port the JS logic unchanged — same math, same timings — only re-scoped (`sec.querySelector`)
   and with token colors resolved at runtime via `getComputedStyle(sec)` where canvas/JS needs
   a color. If artwork is canvas/WebGL, re-render on `data-brand`/`data-theme` mutations.
4. Rewrite copy to WPMN flavor (Fluent suite products) while keeping structure and line counts
   similar so the layout still holds.

## Image mode

1. Study the screenshot: grid structure, proportions, hierarchy, every card and element.
2. Skip chrome that already exists as components (NavBar, Footer) — build only the section.
3. Map every color to the nearest semantic token (navy headings → `--color-text-primary`,
   blue accents → `--btn-bg-enable`, dark cards → `--color-surface-secondary`, tinted fills →
   `color-mix` of brand over surface). The result must re-skin correctly when `data-brand`
   or `data-theme` changes.
4. Add motion: entrance reveals with stagger (IntersectionObserver), hover states at 120ms,
   one signature touch where the design invites it. Keep it calm.

## Finishing pipeline (both modes)

Follow `references/pipeline.md` step by step: meta.json + prompt.md from the templates,
`node scripts/build-registry.mjs`, `node scripts/audit-surface-pairing.mjs`, the token-purity
scan, markup balance check, JS syntax check, then commit as Mhasan and push to `origin master`.
A section is not "done" until every gate passes and the push succeeds — the GitHub repo is
what AI consumers fetch via registry.json and the prompt.md raw URLs.

When previews look stale to Mhasan after a push, remind him: serve locally with
`python3 serve.py` → http://localhost:8001/demo.html for instant local previews, or
hard-refresh in file:// mode (fetches are cache-busted per page load).
