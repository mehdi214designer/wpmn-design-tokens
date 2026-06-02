/**
 * WPMN Design System — Logo
 *
 * Renders any of the 150 brand logo / icon SVG variants fully inline.
 * No server, no public folder, no static file hosting needed.
 * Just import and use — the SVG is embedded directly in the DOM.
 *
 * Usage:
 *   import { Logo } from './components';
 *
 *   <Logo brand="wpmanagenia"  variant="logo" type="primary" />
 *   <Logo brand="fluentforms"  variant="icon" type="dark"    height={48} />
 *   <Logo brand="fluentcrm"    variant="logo" type="white"   />
 *
 * Props:
 *   brand     string  — brand slug (see BRANDS list below)      required
 *   variant   string  — 'logo' (icon + wordmark) | 'icon'       default: 'logo'
 *   type      string  — 'primary' | 'dark' | 'inverted'
 *                       | 'black'  | 'white'                    default: 'primary'
 *   height    number  — CSS height in px (width scales auto)    default: undefined
 *   width     number  — CSS width  in px (height scales auto)   default: undefined
 *   className string
 *   style     object
 *
 * Available brands:
 *   wpmanagenia · fluentforms · fluentcrm · ninjatables · fluentcommunity
 *   fluentbooking · paymattic · fluentboards · fluentsmtp · fluentsupport
 *   fluentaffiliate · azonpress · wpsocialninja · fluentcart · fluentplayer
 */

import React from 'react';
import logos from './logos.js';
import './Logo.css';

/* ── Brand slug list ─────────────────────────────────────────── */
export const BRANDS = Object.keys(logos);

/* ── Human-readable names (for aria-label) ───────────────────── */
const BRAND_NAMES = {
  wpmanagenia:     'WPManageNinja',
  fluentforms:     'Fluent Forms',
  fluentcrm:       'Fluent CRM',
  ninjatables:     'Ninja Tables',
  fluentcommunity: 'Fluent Community',
  fluentbooking:   'Fluent Booking',
  paymattic:       'Paymattic',
  fluentboards:    'Fluent Boards',
  fluentsmtp:      'Fluent SMTP',
  fluentsupport:   'Fluent Support',
  fluentaffiliate: 'Fluent Affiliate',
  azonpress:       'AzonPress',
  wpsocialninja:   'WP Social Ninja',
  fluentcart:      'Fluent Cart',
  fluentplayer:    'Fluent Player',
};

/* ── Component ───────────────────────────────────────────────── */
const Logo = ({
  brand,
  variant   = 'logo',
  type      = 'primary',
  height    = undefined,
  width     = undefined,
  className = '',
  style     = {},
  ...rest
}) => {
  if (!brand) {
    console.warn('[Logo] The `brand` prop is required.');
    return null;
  }

  var key    = `${variant}-${type}`;
  var svgStr = logos[brand]?.[key];

  if (!svgStr) {
    console.warn(`[Logo] No SVG found for brand="${brand}" variant="${variant}" type="${type}".`);
    return null;
  }

  var brandName  = BRAND_NAMES[brand] || brand;
  var typeStr    = type !== 'primary' ? ` (${type})` : '';
  var label      = variant === 'icon'
    ? `${brandName} icon mark${typeStr}`
    : `${brandName} logo${typeStr}`;

  /* Inject width/height as inline style so aspect ratio is always preserved */
  var wrapStyle = {
    display:     'inline-block',
    lineHeight:  0,
    flexShrink:  0,
    ...(height ? { height } : {}),
    ...(width  ? { width  } : {}),
    ...style,
  };

  /* Size the inner SVG to fill the wrapper */
  var svgWithSize = height || width
    ? svgStr
        .replace(/<svg /, '<svg style="height:100%;width:100%;" ')
    : svgStr;

  return (
    <span
      role="img"
      aria-label={label}
      className={`wpmn-logo wpmn-logo--${variant} wpmn-logo--${type} ${className}`.trim()}
      style={wrapStyle}
      dangerouslySetInnerHTML={{ __html: svgWithSize }}
      {...rest}
    />
  );
};

export default Logo;
