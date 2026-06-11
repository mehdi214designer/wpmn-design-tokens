# Build Spec: WPMN NavBar

Recreate the WPMN Design System NavBar exactly. Responsive header, breakpoint 768px. Token system: `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css`.

## Shell

- `<header>`: flex row, `align-items: center; justify-content: space-between`
- Desktop padding: `24px 120px`. Mobile (≤768px): `8px 16px`
- `background: --color-surface-primary` (#fff light / #07090c dark), `width: 100%`, `position: relative` (anchors the mobile drawer)

## Desktop layout (>768px)

`[logo] ............ [link, link, link, ...] [gap 20px] [primary CTA]`

### Nav links
- List: flex, gap 8px, no list styling
- Link: inline-flex centered, padding `10px 12px`, Work Sans 18px/27px regular, color `--color-text-secondary` (#4e5d78), radius 8px, `transition: color 120ms ease, background-color 120ms ease`, `white-space: nowrap`
- Hover: color `--color-text-primary`, bg `--primitive-light-25` (#f6f7f8)
- Active link: color `--btn-bg-enable`, weight 500, `aria-current="page"`

### Primary CTA (desktop)
- Anchor styled as md primary button: height 48px, padding `12px 24px`, gap 8px, 18px/20px weight 500, radius 8px
- bg `--btn-bg-enable`, text `--color-text-primary-invert`, inner glow `inset 3px 4px 4px 0 rgba(255,255,255,0.3)`
- Hover `--btn-bg-hovered`, active `--btn-bg-pressed`, focus-visible `outline: 3px solid --btn-bg-focused; outline-offset: 2px`
- Trailing arrow-right icon, 24px, inline SVG (horizontal line + chevron, stroke 2, currentColor, round caps)

## Mobile layout (≤768px)

Desktop nav hidden. Controls row appears: `[secondary CTA] [gap 20px] [hamburger]`

- Secondary CTA: same box as primary CTA but transparent bg, color `--btn-bg-enable`, border `1.5px solid --btn-bg-enable`. Hover bg `--primitive-primary-50` (#e6effe)
- Hamburger: 32px square icon button, no bg/border, color `--color-text-primary`. Icon: three 24px horizontal strokes (stroke 2, round caps). When open, swaps to an X (close) icon. `aria-expanded`, `aria-controls`, `aria-label` toggle between Open/Close menu
- Drawer (open state): absolutely positioned `top: 100%; left: 0; right: 0`, bg `--color-surface-primary`, `border-top: 1px solid --color-border-primary`, padding `8px 16px 20px`, `z-index: 200`, `box-shadow: 0 8px 24px rgba(0,0,0,0.08)`. Links stack vertically (gap 4px), full-width, left-aligned, padding 12px. Clicking a link closes the drawer

## React API

```jsx
<NavBar logo={<Logo brand="fluentforms"/>}
  links={[{ label: 'Features', href: '#', active: true }, ...]}
  ctaLabel="Sign Up" ctaHref="#" onCtaClick={fn} />
```

Logo wraps in `<a href="/" aria-label="Home">`. Drawer state via `useState`. Class naming: `wpmn-navbar`, `wpmn-navbar__logo|__nav|__links|__link|__link--active|__cta|__cta--primary|__cta--secondary|__hamburger|__mobile-controls|__mobile-menu`, open state via `data-mobile-open` attribute on the header. Inline SVG icons only, `var` not `const` in function bodies. Brands and dark mode re-map all tokens automatically.
