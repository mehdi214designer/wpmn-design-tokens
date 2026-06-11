/**
 * WPMN Design System — Surface pairing audit
 *
 * Enforces the guideline rule: never dark text on dark surfaces,
 * never light text on light surfaces.
 *
 * Walks the DOM of every sections/<id>/section.html, computes each
 * element's effective surface (own background first, then nearest
 * ancestor), and flags mismatched text tokens.
 *
 * Surfaces:
 *   dark  — --color-surface-secondary, --color-brand-surface,
 *           --btn-bg-enable/hovered/pressed, success/warning/error fills
 *   light — --color-surface-primary, white, soft grey fills (default)
 *
 * Usage: node scripts/audit-surface-pairing.mjs   (requires: npm i linkedom)
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseHTML } from 'linkedom';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SECTIONS = join(ROOT, 'sections');

const DARK_BG = /background[^;]*(var\(--color-surface-secondary\)|var\(--color-brand-surface\)|var\(--btn-bg-(enable|hovered|pressed)\)|var\(--color-(success|warning|error)-primary\))/;
const LIGHT_BG = /background[^;]*(var\(--color-surface-primary\)|#fff\b|#ffffff)/;
const DARK_TEXT = /color:\s*var\(--color-text-(primary|secondary)\)(?!-)/;
const LIGHT_TEXT = /color:\s*var\(--color-text-(primary|secondary)-invert\)/;

function classInfo(styleText) {
  /* per class: base rule info + state rules (hover/active/selected/etc.)
     a state rule that brings its own background is judged against that
     background, not the base one */
  const info = {};
  for (const r of styleText.match(/[^{}]+\{[^}]*\}/g) || []) {
    const sel = r.slice(0, r.indexOf('{'));
    const body = r.slice(r.indexOf('{'));
    const seg = (sel.trim().split(/[\s>+~]+/).pop() || '');
    const cls = seg.replace(/^\./, '').replace(/:.*$/, '').replace(/\[.*$/, '');
    if (!cls) continue;
    const isState = /[:\[]/.test(seg.replace(/^\./, '')) || /\[data-|:hover|:active|:focus|aria-/.test(sel);
    const entry = {
      bg: DARK_BG.test(body) ? 'dark' : LIGHT_BG.test(body) ? 'light' : null,
      darkText: DARK_TEXT.test(body) && !/invert/.test(body),
      lightText: LIGHT_TEXT.test(body),
      isState,
    };
    const i = (info[cls] = info[cls] || { entries: [] });
    i.entries.push(entry);
    if (!isState && entry.bg) i.baseBg = entry.bg;
  }
  for (const cls of Object.keys(info)) {
    const i = info[cls];
    i.darkBg = i.baseBg === 'dark';
    i.lightBg = i.baseBg === 'light';
  }
  return info;
}

let issues = 0;
const dirs = readdirSync(SECTIONS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const d of dirs) {
  const src = readFileSync(join(SECTIONS, d, 'section.html'), 'utf8');
  const { document } = parseHTML(src);
  const styleText = Array.from(document.querySelectorAll('style')).map((s) => s.textContent).join('\n');
  const info = classInfo(styleText);

  const own = (el) => {
    for (const c of el.classList || []) {
      if (info[c]?.darkBg) return 'dark';
      if (info[c]?.lightBg) return 'light';
    }
    return null;
  };
  const surfaceOf = (el) => {
    // an element with its own colored/dark fill IS its own surface
    let cur = el;
    while (cur && cur.classList) {
      const s = own(cur);
      if (s) return s;
      cur = cur.parentElement;
    }
    return 'light'; // section default is surface-primary
  };

  const seen = new Set();
  for (const el of document.querySelectorAll('*')) {
    if (!el.classList) continue;
    for (const c of el.classList) {
      if (!info[c] || seen.has(d + c)) continue;
      const inherited = surfaceOf(el);
      for (const e of info[c].entries) {
        /* the surface this rule's text actually sits on */
        const eff = e.bg || (e.isState ? (info[c].baseBg || inherited) : inherited);
        if (e.darkText && eff === 'dark') {
          console.log(`VIOLATION ${d} .${c} — dark text on dark surface`);
          issues++; seen.add(d + c);
        }
        if (e.lightText && eff === 'light') {
          console.log(`VIOLATION ${d} .${c} — light text on light surface`);
          issues++; seen.add(d + c);
        }
      }
    }
  }
}

console.log(issues === 0
  ? `surface pairing audit: ${dirs.length} sections clean`
  : `${issues} violation(s) found`);
process.exit(issues ? 1 : 0);
