# Mockup & Screenshot Treatment

Rules for displaying product screenshots, UI mockups, and browser frames in marketing sections.

---

## DO

- **Border radius:** 16px on the mockup frame itself
- **Shadow:** `--shadow-soft-400` or higher — never no shadow
- **Border:** `1px solid --color-border-primary`
- Mockups float directly on the section background — no dark or colored wrapper behind them

---

## DON'T

- No shadow — looks flat and unpolished
- Tiny radius (less than 8px) — looks like a spreadsheet
- Using raster screenshots without proper frame treatment
- Stretching or distorting the mockup

---

## Shadow Tokens

| Token | Use |
|---|---|
| `--shadow-soft-400` | Minimum for mockups |
| `--shadow-soft-600` | Standard mockup shadow |
| `--shadow-soft-800` | Hero mockups, large features |

---

## Browser Frame (Optional)

When showing a browser window mockup:

- Title bar background: `--primitive-light-25`
- Traffic lights: #ff5f57 · #febc2e · #28c840
- Title bar border bottom: `1px solid --color-border-primary`
- Content area: white (#ffffff)
- Skeleton lines: `--primitive-light-25`
