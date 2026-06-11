# Build Spec: WPMN Logo

The Logo component renders official brand SVGs. **Logos are fixed assets, never redraw, recolor, or approximate them.** Always fetch the real SVG data.

## Where the SVGs live

- `components/Logo/logos.js`: auto-generated JS map, `logos[brand]['{variant}-{type}']` -> inline SVG string. This is what the React component consumes.
- `logos/` directory: individual SVG files per brand/variant/type.

Raw URL base: `https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/`

## Matrix

- **16 brands**: wpmanagenia, fluentforms, fluentcrm, ninjatables, fluentcommunity, fluentbooking, paymattic, fluentboards, fluentsmtp, fluentsupport, fluentaffiliate, azonpress, wpsocialninja, fluentcart, fluentplayer, fluentmembers
- **2 variants**: `logo` (icon mark + wordmark) · `icon` (mark only, square-ish)
- **5 color types**:
  - `primary`: full color, use on light backgrounds
  - `dark`: full color tuned for dark backgrounds
  - `inverted`: reversed palette, use on brand-color backgrounds
  - `black`: monochrome black, light backgrounds / print
  - `white`: monochrome white, dark or colored backgrounds

## Rendering rules

- Wrapper: inline-block span, `line-height: 0; flex-shrink: 0`, `role="img"` with aria-label like "Fluent Forms logo (white)"
- Sizing: pass `height` OR `width` in px, the SVG fills the wrapper (`height:100%; width:100%`) so aspect ratio is preserved. Never set both unless you intend to distort
- Default navbar logo height: 32px. Footer bottom-bar logo height: 32px
- SVG colors are baked in. No CSS color overrides, no `currentColor` mapping
- Pairing rule: pick the type by surface. Light surface -> primary/black. Dark surface -> dark/white. Brand-color surface -> inverted/white

## React API

```jsx
import { Logo, BRANDS } from 'wpmn-design-tokens';

<Logo brand="fluentforms" variant="logo" type="primary" height={32} />
<Logo brand="fluentcrm" variant="icon" type="white" height={48} />
```

Missing brand or missing variant/type combo: warn and render nothing (no broken images). Class naming: `wpmn-logo wpmn-logo--{variant} wpmn-logo--{type}`.
