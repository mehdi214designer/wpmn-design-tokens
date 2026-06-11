# Build Spec: WPMN Section — Read More

Long text truncated at 170px with a bottom fade. Trigger expands to full height (350ms) and flips to Read less.

The reference implementation is the source of truth. Fetch it and reproduce structure, spacing, and interactions exactly:
`https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/sections/read-more/section.html`

## Layout rules (WPMN design guideline)

- Section padding: 96px top/bottom desktop, 64px mobile (<768px). Background via semantic surface tokens only.
- Container: max-width 1200px, `margin: 0 auto`, no horizontal padding on desktop; 40px side padding on tablet (<1200px), 20px on mobile.
- Section header anatomy: optional dot-prefix uppercase badge (13px, brand color), heading max 800px centered, optional subtext. Badge-to-heading 12px, heading-to-subtext 16px, subtext-to-content 48px, header-to-CTA 32px.
- CTAs always side by side (primary + secondary), never stacked, never alone.
- Radius: cards/tiles 16px (--radius-md), section containers/mockup wrappers 32px (--radius-lg).
- All colors via semantic tokens (--color-*, --btn-bg-*). Never hardcode brand colors; `data-brand` on any ancestor re-skins the section.
- Class scoping: every rule is prefixed with `.wpmn-sec-read-more` so sections can coexist on one page.
- Font: Work Sans via the WPMN typography tokens.

## Surface and text pairing (hard rule)

- Light surfaces (--color-surface-primary, soft grey fills): headings use --color-text-primary, body uses --color-text-secondary. Never white or invert text on light surfaces.
- Dark surfaces (--color-surface-secondary) and brand-color surfaces (--color-brand-surface): headings use --color-text-primary-invert, body uses --color-text-secondary-invert. Never dark text or dark elements on these surfaces.
- Light elements (white mockup cards, white buttons) on dark surfaces are correct. Dark text on a dark stage is always wrong, light text on a light stage is always wrong.

## Required token CSS

Load `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/index.css` (primitives -> brand-primitives -> tokens -> typography) before the section markup.

## Output format

A single self-contained `<section class="wpmn-sec-read-more">` containing a scoped `<style>` block, the markup, and (if the section is interactive) a scoped IIFE `<script>`. No external dependencies, no libraries.
