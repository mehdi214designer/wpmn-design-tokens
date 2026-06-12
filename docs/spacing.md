# Spacing

**Source:** `primitives.css`

All spacing values are available as CSS custom properties via `--primitive-space-*`. Always use these tokens — never hardcode pixel values.

---

## Spacing Scale

| Token | Value |
|---|---|
| `--primitive-space-none` | 0px |
| `--primitive-space-2` | 2px |
| `--primitive-space-4` | 4px |
| `--primitive-space-8` | 8px |
| `--primitive-space-12` | 12px |
| `--primitive-space-16` | 16px |
| `--primitive-space-20` | 20px |
| `--primitive-space-24` | 24px |
| `--primitive-space-32` | 32px |
| `--primitive-space-40` | 40px |
| `--primitive-space-48` | 48px |
| `--primitive-space-56` | 56px |
| `--primitive-space-64` | 64px |
| `--primitive-space-80` | 80px |
| `--primitive-space-96` | 96px |
| `--primitive-space-120` | 120px |
| `--primitive-space-128` | 128px |
| `--primitive-space-160` | 160px |
| `--primitive-space-192` | 192px |
| `--primitive-space-224` | 224px |
| `--primitive-space-256` | 256px |

---

## Section-Level Spacing

| Property | Value | Note |
|---|---|---|
| Section padding (desktop) | 96px | Top and bottom on every section — no exceptions |
| Section padding (mobile) | 64px | Reduced on screens < 768px |
| Container max width | 1200px | Centered via `margin: 0 auto` |
| Container side padding (tablet) | 40px | 768px–1199px |
| Container side padding (mobile) | 20px | < 768px |

---

## Column Gutters

| Layout | Gutter |
|---|---|
| 2-col (6/6, 5/7, 4/8) | 48px |
| 3-col (4/4/4) | 32px |
| 4-col (3/3/3/3) | 24px |
| Stacked outer (6 + 6/6) | 48px |
| Stacked inner (6/6) | 24px |

---

## Within-Section Spacing

| Element gap | Value |
|---|---|
| Badge → Heading | 12px |
| Heading → Subtext | 16px |
| Subtext → Content | 48px |
| Section header → CTA | 32px |
| Icon → Heading (within card) | 12px |
| Heading → Body (within card) | 8px |

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| `--primitive-radius-none` | 0px | — |
| `--primitive-radius-xxs` | 4px | Inline code chips |
| `--primitive-radius-xs` | 8px | Small elements |
| `--primitive-radius-sm` | 12px | Inputs, small cards |
| `--primitive-radius-md` | 16px | Cards, feature tiles, image frames |
| `--primitive-radius-md-lg` | 24px | — |
| `--primitive-radius-lg` | 32px | Section containers, mockup wrappers |
| `--primitive-radius-xl` | 48px | — |
| `--primitive-radius-2xl` | 64px | — |
