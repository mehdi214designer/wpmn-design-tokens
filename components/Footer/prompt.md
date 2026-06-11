# Build Spec: WPMN Footer

Recreate the WPMN Design System Footer exactly. Token system: `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css`.

## Shell

- `<footer>`: width 100%, bg `--color-surface-primary`, padding `96px 120px`, flex column, `gap: 128px`, Work Sans

## Top section (flex row, space-between, gap 40px, align flex-start)

### Column 1: brand (fixed width 361px, flex column, gap 40px)
- Address paragraph: 16px/24px regular, color `--color-text-primary`
- Social icon row: flex, `justify-content: space-between`. Each icon is a 32px square anchor, radius 6.4px, bg `linear-gradient(180deg, rgba(0,0,16,0.05) 0%, rgba(0,0,16,0.02) 100%)`, icon 19px inline SVG in currentColor (`--color-text-primary`). Hover: opacity 0.6, transition 120ms. Icons: facebook, instagram, x, linkedin, youtube, community, wordpress (HugeIcons solid-rounded style). `target="_blank" rel="noopener noreferrer"`, aria-label per platform

### Columns 2-4: nav columns (flex column, gap 12px)
- Title: 25px semibold, line-height 1.2, color `--color-text-primary`, padding `10px 10px 10px 16px`, nowrap
- Link list: flex column, gap 8px
- Link: block, 16px/24px regular, color `--color-text-secondary`, padding `10px 10px 10px 16px`, nowrap. Hover: color `--color-text-primary`, 120ms

Default column titles: Company · More · Other Products.

## Bottom bar (flex row, space-between, center-aligned)

- Left: brand logo, height 32px (image) or bold 16px text fallback
- Right: flex row, gap 32px: copyright text + extra links. 16px, line-height 1.5, color #000040 (dark mode: `--color-text-secondary`). Link hover: opacity 0.65

## Dark mode (`[data-theme="dark"]`)

- Social buttons: bg `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)`, icon color follows `--color-text-primary` (white)
- Copyright/bottom links: `--color-text-secondary`

## Responsive

- ≤1024px: padding `64px 48px`, gap 80px, brand column 280px
- ≤768px: padding `48px 24px`, gap 56px; top section wraps (gap 48px), brand column full width; bottom bar becomes column, left-aligned, gap 20px; bottom-right wraps with gap 16px

## React API

```jsx
<Footer address="..." socialLinks={[{ key: 'facebook', href: '#', label: 'Facebook' }, ...]}
  columns={[{ title: 'Company', links: [{ label: 'Contact Us', href: '#' }] }, ...]}
  logoSrc="/logo.svg" logoAlt="WPManageNinja"
  copyright="@wpmanageninja. All Rights Reserved."
  bottomLinks={[{ label: 'Affiliate Program', href: '#' }]} />
```

All props have sensible WPManageNinja defaults. Class naming: `wpmn-footer`, `__top|__brand|__address|__social|__social-btn|__nav|__nav-title|__nav-list|__nav-link|__bottom|__bottom-logo|__logo-img|__logo-text|__bottom-right|__copyright|__bottom-link`. Inline SVG icons only, `var` not `const` in function bodies.
