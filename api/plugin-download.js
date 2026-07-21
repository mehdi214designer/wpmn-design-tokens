/**
 * Streams a zip of a WPMN plugin/extension's private GitHub repo, without
 * ever exposing the token or the repo itself to the browser. demo.html's
 * Plugins & Extensions page hits this with ?id=<id>, we look that id up in
 * plugins-registry.json for {repo, branch}, then use GITHUB_TOKEN (set in
 * Vercel project settings, never committed) to ask GitHub's zipball API for
 * a zip of that repo's default branch (or the branch given in the
 * registry) and pipe the bytes back as a download. No GitHub Release
 * needs to exist — this just zips whatever's on the branch right now.
 *
 * Local dev (serve.py) has no equivalent of this route on purpose — the
 * token only ever lives in Vercel. The frontend shows a friendly message
 * if this is hit somewhere it doesn't exist.
 */
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const id = req.query.id;

  if (!id || Array.isArray(id) || !/^[a-z0-9-]+$/.test(id)) {
    res.status(400).send('Invalid plugin id.');
    return;
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).send('Downloads are not configured yet (missing GITHUB_TOKEN in Vercel).');
    return;
  }

  let registry = [];
  try {
    const registryPath = path.join(process.cwd(), 'plugins-registry.json');
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  } catch (e) {
    res.status(500).send('Could not read plugins-registry.json.');
    return;
  }

  const plugin = registry.find((p) => p.id === id);
  if (!plugin || !plugin.repo) {
    res.status(404).send('Unknown plugin, or this entry is still a placeholder in plugins-registry.json.');
    return;
  }

  const ghHeaders = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'wpmn-design-tokens-plugin-download',
  };

  try {
    let ref = plugin.branch;
    if (!ref) {
      const repoRes = await fetch(`https://api.github.com/repos/${plugin.repo}`, { headers: ghHeaders });
      if (!repoRes.ok) {
        res.status(502).send(`Could not reach repo ${plugin.repo} (${repoRes.status}). Check the repo name and that GITHUB_TOKEN can access it.`);
        return;
      }
      const repoData = await repoRes.json();
      ref = repoData.default_branch || 'main';
    }

    const zipRes = await fetch(
      `https://api.github.com/repos/${plugin.repo}/zipball/${encodeURIComponent(ref)}`,
      { headers: ghHeaders }
    );

    if (!zipRes.ok) {
      res.status(502).send(`Could not download the zip for ${plugin.repo} (${zipRes.status}).`);
      return;
    }

    const buffer = Buffer.from(await zipRes.arrayBuffer());
    const filename = plugin.id + '.zip';

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(buffer);
  } catch (e) {
    res.status(500).send('Unexpected error downloading the repo zip.');
  }
}
