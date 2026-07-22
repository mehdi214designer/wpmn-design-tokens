---
name: wpmn-live-redesign
description: Retheme a LIVE website onto the WPMN design system with the layout kept 1:1, by mirroring the real page and re-skinning it in place. Use whenever Mhasan gives a URL and asks to "redesign this site", "retheme this page", "apply our design system to this URL", "make this 1:1 with our design system", or pastes any WPMN product URL (paymattic.com, fluentcommunity.co, fluentforms.com, fluentcrm.com, fluentcart.com, fluentbooking.com, ninjatables.com, etc.) for a redesign. Also use when a previous screenshot-based rebuild "isn't 1:1". NOT for uploaded HTML files or screenshots with no live source — use wpmn-redesign for those. NOT for building new pages from the section library — use wpmn-page-builder.
---

# WPMN Live Redesign — mirror, then re-skin

Retheme a live page onto WPMN tokens while keeping its layout **exactly** as it is.

## The one rule

**Never rebuild a live page from screenshots.** Section-by-section reconstruction always drifts on
proportions, spacing and mockups — it will not be 1:1 and Mhasan will reject it. Mirror the real
page, then change its *properties*. Layout stays 1:1 because it **is** the page.

Screenshot rebuilding is only for static input with no live source (that's `wpmn-redesign`).

---

## Phase 1 — Mirror

```bash
python3 scripts/mirror.py https://<site> <workdir>
```

Fetches `raw.html`, strips trackers, keeps functional JS, localises every asset, writes `page.html`.

**Keep `raw.html` untouched.** It is the clean source to rebuild from when a transform goes wrong.
You cannot delete files in the workspace, so rebuild into a *new* directory.

What the script does, and why each step exists:

- **Strips trackers only** (GTM, gtag, analytics, fbevents, hotjar, clarity, recaptcha, crisp,
  intercom, segment, mixpanel).
- **Keeps jQuery / theme / block JS.** Strip it and tabs, accordions, sliders, mega-menu and lazy
  images all break — panels render as empty coloured boxes.
- **Host → relative** and strips `?ver=` queries, or filenames won't match references.
- **`loading="lazy"` → `eager`.** Native lazy images never paint in a static capture.
- **Two asset waves:** refs in the HTML (`src`, `href`, `srcset`, `url()`), then `url()` refs found
  *inside* the downloaded CSS (fonts, background images), rewritten relative to each stylesheet.

**Gate: render `page.html` and confirm it matches the live page before applying anything.**

---

## Phase 2 — Design layer

Copy `assets/wpmn-reskin.css` into the workdir and adapt. It is authored CSS, not snapped values:

- **Work Sans**, forced with `!important` (must beat inline `font-family`). Exclude only real glyph
  containers: `svg, path, use, g, .dashicons, [class^="fa-"]`.
  **Do not exclude `[class*="icon"]`** — that matches `.kt-svg-icon-list-text`, which is *text*.
  **Caveat:** Work Sans is wider than most source fonts, so headings can wrap an extra line and
  total page height grows a little (a Paymattic hero H1 went 3→4 lines). Not a bug, don't mistake
  it for a layout break.
- **`[data-aos]{opacity:1;transform:none}`** — animate-on-scroll elements stay invisible otherwise.
- **Hide inline video iframes** so the poster/mockup behind them shows.
- **`p { margin-block:16px }`** at low specificity — the UA default `1em` lands off-scale.
- **Size by role, not by class.** One class often serves several roles: on Paymattic
  `.kt-tab-title` was accordion *headings* and two sets of *control labels* at once. Headings →
  h5 25px; control labels → btn-lg 20px. A value can pass a purity check and still be the wrong
  token for the element.

---

## Phase 3 — Token snap

```bash
python3 scripts/snap_tokens.py <workdir> <brand-key>  # e.g. fluentcommunity
python3 scripts/aspect.py      <workdir>              # ratio-hack → aspect-ratio
```

Rewrites `page.html` (inline styles + every `<style>` block) and all `.css` files.

- **Colours** → nearest token by luma-weighted distance, from `reference/brand-ramps.json`
  (all 16 brands) + neutrals + feedback. Covers `#rrggbb`, `#rgb`, `rgb()`, `rgba()`.
- **Typography** — `font-family` value replaced; weight floor 400; sizes snapped (px + rem).
- **Spacing / radius** — snapped across `px`, `rem`, `em`, **radius longhands**
  (`border-top-left-radius`…), `calc()` unwrap + simple arithmetic, and `var(--x, 15px)` fallbacks.
- **Shadows** → nearest `--shadow-*`.

### Scales

Headings 61/49/39/31/25/20 · Body 20/18/16/14/13/10 · **Button 23/20/18/16/13**
Weights 400/500/600/700 · Spacing 0,2,4,8,12,16,20,24,32,40,48,56,64,80,96,120,160,192,224,256
Radii 8/12/16/32

### Content-gap vs heading→body gap — fix the right element

The single biggest time-sink on both runs. A **header block** is a heading plus its supporting
paragraph. Two different gaps, two different nodes, do not confuse them:

- **Heading→body gap** (h1+16, h2+12, h3+12, h4+8, h5+8, h6+8) is the **heading's**
  `margin-bottom`.
- **Content-gap to the next block** (m 24, xl 48, etc.) is the **supporting paragraph's**
  `margin-bottom`, not the heading's. Fixing the heading's margin here does nothing — a checker
  that measures block-to-block distance won't move, because the paragraph is what's actually
  carrying that space.

**The visual gap includes inherited margin.** A checker that measures rendered gap (element top −
previous element bottom) sees `your token + the previous element's own margin`. Setting a CTA
group to `margin-top:24px` still reads as 36px if the element above it already carries a 12px
`margin-bottom` — the fix is zeroing the *preceding* element's margin, not shrinking your token.
(`:has(+ .cta)` on the preceding sibling is one way to target it.)

---

## Phase 4 — Scoping rules (non-negotiable)

**Every rewrite must be scoped to a CSS declaration context. Never a loose string match across a
document containing prose, markup and URLs.** This caused three separate corruptions:

| Mistake | Damage |
|---|---|
| Matching bare font names (`inter`) | `cursor:pointer` → `cursor:po'Work Sans'`; `.wp-social-link-pinterest`; `/fonts/inter/` paths 404'd; body copy "interaction" → "'Work Sans'action". 164 hits. |
| Unguarded `#[0-9a-f]{3}` | Ate HTML entities: `&#038;` → `&#12207d;`, rendering as a CJK glyph. 23 hits. |
| Bare `\{([^{}]*)\}` on HTML | Also matches JS object literals and inline JSON. |

Rules: rewrite font names **only** as the value of a `font-family:` declaration; guard hex with a
negative lookbehind for `&`; restrict rule-body regexes to `<style>` contents and `.css` files.

---

## Phase 5 — What is NOT a token

Do **not** snap these. They are layout mechanisms; the browser reports a *used* pixel value that
changes with the viewport.

| Pattern | Why |
|---|---|
| `margin-left/right: auto` | Centering. 100px at 1440, 20px at 1280, `auto` at 1024. |
| `padding: 20%` / `5%` | Fluid inset that scales with the container. |
| `.aligncenter`, `.site-container` | Auto-centring by definition. |
| screen-reader clip (`margin:-1px`) | Accessibility utility. |

**One of them IS fixable:** the legacy `height:0` + `padding-bottom:X%` ratio hack. `aspect.py`
converts it to `aspect-ratio:100/X; height:auto` — same proportion, no phantom padding. This
clears real violations without touching layout.

If a checker flags the rest, prove it rather than arguing: measure one element at 1440 / 1280 /
1024 and show the number moves. No fixed token can match a moving value. The checker should read
*specified* values for spacing, not computed ones. **This is the tie-breaker for every spacing
dispute** — it settled every one that came up on both reference runs.

**Concrete patterns hit (verified this way, both runs):**

- Negative full-bleed row margins: `-99px @1440 → -24px @1280` (Paymattic).
- Auto-centred row/container margins: `.site-container`, a pricing row: `204 → 124 → 0`.
- `dotlottie-player` margins: `121 → 116 → 0` (FluentBooking).

---

## Phase 6 — Verify

```bash
node scripts/check.mjs "file://<workdir>/page.html"    # needs playwright chromium
```

Computed-style scan against the token sets. **Never trust that the find/replace ran.**

**A clean `check.mjs` is necessary, not sufficient.** It only checks token *membership* for
colour, type-size, spacing and radius. It does **not** check, and a page can pass it while
failing all of the following on a stricter checker:

- heading→body gap (h1+16 … h6+8) and hero-vs-section-header gap
- content-gap between blocks (see Phase 3 — this is the #1 miss)
- line-height paired to the type scale (61→73, 49→59, 31→37, 18→27, 16→24, 14→21, 13→20…)
- per-size button anatomy (height / padding / font-size / weight / glow)
- shadow token match, single-primary-per-section

Don't declare a page done off a clean `check.mjs` alone — run whatever fuller anatomy/pairing
checker is available before handoff, or manually verify these against Phase 3/7 by eye.

Then integrity-check — this catches the §4 corruptions, which a token scan will not:

- HTML entity count before vs after
- known prose strings intact
- asset paths still resolve
- images loaded (`naturalWidth > 0`) == total

Then visual QA. **Caveat:** headless full-page screenshots intermittently drop images that are
present and loaded. Confirm with a per-element screenshot before "fixing" a blank area.

**Caveat:** `file://` blocks JSON/media fetches, both headless and in the Chrome extension. A
perfectly mirrored page can still show a missing Lottie animation or analytics fetch under
`file://` — it resolves once served over `http`. Don't chase it as a real defect.

---

## Phase 7 — Declare what is NOT ours

State this plainly in the handoff. Do not describe a restyle as "our component".

By default this process produces a page that is **token-pure on colour, type, spacing and radius**
but still runs the source site's own buttons and icons. On both reference builds:
`.wpmn-btn` count 0, `wpmn-components.css` not linked, 0 Hugeicons (still Font Awesome / Feather).

**Ask Mhasan up front which wins**, because these conflict:

- Adopting real `.wpmn-btn` means our fixed sizes (xs–xl at 32/40/48/56/64px with our paddings) —
  this **will shift the layout** and break pixel-1:1.
- Hugeicons `stroke.rounded` is a clean swap at the same box sizes, *except* filled glyphs: rating
  stars are solid and the free set is stroke-only, so stars need a stated exception.

Also surface, don't silently decide: brands with no accent token. Paymattic's purple and promo
cyans have no WPMN equivalent, so nearest-token mapping turns them neutral (purple → slate,
cyan → green). That is a visible brand change.

### If Mhasan chooses real components — how to actually swap them in

Adopting `.wpmn-btn` / Input over a mirrored theme (came up mid-FluentBooking) isn't just
find-replace-class. Do it in this order:

1. **Classify by computed fill, not by class name.** Kadence/FluentForms buttons don't map
   cleanly by class. Read each button's rendered `background-color`: opaque → primary,
   transparent → secondary. Bucket height to the nearest of 32/40/48/56/64 for the size. Inline
   text links (height ≤ 24) are **tertiary**, not a boxed size — forcing a 32px box is wrong.
2. **Theme selectors outrank single-class rules.** `wpmn-components.css` is authored at
   single-class specificity, and the theme's own selectors (e.g.
   `.kadence-column… .ff-btn-submit`) beat it, so the component silently loses. Restate the
   Button/Input spec in the reskin layer at higher specificity or with `!important`, copied
   verbatim from the design system.
3. **Form submit buttons are `<button>`, not `<a>`.** A selector like `a.wpmn-btn` misses them —
   use `:is(a,button).wpmn-btn`.
4. **`data-brand` must be on `<html>`**, or every button renders default-blue regardless of the
   product.

### What is NOT a button

The most repeated false-positive across both runs. A height-based checker buckets every
`<button>`/`<a>` as a CTA. These are **not** CTAs and must not take button anatomy:

- Accordion/FAQ triggers (`kt-accordion-header`, `kt-tab-title` used as a panel toggle).
- Social icon links (`social-button`) — these are icon buttons; `SocialIcons` is 32×32 with zero
  padding, so a "btn-xs needs 16px padding" rule would fail our *own* component. Icon buttons are
  exempt from text-button padding.
- Tabs / toggle labels — retheme them, but they're controls, not primary/secondary CTAs.

**The same class serves different roles on different sites — always classify by role per site,
never assume the class.** On Paymattic, `.kt-tab-title` was both content headings (→ h5 25px) and
control labels (→ btn 20px) at once. On FluentBooking, every `.kt-tab-title` was a control label
(all → btn 20px). Same selector, different answer each time — check it fresh per site.

---

## Order of operations

1. Mirror → **verify baseline renders like the live page**
2. Design layer
3. Token snap + aspect fix
4. Integrity check
5. Computed-style scan → iterate
6. Visual QA
7. Package to `Products/<Product>/<Product>_<YYYY-MM-DD>/` as `index.html` + assets

## Never

- Never rebuild a live page from screenshots.
- Never string-replace across the whole document.
- Never snap `%` or `auto` values.
- Never call a restyled third-party button "our component".
