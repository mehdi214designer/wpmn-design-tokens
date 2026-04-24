/**
 * WPMN Design System — Logo SVG Exporter
 *
 * Downloads all 150 brand logo SVG variants from Figma and saves them
 * into an organised directory structure ready for web use.
 *
 * Usage:
 *   FIGMA_TOKEN=your_personal_access_token node scripts/export-logos.mjs
 *
 * Get your token at: https://www.figma.com/settings → Personal access tokens
 *
 * Output structure:
 *   logos/
 *     wpmanagenia/
 *       icon-primary.svg       ← icon mark, full colour (light bg)
 *       icon-dark.svg          ← icon mark, full colour (dark bg)
 *       icon-inverted.svg      ← icon mark, inverted colours
 *       icon-black.svg         ← icon mark, monochrome black
 *       icon-white.svg         ← icon mark, monochrome white
 *       logo-primary.svg       ← icon + wordmark, full colour (light bg)
 *       logo-dark.svg          ← icon + wordmark, full colour (dark bg)
 *       logo-inverted.svg      ← icon + wordmark, inverted colours
 *       logo-black.svg         ← icon + wordmark, monochrome black
 *       logo-white.svg         ← icon + wordmark, monochrome white
 *     fluentforms/  ...
 *     fluentcrm/    ...
 *     (all 15 brands)
 */

import fs   from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Configuration ─────────────────────────────────────────────────────────────
const FILE_KEY    = '54BG58iHusICXloB0fauSM';
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const OUT_DIR     = path.join(__dirname, '..', 'logos');

if (!FIGMA_TOKEN) {
  console.error('❌  FIGMA_TOKEN environment variable is required.');
  console.error('    Run: FIGMA_TOKEN=your_token node scripts/export-logos.mjs');
  process.exit(1);
}

