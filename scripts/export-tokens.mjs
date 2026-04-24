/**
 * WPMN Design System — Token Exporter
 *
 * Fetches ALL Figma variables (primitives + semantic tokens) including
 * every mode (one per product brand) and writes:
 *
 *   primitives.css   — raw colour/radius/spacing values, one :root block
 *                      per brand mode  e.g. [data-brand="fluentforms"] { … }
 *   tokens.css       — semantic aliases that reference primitive tokens
 *
 * Usage:
 *   FIGMA_TOKEN=your_token node scripts/export-tokens.mjs
 */

import fs   from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname   = path.dirname(fileURLToPath(import.meta.url));
const FILE_KEY    = '54BG58iHusICXloB0fauSM';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const OUT_DIR     = path.join(__dirname, '..');

if (!FIGMA_TOKEN) {
  console.error('❌  FIGMA_TOKEN is required.');
  process.exit(1);
}

// ── Helpers ────────────────────────────────────────────────────
function toHex(r, g, b, a = 1) {
  const hex = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  return a < 1
    ? `rgba(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)}, ${+a.toFixed(3)})`
    : `#${hex(r)}${hex(g)}${hex(b)}`;
}

function toCssName(name) {
  // "Primitives/Brand/Primary/500" → "--primitive-brand-primary-500"
  return '--' + name
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

// ── Fetch ───────────────────────────────────────────────────────
console.log('🚀  Fetching Figma variables…\n');

const res  = await fetch(
  `https://api.figma.com/v1/files/${FILE_KEY}/variables/local`,
  { headers: { 'X-FIGMA-TOKEN': FIGMA_TOKEN } }
);

if (!res.ok) {
  const txt = await res.text();
  console.error(`❌  Figma API ${res.status}:`, txt);
  process.exit(1);
}

const { meta } = await res.json();
const collections = Object.values(meta.variableCollections);
const variables   = Object.values(meta.variables);

// Save raw JSON for debugging
await fs.writeFile(
  path.join(OUT_DIR, 'scripts', 'figma-vars-raw.json'),
  JSON.stringify({ variableCollections: meta.variableCollections, variables: meta.variables }, null, 2)
);

console.log('📦  Collections found:');
collections.forEach(c =>
  console.log(`     "${c.name}"  (${c.modes.length} mode${c.modes.length>1?'s':''}): ${c.modes.map(m=>m.name).join(' | ')}`)
);
console.log('');

// ── Resolve variable value ──────────────────────────────────────
function resolveValue(value, modeId, allVars, visited = new Set()) {
  if (value?.type === 'VARIABLE_ALIAS') {
    if (visited.has(value.id)) return null;
    visited.add(value.id);
    const ref = allVars[value.id];
    if (!ref) return null;
    const refVal = ref.valuesByMode[modeId] ?? Object.values(ref.valuesByMode)[0];
    return resolveValue(refVal, modeId, allVars, visited);
  }
  if (value?.r !== undefined) return toHex(value.r, value.g, value.b, value.a);
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return value;
  return null;
}

// Build a lookup map  id → variable
const varById = {};
variables.forEach(v => { varById[v.id] = v; });

// ── Group variables by collection ──────────────────────────────
const byCollection = {};
collections.forEach(c => { byCollection[c.id] = { collection: c, vars: [] }; });
variables.forEach(v => {
  if (byCollection[v.variableCollectionId]) {
    byCollection[v.variableCollectionId].vars.push(v);
  }
});

// ── Build CSS ──────────────────────────────────────────────────
let primitivesCSS = `/**\n * WPMN Design System — Primitives\n * Auto-generated from Figma variables — do not edit by hand.\n * Re-generate: node scripts/export-tokens.mjs\n */\n\n`;
let tokensCSS     = `/**\n * WPMN Design System — Semantic Tokens\n * Auto-generated from Figma variables — do not edit by hand.\n * Re-generate: node scripts/export-tokens.mjs\n */\n\n`;

for (const { collection, vars } of Object.values(byCollection)) {
  const name = collection.name;
  console.log(`  Processing "${name}"…`);

  for (const mode of collection.modes) {
    // Determine the CSS selector for this mode
    let selector;
    if (collection.modes.length === 1) {
      selector = ':root';
    } else {
      // Use mode name as a data attribute: e.g. [data-brand="fluentforms"]
      const slug = mode.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      // First mode = default :root; rest get attribute selectors
      selector = collection.modes.indexOf(mode) === 0
        ? ':root'
        : `[data-brand="${slug}"]`;
    }

    const lines = [];
    for (const v of vars) {
      const raw = v.valuesByMode[mode.modeId];
      if (raw === undefined) continue;
      const val = resolveValue(raw, mode.modeId, varById);
      if (val === null) continue;

      const cssVar = toCssName(v.name);
      const cssVal = typeof val === 'number' ? `${val}px` : val;
      lines.push(`  ${cssVar}: ${cssVal};`);
    }

    if (lines.length === 0) continue;

    const block = `/* ${name} — ${mode.name} */\n${selector} {\n${lines.join('\n')}\n}\n\n`;

    // Route to the right output file
    const nameLower = name.toLowerCase();
    if (nameLower.includes('primitive') || nameLower.includes('color') || nameLower.includes('colour')) {
      primitivesCSS += block;
    } else {
      tokensCSS += block;
    }
  }
}

// ── Write files ────────────────────────────────────────────────
await fs.writeFile(path.join(OUT_DIR, 'primitives.css'), primitivesCSS);
await fs.writeFile(path.join(OUT_DIR, 'tokens.css'),     tokensCSS);

console.log('\n✅  Done!');
console.log(`   primitives.css  →  ${path.join(OUT_DIR, 'primitives.css')}`);
console.log(`   tokens.css      →  ${path.join(OUT_DIR, 'tokens.css')}`);
console.log('\n   Tip: apply a brand mode with  data-brand="fluentforms"  on any element.\n');
