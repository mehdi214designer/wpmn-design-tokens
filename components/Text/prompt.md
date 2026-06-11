# Build Spec: WPMN Text (Typography)

Recreate the WPMN typography system and (optionally) the polymorphic Text component. Font: **Work Sans** via Google Fonts, weights 400/500/600/700.

## Type scale (Desktop / Mobile at max-width 768px)

| Variant | Tag | Desktop size/LH | Mobile size/LH | Default weight |
|---|---|---|---|---|
| h1 | h1 | 61px / 73px | 32px / 38px | 600 semibold |
| h2 | h2 | 49px / 59px | 28px / 34px | 600 semibold |
| h3 | h3 | 39px / 47px | 25px / 30px | 600 semibold |
| h4 | h4 | 31px / 37px | 22px / 26px | 600 semibold |
| h5 | h5 | 25px / 30px | 20px / 24px | 500 medium |
| h6 | h6 | 20px / 24px | 18px / 22px | 500 medium |
| body-large | p | 20px / 30px | 18px / 27px | 400 |
| body-medium | p | 18px / 27px | 16px / 24px | 400 |
| body-base | p | 16px / 24px | 14px / 21px | 400 |
| body-small | p | 14px / 21px | 12px / 18px | 400 |
| body-label | span | 13px / 20px | 11px / 17px | 500 |
| body-mono | code | 10px / 15px (monospace) | 10px / 15px | 400 |

Note: the CSS utility classes in `typography.css` set h1/h2 to weight 700 bold; the Text component default is 600 semibold. When using the component, semibold wins.

Mobile values apply automatically via `@media (max-width: 768px)` re-mapping the `--font-size-*` and `--font-lh-*` custom properties. Utility classes: `.text-h1` ... `.text-body-mono`.

## Color options (semantic tokens)

- primary: `--color-text-primary` (#07090c light / #ffffff dark)
- secondary: `--color-text-secondary` (#4e5d78 light / #dbdee4 dark)
- brand: `--color-text-brand`
- invert: `--color-text-primary-invert`

## React API

```jsx
<Text variant="h1...body-mono" as="div" color="primary|secondary|brand|invert"
  weight="regular|medium|semibold|bold" align="left|center|right" truncate>
  content
</Text>
```

- Renders the smart-default tag per the table, `as` overrides it.
- `weight` overrides the variant default via inline style using `--font-weight-*` tokens.
- `truncate`: `overflow: hidden; text-overflow: ellipsis; white-space: nowrap`.
- Applies the matching `.text-{variant}` utility class plus inline color/weight styles. `var` not `const` in function bodies.

## Heading-to-body spacing tokens (use when composing sections)

`--spacing-h-xxl-to-large: 16px`, `--spacing-h-xl-to-medium: 12px`, `--spacing-h-l-to-medium: 12px`, `--spacing-h-m-to-base: 8px`, `--spacing-h-s-to-base: 8px`, `--spacing-h-xs-to-small: 8px`.
