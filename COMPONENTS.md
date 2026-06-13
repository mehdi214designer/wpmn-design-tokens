# WPMN Components — Cheatsheet

Real class names for the 10 components, one example each. Load `wpmn-bundle.css` and set
`data-brand` on `<html>` first (see the bundle header). Class names here are exact — copy
them, don't guess.

> For full marketing sections (hero, pricing, FAQ, footer, etc.) you usually drop in a
> ready-made **section** instead of assembling atoms — see `registry.json` + `llms.txt`.
> There is **no `.wpmn-card`**; cards live inside sections as scoped classes.

---

## Button — `.wpmn-btn`
Variants: `--primary` `--secondary` `--tertiary` · Sizes: `--xs --sm --md --lg --xl`
Modifiers: `--full --disabled --loading --focused` · Slots: `__icon-left __icon-right __spinner`

```html
<button class="wpmn-btn wpmn-btn--primary wpmn-btn--lg">Get FluentForms Free</button>
<button class="wpmn-btn wpmn-btn--secondary wpmn-btn--lg">See Pricing</button>
```
One primary per section. No pill shapes, no underlines.

## NavBar — `.wpmn-navbar`
`__logo __nav __links __link (--active) __cta (--primary|--secondary) __hamburger __mobile-menu`

```html
<header class="wpmn-navbar" data-brand="fluentforms">
  <span class="wpmn-navbar__logo"><!-- inline logo SVG --></span>
  <nav class="wpmn-navbar__nav">
    <ul class="wpmn-navbar__links"><li><a class="wpmn-navbar__link" href="#">Features</a></li></ul>
  </nav>
  <a class="wpmn-navbar__cta wpmn-navbar__cta--primary" href="#">Get Started</a>
</header>
```

## Footer — `.wpmn-footer`
`__top __brand __logo-img __nav __nav-list __nav-title __nav-link __social __bottom __copyright`

```html
<footer class="wpmn-footer" data-brand="fluentforms">
  <div class="wpmn-footer__top">
    <nav class="wpmn-footer__nav">
      <div><div class="wpmn-footer__nav-title">Product</div>
        <ul class="wpmn-footer__nav-list"><li><a class="wpmn-footer__nav-link" href="#">Pricing</a></li></ul>
      </div>
    </nav>
  </div>
  <div class="wpmn-footer__bottom"><span class="wpmn-footer__copyright">© 2026 WPManageNinja</span></div>
</footer>
```

## Input — `.wpmn-input-wrapper`
Field: `__field (--icon-left|--icon-right|--icon-both)` · States: `--error --success` · Style: `--stroke --fill` · Size: `--sm --lg`
Parts: `__label (--required) __hint (--error|--success) __icon (--left|--right)`

```html
<div class="wpmn-input-wrapper">
  <label class="wpmn-input__label">Email</label>
  <div class="wpmn-input__field-wrap">
    <input class="wpmn-input__field" type="email" placeholder="you@site.com">
  </div>
  <span class="wpmn-input__hint">We never share it.</span>
</div>
```

## Badge — `.wpmn-badge`
Styles: `--soft --pill` · Status: `--completed --in_progress --experimental --deprecated --handoff_ready`

```html
<span class="wpmn-badge wpmn-badge--soft">New</span>
```

## Breadcrumbs — `.wpmn-breadcrumbs`
Variants: `--border --flat --text --transparent` · Item: `__item`

```html
<nav class="wpmn-breadcrumbs wpmn-breadcrumbs--flat">
  <span class="wpmn-breadcrumbs__item">Home</span>
  <span class="wpmn-breadcrumbs__item">Forms</span>
</nav>
```

## Logo — `.wpmn-logo`
Type modifiers: `--primary --dark --inverted --black --white` · `--icon` for mark-only.
**Always inline the real SVG** from `logos/<brand>/logo-<type>.svg` — never draw one.
Pick type by surface: light → `primary`/`black`, dark → `white`/`dark`, brand-color → `inverted`/`white`.

```html
<span class="wpmn-logo wpmn-logo--primary" role="img" aria-label="FluentForms logo">
  <!-- paste contents of logos/fluentforms/logo-primary.svg here -->
</span>
```

## SocialIcons — `.wpmn-social-icons`
Button: `.wpmn-social-icon-btn`

```html
<div class="wpmn-social-icons">
  <a class="wpmn-social-icon-btn" href="#" aria-label="X"><!-- icon svg --></a>
</div>
```

## Text — typography utility classes (from `typography.css`)
Headings: `.text-h1 … .text-h6` · Body: `.text-body-large .text-body-medium .text-body-base .text-body-small .text-body-label .text-body-mono` · Button text: `.text-btn-xl … .text-btn-xs`
Sizes swap automatically at 768px — never write raw mobile font-size overrides.

```html
<h1 class="text-h1">From first click to loyal customer</h1>
<p class="text-body-large">Run the whole funnel inside WordPress.</p>
```

---

### Token quick-reference (use these, never raw values)
- Text: `var(--color-text-primary)` / `--color-text-secondary` (add `-invert` on dark surfaces)
- Surface: `var(--color-surface-primary | -secondary | -alt)`
- Spacing: `var(--primitive-space-8 … -120)` (8/12/16/20/24/32/40/48/64/80/96/120)
- Radius: `var(--radius-xsm | -sm | -md | -lg)`
- Button color: `var(--btn-bg-enable)` + invert text + glow
