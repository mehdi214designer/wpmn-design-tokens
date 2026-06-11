# Build Spec: WPMN Input

Recreate the WPMN Design System Input exactly. Token system: `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css`. Fallback hex values inline.

## Anatomy (vertical stack, gap 6px, width 100%)

1. Label (optional): Work Sans 13px/20px, weight 500, color `--input-label-color`. Required fields append ` *` colored `--color-error-primary` (#ff3333) via CSS `::after`.
2. Field wrap: `position: relative`, holds the input plus absolutely-positioned icons.
3. Message (optional): hint, error, or success text. 14px/21px regular. Hint color `--input-hint-color`, error `--input-text-error` (#ff0000), success `--input-text-success` (#22b814). Priority: error > success > hint.

## Field base

- Width 100%, height 48px (md). lg = 56px, sm = 40px.
- Padding `0 12px`, Work Sans 14px/21px regular
- Typed value color `--input-text-active` (#272e3c), placeholder `--input-text-default` (#a6aebb)
- `border: 1px solid --input-stroke-default` (#c9ced6), `border-radius: 8px`
- `transition: border-color 120ms ease, background-color 120ms ease, color 120ms ease`
- `outline: none; box-sizing: border-box; -webkit-appearance: none`

## Variant: stroke (default, transparent bg)

| State | Border | Notes |
|---|---|---|
| default | `--input-stroke-default` #c9ced6 | |
| hover | `--input-stroke-hover` #a6aebb | placeholder color shifts to `--input-text-hover` #4e5d78 |
| focus | `--input-stroke-active` #1a1add | value color `--input-text-active` |
| error | `--input-stroke-error` #ff6666 | text and placeholder turn `--input-text-error` |
| success | `--input-stroke-success` #80f075 | text turns `--input-text-success` |
| disabled | `--input-stroke-disable` #c9ced6 | text `--input-text-disable` #b8bec9, `cursor: not-allowed` |

## Variant: fill (filled bg, transparent border)

| State | Background | Notes |
|---|---|---|
| default | `--input-fill-default` #edeef1 | |
| hover | `--input-fill-hover` #e3e5e9 | |
| focus | `--input-fill-active` #ffffff | border becomes `--input-stroke-active` |
| error | `--primitive-error-50` #ffe5e6 | text error color |
| success | `--primitive-success-50` #eafce8 | text success color |
| disabled | `--input-fill-disable` #f6f7f8 | |

## Icons

- Absolutely positioned, vertically centered (`top: 50%; transform: translateY(-50%)`), `pointer-events: none`, color `--input-text-default`.
- Left icon: `left: 12px`, 20px box. Field gets `padding-left: 40px` (12 + 20 + 8 gap).
- Right icon: `right: 12px`, 20px box. Field gets `padding-right: 40px`.
- Error state with no explicit right icon: auto-render a 24px alert-circle icon (circle + vertical bar + dot, stroke 1.75, currentColor), colored `--input-text-error`, field `padding-right: 44px`.
- Success state with no explicit right icon: auto-render a 20px check-circle (circle + check path, stroke 1.75), colored `--input-text-success`.
- Icon color follows field state: hover -> `--input-text-hover`, focus -> `--input-text-active`.

## Accessibility

- `<label for>` wired to the input id (auto-generate if not provided).
- `aria-invalid` when error. `aria-describedby` points to the message element. Message gets `role="alert"` on error.

## React API

```jsx
<Input variant="stroke|fill" size="lg|md|sm" label placeholder hint
  error success required disabled iconLeft={<Svg/>} iconRight={<Svg/>}
  type="text" value onChange />
```

Class naming: wrapper `wpmn-input-wrapper wpmn-input--{variant} wpmn-input--{size} wpmn-input--error|--success`, field `wpmn-input__field` plus `--icon-left|--icon-right|--icon-right-lg|--icon-both` padding modifiers. Inline SVG icons only, `var` not `const` in function bodies. Dark mode and brands re-map all `--input-*` tokens automatically.
