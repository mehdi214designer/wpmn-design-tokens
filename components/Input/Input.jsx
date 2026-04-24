import React, { useId } from 'react';
import './Input.css';

/**
 * WPMN Design System — Input
 * Rebuilt from Figma node 646:105572
 *
 * Props:
 *   variant   'stroke' | 'fill'             default: 'stroke'
 *   size      'lg' | 'md' | 'sm'            default: 'md'
 *   label     string  — label text
 *   placeholder string
 *   hint      string  — helper text below field
 *   error     string  — error message (drives error state)
 *   success   string  — success message (drives success state)
 *   required  boolean — adds * to label
 *   disabled  boolean
 *   iconLeft  ReactNode — icon inside field on the left  (always 20px)
 *   iconRight ReactNode — icon inside field on the right (20px; auto-replaced by
 *                         alert-circle 24px on error, check-circle 20px on success
 *                         if no explicit iconRight is passed)
 *   id        string  — overrides auto-generated id
 *   type      string  — HTML input type (default: 'text')
 *   value, onChange, ...rest forwarded to <input>
 */

/* ── Inline SVG icons (no external dependency) ──────────────── */
const AlertCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M12 8v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="0.75" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75"/>
    <path d="M7.5 12l3 3 6-6" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Component ────────────────────────────────────────────────── */
const Input = ({
  variant   = 'stroke',
  size      = 'md',
  label,
  placeholder,
  hint,
  error,
  success,
  required  = false,
  disabled  = false,
  iconLeft  = null,
  iconRight = null,
  id: providedId,
  type      = 'text',
  className = '',
  value,
  onChange,
  ...rest
}) => {
  const autoId = useId();
  const fieldId  = providedId || autoId;
  const messageId = `${fieldId}-msg`;

  /* Derive the right-side icon:
     - explicit prop wins
     - error state  → AlertCircle (24px)
     - success state → CheckCircle (20px)
  */
  const hasError   = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;

  const rightIcon = iconRight
    ? iconRight
    : hasError
      ? <AlertCircleIcon />
      : hasSuccess
        ? <CheckCircleIcon />
        : null;

  const hasLeftIcon  = Boolean(iconLeft);
  const hasRightIcon = Boolean(rightIcon);
  const rightIsError = hasError && !iconRight;   // built-in error icon (24px)

  /* Field padding class */
  const iconPaddingClass = (() => {
    if (hasLeftIcon && hasRightIcon) return 'wpmn-input__field--icon-both';
    if (hasLeftIcon)                 return 'wpmn-input__field--icon-left';
    if (hasRightIcon && rightIsError) return 'wpmn-input__field--icon-right-lg';
    if (hasRightIcon)                return 'wpmn-input__field--icon-right';
    return '';
  })();

  /* Wrapper class */
  const wrapperClass = [
    'wpmn-input-wrapper',
    `wpmn-input--${variant}`,
    size !== 'md' ? `wpmn-input--${size}` : '',
    hasError   ? 'wpmn-input--error'   : '',
    hasSuccess ? 'wpmn-input--success' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Message below field */
  const message    = error || success || hint || null;
  const messageClass = [
    'wpmn-input__hint',
    hasError   ? 'wpmn-input__hint--error'   : '',
    hasSuccess ? 'wpmn-input__hint--success' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClass}>
      {/* Label */}
      {label && (
        <label
          htmlFor={fieldId}
          className={`wpmn-input__label${required ? ' wpmn-input__label--required' : ''}`}
        >
          {label}
        </label>
      )}

      {/* Field + icons */}
      <div className="wpmn-input__field-wrap">
        {hasLeftIcon && (
          <span className="wpmn-input__icon wpmn-input__icon--left">
            {iconLeft}
          </span>
        )}

        <input
          id={fieldId}
          type={type}
          className={['wpmn-input__field', iconPaddingClass].filter(Boolean).join(' ')}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          aria-invalid={hasError || undefined}
          aria-describedby={message ? messageId : undefined}
          {...rest}
        />

        {hasRightIcon && (
          <span className={
            rightIsError
              ? 'wpmn-input__icon wpmn-input__icon--right-error'
              : 'wpmn-input__icon wpmn-input__icon--right'
          }>
            {rightIcon}
          </span>
        )}
      </div>

      {/* Hint / error / success message */}
      {message && (
        <span
          id={messageId}
          className={messageClass}
          role={hasError ? 'alert' : undefined}
        >
          {message}
        </span>
      )}
    </div>
  );
};

export default Input;
