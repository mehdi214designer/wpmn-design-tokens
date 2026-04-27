# Layout

Rules for page structure, section layout, column grids, and section alternation.

---

## Container

| Property | Value |
|---|---|
| Max width | 1200px |
| Alignment | `margin: 0 auto` — centered, no horizontal padding |
| Section padding | 96px top and bottom — no exceptions |

---

## Section Structure

Every section follows this header anatomy:

```
[Badge]    — optional. Short label, uppercase, dot prefix, brand color.
Heading    — always required. Max 800px wide, center-aligned.
[Subtext]  — optional. One or two sentences max.
[CTA]      — always side by side. Never just one, never stacked.
```

- Heading max width: **800px**
- All content center-aligned: headings, subtext, toggles, CTAs
- CTA always paired: `[ Primary ]  [ Secondary ]`

---

## Section Backgrounds

| Surface | Primitive | Note |
|---|---|---|
| primary | `--primitive-light-0` | White — default |
| alt | `--primitive-light-25` | Soft gray |
| secondary | `--primitive-dark-800` | Dark |
| secondary-alt | `--primitive-dark-600` | Soft dark |

---

## Section Alternation

Alternate light surfaces by default. Max 1–2 dark sections per page, never back to back.

### Recommended sequence

| Section | Surface |
|---|---|
| Hero | primary (white) |
| Features | alt (soft gray) |
| Showcase | primary (white) |
| Dark CTA / Testimonial | secondary (dark) |
| Pricing | alt (soft gray) |
| Footer | secondary (dark) — always |

### DO
```
primary → alt → primary → secondary → alt → primary
```

### DON'T
```
secondary → secondary  ← back to back dark
secondary → secondary-alt → secondary  ← too many dark sections
alt → alt  ← same surface repeated
```

---

## Multi-Column Grids

Seven approved layouts. Do not use arbitrary column ratios.

| # | Name | Columns | Gutter | Use |
|---|---|---|---|---|
| 1 | Full width | 12/12 | — | Hero, CTA banner, testimonials |
| 2 | Equal 2-col | 6/6 | 48px | Text + mockup, hero |
| 3 | Equal 3-col | 4/4/4 | 32px | Feature cards |
| 4 | Equal 4-col | 3/3/3/3 | 24px | Feature grids, icon rows |
| 5 | Asymmetric | 5/7 | 48px | Text-heavy, large visual right |
| 6 | Asymmetric | 4/8 | 48px | Sidebar, label + main content |
| 7 | Stacked | 6 + (6/6) | 48px outer / 24px inner | Large card left, two stacked right |

---

## Responsive

| Breakpoint | Width | Rules |
|---|---|---|
| Desktop | ≥ 1200px | Full layout, centered container |
| Tablet | 768px–1199px | Container fills width, 40px side padding, 2-col stays 2-col |
| Mobile | < 768px | All columns stack to 1-col, 20px side padding, 64px section padding |
