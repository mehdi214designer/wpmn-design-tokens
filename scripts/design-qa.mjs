/**
 * WPMN Design System — Deep Design QA
 *
 * Audits HTML against the WPMN design system. Three targets:
 *
 *   1. Library (default)   node scripts/design-qa.mjs
 *        Scans every sections/<id>/section.html — unchanged behaviour.
 *   2. Any HTML file/page  node scripts/design-qa.mjs path/to/page.html
 *        A standalone section, an exported page, or a full multi-section page.
 *        Globs and directories work too: "build/*.html", "dist/".
 *   3. Live URL            node scripts/design-qa.mjs https://example.com/page
 *        Fetches the page HTML and audits it. Best for WPMN-built pages that
 *        still carry the token CSS. For production pages where the CSS is
 *        compiled (tokens gone), use the rendered Chrome audit in the skill —
 *        the static scanner can only see what's in the served HTML.
 *
 * Checks: buttons (canonical Button.css anatomy, one primary per section, no
 *   pills, no underlines), icons (Hugeicons 24-box, no freehand, invert-on-dark),
 *   token purity (no raw hex/font/radius/spacing, every var() defined),
 *   typography canon (heading→body pairing + gap), surface/text pairing,
 *   reduced-motion, responsiveness, and repo conventions (script pattern,
 *   keyframe prefix, ids, external assets — library target only).
 *
 * Documented exceptions live in scripts/design-qa-exceptions.json:
 *   { "<section>/<check>/<detail-substring>": "reason" }
 * A finding matching an exception is reported as SPECIAL, not ISSUE.
 *
 * Usage: node scripts/design-qa.mjs [--json] [target ...]
 * Exit 1 when ISSUES remain, 0 when only SPECIALs.
 */
