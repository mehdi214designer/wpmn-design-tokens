# Build Spec: WPMN Section — Quote Stats Bento

Social-proof bento imported from a reference build: a centered heading over a 4-column grid (200px rows, 16px gap) where four stat cards interleave with two double-width quote cards. Stat cards are a grey shell with a white inset panel; quote cards sit on brand-tinted gradients with a fading dot pattern, company name, quote, and author line. Static section. All visuals tokenized; hotlinked images replaced by token gradients and CSS patterns.

The reference implementation is the source of truth. Fetch it and reproduce structure and spacing exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/quote-stats-bento/section.html`

## Layout rules (WPMN design guideline)

- Section 96px/20px padding; wrap `min(1120px, 100%)`, column flex, 40px gap; heading h3 semibold centered, max-width 480px.
- Grid: 4 equal columns, `grid-auto-rows: 200px`, gap 16px; quote cards `grid-column: span 2`. Re-grids 2-col at 1099px, 1-col at 639px.
- Stat card: shell `color-mix(text-primary 3%, surface-primary)`, 1px border at text-primary 6%, radius `--radius-md`, padding 8/8/16; inset panel `--color-surface-primary`, same border, radius `--radius-sm`, padding 14/12; value h4 semibold, label body-base secondary; 18px footer spacer.
- Quote card: radius `--radius-md`, padding 24, overflow hidden; bg `linear-gradient(115deg)` from `color-mix(btn-bg-enable 16%, surface-primary)` to the shell grey (variant b mirrors at 245deg/14%); a ::after draws a 1px tinted border above the bg; right-side dot pattern via `radial-gradient(color-mix(btn-bg-enable 22%, transparent) 6px, transparent 7px)` at 34px pitch, masked to fade leftward.
- Quote content: company name h6 bold at `color-mix(text-primary 48%, transparent)`; blockquote body-medium `--color-text-primary`; author row = name (body-base medium) + 5px dot at text-primary 18% + role (body-base secondary).
- Class scoping: every rule prefixed `.wpmn-sec-quote-stats-bento`. No script.

## Surface and text pairing (hard rule)

- Everything here is a light surface (white panels, grey shells, light brand tints): dark text tokens only. Never invert text on these surfaces.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-quote-stats-bento">` with scoped `<style>` and markup. No external dependencies, no images.
