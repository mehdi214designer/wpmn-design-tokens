/**
 * WPMN Design System — Registry Builder
 *
 * Scans components/<Name>/meta.json and rebuilds registry.json,
 * the machine-readable index that AI agents fetch first.
 *
 * Run after adding or editing any component meta.json:
 *   node scripts/build-registry.mjs
 *
 * This script only WRITES registry.json. It never touches
 * component source files or token files.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RAW_BASE = 'https://raw.githubusercontent.com/mehdi214designer/wpmn-design-tokens/master/';

const BRANDS = [
  'wpmanagenia', 'fluentforms', 'fluentcrm', 'ninjatables', 'wpsocialninja',
  'fluentsupport', 'fluentaffiliate', 'fluentboards', 'fluentcart', 'fluentplayer',
  'fluentmembers', 'fluentbooking', 'fluentcommunity', 'paymattic', 'fluentsmtp', 'azonpress',
];

function collectComponents() {
  const componentsDir = join(ROOT, 'components');
  const entries = readdirSync(componentsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  const components = [];
  const warnings = [];

  for (const name of entries) {
    const metaPath = join(componentsDir, name, 'meta.json');
    if (!existsSync(metaPath)) {
      warnings.push(`components/${name}: no meta.json, skipped`);
      continue;
    }

    let meta;
    try {
      meta = JSON.parse(readFileSync(metaPath, 'utf8'));
    } catch (err) {
      warnings.push(`components/${name}/meta.json: invalid JSON (${err.message}), skipped`);
      continue;
    }

    // Validate that referenced files actually exist
    for (const [kind, rel] of Object.entries(meta.files || {})) {
      if (!existsSync(join(ROOT, rel))) {
        warnings.push(`components/${name}: files.${kind} -> "${rel}" does not exist`);
      }
    }
    if (meta.prompt && !existsSync(join(ROOT, meta.prompt))) {
      warnings.push(`components/${name}: prompt -> "${meta.prompt}" does not exist`);
    }

    components.push(meta);
  }

  return { components, warnings };
}

function build() {
  const { components, warnings } = collectComponents();

  const registry = {
    $schema: 'wpmn-registry-v1',
    name: 'WPMN Design System',
    description:
      'AI-friendly component library and CSS design token system for 16 WPManageNinja product brands. Fetch a component\'s prompt.md to rebuild it from spec, or fetch its source files to use the code directly. Load token CSS first.',
    version: JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8')).version,
    generatedAt: new Date().toISOString(),
    baseUrl: RAW_BASE,
    aiEntryPoint: 'llms.txt',
    tokens: {
      entry: 'index.css',
      files: ['primitives.css', 'brand-primitives.css', 'tokens.css', 'typography.css'],
      loadOrder: 'primitives -> brand-primitives -> tokens -> typography (or just index.css)',
      usage: 'Components must only use semantic tokens (--color-*, --btn-*, --input-*, --radius-*, --font-*, --shadow-*), never --primitive-* directly.',
    },
    brands: BRANDS,
    brandSwitching: 'Set data-brand="<key>" on the root or any section element.',
    darkMode: 'Set data-theme="dark" on <html>. Light is default.',
    mobileBreakpoint: '768px (automatic via media queries)',
    guidelines: 'wpmn-design-guideline.md',
    docs: 'docs/',
    components,
  };

  writeFileSync(join(ROOT, 'registry.json'), JSON.stringify(registry, null, 2) + '\n');

  console.log(`registry.json written: ${components.length} components`);
  for (const w of warnings) console.warn(`  WARN ${w}`);
  if (warnings.length === 0) console.log('  no warnings, all referenced files exist');
}

build();
