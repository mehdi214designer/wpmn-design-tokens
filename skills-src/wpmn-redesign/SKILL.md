---
name: wpmn-redesign
description: Retheme an existing page or design onto the WPMN design system with the layout kept 1:1 — no new sections, no library registration, no rearranging. Use this skill whenever Mhasan uploads an old/existing HTML file, screenshot, or live page and asks to "redesign this", "retheme this to our tokens", "keep the layout", "1:1", "convert this old design", "don't change the structure", or "just swap typo/colors/spacing/buttons/inputs to ours". This is distinct from wpmn-section-import (which registers a brand-new section in the library with meta.json/registry/git pipeline) and wpmn-page-builder (which assembles a new page from existing library sections) — neither of those preserves an arbitrary existing layout untouched. Use this one whenever the goal is "same layout, our design system's properties."
---

# WPMN Redesign — retheme an existing page 1:1

Re-skin an existing page or design onto WPMN tokens and components while keeping its layout
exactly as it is. The input file's structure IS the spec — you are not building a new page and
not adding anything to the section library.

## The one rule that fixes everything

**You are re-skinning, not rebuilding.** If you catch yourself reaching for
`sections/<id>/section.html` to swap a block in, or reorganizing content into a "cleaner"
layout, stop — that's a different job (see wpmn-page-builder / wpmn-section-import). Every
element in your output must map to a specific element in the input. Three cards in a row in,
three cards in a row out — not a different pattern that also happens to have three cards.

## Step 1 — Read the input fully

Before writing anything, go through the uploaded file or page top to bottom and note, for every
distinct element:

- Font size + weight for each heading level and body text
- Every background and text color
- Every padding, margin, and gap value
- Border-radius values
- Button styles (and how many "primary-looking" buttons currently exist per screen)
- Input/form field styles
- Icon style and where icons sit
- Which blocks are visually "dark" vs "light"
- Which visual elements are background decoration (patterns, textures, gradients — full-bleed,
  sit behind everything) versus foreground content graphics (icons, images, screenshots placed
  at specific positions). These are never the same thing — get this separation right before
  touching color or spacing.
- Real photography, real user avatar photos, and real third-party brand/partner logos used
  anywhere in the design.
- Every distinct accent color in use — a design can deliberately use more than one color, not
  just the brand primary (a promo button in a different color, one component's active state in
  a different color from everything else).
- Any sticky or floating element that stays on screen during scroll (a floating CTA bar, a
  chat widget, a back-to-top button).

**Turn this into a numbered inventory before moving on.** List every real photo, every real
avatar, every real third-party logo, and every distinct accent color you found, each with a
note on where it must reappear in the output. This list is not optional bookkeeping — it's
what Step 5 checks the finished output against, item by item.

## Step 2 — Do not change

Element order, section order, grid/flex structure, column counts, breakpoint behavior, which
blocks were light vs dark, content wording or length (unless asked), image/media placement,
number of items in a repeating group (cards, list items, etc.).

- **Internal arrangement of repeating components** — if a card/item originally places an image
  beside its text (side-by-side), the output keeps them side-by-side, not stacked top-to-bottom
  (or vice versa). This is layout, not styling — never change how elements are arranged
  relative to each other within a component.
- **Multi-column layouts** (like a footer's logo + link-column grid) must keep the same number
  of columns arranged side-by-side at desktop width — don't collapse them into a single stacked
  column. This applies to any multi-column grid, not just cards: footers, comparison tables,
  and multi-column feature lists all keep their column count and side-by-side arrangement.
- **Interactive/navigational controls** (carousel prev/next arrows, pagination dots, tabs,
  accordion triggers, toggles) must never be dropped — they're functional layout elements, not
  decoration. Retheme their visuals (real Hugeicons icons, our button/icon-chip tokens) but
  keep them present, same position, same job.
- **Sticky/floating persistent elements** — if the original has a floating CTA bar, chat
  widget, back-to-top button, or any other element that stays fixed on screen during scroll,
  reproduce it as a fixed/sticky-positioned element in the output. Don't drop it just because
  it sits outside the normal document flow — it's still a functional element of the page.
- **Masonry / staggered column layouts** — if the original stacks cards into independent
  columns where each card's vertical position depends on the actual height of the card above
  it in that same column (a true masonry layout, not a row-aligned grid), reproduce that same
  independent-column behavior. Don't force cards into row-paired alignment (where the left and
  right cards must match height or position) if the original didn't do that — a taller card in
  one column should only push down the next card in that same column, not sync with the other
  column.
- **Copy must be reproduced in full, character for character** — including text collapsed
  behind a "Read more" / "Read More" link. Never shorten, summarize, or silently drop any
  portion of the original copy, even if the full text makes a card taller than convenient. If
  the original truncates visually behind a "Read more" link, keep that same link and the same
  full underlying text.

