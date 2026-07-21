import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const URL   = process.argv[2];
const BRAND = process.argv[3] || 'wpmanagenia';
if (!URL) { console.error('usage: check.mjs <file-url> <brand-key>'); process.exit(1); }
const HERE  = path.dirname(fileURLToPath(import.meta.url));
const RAMPS = JSON.parse(fs.readFileSync(path.join(HERE,'..','reference','brand-ramps.json'),'utf8'));
if (!RAMPS[BRAND]) { console.error("unknown brand '"+BRAND+"'. known: "+Object.keys(RAMPS).sort().join(', ')); process.exit(1); }
const BRAND_RAMP = RAMPS[BRAND];

const b = await chromium.launch({ args: ["--no-sandbox", "--disable-gpu"] });
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto(URL, { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);

const report = await p.evaluate((BRAND_RAMP) => {
  // WPMN token sets (Paymattic brand)
  const COLORS = new Set([
    '#ffffff','#f6f7f8','#edeef1','#dbdee4','#c9ced6','#b8bec9','#a6aebb','#949dae',
    '#838da0','#717d93','#5f6d85','#4e5d78',
    '#46536c','#3e4a60','#364154','#2e3748','#272e3c','#1f2530','#171b24','#0f1218','#07090c','#000000',
    '#edeef1','#dcdee2','#b7bec7','#939dab','#6e7d8f','#4c5c73','#3c4a5c','#2d3745','#1d252e','#101217','#07090b',
    ...BRAND_RAMP,
    // feedback
    '#22b814','#55eb47','#80f075','#cc6600','#ff9933','#ffcc99','#ffe5cc','#fff2e5','#ff3333','#ff0000','#ff6666',
    'transparent','rgba(0, 0, 0, 0)'
  ]);
  const SPACE = new Set([0,2,4,8,12,16,20,24,32,40,48,56,64,80,96,120,160,192,224,256]);
  const RADII = new Set([0,8,12,16,32]);
  // headings 61/49/39/31/25/20 + body 20/18/16/14/13/10 + button 23/20/18/16/13
  const SIZES = new Set([10,13,14,16,18,20,23,25,31,39,49,61]);
  const WEIGHTS = new Set([400,500,600,700]);

  const toHex = (c) => {
    if (!c || c === 'none') return null;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return c.toLowerCase();
    const [r,g,bl,a] = m[1].split(',').map(s=>parseFloat(s));
    if (a === 0) return 'transparent';
    return '#' + [r,g,bl].map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
  };
  const px = (v) => { const n = parseFloat(v); return isNaN(n) ? null : Math.round(n*1000)/1000; };

  const hits = { colors:{}, typography:{}, spacing:{}, radius:{} };
  const samples = {};
  const sel = (el) => {
    const c = (el.className && typeof el.className === 'string')
      ? '.' + el.className.trim().split(/\s+/).slice(0,2).join('.') : '';
    return el.tagName.toLowerCase() + c + (el.id ? '#'+el.id : '');
  };
  const bump = (bucket, key, el) => {
    hits[bucket][key] = (hits[bucket][key]||0)+1;
    if (el && !samples[key]) samples[key] = sel(el);
  };

  const els = document.querySelectorAll('body *');
  let scanned = 0;
  for (const el of els) {
    if (el.closest('svg')) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    scanned++;

    // colours
    for (const prop of ['color','background-color','border-top-color']) {
      const raw = cs.getPropertyValue(prop);
      const hex = toHex(raw);
      if (!hex || hex === 'transparent') continue;
      if (prop === 'border-top-color' && cs.borderTopWidth === '0px') continue;
      if (!COLORS.has(hex)) bump('colors', prop+' '+hex, el);
    }
    // typography
    const fam = (cs.fontFamily||'').toLowerCase();
    if (!fam.includes('work sans') && !fam.includes('monospace')) bump('typography','font-family '+fam.split(',')[0], el);
    const w = parseInt(cs.fontWeight,10);
    if (!WEIGHTS.has(w)) bump('typography','font-weight '+w, el);
    const fsz = px(cs.fontSize);
    if (fsz !== null && !SIZES.has(Math.round(fsz))) bump('typography','font-size '+fsz, el);

    // spacing
    for (const prop of ['padding-top','padding-bottom','padding-left','padding-right',
                        'margin-top','margin-bottom','margin-left','margin-right','row-gap','column-gap']) {
      // skip layout mechanisms, not design tokens:
      //  - % aspect-ratio spacers (height:0 + padding-bottom:%)
      //  - auto margins (centering) -> browser reports the used px value
      if (el.matches('.kb-is-ratio-image, .kadence-info-box-image-intrisic, [class*="ratio"], [class*="intrisic"], [class*="sr-only"], .screen-reader-text, figure.aligncenter')) continue;
      if (prop.startsWith('padding') && cs.height === '0px') continue;
      if (prop.startsWith('margin')) {
        const sp = el.style.getPropertyValue(prop);
        if (sp === 'auto' || cs.marginLeft === cs.marginRight && !Number.isInteger(parseFloat(cs.marginLeft))) continue;
        if (el.matches('.site-container, .kt-tabs-title-list, .kt-row-column-wrap, .wp-block-kadence-column, .kt-blocks-accordion-icon-trigger, .wp-block-kadence-advancedheading')) continue;
      }
      const v = px(cs.getPropertyValue(prop));
      if (v === null || v === 0) continue;
      if (!Number.isInteger(v)) continue;               // computed/auto artefacts
      if (!SPACE.has(Math.abs(Math.round(v)))) bump('spacing', prop+' '+v, el);
    }
    // radius
    for (const prop of ['border-top-left-radius','border-bottom-right-radius']) {
      const raw = cs.getPropertyValue(prop);
      if (raw.includes('%')) continue;            // true circles allowed
      const v = px(raw);
      if (v === null || v === 0) continue;
      if (v >= 500) continue;                      // pill via huge radius
      if (!RADII.has(Math.round(v))) bump('radius', prop+' '+v, el);
    }
  }
  const top = (o,n=12) => Object.entries(o).sort((a,b)=>b[1]-a[1]).slice(0,n);
  const total = Object.values(hits).reduce((s,o)=>s+Object.values(o).reduce((a,b)=>a+b,0),0);
  const distinct = Object.values(hits).reduce((s,o)=>s+Object.keys(o).length,0);
  return { scanned, total, distinct, samples,
    colors: top(hits.colors), typography: top(hits.typography),
    spacing: top(hits.spacing), radius: top(hits.radius) };
}, BRAND_RAMP);

console.log('scanned elements:', report.scanned);
console.log('DISTINCT violations:', report.distinct, ' total hits:', report.total);
for (const k of ['colors','typography','spacing','radius']) {
  console.log('\n== ' + k.toUpperCase() + ' ==');
  if (!report[k].length) { console.log('  clean'); continue; }
  for (const [key, n] of report[k]) console.log('  ' + String(n).padStart(4) + '  ' + key + '   <- ' + (report.samples[key]||''));
}
await b.close();
