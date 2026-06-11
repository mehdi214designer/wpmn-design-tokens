# Build Spec: WPMN Button

Copy this entire file into an AI agent to recreate the WPMN Design System Button exactly, in any stack. Token values reference the WPMN token system (`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css`). If you cannot load the token files, use the fallback hex values given inline.

## Anatomy

An inline-flex element: `[iconLeft?] [label] [spinner? when loading] [iconRight?]`, horizontally and vertically centered, content never wraps (`white-space: nowrap`). Rendered as `<button>` by default, polymorphic via an `as` prop (e.g. `<a>`).

## Base styles (all buttons)

- `display: inline-flex; align-items: center; justify-content: center`
- `font-family: 'Work Sans', sans-serif` (token `--font-family-base`)
- `border: 1.5px solid transparent` placeholder, overridden per type/state
- `transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease`
- `cursor: pointer; text-decoration: none; overflow: hidden; outline: none`

## Sizes (exact)

| Size | Height | Padding-x | Gap | Radius | Weight | Font/Line | Right icon box |
|---|---|---|---|---|---|---|---|
| xl | 64px | 32px | 8px | 8px | 600 | 23px/28px | 32px |
| lg | 56px | 32px | 8px | 8px | 600 | 20px/24px | 28px |
| md (default) | 48px | 24px | 8px | 8px | 500 | 18px/20px | 24px |
| sm | 40px | 20px | 4px | 8px | 500 | 16px/18px | 20px |
| xs | 32px | 16px | 4px | 4px | 500 | 13px/16px | 16px |

Left icon is always a 24px box regardless of size. Icon boxes are flex-centered, `flex-shrink: 0`.

## Types and states

Color tokens (light mode defaults for WPManageNinja brand, they re-map automatically per brand and dark mode):
`--btn-bg-enable` #0d5fff · `--btn-bg-hovered` #083999 · `--btn-bg-pressed` #062666 · `--btn-bg-focused` #cedfff · `--btn-bg-disabled` #cedfff · text invert #ffffff

### Primary (filled)
- Enabled: bg `--btn-bg-enable`, text `--color-text-primary-invert` (#fff), transparent border, plus an inner glow `box-shadow: inset 3px 4px 4px 0 rgba(255,255,255,0.3)` present on every non-disabled state.
- Hover: bg `--btn-bg-hovered`
- Active/pressed: bg `--btn-bg-pressed`
- Focus-visible: bg stays `--btn-bg-enable`, border becomes `3px solid --btn-bg-focused`
- Disabled: bg `--btn-bg-disabled`, white text, no glow, no border

### Secondary (outline)
- Enabled: transparent bg, text `--btn-bg-enable`, border `1.5px solid --btn-bg-enable`, no shadow
- Hover: bg fills with `--btn-bg-enable`, text flips to white
- Active: bg and border `--btn-bg-hovered`, white text
- Focus-visible: border `3px solid --btn-bg-focused`
- Disabled: transparent bg, text and border `--btn-bg-disabled`

### Tertiary (ghost)
- Enabled: transparent bg, text `--btn-bg-enable`, transparent border
- Hover: bg `--btn-bg-focused`
- Active: bg `--btn-bg-focused`, text `--btn-bg-hovered`
- Focus-visible: border `3px solid --btn-bg-focused`
- Disabled: text `--btn-bg-disabled`

## Disabled and loading behavior

- Disabled: `cursor: not-allowed; pointer-events: none`. Triggered by `disabled` prop, `state="disabled"`, or `loading`.
- Loading: `cursor: wait; pointer-events: none`. Show a spinner: `1em x 1em`, `border: 2px solid currentColor`, `border-top-color: transparent`, `border-radius: 50%`, animation `rotate 360deg, 0.55s linear infinite`, `flex-shrink: 0`. Label stays visible next to the spinner.

## Other

- Full width mode: `width: 100%`.
- Brand switching: do nothing in the component. Wrapping any ancestor with `data-brand="fluentforms"` (or any of the 16 brand keys) re-maps `--btn-bg-*` automatically. Same for `data-theme="dark"`.
- Usage rule: on marketing pages always show primary + secondary side by side, never one alone, never stacked.

## React API (if building in React)

```jsx
<Button type="primary|secondary|tertiary" size="xl|lg|md|sm|xs"
  state="enabled|hovered|pressed|focused|disabled"
  disabled loading fullWidth iconLeft={<Svg/>} iconRight={<Svg/>}
  as="button" onClick={fn}>Label</Button>
```

Class naming: `wpmn-btn wpmn-btn--{type} wpmn-btn--{size}` plus `wpmn-btn--disabled`, `wpmn-btn--loading`, `wpmn-btn--focused`, `wpmn-btn--full` modifiers. Use `var` not `const` inside function bodies. Icons must be inline SVG, no icon library imports.