// ── Node ID map (Large variants — SVG scales, so one size is enough) ──────────
// Format: { brandSlug: { variantKey: nodeId } }
const LOGO_NODES = {
  wpmanagenia: {
    'logo-primary':  '610:4678',
    'logo-dark':     '1070:11798',
    'logo-inverted': '1092:13051',
    'logo-black':    '1092:15187',
    'logo-white':    '1095:17109',
    'icon-primary':  '639:103262',
    'icon-dark':     '1070:11810',
    'icon-inverted': '1092:13063',
    'icon-black':    '1092:15199',
    'icon-white':    '1095:17121',
  },
  fluentforms: {
    'logo-primary':  '610:4411',
    'logo-dark':     '1070:10741',
    'logo-inverted': '1092:11994',
    'logo-black':    '1092:14135',
    'logo-white':    '1095:16099',
    'icon-primary':  '639:102469',
    'icon-dark':     '1070:10764',
    'icon-inverted': '1092:12017',
    'icon-black':    '1092:14158',
    'icon-white':    '1095:16120',
  },
  fluentcrm: {
    'logo-primary':  '610:4435',
    'logo-dark':     '1070:10831',
    'logo-inverted': '1092:12084',
    'logo-black':    '1092:14225',
    'logo-white':    '1095:16179',
    'icon-primary':  '639:102539',
    'icon-dark':     '1070:10851',
    'icon-inverted': '1092:12104',
    'icon-black':    '1092:14245',
    'icon-white':    '1095:16197',
  },
  ninjatables: {
    'logo-primary':  '610:4457',
    'logo-dark':     '1070:10917',
    'logo-inverted': '1092:12170',
    'logo-black':    '1092:14311',
    'logo-white':    '1095:16257',
    'icon-primary':  '639:102594',
    'icon-dark':     '1070:10939',
    'icon-inverted': '1092:12192',
    'icon-black':    '1092:14333',
    'icon-white':    '1095:16279',
  },
  fluentcommunity: {
    'logo-primary':  '610:4468',
    'logo-dark':     '1070:11007',
    'logo-inverted': '1092:12260',
    'logo-black':    '1092:14401',
    'logo-white':    '1095:16347',
    'icon-primary':  '639:102660',
    'icon-dark':     '1070:11031',
    'icon-inverted': '1092:12284',
    'icon-black':    '1092:14425',
    'icon-white':    '1095:16371',
  },
  fluentbooking: {
    'logo-primary':  '610:4512',
    'logo-dark':     '1070:11120',
    'logo-inverted': '1092:12373',
    'logo-black':    '1092:14515',
    'logo-white':    '1095:16461',
    'icon-primary':  '639:102777',
    'icon-dark':     '1070:11155',
    'icon-inverted': '1092:12408',
    'icon-black':    '1092:14550',
    'icon-white':    '1095:16496',
  },
  paymattic: {
    'logo-primary':  '2714:23814',
    'logo-dark':     '2713:17377',
    'logo-inverted': '2714:23933',
    'logo-black':    '2714:24020',
    'logo-white':    '2714:24098',
    'icon-primary':  '2714:23853',
    'icon-dark':     '2714:23971',
    'icon-inverted': '2714:23992',
    'icon-black':    '1092:14662',
    'icon-white':    '1095:16608',
  },
  fluentboards: {
    'logo-primary':  '610:4561',
    'logo-dark':     '1070:11336',
    'logo-inverted': '1092:12589',
    'logo-black':    '1092:14731',
    'logo-white':    '1095:16679',
    'icon-primary':  '639:102923',
    'icon-dark':     '1070:11363',
    'icon-inverted': '1092:12616',
    'icon-black':    '1092:14758',
    'icon-white':    '1095:16707',
  },
  fluentsmtp: {
    'logo-primary':  '610:4589',
    'logo-dark':     '1070:11444',
    'logo-inverted': '1092:12697',
    'logo-black':    '1092:14839',
    'logo-white':    '1095:16791',
    'icon-primary':  '639:103006',
    'icon-dark':     '1070:11467',
    'icon-inverted': '1092:12720',
    'icon-black':    '1092:14862',
    'icon-white':    '1095:16814',
  },
  fluentsupport: {
    'logo-primary':  '610:4616',
    'logo-dark':     '1070:11536',
    'logo-inverted': '1092:12789',
    'logo-black':    '1092:14931',
    'logo-white':    '1095:16883',
    'icon-primary':  '639:103083',
    'icon-dark':     '1070:11558',
    'icon-inverted': '1092:12811',
    'icon-black':    '1092:14953',
    'icon-white':    '1095:16905',
  },
  fluentaffiliate: {
    'logo-primary':  '610:4639',
    'logo-dark':     '1070:11633',
    'logo-inverted': '1092:12886',
    'logo-black':    '1092:15028',
    'logo-white':    '1095:16970',
    'icon-primary':  '639:103158',
    'icon-dark':     '1070:11662',
    'icon-inverted': '1092:12915',
    'icon-black':    '1092:15057',
    'icon-white':    '1095:16994',
  },
  azonpress: {
    'logo-primary':  '610:4668',
    'logo-dark':     '1070:11747',
    'logo-inverted': '1092:13000',
    'logo-black':    '1092:15136',
    'logo-white':    '1095:17058',
    'icon-primary':  '639:103230',
    'icon-dark':     '1070:11755',
    'icon-inverted': '1092:13008',
    'icon-black':    '1092:15144',
    'icon-white':    '1095:17066',
  },
  wpsocialninja: {
    'logo-primary':  '610:4712',
    'logo-dark':     '1070:11946',
    'logo-inverted': '1092:13199',
    'logo-black':    '1092:15329',
    'logo-white':    '1095:17251',
    'icon-primary':  '639:103365',
    'icon-dark':     '1070:11956',
    'icon-inverted': '1092:13209',
    'icon-black':    '1092:15336',
    'icon-white':    '1095:17258',
  },
  fluentcart: {
    'logo-primary':  '610:4690',
    'logo-dark':     '1070:11872',
    'logo-inverted': '1092:13125',
    'logo-black':    '1092:15261',
    'logo-white':    '1095:17183',
    'icon-primary':  '639:103308',
    'icon-dark':     '1070:11894',
    'icon-inverted': '1092:13147',
    'icon-black':    '1092:15283',
    'icon-white':    '1095:17205',
  },
  fluentplayer: {
    'logo-primary':  '3679:122',
    'logo-dark':     '3679:1078',
    'logo-inverted': '3679:1111',
    'logo-black':    '3679:1162',
    'logo-white':    '3679:1186',
    'icon-primary':  '3679:1054',
    'icon-dark':     '3679:1102',
    'icon-inverted': '3679:1135',
    'icon-black':    '3679:1144',
    'icon-white':    '3679:1153',
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    if (res.status === 429) {
      const wait = (i + 1) * 5000;
      console.warn(`  Rate limited — waiting ${wait / 1000}s...`);
      await sleep(wait);
    } else {
      throw new Error(`HTTP ${res.status}: ${url}`);
    }
  }
  throw new Error(`Failed after ${retries} retries: ${url}`);
}

