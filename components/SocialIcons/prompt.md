# Build Spec: WPMN SocialIcons

Recreate the WPMN Design System SocialIcons group exactly. A flex row of square icon buttons, `justify-content: space-between`, no gap.

## Button

- Square anchor, default 32px (configurable via `size` prop, exposed as `--si-size` custom property)
- `border-radius: 6.4px`
- Light bg: `linear-gradient(180deg, rgba(0,0,16,0.05) 0%, rgba(0,0,16,0.02) 100%)`
- Icon: inline SVG at 60% of the box size (e.g. 19px in a 32px box), HugeIcons solid-rounded style, `currentColor`
- `transition: opacity 120ms ease, transform 120ms ease`
- Hover: `opacity: 0.65; transform: translateY(-1px)`
- `target="_blank" rel="noopener noreferrer"`, `aria-label` per platform

## Dark mode (`[data-theme="dark"]`)

- bg: `linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)`

## Platforms (default set, in order)

facebook · instagram · x · linkedin · youtube · community · wordpress

The exact SVG path data for all 7 icons lives in `components/SocialIcons/SocialIcons.jsx` (fetch from `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/components/SocialIcons/SocialIcons.jsx`). Reuse those paths verbatim, do not substitute different icon sets.

## React API

```jsx
<SocialIcons size={32}
  links={[{ icon: 'facebook', href: 'https://...', label: 'Facebook' }, ...]} />
```

Class naming: `wpmn-social-icons`, `wpmn-social-icon-btn`. Inline SVG only, `var` not `const` in function bodies.
