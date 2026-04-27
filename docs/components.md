# Components

**Source:** `components/`
**Stack:** React + plain CSS. No build step.

All components use semantic tokens exclusively — never raw primitives or hardcoded values.

---

## Button

**Files:** `Button.jsx` + `Button.css`

| Prop | Values |
|---|---|
| `type` | `primary` · `secondary` · `tertiary` |
| `size` | `xl` · `lg` · `md` · `sm` · `xs` |
| `disabled` | `true` / `false` |
| `loading` | `true` / `false` — shows spinner |

```jsx
<Button type="primary" size="lg">Free Download</Button>
<Button type="secondary" size="lg">Buy Now</Button>
```

**Rules:**
- Always pair primary + secondary side by side — never just one, never stacked
- Never hardcode button background — always uses `--btn-bg-enable`

---

## Input

**Files:** `Input.jsx` + `Input.css`

| Prop | Values |
|---|---|
| `variant` | `stroke` · `fill` |
| `size` | `lg` · `md` · `sm` |
| `label` | string |
| `hint` | string |
| `error` | string |
| `success` | string |
| `iconLeft` | inline SVG |
| `iconRight` | inline SVG |

---

## NavBar

**Files:** `NavBar.jsx` + `NavBar.css`

Logo + nav links + CTA button. Responsive: full nav on desktop, hamburger drawer on mobile.

| Prop | Values |
|---|---|
| `brand` | brand key (e.g. `"fluentforms"`) |
| `theme` | `"light"` · `"dark"` |
| `links` | array of `{ label, href }` |
| `cta` | `{ label, href }` |

**Logo rules:**
- Light navbar → `type="dark"` logo
- Dark navbar → `type="inverted"` logo

---

## Footer

**Files:** `Footer.jsx` + `Footer.css`

Full site footer with logo, description, nav columns, and social icons. Always dark background.

| Prop | Values |
|---|---|
| `brand` | brand key |
| `columns` | array of `{ heading, links[] }` |
| `description` | string |

**Logo rule:** Always `type="inverted"` — footer is always dark.

---

## Logo

**Files:** `Logo.css` (JSX not yet created)

SVG logos per brand.

| Prop | Values |
|---|---|
| `brand` | brand key |
| `variant` | `"logo"` · `"icon"` |
| `type` | `"dark"` · `"inverted"` · `"primary"` · `"black"` · `"white"` |
| `height` | number (px) |

---

## Badge

**Files:** `Badge.css` (JSX not yet created)

| Variant | `pill` · `soft` |
|---|---|
| Types | `in_progress` · `completed` · `experimental` · `deprecated` · `handoff_ready` |

---

## Text

**Files:** `Text.jsx`

Typography scale component. Renders any `.text-*` class.

---

## SocialIcons

**Files:** `SocialIcons.jsx` + `SocialIcons.css`

Standalone row of 7 social icons. All inline SVG — no icon library imports.

---

## Breadcrumbs

**Files:** `Breadcrumbs.jsx` + `Breadcrumbs.css`

| Variant | `border` · `flat` · `transparent` · `text` |
|---|---|

Uses inline SVG for Home and ArrowRight icons.

---

## Pending Components

- `Badge.jsx`
- `Logo.jsx`
- Cards, modals, dropdowns, tooltips, tabs
