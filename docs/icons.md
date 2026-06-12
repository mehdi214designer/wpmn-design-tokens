# Icons

**Library:** `@hugeicons/react-pro` v0.3.2
**Location:** `node_modules/@hugeicons/`

---

## Rules

| Property | Rule |
|---|---|
| Variant | **One unified variant per site.** Library standard: `stroke.rounded` (what components/Icons, Footer and NavBar use). Never mix variants — if a project deliberately chooses another variant (e.g. `solid.rounded`), switch ALL icons across the entire site, not some. |
| Usage | Always inline as SVG path data — no runtime imports, no bundler |
| Default size | 24×24px |
| Small (buttons, inputs) | 20×20px |
| Large (feature icons) | 32×32px or 40×40px |
| Color | `currentColor` — inherits from parent text token |

---

## Inline SVG Pattern

All icons must be written as inline SVG components directly in JSX:

```jsx
var _IconName = function(props) {
  return (
    <svg width={props.s} height={props.s} viewBox="0 0 24 24" fill="none">
      <path d="..." fill={props.c} />
    </svg>
  );
};
```

**Note:** Use `var` not `const` inside JSX function bodies — the demo loader's regex breaks on multiple `const` declarations.

---

## Usage in Components

```jsx
// In a feature card
<_CheckIcon s={24} c="var(--btn-bg-enable)" />

// In a button
<_ArrowRightIcon s={20} c="currentColor" />

// Large feature icon
<_StarIcon s={40} c="var(--color-text-brand)" />
```

---

## Why Inline SVG

- No bundler required — the design system runs without a build step
- No runtime icon library loading
- Works in browser-rendered Babel JSX (demo.html)
- Full color control via CSS token inheritance

---

## Reference File

`components/Icons/HugeIcons.jsx` — to be created as a reference catalog of all used icons with their inline path data.