// ── Main export logic ──────────────────────────────────────────────────────────
async function exportLogos() {
  console.log('🚀  WPMN Logo Exporter starting...\n');

  // Collect ALL node IDs across all brands
  const allNodes = {};   // { nodeId: { brand, variant } }
  const allIds   = [];

  for (const [brand, variants] of Object.entries(LOGO_NODES)) {
    for (const [variant, nodeId] of Object.entries(variants)) {
      const key = nodeId.replace(':', '-');
      allNodes[key] = { brand, variant };
      allIds.push(nodeId);
    }
  }

  // Figma image export endpoint allows up to 500 nodes per request
  // Batch into groups of 100 to be safe
  const BATCH_SIZE = 100;
  const batches = [];
  for (let i = 0; i < allIds.length; i += BATCH_SIZE) {
    batches.push(allIds.slice(i, i + BATCH_SIZE));
  }

  console.log(`📦  Exporting ${allIds.length} SVGs in ${batches.length} batch(es)...\n`);

  const headers = { 'X-FIGMA-TOKEN': FIGMA_TOKEN };
  const svgUrls = {};   // { nodeId → svgUrl }

  for (let b = 0; b < batches.length; b++) {
    const batch = batches[b];
    const ids   = batch.map(id => id.replace(':', '-')).join(',');
    const url   = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=svg&svg_include_id=false&svg_simplify_stroke=true`;

    console.log(`  Batch ${b + 1}/${batches.length}: requesting ${batch.length} SVG URLs...`);
    const res  = await fetchWithRetry(url, { headers });
    const data = await res.json();

    if (data.err) throw new Error(`Figma API error: ${data.err}`);

    for (const [id, svgUrl] of Object.entries(data.images)) {
      // Figma may return IDs with colons OR hyphens — normalise to hyphens
      // so they match the allNodes keys we built above.
      const normId = id.replace(':', '-');
      if (svgUrl) svgUrls[normId] = svgUrl;
      else console.warn(`  ⚠️  No URL for node ${id}`);
    }

    if (b < batches.length - 1) await sleep(500); // be polite
  }

  console.log(`\n✅  Got ${Object.keys(svgUrls).length} SVG URLs\n`);
  console.log('📥  Downloading SVG files...\n');

  // Create brand directories
  for (const brand of Object.keys(LOGO_NODES)) {
    await fs.mkdir(path.join(OUT_DIR, brand), { recursive: true });
  }

  // Download each SVG and save
  let saved = 0;
  let failed = 0;

  for (const [nodeId, svgUrl] of Object.entries(svgUrls)) {
    const info = allNodes[nodeId];
    if (!info) continue;

    const filePath = path.join(OUT_DIR, info.brand, `${info.variant}.svg`);

    try {
      const res = await fetchWithRetry(svgUrl, {});
      const svg = await res.text();

      // Clean up: add xmlns if missing, ensure proper SVG header
      const cleanedSvg = svg.includes('xmlns=')
        ? svg
        : svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');

      await fs.writeFile(filePath, cleanedSvg, 'utf-8');
      saved++;
      process.stdout.write(`  ✓ ${info.brand}/${info.variant}.svg\n`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${info.brand}/${info.variant}: ${err.message}`);
    }

    // Small delay to avoid hammering CDN
    await sleep(50);
  }

  console.log(`\n${'─'.repeat(50)}`);
  console.log(`✅  Export complete!`);
  console.log(`   Saved  : ${saved} files`);
  console.log(`   Failed : ${failed} files`);
  console.log(`   Output : ${OUT_DIR}`);
  console.log(`${'─'.repeat(50)}\n`);

  // Write a manifest JSON
  const manifest = {};
  for (const [brand, variants] of Object.entries(LOGO_NODES)) {
    manifest[brand] = Object.keys(variants).reduce((acc, v) => {
      acc[v] = `logos/${brand}/${v}.svg`;
      return acc;
    }, {});
  }
  await fs.writeFile(
    path.join(OUT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2),
    'utf-8'
  );
  console.log('📋  Manifest written to logos/manifest.json\n');
}

exportLogos().catch(err => {
  console.error('\n❌  Export failed:', err.message);
  process.exit(1);
});
