# Build Spec: WPMN Icons

Icon convention for the WPMN Design System. **Never import icon libraries at runtime.** All icons are inline SVG components with the path data embedded directly.

## Source

Icons come from HugeIcons Pro v0.3.2. Two variants are in use:

- `stroke.rounded`: general UI icons (reference file `components/Icons/HugeIcons.jsx`)
- `solid.rounded`: icons embedded inside Breadcrumbs, Footer, and SocialIcons

Fetch exact path data from:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/components/Icons/HugeIcons.jsx`

## Component shape

```jsx
const IconName = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="..." stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
```

Components embedded inside other WPMN components use the compact `({ s, c })` prop shape (size, color) and a `_` name prefix (e.g. `_Facebook`, `_Home01`).

## Rules

- viewBox is always `0 0 24 24`, icons scale via width/height props
- Color flows through `currentColor` by default so icons follow the parent's text color and theme automatically
- Stroke icons: `strokeWidth 1.5` (2 for small accent strokes), round caps and joins
- When recreating a WPMN component in another stack, copy the SVG path data verbatim from the source files. Do not substitute visually similar icons from other sets
