# Build Spec: WPMN Badge

Recreate the WPMN Design System Badge exactly. Static, non-interactive status label.

## Base

- `display: inline-flex; align-items: center; width: fit-content; white-space: nowrap`
- Font: `"SF Pro", "SF Pro Display", ui-sans-serif, system-ui, sans-serif`, weight 650, `font-variation-settings: 'wdth' 132` (expanded width), `text-transform: uppercase`
- Colors come from two component-scoped custom properties set per type: `background-color: var(--badge-bg); color: var(--badge-color)`

## Shape variants

| Variant | Padding | Radius | Font / Line | Letter-spacing |
|---|---|---|---|---|
| pill (default) | 8px 24px | 100px | 20px / 32px | -0.2px |
| soft | 12px 24px | 16px | 26px / 40px | -0.26px |

## Type colors — light mode

| Type | Label | --badge-bg | --badge-color |
|---|---|---|---|
| in_progress | IN PROGRESS | #FFF5DB | #D07D00 |
| completed | COMPLETED | #E9FFEA | #0A9C55 |
| experimental | EXPERIMENTAL | #E9F4FF | #0076E2 |
| deprecated | DEPRECATED | #FFF1F1 | #CF2A2A |
| handoff_ready | HANDOFF READY | rgba(115,87,255,0.12) | #7357FF |

## Type colors — dark mode (`[data-theme="dark"]` ancestor)

| Type | --badge-bg | --badge-color |
|---|---|---|
| in_progress | rgba(255,203,69,0.2) | #FFDD86 |
| completed | rgba(111,218,166,0.2) | #A6E9C8 |
| experimental | rgba(113,187,255,0.2) | #A0D2FF |
| deprecated | rgba(255,167,167,0.2) | #FFC7C7 |
| handoff_ready | rgba(188,175,255,0.2) | #FFFFFF |

These hex values are intentional design decisions and identical across all 16 brands. Do not map them to brand tokens.

## React API

```jsx
<Badge variant="pill|soft" type="in_progress|completed|experimental|deprecated|handoff_ready">
  optional custom label
</Badge>
```

Renders a `<span>`. Default label is the type name uppercased with spaces (e.g. `handoff_ready` -> HANDOFF READY); `children` overrides it. Class naming: `wpmn-badge wpmn-badge--{variant} wpmn-badge--{type}`.
