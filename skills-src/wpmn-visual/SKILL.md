---
name: wpmn-visual
description: Build on-brand marketing visuals (featured images, social media posts, covers/banners) for any WPManageNinja product by instancing and rebranding the existing components in the Marketing Visual System Figma file. Triggers on "build a marketing visual", "marketing visual", "featured image", "social media image/post", "cover image", "social cover", "banner for [product]", "make a [product] visual", "release note image", "milestone post", "active installations post", "sale cover", or any request to produce marketing graphics for FluentForms, FluentCRM, NinjaTables, FluentBooking, FluentCommunity, Paymattic, FluentBoards, FluentSMTP, FluentSupport, FluentAffiliate, AzonPress, WP Social Ninja, FluentCart, FluentPlayer, FluentMembers, or WPManageNinja. Use whenever someone wants a graphic built from the WPMN visual system rather than a website page.
---

# wpmn-visual

Builds marketing visuals for WPMN products by reusing the components that already live in the **Marketing Visual System** Figma file. This skill never designs from scratch and never recreates a component. It instances what exists, then rebrands and populates it.

## The one file (do not create another)

- File: **Marketing Visual System**
- URL: https://www.figma.com/design/yDivKet2GaytFdz0YI1YrS/Marketing-Visual-System
- fileKey: `yDivKet2GaytFdz0YI1YrS`

Always work in this file. Never call `create_new_file`. Never redraw, rebuild, or duplicate-and-edit a component. Build new designs on a **new page** inside this file (named for the run, e.g. `🎨 BFCM 2026`).

## Step 1 — gather the brief with the wizard

Load `/figma:figma-use`, then read `assets/wizard.html` (next to this file) and render it with `show_widget` (title `wpmn_visual_intake`). It is a step-by-step, multi-select wizard: product(s) → asset type(s) → per-type steps → review with a build count. On submit it sends a structured brief back as a chat message. Build from that.

If the person already typed a full brief, skip the wizard and use their text.

## Step 2 — build, reusing components

For every combination in the brief:

1. **Instance the real component** (see map below). `component.createInstance()`, place on the new page, name it `N · Product — purpose (WxH)`.
2. **Brand — switch the variable mode, never apply custom color.** The file's `Primitives` collection (from the WPMN Design System Beta library) has every product as a mode. Set the instance's mode and all brand-bound fills reskin themselves. Do NOT set hex fills or gradients.
   - Resolve the collection at runtime (IDs can drift): find a node in the component whose fill has `boundVariables.color`, `getVariableByIdAsync` → read `variableCollectionId` → `getVariableCollectionByIdAsync` → match the mode whose name is the product → `instance.setExplicitVariableModeForCollection(collection, modeId)`.
   - Current reference — collection `VariableCollectionId:f61012b238382e2c1abde93ee996d2a0c9d5b212/3745:500`, modes: FluentCart `11:0`, FluentCRM `11:3`, FluentAffiliate `1673:0`, WPManageNinja `1944:0`, Ninja Tables `3278:1`, WP Social Ninja `3357:0`, FluentSupport `3546:0`, FluentForms `3571:0`, FluentPlayer `3685:0`, FluentBoards `3745:0`. Trust the system's output — the brand's background may resolve to its accent, that is correct.
3. **Logo:** if the template has an `All Logos` instance, set its `Logo of` variant to the product. Some templates (e.g. Featured Template-4) have no logo slot — brand then shows through color only; note it.
4. **Copy:** edit the text layers. Base font is **Work Sans**. If a layer's font will not load (e.g. Axiforma), set its `fontName` to Work Sans at the matching weight, then set the text. Wrap font loads in try/catch. Hide unwanted layers with `visible = false` (don't blank them).
5. **Image — place it standalone beside the design, do not inject it into the slot.** Leave the component's own image untouched. Put the requested image (captured from a URL via the Chrome tools, uploaded, or generated if an image tool is connected) as a separate object to the right of the design, with a small label, so the person copies it and pastes it into the slot. This keeps the component intact and gives them control. If no image source is available, say so.
6. **Screenshot** each result and check brand mode, copy, alignment, and the standalone image.

Do not hide a component's content and rebuild it with free shapes, text, chips, or badges. If a component genuinely does not fit the request, say so before hand-building anything.

## Component map

- **Featured image** (1910×1000) → `Featured Image` library. `Template-1` is the clean default (category pill + title + logo/URL + dashboard image). Set the pill to the topic ("Release Notes"). `Release note` variant exists but bakes in product-specific screenshots.
- **Social media post** → `Social Media` library, `Template-1..5`, in `1:1`, `4:5`, or `9:16`.
- **Milestone / active installations** → `FluentCRM social media templates` frame, `Active Installations without Image` (number-focused) or `with Image`. Only exists at 1:1 (1400×1400); flag if another ratio is requested.
- **Cover / banner** → `Social Media Covers` library, the `Product=` variant for Facebook (851×315), X (1500×500), LinkedIn (1128×191).
- **Sale / seasonal badge on a cover** → find the badge instance inside the cover (its main component is in the `Badge` set) and `swapComponent` to the matching `Type=` (Halloween, BFCM, Christmas, New Year, Summer Sale, Sale Only) at the same `Size`, then edit the "%" text.

## Brand color

Brand color is never hand-set. Switch the `Primitives` variable mode to the product (see step 2). The mode carries the correct primary, accent, surfaces, and text for that product. Only fall back to hex from `brand-primitives.css` if a node genuinely is not bound to a variable.

## Deliver

Report which component each design used, the page name, the build count, and any flags (wrong-product screenshot that needs swapping, missing format, font fallback used). Offer to run WPMN Audit.
