# Marketing visual builder — reusable prompt

Paste this into a Cowork chat, fill the brief at the top, and let it run. It builds on-brand marketing visuals inside the **Marketing Visual System** Figma file using the real component libraries, not hand-built boxes.

---

## The brief (fill this in)

```
Build these marketing visuals in the Marketing Visual System Figma file.
File: https://www.figma.com/design/yDivKet2GaytFdz0YI1YrS/Marketing-Visual-System

1. [asset type] for [product] — [details: version / milestone / sale %, headline, format]
2. ...
3. ...

Put them on a new page named "[page name]".
```

Example line: `Featured image for FluentSupport release note 2.4.0, dark, headline "What's New in FluentSupport 2.4.0"`

---

## How to build (rules for the agent)

Load `/figma:figma-use` first. Work incrementally and screenshot after each design.

**Use the actual components. Never gut them.** Instance the real library component, then only swap logo, recolor to the product brand, and edit copy. Do not hide the component's content and rebuild it with free shapes, text, chips, or badges. If a component genuinely does not fit, say so before hand-building.

**Pick the right component for the job:**

- Release note / blog featured image (1910×1000) → `Featured Image` library, `Template=Template-1` (clean: category pill + title + logo/URL + dashboard image). Set the pill to "Release Notes" or the topic.
- Milestone / active installations post (1:1, 1400×1400) → `FluentCRM social media templates` frame, `Active Installations without Image` (number-focused) or `with Image`. There is no 4:5 milestone template, flag this if 4:5 is requested.
- General content post (1:1 / 4:5 / 9:16) → `Social Media` library, `Template-1..5`.
- Cover / banner (Facebook 851×315, X 1500×500, LinkedIn 1128×191) → `Social Media Covers` library, pick the `Product=` variant.

**Rebrand steps:**

1. Instance the component onto the new page, away from (0,0). Name it `N · Product — purpose (WxH)`.
2. Logo: find the `All Logos` instance, set its variant prop `Logo of` to the product. Keep the other props.
3. Brand color: recolor the root/background fill and accents to the product brand (table below).
4. Copy: edit the text layers. Font is **Work Sans**. If a layer uses a font that won't load (e.g. Axiforma), set its `fontName` to Work Sans (Regular/Medium/SemiBold/Bold to match weight) then set the text. Wrap font loads in try/catch.
5. Covers only: to make it a sale/seasonal cover, find the badge instance inside (its main component lives in the `Badge` set) and `swapComponent` to the matching `Type=` + same `Size`, then edit the "%" text. Badge types: Halloween, BFCM, Christmas, New Year, Valentin's Day, Women's Day, Summer Sale, Sale Only, Installation, Review, Dual.
6. Screenshot to verify. Check logo, brand color, copy, alignment.

**Watch outs:**
- You can't reposition or reparent nodes inside an instance, and you can't add children to one. Wrap in a parent frame only if you must overlay, and prefer not to.
- Templates ship with another product's UI screenshots baked in. Keep them (they read as generic product UI) but flag that they should be swapped for the real product's screenshots.
- One H1 per asset, one primary action per section, no pill buttons, no underlines.

## Brand hex (primary / accent)

| Product | Primary | Accent |
|---|---|---|
| WPManageNinja | #0D5FFF | #4C5C73 |
| FluentSupport | #00B36D | #FFCA6D |
| FluentSMTP | #C516C0 | — |
| WP Social Ninja | #5B2DD4 | #FF0C79 |
| FluentForms | #0D5FFF | — |

For other products pull from `brand-primitives.css` (`primitive-primary-500` / `primitive-accent-500`).

## Deliver

Report what component each design used, the page name, and any flags (wrong-product screenshot, missing format, swapped font). Offer to run WPMN Audit.
