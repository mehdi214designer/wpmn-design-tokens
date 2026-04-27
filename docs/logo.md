# Logo Usage

**Source:** `logos/<brand>/`

Always use the SVG file directly. Never use placeholders, raster images, or plain text as a logo substitute.

---

## File Structure

```
logos/
  <brand>/
    logo-primary.svg     — full wordmark, colored
    logo-dark.svg        — full wordmark, dark text
    logo-inverted.svg    — full wordmark, white (for dark bg)
    logo-black.svg       — full wordmark, black
    logo-white.svg       — full wordmark, white
    icon-primary.svg     — icon only, colored
    icon-dark.svg        — icon only, dark
    icon-inverted.svg    — icon only, white
    icon-black.svg       — icon only, black
    icon-white.svg       — icon only, white
```

Manifest: `logos/manifest.json`

---

## Variants

| Variant | Description |
|---|---|
| `logo` | Full wordmark — icon + product name |
| `icon` | Icon only — no text |

---

## Types

| Type | Description | Use on |
|---|---|---|
| `dark` | Colored icon + dark text | Light / white backgrounds |
| `inverted` | White icon + white text | Dark backgrounds |
| `primary` | Colored icon + colored text | Brand-specific use |
| `black` | All black | Special use |
| `white` | All white | Special use |

---

## Background Rules

| Background | Logo type |
|---|---|
| White (`primary` surface) | `type="dark"` |
| Soft gray (`alt` surface) | `type="dark"` |
| Dark (`secondary` surface) | `type="inverted"` |
| Soft dark (`secondary-alt` surface) | `type="inverted"` |

**Rule: light background = `dark` logo. Dark background = `inverted` logo.**

---

## Navbar Rules

| Navbar | Logo type |
|---|---|
| Light navbar (default) | `type="dark"` |
| Dark navbar | `type="inverted"` |

---

## Footer Rules

| Footer | Logo type |
|---|---|
| Dark footer (default) | `type="inverted"` |
| Light footer | `type="dark"` |

Footer is always dark by default.

---

## Never Do This

- Placeholder box + product name text as a logo
- Raster PNG/JPG instead of SVG
- Wrong type on wrong background (e.g. dark logo on dark section)
- Scaling logos below minimum readable size
