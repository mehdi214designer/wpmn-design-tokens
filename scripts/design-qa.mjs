/**
 * WPMN Design System — Deep Design QA
 *
 * Audits every sections/<id>/section.html against the design system:
 *   buttons (canonical Button.css anatomy, one primary per section, no pills,
 *   no underlines), icons (Hugeicons 24-box, no freehand, invert-on-dark),
 *   token purity, radii, reduced-motion, responsiveness, script pattern,
 *   keyframe prefixes, ids, external assets.
 *
 * Documented exceptions live in scripts/design-qa-exceptions.json:
 *   { "<section>/<check>/<detail-substring>": "reason" }
 * A finding matching an exception is reported as SPECIAL, not ISSUE.
 *
 * Usage: node scripts/design-qa.mjs [--json]
 * Exit 1 when ISSUES remain, 0 when only SPECIALs.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

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

const dirs = readdirSync(SECTIONS, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);

for (const d of dirs) {
  const file = join(SECTIONS, d, 'section.html');
  if (!existsSync(file)) { report(d, 'files', 'missing section.html'); continue; }
  const s = readFileSync(file, 'utf8');
  const styles = [...s.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n');
  const scripts = [...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]).join('\n');
  const noMask = styles.replace(/(?:-webkit-)?mask-image:[^;]+;?/g, '')
    .replace(/var\(--btn-bg-glow,\s*rgba\(255,\s*255,\s*255,\s*0?\.3\)\)/g, '');

  /* 1 ─ raw colors */
  for (const m of noMask.matchAll(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g))
    if (!['rgba(0,0,0,0)', 'rgb(0,0,0)'].includes(m[0])) report(d, 'raw-color', m[0]);

  /* 2 ─ raw typography */
  for (const m of noMask.matchAll(/font-size:\s*[0-9.]+(?:px|rem|em)|font-weight:\s*[0-9]+|font-family:\s*(?!var|inherit)['"A-Za-z]/g))
    report(d, 'raw-font', m[0].trim());

  /* 3 ─ undefined tokens */
  const local = new Set([...s.matchAll(/(--[\w-]+)\s*:[^;]/g)].map(m => m[1]));
  local.add('--btn-bg-glow');
  for (const m of new Set([...s.matchAll(/var\((--[\w-]+)/g)].map(m => m[1])))
    if (!defined.has(m) && !local.has(m)) report(d, 'undefined-token', m);

  /* 4 ─ raw radius (allow var(), 999px, 50%, 0, inherit, calc(var…)) */
  for (const m of noMask.matchAll(/border-radius:\s*([^;}]+)/g)) {
    let v = m[1].trim(); while (/calc\((?:[^()]|\([^()]*\))*\)/.test(v)) v = v.replace(/calc\((?:[^()]|\([^()]*\))*\)/, 'CALC');
    const parts = v.split(/\s+/);
    const bad = parts.filter(p => !/^(var\(|CALC|999px|99px|50%|0(px)?|inherit)/.test(p));
    if (bad.length) report(d, 'raw-radius', v);
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
    if (/border-radius:\s*999px/.test(body)) report(d, 'btn-pill', selc);
    if (/background[^;]*var\(--btn-bg-enable\)/.test(body)) {
      primaries.add(selc);
      const fullRule = (styles.match(new RegExp(selc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{[^}]*\\}')) || [''])[0];
      if (!/box-shadow:[^;]*inset[^;]*btn-bg-glow/.test(fullRule)) report(d, 'btn-primary-anatomy', selc + ' missing glow inset');
      if (!/color:\s*var\(--color-text-primary-invert\)/.test(body)) report(d, 'btn-primary-anatomy', selc + ' missing invert text');
    }
  }
  if (primaries.size > 1) report(d, 'btn-multiple-primary', [...primaries].join(' + '));
  /* non-primary visible buttons must be canonical secondary (outline) or tertiary, light- or dark-surface variant */
  for (const [, sel, body] of btnRules) {
    const selc = sel.trim().split(',')[0];
    const lastCls = (selc.split(/[\s>+~]+/).pop().match(/\.([\w-]+)/) || [])[1] || '';
    if (primaries.has(selc)) continue;
    if (/_(icon|right|left|gradient)$|-(wrap|row|group|label)$/.test(lastCls)) continue;
    const hasBg = /background(?!-clip)\s*:(?!\s*(transparent|none))/.test(body);
    const isOutline = /border:\s*1\.5px\s+solid\s+var\(--(btn-bg-enable|color-text-primary-invert)\)/.test(body);
    if (hasBg && !isOutline)
      report(d, 'btn-secondary-anatomy', selc + ' has a filled background — DS secondary is transparent + 1.5px brand border');
    if (!hasBg && /border:\s*[^;]*solid(?![^;]*transparent)/.test(body) && !isOutline)
      report(d, 'btn-outline-border', selc + ' outline border is not 1.5px solid brand/invert');
  }
  /* underlines: anchors wrapping buttons or button-ish anchors without explicit none */
  if (/<a [^>]*>(\s|\n)*<button/.test(s)) {
    const fixed = new RegExp(`\\.wpmn-sec-${d}[^{}]*a[^{}]*\\{[^}]*text-decoration:\\s*none`).test(styles)
      || /(?:^|[,{ ])a\s*[,{][^}]*text-decoration:\s*none/.test(styles)
      || /\ba\b[^{}]*\{[^}]*text-decoration:\s*none/.test(styles);
    if (!fixed) report(d, 'btn-underline', 'anchor-wrapped <button> without text-decoration:none');
  }
  for (const m of noMask.matchAll(/([^{}]+)\{[^}]*text-decoration:\s*underline/g))
    if (/btn|cta/.test(m[1].split(/[\s>+~]/).pop() || '')) report(d, 'underline', 'underline in ' + m[1].trim());

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
      report(d, 'icon-not-hugeicons', `viewBox "${vb}" near "${ctx.split(' ').slice(-2).join(' ')}"`);
  }
  /* brand-colored icons on dark panels: heuristic — color:var(--btn-bg-enable) on svg/icon rule inside a section whose root/panel is surface-secondary */
  const sectionRootDark = new RegExp(`\\.wpmn-sec-${d}\\s*\\{[^}]*background[^;}]*surface-secondary`).test(styles)
    || new RegExp(`\\.wpmn-sec-${d}\\s+\\.[\\w-]*panel[\\w-]*\\s*\\{[^}]*surface-secondary`).test(styles);
  if (sectionRootDark) {
    for (const m of noMask.matchAll(/([^{}]+)\{[^}]*color:\s*var\(--btn-bg-enable\)/g)) {
      const sel = m[1].trim().split(',')[0];
      if (/(\.(ic|gic|icon|bg-icon|feat-icon)[\w-]*|icon)\s*(>?\s*svg)?$/.test(sel)) report(d, 'icon-brand-on-dark', sel);
    }
  }

  /* 7 ─ motion guards */
  const hasMotion = /@keyframes|requestAnimationFrame|setInterval|transition[^;{]*transform/.test(styles + scripts);
  if (hasMotion && !/prefers-reduced-motion/.test(s)) report(d, 'reduced-motion', 'animations without a prefers-reduced-motion guard');

  /* 8 ─ responsiveness */
  if (!/@media[^{]*max-width/.test(styles)) report(d, 'responsive', 'no max-width media query');

  /* 9 ─ script pattern */
  if (scripts.trim()) {
    if (/document\.currentScript\.parentElement/.test(scripts) && !/document\.currentScript\s*\?/.test(scripts))
      report(d, 'script-root', 'currentScript without querySelector fallback');
  }

  /* 10 ─ keyframes prefix */
  for (const m of styles.matchAll(/@keyframes\s+([\w-]+)/g))
    if (!m[1].startsWith('wpmn-')) report(d, 'keyframe-prefix', m[1]);

  /* 11 ─ ids (allow wpmn- namespaced svg plumbing) */
  for (const m of s.matchAll(/\sid="([^"]+)"/g))
    if (!m[1].startsWith('wpmn-')) report(d, 'dom-id', m[1]);

  /* 12 ─ external assets */
  for (const m of s.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g))
    if (!m[1].startsWith('https://images.unsplash.com/')) report(d, 'external-asset', m[1].slice(0, 80));
}

const issues = findings.filter(f => !f.special);
const specials = findings.filter(f => f.special);
if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ issues, specials }, null, 2));
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
  console.log(`\nDesign QA: ${issues.length} issue(s), ${specials.length} special case(s), ${dirs.length} sections scanned`);
}
process.exit(issues.length ? 1 : 0);