## Step 3 — Map every property to its nearest system equivalent

- **Typography** — map each heading level and body style to the nearest `.text-*` class by
  rendered size/weight. Apply the canonical heading→body gap for that level (h1 + 16, h2/h3 + 12,
  h4/h5/h6 + 8) — this is a spacing normalization, not a layout change.
  - **No orphan words** — a heading's last line should never be a single short word standing
    alone. If wrapping at the container width produces that, fix it (e.g. a non-breaking space
    between the last two words, or adjust the heading's max-width) so it reads cleanly. This is
    a copy-flow/polish fix, not a layout change, and applies even in strict 1:1 mode.
  - **Hero vs section header gap** — `--spacing-h-xxl-to-large` applies only to the page's
    single H1 hero header. Every other section header (h2/h3 intro blocks) below it uses
    `--spacing-h-xl-to-medium` or `--spacing-h-l-to-medium` per the heading level, never the
    hero's gap value.
- **Colors** — map every color to the nearest semantic token (`--color-*`). Preserve which
  blocks were light vs dark in the original; apply `-invert` text/icon tokens on whichever
  blocks were already dark. Don't reinterpret the light/dark pattern — if the original had a
  dark testimonial strip, the output has a dark testimonial strip, same position.
  - **Tinted/colored backgrounds** — if the original background is a tinted/colored surface,
    light or dark, don't flatten it to a neutral token. This includes dark brand-tinted panels
    (like a deep purple/indigo) — don't default to the plain neutral dark surface token just
    because it's dark; if the original wasn't neutral black/gray, it was a color. Map it to the
    closest matching color: prefer a semantic surface token if one exists at that tint; if none
    fits, pull the nearest value directly from `brand-primitives.css` (light or dark end of the
    ramp) rather than defaulting to neutral white or black. A colored background — light or
    dark — is a real property of the design and must stay a colored background, just remapped
    to our palette.
  - **A design can use more than one accent color on purpose** — a brand primary for most CTAs,
    plus a distinct secondary/tertiary color for a specific one-off element (a promo button,
    one component's active/selected state). Don't force every colored element onto the single
    brand-primary token just because that's the main accent elsewhere on the page. Identify
    each distinct accent color in Step 1's inventory; if the design system has no matching
    secondary token, use the closest available brand-adjacent option rather than collapsing
    everything to one color.
  - **Component-level details** (active/selected states, hover indicators, list/menu item
    spacing, dividers, highlight boxes) are part of the layout, not visual skin to reinterpret.
    Reproduce them exactly as structured in the original — same highlight box or underline on
    the active item, same position, same spacing — just using our tokens for the color/radius
    values. If the active/selected state used a solid color fill for contrast (e.g. a colored
    toggle/tab), reproduce that same solid fill — don't downgrade it to a plain white or
    low-contrast background that reduces legibility against the surrounding surface.
  - **Section-to-section adjacency** — if the original had one block's background flow
    directly into the next with no gap (or overlapping/inset into the previous one), don't
    insert padding or margin between them. Matching spacing *between* blocks matters as much as
    matching spacing *within* a block — don't apply standard section padding as a default if
    the original didn't have separation there.
  - **Surface vs card hierarchy** — when the original has a two-tone layout (e.g. white cards
    on a soft-gray page background, or the reverse), identify which tone is the page/section
    background and which is the card/container background, and map each to its correspondingly
    matching token without swapping them. If cards were white and the surrounding background
    was soft gray, the output's cards stay white and the surrounding background stays soft gray.
  - **Background patterns/textures** — if the original background has one or more decorative
    patterns (grid lines, dot/world-map pattern, noise texture, gradient), reproduce every one
    of them as background layers — a design can stack more than one (e.g. a grid AND a
    world-map dot pattern together). Never drop one because another was handled. Recreate them
    with CSS using token colors so they re-skin correctly across brands/themes. Foreground
    content graphics (like a cluster of product icon tiles flanking a heading) are discrete
    positioned elements, not a repeating background texture — never convert a foreground
    graphic cluster into a tiled background pattern, and never let it collide with or replace
    an actual background layer.
  - **Match the type of pattern, not just its presence** — an organic/illustrated pattern
    (leaves, waves, blobs, hand-drawn shapes) must be reproduced as an organic/illustrated
    pattern, not substituted with a generic geometric grid or dot pattern because that's easier
    to build. A grid/dot pattern should only appear in the output where the original actually
    had a grid/dot pattern — don't default to it as a stand-in for "some kind of texture."
- **Spacing** — snap every padding/margin/gap to the nearest `--primitive-space-*` value.
  Snap to the *closest* value to preserve the original's proportions and rhythm. Do not force
  the canonical 96px/64px section padding onto a page that wasn't built that way — that changes
  the layout's feel, which this mode exists to avoid.
  - **Recurring structural relationships use the named semantic spacing tokens, not the raw
    primitive scale**, per `wpmn-design-guideline.md`'s decision order:
    - `--spacing-content-gap-*` (48/48/40/24/20/16) — between major blocks in a section:
      header→grid, text-block→image/graphic block, block→block.
    - `--spacing-h-*-to-*` — heading-to-body gap, sized to the heading scale in use (h1+16,
      h2/h3+12, h4/h5/h6+8), same as the Typography canon above.
    - `--spacing-btn-in-section-*` (32/32/24/20/16) — around/within the CTA button group.
    - `--spacing-icon-size-*` (20/24/32) — icon box sizing.
    - `--spacing-section-padding-tb-desktop` (96px desktop / 64px mobile) and
      `--spacing-section-gap-desktop` (80px) — a section's own top/bottom padding, and the gap
      between adjacent sections, when the original actually has that kind of generous
      section-level breathing room (not a bleed/overlap layout — the Section-to-section
      adjacency rule above still wins when the original truly has zero gap). Container
      max-width 1200px, side padding 32px desktop / 20px mobile.

    Only fall through to the raw `--primitive-space-*` scale when none of these named
    categories fit. Once a token is picked for a given relationship, apply that exact same
    token everywhere that relationship recurs on the page — don't re-derive it per instance.
  - **Repeating components stay internally consistent** — if every instance of a repeating
    card/pattern shared the same spacing in the original, apply one consistent value across
    every instance. Snap once, apply everywhere that pattern repeats — don't let each instance
    drift to a slightly different nearest-token value independently.
  - **Repeating siblings in a comparison layout** (pricing tiers, feature columns) must stay
    the same size as each other if they were the same size in the original. Don't let one grow
    taller or wider because of an added visual treatment (filled button, extra badge, scale-up)
    that wasn't in the original — any highlight treatment must fit within the same footprint as
    its siblings.
- **Radius** — map to the nearest of the 4 semantic radius tokens (`--radius-xsm/sm/md/lg`).
- **Buttons** — swap markup/CSS to match `components/Button/Button.css` exactly, in the same
  position and size role the original button had. "One primary per section" and "no pill
  buttons" still apply — these are visual-correctness fixes, not layout changes, so fix them
  even in strict 1:1 mode. Exception: in a repeating comparison pattern (e.g. pricing tiers,
  plan columns) where the original gives every CTA the same equal-weight treatment (e.g. all
  outlined), preserve that — matching the original exactly takes priority over "one primary per
  section" here. The standout tier's distinction should come from whatever cue the original
  actually used (a badge, a border highlight), not from changing one button's fill.
- **Inputs** — swap markup/CSS to match the Input component, same position and size.
- **Icons** — replace any freehand, icon-font, or generic icon with the real Hugeicons
  `stroke.rounded` icon at the same position and size
  (`node scripts/extract-hugeicon.mjs <icon-file-name> stroke.rounded`, `--find <term>` to
  search). Never redraw or approximate an icon.
  - **Icon containers/chips** — match the original's actual treatment exactly. If the source
    uses a solid filled background with no border, reproduce it as a solid fill only — don't
    add a border or ring around it. Only add a border if the original design actually had one.
    Use the closest icon-chip surface token for the fill color.
  - **Social/brand icons** (Facebook, X, YouTube, LinkedIn, WordPress, etc.) are not Hugeicons —
    use the design system's real `SocialIcons` component (`components/SocialIcons/`) for
    accurate brand glyphs, never freehand or approximate them. Match the original's container
    treatment exactly: if the original shows bare icon glyphs with no circle/border/background,
    reproduce them bare — don't invent a circular chip or border around them just because other
    icon rules elsewhere call for a container.
- **Logo** — inline the real brand SVG from `logos/<brand>/`, correct type for the surface it
  sits on (see `wpmn-design-guideline.md` → Logo Usage).
- **Real photos, avatars, and third-party brand/partner logos get copied, never recreated.**
  This mode retheme colors/spacing/typography/components — it does not regenerate content
  imagery. If the original uses a real photograph, a real user avatar, or a real third-party
  brand/partner logo, download that actual file from the source and save it locally next to the
  output (an `images/` folder alongside the HTML), then reference the local copy. Do not:
  redraw it as an SVG/icon composition, replace it with a different stock photo, or reduce a
  logo to plain text/initials. A verified Unsplash substitute is a last resort only, for the
  rare case where the exact original asset genuinely cannot be downloaded — it is not the
  default move, and never applies to brand/partner logos (find the real logo instead). This is
  the single most common way this mode goes wrong — check every item in Step 1's inventory
  against the finished output before delivering.
- **Images & illustrations** — reproduce the original's image treatment exactly. If the
  original has no inner frame, border, or padding around an image (it bleeds directly to the
  card/container edge), don't add one. Never crop or clip an image or illustration that wasn't
  cropped in the original — the full graphic must render uncut. Only round the image's corners
  to match the card if the original did that; don't introduce a separate inner container that
  clips content.
  - **Graphic/image anchor position** — if a graphic or screenshot is anchored to one edge of
    its container (e.g. stuck to the bottom, overflowing or cropping there intentionally),
    preserve that exact anchor. Don't center an image that was edge-anchored in the original —
    alignment within a container is a layout property, not a styling choice.
  - **Graphic/video size relative to container** — reproduce the original's image/video
    dimensions relative to its container width, not just its position. If the original graphic
    spans full width (edge-to-edge or near it) within its section, the output's graphic spans
    the same relative width — don't shrink it and add surrounding whitespace that wasn't there,
    and don't enlarge it either.

## Step 4 — Ground rules that still apply

- Tokens only — no raw hex, rgb, px font sizes, or off-scale spacing anywhere in the output.
- No hotlinking to the live source site — download every real content image (photos, avatars,
  brand/partner logos) and save it locally next to the output, then reference the local file.
  This mode is retheming an existing design, not building new content, so the original images
  are real assets to preserve, not placeholders to replace. Verified Unsplash images are only
  for the rare case where an original asset can't be downloaded at all — not a default
  substitute. Purely decorative effects that were never real images to begin with (gradients,
  grid lines, dot patterns, generated textures) are still rebuilt with token-based CSS/SVG —
  that's a different thing from a content photo or logo.
- `prefers-reduced-motion` guard on every animation.
- One Hugeicons variant across the whole output (`stroke.rounded`).
- Fully responsive at the standard breakpoints, matching the original's responsive behavior
  (same stacking pattern, not a different one).

## Step 5 — Self-check before delivering

**Side-by-side comparison first.** Before running the checklist below, place the original
design and your recreation side by side and compare them element by element to confirm a true
1:1 match — layout, spacing, color, copy, everything. If you find any discrepancies, list every
one of them individually, then go through and fix each one. Only move on to the checklist once
the side-by-side comparison is clean.

**Check against Step 1's inventory next.** Pull up the numbered list of real photos, avatars,
brand logos, and distinct accent colors you made in Step 1. Go down it item by item and confirm
each one made it into the output as a real, non-abstract equivalent — this is a separate pass
from the general side-by-side, do it explicitly.

- [ ] Every block in the output has a 1:1 counterpart in the input — nothing added, removed, or
  substituted with a different pattern.
- [ ] Section/element order unchanged.
- [ ] Internal arrangement of every repeating component matches (side-by-side stays
  side-by-side, not stacked).
- [ ] Masonry/staggered columns stay independent columns, not forced into row-aligned pairs.
- [ ] Every quote/copy block is reproduced in full, including text behind "Read more" links —
  nothing shortened or dropped.
- [ ] Carousel arrows, pagination dots, tabs, and other interactive controls are all present.
- [ ] Every instance of a repeating card/pattern shares identical spacing — no drift.
- [ ] Named spacing tokens used for content-gap, heading-to-body, and button-in-section
  relationships, not ad-hoc primitive values, where those categories apply.
- [ ] No orphan words in any heading.
- [ ] Zero raw hex/px — everything is a token.
- [ ] Buttons match Button.css; one primary per section; no pills.
- [ ] Dark blocks (same ones as the original) use invert text/icon tokens.
- [ ] Real logo, real Hugeicons icons, no placeholders.
- [ ] Every real photo, avatar, and third-party brand/partner logo from Step 1's inventory was
  downloaded from the source and saved locally, not recreated — no colored-initial avatars, no
  text-label logos, no SVG/icon composition standing in for a real photo.
- [ ] Every distinct accent color from Step 1's inventory is preserved, not flattened onto the
  single brand-primary token.
- [ ] Background/decorative patterns match the original's actual type (organic stays organic,
  grid/dot only appears where the original had grid/dot).
- [ ] Sticky/floating persistent elements (floating CTA bar, chat widget, etc.) are present and
  fixed-positioned, matching the original.
- [ ] Responsive behavior matches the original's pattern; `prefers-reduced-motion` guarded.

## Output

Save to `Products/<ProductName>/` — never the repo root (see the repo-scope rule in
`CLAUDE.md`) and never `sections/` (this isn't a library import, no `meta.json`, no
`registry.json` entry, no git commit unless Mhasan separately asks for one).

## Never

- Never substitute a block for a pre-built library section, even if one looks similar.
- Never reorder, add, or remove sections/elements.
- Never force canonical section padding (96/64) over the original's actual rhythm.
- Never register the output in `registry.json` or treat it as a new library section.
- Never recreate a real photo, avatar, or brand/partner logo as an SVG, icon composition, or
  stock substitute when the original file can just be downloaded and used as-is.
