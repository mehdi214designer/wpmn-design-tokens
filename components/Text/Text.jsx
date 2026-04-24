import React from 'react';
import '../../typography.css';

/**
 * WPMN Design System — Text
 *
 * A single polymorphic component for every type style in the system.
 *
 * Props:
 *   variant  — the visual style to apply (see list below)
 *   as       — the HTML element to render (overrides smart default)
 *   color    — 'primary' | 'secondary' | 'brand' | 'invert'  (default: 'primary')
 *   weight   — 'regular' | 'medium' | 'semibold' | 'bold'    (overrides variant default)
 *   align    — 'left' | 'center' | 'right'
 *   truncate — boolean — adds single-line text overflow ellipsis
 *   className, children, ...rest
 *
 * Variants & smart defaults:
 *   'h1' → <h1>  SemiBold  Desktop 61px / Mobile 32px
 *   'h2' → <h2>  SemiBold  Desktop 49px / Mobile 28px
 *   'h3' → <h3>  SemiBold  Desktop 39px / Mobile 25px
 *   'h4' → <h4>  Medium    Desktop 31px / Mobile 22px
 *   'h5' → <h5>  Medium    Desktop 25px / Mobile 20px
 *   'h6' → <h6>  Medium    Desktop 20px / Mobile 18px
 *   'body-large'   → <p>   Regular  Desktop 20px / Mobile 18px
 *   'body-medium'  → <p>   Regular  Desktop 18px / Mobile 16px
 *   'body-base'    → <p>   Regular  Desktop 16px / Mobile 14px
 *   'body-small'   → <p>   Regular  Desktop 14px / Mobile 12px
 *   'body-label'   → <span> Medium  Desktop 13px / Mobile 11px
 *   'body-mono'    → <code> Regular Desktop 10px / Mobile 10px
 */

const VARIANT_MAP = {
  'h1':          { tag: 'h1',    cssClass: 'text-h1',          defaultWeight: 'semibold' },
  'h2':          { tag: 'h2',    cssClass: 'text-h2',          defaultWeight: 'semibold' },
  'h3':          { tag: 'h3',    cssClass: 'text-h3',          defaultWeight: 'semibold' },
  'h4':          { tag: 'h4',    cssClass: 'text-h4',          defaultWeight: 'semibold' },
  'h5':          { tag: 'h5',    cssClass: 'text-h5',          defaultWeight: 'medium'   },
  'h6':          { tag: 'h6',    cssClass: 'text-h6',          defaultWeight: 'medium'   },
  'body-large':  { tag: 'p',     cssClass: 'text-body-large',  defaultWeight: 'regular'  },
  'body-medium': { tag: 'p',     cssClass: 'text-body-medium', defaultWeight: 'regular'  },
  'body-base':   { tag: 'p',     cssClass: 'text-body-base',   defaultWeight: 'regular'  },
  'body-small':  { tag: 'p',     cssClass: 'text-body-small',  defaultWeight: 'regular'  },
  'body-label':  { tag: 'span',  cssClass: 'text-body-label',  defaultWeight: 'medium'   },
  'body-mono':   { tag: 'code',  cssClass: 'text-body-mono',   defaultWeight: 'regular'  },
};

const COLOR_STYLES = {
  primary:   { color: 'var(--color-text-primary)' },
  secondary: { color: 'var(--color-text-secondary)' },
  brand:     { color: 'var(--color-text-brand)' },
  invert:    { color: 'var(--color-text-primary-invert)' },
};

const WEIGHT_STYLES = {
  regular:  { fontWeight: 'var(--font-weight-regular, 400)' },
  medium:   { fontWeight: 'var(--font-weight-medium, 500)' },
  semibold: { fontWeight: 'var(--font-weight-semibold, 600)' },
  bold:     { fontWeight: 'var(--font-weight-bold, 700)' },
};

const Text = ({
  variant = 'body-base',
  as,
  color = 'primary',
  weight,
  align,
  truncate = false,
  className = '',
  style = {},
  children,
  ...rest
}) => {
  const config = VARIANT_MAP[variant] || VARIANT_MAP['body-base'];
  const Tag = as || config.tag;

  const resolvedWeight = weight || config.defaultWeight;

  const inlineStyle = {
    ...COLOR_STYLES[color],
    ...WEIGHT_STYLES[resolvedWeight],
    ...(align ? { textAlign: align } : {}),
    ...(truncate ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : {}),
    ...style,
  };

  return (
    <Tag
      className={[config.cssClass, className].filter(Boolean).join(' ')}
      style={inlineStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Text;
