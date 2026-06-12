# Fix patterns (battle-tested, use verbatim)

## Canonical secondary button (light surface)
```css
.X{background:transparent;color:var(--btn-bg-enable);border:1.5px solid var(--btn-bg-enable)}
.X:hover{background:var(--btn-bg-enable);color:var(--color-text-primary-invert)}
.X:active{background:var(--btn-bg-hovered);border-color:var(--btn-bg-hovered);color:var(--color-text-primary-invert)}
```
Dark/brand surface variant: swap `--btn-bg-enable` for `--color-text-primary-invert`;
hover fills invert with `color:var(--color-text-primary)`.

## Underlined button text
The browser underlines `<a><button>…` content. Add a scoped `.wpmn-sec-<id> a{text-decoration:none}`.

## Icon swap to Hugeicons
`node scripts/extract-hugeicon.mjs <icon-file-name> stroke.rounded` prints a ready
`<svg viewBox="0 0 24 24">`. Preserve the old node's class/size attributes by re-adding them
to the printed tag. Pick semantically-close names with `--find`; when nothing fits, use
`checkmark-circle02`. Sub-24 sizing is done by CSS width/height, never by changing viewBox.

## Icon color on dark panels
`color:var(--color-text-primary-invert)` on the icon (or its container). Brand color stays
on light surfaces and on decorative non-icon artwork (sparks, charts).

## Hover overlay washing out text
Move the tint to `::before{inset:0;opacity:0;transition:opacity…}` + `:hover ::before{opacity:1}`,
lift the copy with `position:relative;z-index:1`. mix-blend/backdrop-filter live on the pseudo.

## Audit-safe dark variants (surface pairing)
Dark card children get element rules owned by a dark-only class: `.name-dark h3{…invert}` —
never `.card--dark .card-title` (the audit attributes that to all `.card-title`). Never reuse
a light base class (`.card`) on the dark variant element. Brand tints inside `background:`
get hoisted into derived custom properties on the section root so they aren't read as dark.

## Reduced-motion guard (generic, scoped)
```css
@media (prefers-reduced-motion: reduce) {
  .wpmn-sec-<id> *, .wpmn-sec-<id> *::before, .wpmn-sec-<id> *::after {
    transition: none !important; animation: none !important; }
}
```
JS intervals/rAF loops check `matchMedia('(prefers-reduced-motion: reduce)').matches` and
render final state.

## Raw radii
Map to the token scale (8/12/16/32) or preserve exact artwork values with
`calc(var(--radius-xsm) - 2px)`-style expressions. Pure illustration geometry (mock devices,
chart bars) is an exception entry, not a fix.

## Exceptions file
`scripts/design-qa-exceptions.json` — key `"<section>/<check>/<detail-substring>"` (use `*`
to match any detail), value = the human reason. Keep reasons specific; an exception nobody
can defend is an issue.
