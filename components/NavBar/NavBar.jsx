import React, { useState } from 'react';
import './NavBar.css';

/**
 * WPMN Design System — NavBar
 * Rebuilt from Figma node 341:657
 *
 * Props:
 *   logo        ReactNode — brand logo (image, SVG, or component)
 *   links       Array<{ label: string, href: string, active?: boolean }>
 *   ctaLabel    string    — CTA button text              default: 'Sign Up'
 *   ctaHref     string    — CTA button href              default: '#'
 *   onCtaClick  function  — CTA click handler (optional, use instead of href)
 *   className   string
 *
 * Responsive behaviour (automatic):
 *   ≥ 769px (Desktop): full nav links + primary filled CTA
 *   ≤ 768px (Mobile):  logo + secondary outlined CTA + hamburger → slide-down drawer
 */

/* ── Inline SVG icons ─────────────────────────────────────────── */
const ArrowRightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HamburgerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8.5h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 16h24"  stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 23.5h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8l16 16M24 8L8 24" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round"/>
  </svg>
);

/* ── Component ────────────────────────────────────────────────── */
const NavBar = ({
  logo       = null,
  links      = [],
  ctaLabel   = 'Sign Up',
  ctaHref    = '#',
  onCtaClick = undefined,
  className  = '',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCtaClick = onCtaClick
    ? (e) => { e.preventDefault(); onCtaClick(e); }
    : undefined;

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header
      className={`wpmn-navbar ${className}`}
      data-mobile-open={mobileOpen || undefined}
    >
      {/* ── Logo ──────────────────────────────────────────── */}
      <a href="/" className="wpmn-navbar__logo" aria-label="Home">
        {logo}
      </a>

      {/* ── Desktop: nav links + primary CTA ──────────────── */}
      <nav className="wpmn-navbar__nav" aria-label="Main navigation">
        {links.length > 0 && (
          <ul className="wpmn-navbar__links" role="list">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href || '#'}
                  className={`wpmn-navbar__link${link.active ? ' wpmn-navbar__link--active' : ''}`}
                  aria-current={link.active ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <a
          href={ctaHref}
          className="wpmn-navbar__cta wpmn-navbar__cta--primary"
          onClick={handleCtaClick}
        >
          {ctaLabel}
          <ArrowRightIcon />
        </a>
      </nav>

      {/* ── Mobile: secondary CTA + hamburger ─────────────── */}
      <div className="wpmn-navbar__mobile-controls">
        <a
          href={ctaHref}
          className="wpmn-navbar__cta wpmn-navbar__cta--secondary"
          onClick={handleCtaClick}
        >
          {ctaLabel}
          <ArrowRightIcon />
        </a>

        <button
          className="wpmn-navbar__hamburger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="wpmn-navbar-mobile-menu"
          onClick={() => setMobileOpen(prev => !prev)}
        >
          {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* ── Mobile drawer (rendered only when open) ───────── */}
      <nav
        id="wpmn-navbar-mobile-menu"
        className="wpmn-navbar__mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
      >
        {links.length > 0 && (
          <ul role="list">
            {links.map((link, i) => (
              <li key={i}>
                <a
                  href={link.href || '#'}
                  className={`wpmn-navbar__link${link.active ? ' wpmn-navbar__link--active' : ''}`}
                  aria-current={link.active ? 'page' : undefined}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
