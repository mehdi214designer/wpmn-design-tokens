/**
 * WPMN — Hugeicons path extractor
 * Pulls inline SVG path data for any icon/variant from the installed
 * @hugeicons/react-pro package, per docs/icons.md (default: solid.rounded).
 *
 * Usage: node scripts/extract-hugeicon.mjs <icon-file-name> [variant]
 *   e.g. node scripts/extract-hugeicon.mjs dollar-circle-icon solid.rounded
 * Lists matches: node scripts/extract-hugeicon.mjs --find dollar
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ICONS = join(dirname(fileURLToPath(import.meta.url)), '..',
  'node_modules/@hugeicons/react-pro/dist/esm/icons');

const [, , arg, variant = 'solid.rounded'] = process.argv;
if (!arg) { console.error('usage: extract-hugeicon.mjs <icon-file-name>|--find <term> [variant]'); process.exit(1); }

if (arg === '--find') {
  const term = (process.argv[3] || '').toLowerCase();
  readdirSync(ICONS).filter(f => f.includes(term)).slice(0, 40).forEach(f => console.log(f.replace('.js', '')));
  process.exit(0);
}

const src = readFileSync(join(ICONS, arg.replace(/\.js$/, '') + '.js'), 'utf8');
const key = `"${variant}":`;
const start = src.indexOf(key);
if (start < 0) {
  console.error(`variant ${variant} not found. Available:`, [...src.matchAll(/"([\w.]+)":\[\[/g)].map(m => m[1]).join(', '));
  process.exit(1);
}
let i = start + key.length, depth = 0, end = i;
for (; i < src.length; i++) {
  if (src[i] === '[') depth++;
  if (src[i] === ']') { depth--; if (depth === 0) { end = i + 1; break; } }
}
const elements = Function('return ' + src.slice(start + key.length, end))();
const inner = elements.map(([tag, attrs]) => {
  const a = Object.entries(attrs)
    .filter(([k]) => k !== 'key')
    .map(([k, v]) => `${k.replace(/[A-Z]/g, c => '-' + c.toLowerCase())}="${v}"`)
    .join(' ');
  return `<${tag} ${a}/>`;
}).join('');
console.log(`<svg viewBox="0 0 24 24" fill="none">${inner}</svg>`);
