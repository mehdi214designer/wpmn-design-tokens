# Build Spec: WPMN Breadcrumbs

Recreate the WPMN Design System Breadcrumbs exactly. `<nav aria-label="Breadcrumb">` wrapping an `<ol>`, inline-flex, centered items, no list styling.

## Item

- Inline-flex, gap 8px, padding 12px, radius 16.8px
- Work Sans 18px/20px, weight 500, nowrap, `transition: color 120ms ease, background-color 120ms ease`
- Icon-first item (home): padding-left/right 20px, 18px home icon (HugeIcons solid-rounded style, currentColor)
- Items with `href` are links; the current item has no href, gets `aria-current="page"`, `cursor: default; pointer-events: none`
- Separator between items: 12px arrow-right glyph (solid rounded chevron, currentColor)

## Variants — light mode

| Variant | Container | Item color | Hover | Active item |
|---|---|---|---|---|
| border (default) | height 64px, `border: 1.5px solid --color-border-primary` (#dbdee4), radius 16px, padding 0 4px, overflow hidden | `--color-text-secondary` #4e5d78 | #1a1aa9 | stays #4e5d78 |
| flat | height 64px, bg #f6f7f8, radius 16px, padding 0 4px | `--color-text-primary` #07090c | #1a1aa9 | #1a1aa9 |
| transparent | height 64px, no container styling | `--color-text-primary` | #1a1aa9 | #1a1aa9 |
| text | minimal: item font 16px, padding 4px 8px, radius 6px | `--color-text-primary` | #1a1aa9, no bg | #1a1aa9, weight 600; separator 20px wide at opacity 0.4 |

In border/flat variants items stretch to container height (`height: 100%`).

## Dark mode (`[data-theme="dark"]`)

- border: container border #0f1218, items #ffffff, hover and active #8080ec
- flat: container bg rgba(255,255,255,0.07), items #ffffff, hover/active #8080ec
- transparent and text: items #ffffff, hover/active #8080ec

Note: #1a1aa9 and #8080ec are intentional Figma values not yet tokenized. Keep them as-is.

## React API

```jsx
<Breadcrumbs variant="border|flat|transparent|text"
  items={[
    { icon: true, href: '#' },
    { label: 'Products', href: '#' },
    { label: 'FluentForms' }            // current page, no href
  ]} />
```

Class naming: `wpmn-breadcrumbs wpmn-breadcrumbs--{variant}`, `__list`, `__list-item`, `__item`, `__item--icon`, `__item--active`, `__sep`. Inline SVG icons only, `var` not `const` in function bodies.
