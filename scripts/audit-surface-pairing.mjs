/**
 * WPMN Design System — Surface pairing audit (v2, cascade-aware)
 *
 * Enforces the guideline rule: never dark text on dark surfaces,
 * never light text on light surfaces.
 *
 * v2 fixes a blind spot: descendant element selectors (".card h3")
 * are now attributed to their owning class, and conflicting rules of
 * equal weight are resolved by specificity + source order, so cascade
 * bugs (a later generic rule beating an earlier invert rule) are caught.
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

/* Parse rules into:
   - bgByClass: class -> base background ('dark'|'light') from non-state rules
   - textRules: list of { ownerClass, element ('h3'|'p'|null=self), tone, spec, order, isState, bg } */
function parseCss(styleText) {
  const bgByClass = {};
  const textRules = [];
  let order = 0;
  for (const r of styleText.match(/[^{}]+\{[^}]*\}/g) || []) {
    order++;
    const selFull = r.slice(0, r.indexOf('{'));
    const body = r.slice(r.indexOf('{'));
    for (const sel of selFull.split(',')) {
      const segs = sel.trim().split(/[\s>+~]+/).filter(Boolean);
      if (!segs.length) continue;
      const last = segs[segs.length - 1];
      const lastIsClass = last.startsWith('.');
      /* owning class: last class segment in the selector */
      let ownerClass = null;
      for (let i = segs.length - 1; i >= 0; i--) {
        if (segs[i].startsWith('.')) {
          ownerClass = segs[i].replace(/^\./, '').replace(/:.*$/, '').replace(/\[.*$/, '');
          break;
        }
      }
      if (!ownerClass) continue;
      const isState = /:hover|:active|:focus|\[data-|\[aria-/.test(sel);
      const spec = (sel.match(/\./g) || []).length;
      const bg = DARK_BG.test(body) ? 'dark' : LIGHT_BG.test(body) ? 'light' : null;

      if (lastIsClass && !isState && bg) {
        const cls = last.replace(/^\./, '').replace(/:.*$/, '').replace(/\[.*$/, '');
        bgByClass[cls] = bg;
      }
      const tone = DARK_TEXT.test(body) && !/invert/.test(body) ? 'dark'
        : LIGHT_TEXT.test(body) ? 'light' : null;
      if (tone) {
        textRules.push({
          ownerClass,
          element: lastIsClass ? null : last.replace(/:.*$/, ''),
          tone, spec, order, isState, bg,
        });
      }
    }
  }
  return { bgByClass, textRules };
}

let issues = 0;
const dirs = readdirSync(SECTIONS, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

for (const d of dirs) {
  const src = readFileSync(join(SECTIONS, d, 'section.html'), 'utf8');
  const { document } = parseHTML(src);
  const styleText = Array.from(document.querySelectorAll('style')).map((s) => s.textContent).join('\n');
  const { bgByClass, textRules } = parseCss(styleText);

  const surfaceOf = (el) => {
    let cur = el;
    while (cur && cur.classList) {
      for (const c of cur.classList) {
        if (bgByClass[c]) return bgByClass[c];
      }
      cur = cur.parentElement;
    }
    return 'light'; /* section default is surface-primary */
  };

  const seen = new Set();
  for (const el of document.querySelectorAll('*')) {
    const tag = el.tagName ? el.tagName.toLowerCase() : '';
    const classes = Array.from(el.classList || []);
    const ancestorClasses = new Set(classes);
    let a = el.parentElement;
    while (a && a.classList) { a.classList.forEach((c) => ancestorClasses.add(c)); a = a.parentElement; }

    /* candidate rules: self rules on own classes + element rules owned by any ancestor class */
    const candidates = textRules.filter((r) =>
      (r.element === null && classes.includes(r.ownerClass)) ||
      (r.element === tag && ancestorClasses.has(r.ownerClass))
    );
    if (!candidates.length) continue;

    /* cascade winner among non-state rules: highest specificity, then latest order */
    const base = candidates.filter((r) => !r.isState);
    if (base.length) {
      const win = base.sort((x, y) => x.spec - y.spec || x.order - y.order).pop();
      const eff = win.bg || surfaceOf(el);
      const key = d + '|' + (classes[0] || tag) + '|' + win.tone;
      if (!seen.has(key)) {
        if (win.tone === 'dark' && eff === 'dark') {
          console.log(`VIOLATION ${d} <${tag} class="${classes.join(' ')}"> — dark text on dark surface (rule: .${win.ownerClass}${win.element ? ' ' + win.element : ''})`);
          issues++; seen.add(key);
        }
        if (win.tone === 'light' && eff === 'light') {
          console.log(`VIOLATION ${d} <${tag} class="${classes.join(' ')}"> — light text on light surface (rule: .${win.ownerClass}${win.element ? ' ' + win.element : ''})`);
          issues++; seen.add(key);
        }
      }
    }
    /* state rules judged against their own bg if present, else element surface */
    for (const r of candidates.filter((x) => x.isState)) {
      const eff = r.bg || surfaceOf(el);
      const key = d + '|' + r.ownerClass + '|state|' + r.tone;
      if (seen.has(key)) continue;
      if (r.tone === 'dark' && eff === 'dark') { console.log(`VIOLATION ${d} state .${r.ownerClass} — dark text on dark`); issues++; seen.add(key); }
      if (r.tone === 'light' && eff === 'light') { console.log(`VIOLATION ${d} state .${r.ownerClass} — light text on light`); issues++; seen.add(key); }
    }
  }
}

console.log(issues === 0
  ? `surface pairing audit v2: ${dirs.length} sections clean`
  : `${issues} violation(s) found`);
process.exit(issues ? 1 : 0);
