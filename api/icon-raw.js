/**
 * Serves a single icon's raw source from the licensed @hugeicons/react-pro
 * package. demo.html fetches icons by path (e.g. /node_modules/@hugeicons/
 * react-pro/dist/esm/icons/abacus-icon.js) which vercel.json rewrites here —
 * no changes needed to the shared demo.html code that also runs locally.
 */
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const file = req.query.file;

  if (!file || Array.isArray(file) || !/^[a-z0-9-]+-icon\.js$/.test(file)) {
    res.status(400).send('Invalid icon name');
    return;
  }

  const iconsDir = path.join(
    process.cwd(), 'node_modules', '@hugeicons', 'react-pro', 'dist', 'esm', 'icons'
  );
  const filePath = path.join(iconsDir, file);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    res.status(200).send(content);
  } catch (e) {
    res.status(404).send('Not found');
  }
}
