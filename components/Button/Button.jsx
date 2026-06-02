import React from 'react';
import './Button.css';

/**
 * WPMN Design System — Button
 * Source: Figma node 48:148413
 *
 * Props:
 *   type      'primary' | 'secondary' | 'tertiary'          default: 'primary'
 *   size      'xl' | 'lg' | 'md' | 'sm' | 'xs'             default: 'md'
 *   state     'enabled' | 'hovered' | 'pressed' |
 *             'focused' | 'disabled'                         default: 'enabled'
 *   disabled  boolean — marks button as non-interactive      default: false
 *   loading   boolean — shows spinner, blocks interaction    default: false
 *   fullWidth boolean — stretches to 100%                    default: false
 *   iconLeft  ReactNode — icon rendered before label
 *   iconRight ReactNode — icon rendered after label
 *   as        string | component — rendered HTML tag         default: 'button'
 *   onClick   function
 *   children  ReactNode — button label
 *
 * Size specs (from Figma):
 *   xl  → h:64px  px:32  gap:8  r:8px  SemiBold(600)  23px/28px
 *   lg  → h:56px  px:32  gap:8  r:8px  SemiBold(600)  20px/24px
 *   md  → h:48px  px:24  gap:8  r:8px  Medium(500)    18px/20px
 *   sm  → h:40px  px:20  gap:4  r:8px  Medium(500)    16px/18px
 *   xs  → h:32px  px:16  gap:4  r:4px  Medium(500)    13px/16px
 */

const Button = ({
  type = 'primary',
  size = 'md',
  state,
  disabled = false,
  loading = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  as: Tag = 'button',
  onClick,
  className = '',
  children,
  ...rest
}) => {
  var isDisabled = disabled || state === 'disabled' || loading;

  var classes = [
    'wpmn-btn',
    `wpmn-btn--${type}`,
    `wpmn-btn--${size}`,
    isDisabled           ? 'wpmn-btn--disabled' : '',
    state === 'focused'  ? 'wpmn-btn--focused'  : '',
    loading              ? 'wpmn-btn--loading'  : '',
    fullWidth            ? 'wpmn-btn--full'      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag
      className={classes}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      onClick={!isDisabled ? onClick : undefined}
      {...rest}
    >
      {/* Loading spinner */}
      {loading && (
        <span className="wpmn-btn__spinner" aria-hidden="true" />
      )}

      {/* Left icon */}
      {!loading && iconLeft && (
        <span className="wpmn-btn__icon-left" aria-hidden="true">
          {iconLeft}
        </span>
      )}

      {/* Label */}
      {children && (
        <span className="wpmn-btn__label">{children}</span>
      )}

      {/* Right icon */}
      {!loading && iconRight && (
        <span className="wpmn-btn__icon-right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Tag>
  );
};

export default Button;
