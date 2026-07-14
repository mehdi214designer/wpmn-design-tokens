/**
 * Vercel serverless equivalent of serve.py's _api_hugeicons.
 * Reads icon names + variants live from the licensed @hugeicons/react-pro
 * package installed via NPM_TOKEN during the build. No icon data is stored
 * or committed — if the package isn't installed, this returns empty lists.
 */
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const iconsDir = path.join(
    process.cwd(), 'node_modules', '@hugeicons', 'react-pro', 'dist', 'esm', 'icons'
  );

  let installed = false;
  let names = [];
  let variants = [];

  try {
    installed = fs.existsSync(iconsDir);
    if (installed) {
      names = fs.readdirSync(iconsDir)
        .filter((f) => f.endsWith('-icon.js'))
        .sort()
        .map((f) => f.slice(0, -'-icon.js'.length));

      if (names.length) {
        const sample = fs.readFileSync(path.join(iconsDir, `${names[0]}-icon.js`), 'utf8');
        const seen = [];
        const re = /"([a-z]+\.[a-z]+)":\[\[/g;
        let m;
        while ((m = re.exec(sample)) !== null) {
          if (!seen.includes(m[1])) seen.push(m[1]);
        }
        variants = seen;
      }
    }
  } catch (e) {
    installed = false;
  }

  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).json({
    installed,
    dir: 'node_modules/@hugeicons/react-pro/dist/esm/icons',
    suffix: '-icon.js',
    variants,
    names,
  });
}