import { readFileSync, readdirSync, existsSync, statSync, globSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

/* Optional jsdom — used by the typography-pairing + heading-gap checks (14).
   Gracefully absent: those checks are skipped with a console note. */
let JSDOM = null;
try { ({ JSDOM } = createRequire(import.meta.url)('jsdom')); } catch { /* no jsdom */ }

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SECTIONS = join(ROOT, 'sections');
const EXC_PATH = join(ROOT, 'scripts', 'design-qa-exceptions.json');
const exceptions = existsSync(EXC_PATH) ? JSON.parse(readFileSync(EXC_PATH, 'utf8')) : {};

const tokenFiles = ['tokens.css', 'typography.css', 'primitives.css', 'brand-primitives.css'];
const defined = new Set();
for (const f of tokenFiles)
  for (const m of readFileSync(join(ROOT, f), 'utf8').matchAll(/(--[\w-]+)\s*:/g)) defined.add(m[1]);

const findings = []; // {section, check, detail, special}
function report(section, check, detail) {
  const key = Object.keys(exceptions).find(k => {
    const [s, c, sub] = k.split('/');
    return s === section && c === check && (sub === '*' || detail.includes(sub));
  });
  findings.push({ section, check, detail, special: key ? exceptions[key] : null });
}

/* Sections whose heading→body sequences are not real heading/body pairs
   (stat numbers, names, eyebrows, prices). Library target only. */
const TYPO_SKIP = new Set([
  'asymmetric-grid', 'stats-counter', 'team-grid', 'work-portfolio',
  'ecommerce-hero', 'portrait-stats-hero', 'product-showcase',
  'pricing-table', 'pricing-toggle', 'floating-stats-cta',
]);

/* All WPMN section scopes present in a document (for page-mode relational checks). */
function detectIds(html) {
  return [...new Set([...html.matchAll(/wpmn-sec-([a-z0-9-]+)/g)].map(m => m[1]))];
}

/**
 * Run the full check suite over one document.
 *   scope   report key for document-wide findings (section id, file name, or URL)
 *   s       the HTML
 *   ids     section scopes to run per-section relational checks against
 *   library true only for the repo sections/ pass — enables repo-convention checks
 *           (external-asset, dom-id, script-root, keyframe-prefix) and the typo skip list
 */
function runChecks(scope, s, ids, library) {
  const styles = [...s.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
  const scripts = [...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
  const noMask = styles.replace(/(?:-webkit-)?mask-image:[^;]+;?/g, '')
    .replace(/var\(--btn-bg-glow,\s*rgba\(255,\s*255,\s*255,\s*0?\.3\)\)/g, '');

  /* 1 ─ raw colors */
  for (const m of noMask.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g))
    if (!['rgba(0,0,0,0)', 'rgb(0,0,0)'].includes(m[0])) report(scope, 'raw-color', m[0]);

  /* 2 ─ raw typography */
  for (const m of noMask.matchAll(/font-size:\s*[0-9.]+(?:px|rem|em)|font-weight:\s*[0-9]+|font-family:\s*(?!var|inherit)['"A-Za-z]/g))
    report(scope, 'raw-font', m[0].trim());

  /* 3 ─ undefined tokens */
  const local = new Set([...s.matchAll(/(--[\w-]+)\s*:[^;]/g)].map(m => m[1]));
  local.add('--btn-bg-glow');
  for (const m of new Set([...s.matchAll(/var\((--[\w-]+)/g)].map(m => m[1])))
    if (!defined.has(m) && !local.has(m)) report(scope, 'undefined-token', m);

  /* 4 ─ raw radius (allow var(), 999px, 50%, 0, inherit, calc(var…)) */
  for (const m of noMask.matchAll(/border-radius:\s*([^;}]+)/g)) {
    let v = m[1].trim(); while (/calc\((?:[^()]|\([^()]*\))*\)/.test(v)) v = v.replace(/calc\((?:[^()]|\([^()]*\))*\)/, 'CALC');
    const parts = v.split(/\s+/);
    const bad = parts.filter(p => !/^(var\(|CALC|999px|99px|50%|0(px)?|inherit)/.test(p));
    if (bad.length) report(scope, 'raw-radius', v);
  }

  /* 5 ─ buttons */
  const btnRules = [...noMask.matchAll(/([^{}]+)\{([^}]*)\}/g)]
    .filter(([, sel]) => {
      if (/keyframes|::|:hover|:active|:focus|reduced|@media/i.test(sel)) return false;
      const segs = sel.trim().split(/[\s>+~]+/);
      const lastCls = (segs[segs.length - 1].match(/\.([\w-]+)/) || [])[1] || '';
      return /(^|-)(btn|cta)(-|$)|^(btn|cta)/.test(lastCls) && !/wpmn-sec/.test(lastCls);
    });
  const primaries = new Set();
  for (const [, sel, body] of btnRules) {
    const selc = sel.trim().split(',')[0];
    if (/border-radius:\s*999px/.test(body)) report(scope, 'btn-pill', selc);
    if (/background[^;]*var\(--btn-bg-enable\)/.test(body)) {
      primaries.add(selc);
      const fullRule = (styles.match(new RegExp(selc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{[^}]*\\}')) || [''])[0];
      if (!/box-shadow:[^;]*inset[^;]*btn-bg-glow/.test(fullRule)) report(scope, 'btn-primary-anatomy', selc + ' missing glow inset');
      if (!/color:\s*var\(--color-text-primary-invert\)/.test(body)) report(scope, 'btn-primary-anatomy', selc + ' missing invert text');
    }
  }
  /* one primary per section — single-section docs check the whole file; full pages
     group primaries by the .wpmn-sec-<id> scope their rule sits under */
  if (ids.length <= 1) {
    if (primaries.size > 1) report(scope, 'btn-multiple-primary', [...primaries].join(' + '));
  } else {
    for (const id of ids) {
      const inSec = [...primaries].filter(p => p.includes('wpmn-sec-' + id));
      if (inSec.length > 1) report(id, 'btn-multiple-primary', inSec.join(' + '));
    }
  }
  /* non-primary visible buttons must be canonical secondary (outline) or tertiary, light- or dark-surface variant */
  for (const [, sel, body] of btnRules) {
    const selc = sel.trim().split(',')[0];
    const lastCls = (selc.split(/[\s>+~]+/).pop().match(/\.([\w-]+)/) || [])[1] || '';
    if (primaries.has(selc)) continue;
    if (/_(icon|right|left|gradient)$|-(wrap|row|group|label)$/.test(lastCls)) continue;
    const hasBg = /background(?!-clip)\s*:(?!\s*(transparent|none))/.test(body);
    const isOutline = /border:\s*1\.5px\s+solid\s+var\(--(btn-bg-enable|color-text-primary-invert)\)/.test(body);
    if (hasBg && !isOutline)
      report(scope, 'btn-secondary-anatomy', selc + ' has a filled background — DS secondary is transparent + 1.5px brand border');
    if (!hasBg && /border:\s*[^;]*solid(?![^;]*transparent)/.test(body) && !isOutline)
      report(scope, 'btn-outline-border', selc + ' outline border is not 1.5px solid brand/invert');
  }
  /* underlines: anchors wrapping buttons or button-ish anchors without explicit none */
  if (/<a [^>]*>(\s|\n)*<button/.test(s)) {
    const fixed = ids.some(id => new RegExp(`\\.wpmn-sec-${id}[^{}]*a[^{}]*\\{[^}]*text-decoration:\\s*none`).test(styles))
      || /(?:^|[,{ ])a\s*[,{][^}]*text-decoration:\s*none/.test(styles)
      || /\ba\b[^{}]*\{[^}]*text-decoration:\s*none/.test(styles);
    if (!fixed) report(scope, 'btn-underline', 'anchor-wrapped <button> without text-decoration:none');
  }
  for (const m of noMask.matchAll(/([^{}]+)\{[^}]*text-decoration:\s*underline/g))
    if (/btn|cta/.test(m[1].split(/[\s>+~]/).pop() || '')) report(scope, 'underline', 'underline in ' + m[1].trim());

  /* 6 ─ icons: svgs in icon contexts must be 24-box (Hugeicons) */
  for (const m of s.matchAll(/<svg([^>]*)viewBox="([^"]+)"/g)) {
    const vb = m[2];
    if (vb === '0 0 24 24') continue;
    const before = s.slice(Math.max(0, m.index - 400), m.index);
    const ownCls = (m[1].match(/class="([^"]*)"/) || [])[1] || '';
    const ctxCls = ([...before.matchAll(/class="([^"]*)"/g)].pop() || [])[1] || '';
    const ctx = (ownCls + ' ' + ctxCls).trim();
    const ARTWORK = /dash|underline|swirl|tab-outline|gauge|chart|spark|deco|wordmark|logo|graphic|sig-mark|ruler|pill\b|kicker|stage|u\b|seal|mockup|bar|meter|dot/;
    const ICONISH = /(^|[ -])(ic|gic|icon|li-icon|eyebrow|feat|btn|cta|arrow|arr|social|mark|num|delta|star|stat|spin)([ -_]|$)/;
    if (ICONISH.test(ctx) && !ARTWORK.test(ctx))
      report(scope, 'icon-not-hugeicons', `viewBox "${vb}" near "${ctx.split(' ').slice(-2).join(' ')}"`);
  }
  /* brand-colored icons on dark panels: per section scope */
  for (const id of ids) {
    const sectionRootDark = new RegExp(`\\.wpmn-sec-${id}\\s*\\{[^}]*background[^;}]*surface-secondary`).test(styles)
      || new RegExp(`\\.wpmn-sec-${id}\\s+\\.[\\w-]*panel[\\w-]*\\s*\\{[^}]*surface-secondary`).test(styles);
    if (!sectionRootDark) continue;
    for (const m of noMask.matchAll(/([^{}]+)\{[^}]*color:\s*var\(--btn-bg-enable\)/g)) {
      const sel = m[1].trim().split(',')[0];
      if (/(\.(ic|gic|icon|bg-icon|feat-icon)[\w-]*|icon)\s*(>?\s*svg)?$/.test(sel)) report(id, 'icon-brand-on-dark', sel);
    }
  }

  /* 7 ─ motion guards */
  const hasMotion = /@keyframes|requestAnimationFrame|setInterval|transition[^;{]*transform/.test(styles + scripts);
  if (hasMotion && !/prefers-reduced-motion/.test(s)) report(scope, 'reduced-motion', 'animations without a prefers-reduced-motion guard');

  /* 8 ─ responsiveness */
  if (!/@media[^{]*max-width/.test(styles)) report(scope, 'responsive', 'no max-width media query');

  /* 9 ─ script pattern (repo convention) */
  if (library && scripts.trim()) {
    if (/document\.currentScript\.parentElement/.test(scripts) && !/document\.currentScript\s*\?/.test(scripts))
      report(scope, 'script-root', 'currentScript without querySelector fallback');
  }

  /* 10 ─ keyframes prefix (repo convention) */
  if (library)
    for (const m of styles.matchAll(/@keyframes\s+([\w-]+)/g))
      if (!m[1].startsWith('wpmn-')) report(scope, 'keyframe-prefix', m[1]);

  /* 11 ─ ids (repo convention; allow wpmn- namespaced svg plumbing) */
  if (library)
    for (const m of s.matchAll(/\sid="([^"]+)"/g))
      if (!m[1].startsWith('wpmn-')) report(scope, 'dom-id', m[1]);

  /* 12 ─ external assets (repo convention: verified Unsplash only) */
  if (library)
    for (const m of s.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g))
      if (!m[1].startsWith('https://images.unsplash.com/')) report(scope, 'external-asset', m[1].slice(0, 80));

  /* 14 ─ typography pairing + heading-gap (jsdom required) */
  const skipTypo = library && ids.length === 1 && TYPO_SKIP.has(ids[0]);
  if (JSDOM && !skipTypo) {
    const TYPO_CANON = {
      'h1': { body: 'body-large',  gapTok: 'spacing-h-xxl-to-large', gap: 16 },
      'h2': { body: 'body-medium', gapTok: 'spacing-h-xl-to-medium',  gap: 12 },
      'h3': { body: 'body-medium', gapTok: 'spacing-h-l-to-medium',   gap: 12 },
      'h4': { body: 'body-base',   gapTok: 'spacing-h-m-to-base',     gap: 8  },
      'h5': { body: 'body-base',   gapTok: 'spacing-h-s-to-base',     gap: 8  },
      'h6': { body: 'body-small',  gapTok: 'spacing-h-xs-to-small',   gap: 8  },
    };
    const SEMV = { 'spacing-h-xxl-to-large': 16, 'spacing-h-xl-to-medium': 12, 'spacing-h-l-to-medium': 12, 'spacing-h-m-to-base': 8, 'spacing-h-s-to-base': 8, 'spacing-h-xs-to-small': 8 };
    const PRIMV = { 0: 0, 2: 2, 4: 4, 8: 8, 12: 12, 16: 16, 20: 20, 24: 24, 32: 32, 40: 40, 48: 48, 56: 56, 64: 64, 80: 80, 96: 96, 120: 120 };
    const valOf = t => !t ? null : t.startsWith('primitive-space-') ? (PRIMV[t.slice(16)] ?? null) : (SEMV[t] ?? null);
    const cssNM = styles.replace(/@media[^{]*\{(?:[^{}]|\{[^{}]*\})*\}/g, '');
    const cp = {};
    for (const m of cssNM.matchAll(/([.#][^{}]+)\{([^}]*)\}/g)) {
      const b = m[2];
      const fs = (b.match(/font-size:\s*var\(--font-size-([a-z0-9-]+)\)/) || [])[1];
      const mt = (b.match(/margin-top:\s*var\(--([a-z0-9-]+)\)/) || [])[1]
             || (b.match(/margin:\s*var\(--([a-z0-9-]+)\)/) || [])[1];
      for (const sel of m[1].split(',')) {
        const last = (sel.trim().split(/[\s>+~]+/).pop().match(/\.([\w-]+)/) || [])[1];
        if (!last) continue;
        cp[last] = cp[last] || {};
        if (fs) cp[last].fs = fs;
        if (mt) cp[last].mt = mt;
      }
    }
    const sizeOf = el => { for (const c of el.classList) { if (cp[c] && cp[c].fs) return { fs: cp[c].fs, mt: cp[c].mt }; } return null; };
    const doc = new JSDOM(`<body>${s.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<script>[\s\S]*?<\/script>/g, '')}</body>`).window.document;
    const seen = new Set();
    for (const el of doc.querySelectorAll('*')) {
      const sz = sizeOf(el);
      if (!sz || !/^body-/.test(sz.fs)) continue;
      let prev = el.previousElementSibling, h = null;
      while (prev) {
        const ps = sizeOf(prev);
        if (ps && /^h[1-6]$/.test(ps.fs)) { h = ps; break; }
        if (ps && /^body-/.test(ps.fs)) break;
        prev = prev.previousElementSibling;
      }
      if (!h) continue;
      const c = TYPO_CANON[h.fs];
      if (!c) continue;
      const key = `${h.fs}|${sz.fs}|${sz.mt}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (sz.fs !== c.body) report(scope, 'typo-pairing', `${h.fs} + ${sz.fs} (should be ${h.fs} + ${c.body})`);
      else if (valOf(sz.mt) !== c.gap) report(scope, 'typo-gap', `${h.fs}→${sz.fs} gap ${valOf(sz.mt) ?? 'null'}px (should be ${c.gap}px via --${c.gapTok})`);
    }
  }

  /* 13 ─ raw spacing (padding/margin/gap must be tokens; allow 0/auto/neg/calc + structural px) */
  const SPACING_EXC = new Set(['320px', '360px', '480px']);
  for (const m of noMask.matchAll(/(?:^|[;{])\s*((?:padding|margin|gap|row-gap|column-gap|grid-gap)(?:-(?:top|right|bottom|left|inline|block|inline-start|inline-end|block-start|block-end))?)\s*:\s*([^;}]+)/g)) {
    let v = m[2].trim();
    while (/(?:calc|clamp|min|max)\((?:[^()]|\([^()]*\))*\)/.test(v)) v = v.replace(/(?:calc|clamp|min|max)\((?:[^()]|\([^()]*\))*\)/, 'FN');
    for (const p of v.split(/\s+/)) {
      if (/^(?:var\(|FN$|0(?:px)?$|auto$|-)/.test(p)) continue;
      if (/^\d+(?:\.\d+)?px$/.test(p) && !SPACING_EXC.has(p)) report(scope, 'raw-spacing', m[1] + ': ' + p);
    }
  }

  /* 15 ─ surface/text pairing (the "invisible heading" bug) */
  for (const id of ids) {
    const rootRulePair = (styles.match(new RegExp(`\\.wpmn-sec-${id}\\s*\\{[^}]*\\}`)) || [''])[0];
    if (/background[^;}]*surface-secondary/.test(rootRulePair) && /color:\s*var\(--color-text-(?:primary|secondary)\)/.test(rootRulePair))
      report(id, 'surface-text-pairing', 'dark section root uses non-invert text color (use --color-text-*-invert)');
  }
  for (const m of styles.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const sel = m[1].trim(), body = m[2];
    if (/keyframes|@media/i.test(sel)) continue;
    if (/background[^;}]*surface-secondary/.test(body) && /color:\s*var\(--color-text-(?:primary|secondary)\)/.test(body))
      report(scope, 'surface-text-pairing', `${sel.split(',')[0]} paints a dark surface but uses non-invert text`);
  }
}

/* ── input resolution ─────────────────────────────────────────────── */
const argv = process.argv.slice(2);
const JSONOUT = argv.includes('--json');
const targets = argv.filter(a => !a.startsWith('--'));

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'wpmn-design-qa' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

let scanned = 0;

if (targets.length === 0) {
  /* Library mode — unchanged */
  const dirs = readdirSync(SECTIONS, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
  for (const d of dirs) {
    const file = join(SECTIONS, d, 'section.html');
    if (!existsSync(file)) { report(d, 'files', 'missing section.html'); continue; }
    runChecks(d, readFileSync(file, 'utf8'), [d], true);
    scanned++;
  }
} else {
  /* File / glob / directory / URL mode */
  const files = [];
  const urls = [];
  for (const t of targets) {
    if (/^https?:\/\//i.test(t)) { urls.push(t); continue; }
    if (/[*?[]/.test(t)) { for (const f of globSync(t)) files.push(f); continue; }
    if (existsSync(t) && statSync(t).isDirectory()) {
      for (const f of readdirSync(t)) if (f.endsWith('.html')) files.push(join(t, f));
      for (const f of globSync(join(t, '*', 'section.html'))) files.push(f);
      continue;
    }
    files.push(t);
  }
  for (const f of files) {
    if (!existsSync(f)) { report(f, 'files', 'file not found'); continue; }
    const html = readFileSync(f, 'utf8');
    const ids = detectIds(html);
    /* label by folder when the file is a generic section.html */
    const bn = basename(f);
    const label = bn === 'section.html' ? basename(dirname(f)) : bn;
    runChecks(label, html, ids.length ? ids : [label.replace(/\.html$/, '')], false);
    scanned++;
  }
  for (const u of urls) {
    let html;
    try { html = await fetchHtml(u); }
    catch (e) { report(u, 'fetch', `could not fetch (${e.message}) — for compiled/JS-rendered pages use the rendered Chrome audit`); continue; }
    const ids = detectIds(html);
    if (!ids.length) report(u, 'note', 'no .wpmn-sec-* scopes in served HTML — token/scoped checks limited; use the rendered Chrome audit for full coverage');
    runChecks(u, html, ids.length ? ids : [u], false);
    scanned++;
  }
}

/* ── output ───────────────────────────────────────────────────────── */
const issues = findings.filter(f => !f.special);
const specials = findings.filter(f => f.special);
if (JSONOUT) {
  console.log(JSON.stringify({ issues, specials, scanned }, null, 2));
} else {
  let last = '';
  for (const f of issues) {
    if (f.section !== last) { console.log(`\n■ ${f.section}`); last = f.section; }
    console.log(`   [${f.check}] ${f.detail}`);
  }
  if (specials.length) {
    console.log(`\n— ${specials.length} documented special case(s):`);
    for (const f of specials) console.log(`   ◇ ${f.section} [${f.check}] ${f.detail} — ${f.special}`);
  }
  const unit = targets.length === 0 ? 'sections' : 'document(s)';
  console.log(`\nDesign QA: ${issues.length} issue(s), ${specials.length} special case(s), ${scanned} ${unit} scanned`);
}
process.exit(issues.length ? 1 : 0);
