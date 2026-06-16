/**
 * WPMN Typography + Gap Conformance Audit
 *
 * Scans every sections/<id>/section.html for the canonical typography pairings and
 * the heading→body gap tokens, and reports what still doesn't conform.
 *
 * Run:  npm run audit:typo        (needs devDependency `jsdom`)
 *
 * Canon (heading → body, gap):
 *   h1→large 16  ·  h2→medium 12  ·  h3→medium 12  ·  h4→base 8  ·  h5→base 8  ·  h6→small 8
 * Gap token families: --spacing-h-*-to-* / --spacing-content-gap-* / --spacing-btn-in-section-*
 *
 * NOTE: the audit lists *candidates*. It can't tell a heading→body paragraph from a
 * stat-number+label or name+role pattern, so confirmed non-violations are listed in
 * EXCEPTIONS below (and explained in docs/TYPOGRAPHY-CONFORMANCE.md) and skipped.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let JSDOM;
try { ({ JSDOM } = require('jsdom')); }
catch { console.error('Missing dependency: run `npm i -D jsdom` first.'); process.exit(2); }

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SECTIONS = join(ROOT, 'sections');

const CANON = {
  h1:{body:'body-large',gapTok:'spacing-h-xxl-to-large',gap:16},
  h2:{body:'body-medium',gapTok:'spacing-h-xl-to-medium',gap:12},
  h3:{body:'body-medium',gapTok:'spacing-h-l-to-medium',gap:12},
  h4:{body:'body-base',gapTok:'spacing-h-m-to-base',gap:8},
  h5:{body:'body-base',gapTok:'spacing-h-s-to-base',gap:8},
  h6:{body:'body-small',gapTok:'spacing-h-xs-to-small',gap:8},
};
const PRIM={none:0,2:2,4:4,8:8,12:12,16:16,20:20,24:24,32:32,40:40,48:48,56:56,64:64,80:80,96:96,120:120};
const SEMV={'spacing-h-xxl-to-large':16,'spacing-h-xl-to-medium':12,'spacing-h-l-to-medium':12,'spacing-h-m-to-base':8,'spacing-h-s-to-base':8,'spacing-h-xs-to-small':8};
const val=t=>!t?null:t.startsWith('primitive-space-')?PRIM[t.slice(16)]:(SEMV[t]??null);

/* Confirmed NON-violations (stat/label/name patterns or accepted exceptions).
   Keep this in sync with docs/TYPOGRAPHY-CONFORMANCE.md. */
const EXCEPTIONS = new Set([
  'asymmetric-grid',     // editorial 12-col grid, not a header stack
  'stats-counter',       // stat number + label, not heading→body
  'team-grid',           // member name + role
  'work-portfolio',      // h1 + eyebrow/meta label
  'ecommerce-hero',      // label pair
  'portrait-stats-hero', // stat number + label
  'product-showcase',    // price/spec text
  'pricing-table',       // left per design decision
  'pricing-toggle',     // h3 flag is the .price ($) + per-text, not heading→body
  'floating-stats-cta', // .stat-num (h2) + .stat-cap (body-base) is a stat number + caption, not heading→body
]);

const ids = readdirSync(SECTIONS).filter(d => existsSync(join(SECTIONS,d,'section.html')));
const pairBad=[], gapBad=[]; let cov={h:0,content:0,btn:0,total:0};

for (const id of ids) {
  const html = readFileSync(join(SECTIONS,id,'section.html'),'utf8');
  let css = (html.match(/<style>([\s\S]*?)<\/style>/)||[])[1]||'';
  css = css.replace(/@media[^{]*\{(?:[^{}]|\{[^{}]*\})*\}/g,'');
  const cp={};
  for (const m of css.matchAll(/([.#][^{}]+)\{([^}]*)\}/g)) {
    const b=m[2];
    const fs=(b.match(/font-size:\s*var\(--font-size-([a-z0-9-]+)\)/)||[])[1];
    const mt=(b.match(/margin-top:\s*var\(--([a-z0-9-]+)\)/)||[])[1] || (b.match(/margin:\s*var\(--([a-z0-9-]+)\)/)||[])[1];
    for (const sel of m[1].split(',')) {
      const last=(sel.trim().split(/[\s>+~]+/).pop().match(/\.([\w-]+)/)||[])[1];
      if(!last) continue; cp[last]=cp[last]||{}; if(fs)cp[last].fs=fs; if(mt)cp[last].mt=mt;
    }
  }
  cov.total++;
  if(/--spacing-h-[a-z]+-to-/.test(css)) cov.h++;
  if(/--spacing-content-gap-/.test(css)) cov.content++;
  if(/--spacing-btn-in-section-/.test(css)) cov.btn++;
  if (EXCEPTIONS.has(id)) continue;

  const doc=new JSDOM(`<body>${html.replace(/<style>[\s\S]*?<\/style>/,'').replace(/<script>[\s\S]*?<\/script>/,'')}</body>`).window.document;
  const sizeOf=el=>{ for(const c of el.classList){ if(cp[c]&&cp[c].fs) return {fs:cp[c].fs,mt:cp[c].mt}; } return null; };
  const seen=new Set();
  for (const el of doc.querySelectorAll('*')) {
    const s=sizeOf(el); if(!s||!/^body-/.test(s.fs)) continue;
    let prev=el.previousElementSibling,h=null;
    while(prev){const ps=sizeOf(prev); if(ps&&/^h[1-6]$/.test(ps.fs)){h=ps;break;} if(ps&&/^body-/.test(ps.fs))break; prev=prev.previousElementSibling;}
    if(!h) continue;
    const c=CANON[h.fs], key=`${id}|${h.fs}|${s.fs}|${s.mt}`; if(seen.has(key))continue; seen.add(key);
    if(s.fs!==c.body) pairBad.push(`${id.padEnd(24)} ${h.fs} + ${s.fs}  → should be ${c.body}`);
    else if(val(s.mt)!==c.gap) gapBad.push(`${id.padEnd(24)} ${h.fs}→${s.fs}  gap ${val(s.mt)}px → should be ${c.gap}px (${c.gapTok})`);
  }
}

console.log('\n=== WPMN TYPOGRAPHY + GAP AUDIT ===');
console.log(`sections: ${cov.total}  ·  exceptions skipped: ${EXCEPTIONS.size}\n`);
console.log(`A) WRONG PAIRING (${pairBad.length})`); pairBad.forEach(r=>console.log('   '+r)); if(!pairBad.length)console.log('   none ✓');
console.log(`\nB) WRONG HEADING→BODY GAP (${gapBad.length})`); gapBad.forEach(r=>console.log('   '+r)); if(!gapBad.length)console.log('   none ✓');
console.log('\nC) SEMANTIC GAP-TOKEN COVERAGE');
console.log(`   --spacing-h-*-to-*        ${cov.h}/${cov.total}`);
console.log(`   --spacing-content-gap-*   ${cov.content}/${cov.total}`);
console.log(`   --spacing-btn-in-section  ${cov.btn}/${cov.total}`);
console.log(`\nsummary: ${pairBad.length} pairing + ${gapBad.length} gap issue(s) pending (excl. exceptions)\n`);
process.exit(pairBad.length+gapBad.length?1:0);
