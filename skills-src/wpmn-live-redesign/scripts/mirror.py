#!/usr/bin/env python3
"""Mirror a live WPMN product page into a self-contained local copy.
Keeps functional JS, strips trackers, localises every asset."""
import re, os, sys, subprocess
from concurrent.futures import ThreadPoolExecutor

ORIGIN = sys.argv[1].rstrip('/')            # e.g. https://fluentcommunity.co
ROOT   = sys.argv[2]                        # working dir containing raw.html
HOST   = ORIGIN.split('//')[1]

TRACK = re.compile(r'(googletagmanager|gtag|gtm\.js|google-analytics|analytics\.js|fbevents|'
                   r'facebook\.net|connect\.facebook|hotjar|clarity\.ms|doubleclick|recaptcha|'
                   r'cookieyes|cookie-law|linkedin\.com/px|bat\.bing|snap\.licdn|_linkedin|'
                   r'crisp\.chat|intercom|segment\.|mixpanel)', re.I)

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"

def fetch(path):
    """Download ORIGIN/path -> ROOT/path (query stripped)."""
    dst = os.path.join(ROOT, path.split('?')[0])
    if os.path.exists(dst) and os.path.getsize(dst) > 0:
        return True
    os.makedirs(os.path.dirname(dst) or '.', exist_ok=True)
    subprocess.run(['curl', '-sL', '-A', UA, ORIGIN + '/' + path, '-o', dst, '--max-time', '30'],
                   capture_output=True)
    return os.path.exists(dst) and os.path.getsize(dst) > 0

def localise(html):
    # strip trackers only (keep jQuery / theme / block JS so the page behaves)
    def scrub(m): return '' if TRACK.search(m.group(0)) else m.group(0)
    html = re.sub(r'<script\b[^>]*>.*?</script>', scrub, html, flags=re.S | re.I)
    html = re.sub(r'<script\b[^>]*src=[^>]*>', scrub, html, flags=re.I)
    html = re.sub(r'<noscript\b[^>]*>.*?</noscript>', '', html, flags=re.S | re.I)
    # host -> relative, drop cache-busting queries
    for h in (f'https://{HOST}/', f'http://{HOST}/', f'//{HOST}/'):
        html = html.replace(h, '')
    html = re.sub(r'\?ver=[^"\'&)> ]+', '', html)
    # lazy images would never paint in a static capture
    html = html.replace('loading="lazy"', 'loading="eager"')
    return html

def asset_refs(text):
    refs = set()
    for m in re.findall(r'(?:src|href)=["\']((?:wp-content|wp-includes)/[^"\']+)["\']', text):
        refs.add(m)
    for ss in re.findall(r'srcset=["\']([^"\']+)["\']', text):
        for part in ss.split(','):
            u = part.strip().split(' ')[0]
            if u.startswith(('wp-content', 'wp-includes')):
                refs.add(u)
    for u in re.findall(r'url\(\s*["\']?((?:wp-content|wp-includes)/[^"\')]+)["\']?\s*\)', text):
        refs.add(u)
    return refs

def main():
    page = os.path.join(ROOT, 'raw.html')
    html = localise(open(page, encoding='utf-8', errors='ignore').read())

    refs = asset_refs(html)
    print('assets referenced by html:', len(refs))
    with ThreadPoolExecutor(16) as ex:
        ok = sum(ex.map(fetch, refs))
    print('downloaded:', ok)

    # second wave: things referenced from inside the CSS we just pulled
    css_files = [os.path.join(ROOT, r.split('?')[0]) for r in refs if '.css' in r]
    nested = set()
    for cf in css_files:
        if not os.path.exists(cf):
            continue
        txt = open(cf, encoding='utf-8', errors='ignore').read()
        base = os.path.dirname(os.path.relpath(cf, ROOT))
        changed = False
        for raw in set(re.findall(r'url\(([^)]+)\)', txt)):
            u = raw.strip().strip('"\'')
            if u.startswith('data:') or u.startswith('#'):
                continue
            clean = u.split('?')[0].split('#')[0]
            if clean.startswith('http'):
                path = re.sub(r'^https?://[^/]+/', '', clean)
            elif clean.startswith('/'):
                path = clean.lstrip('/')
            else:
                path = os.path.normpath(os.path.join(base, clean))
            nested.add(path)
            rel = os.path.relpath(path, base)
            if raw.strip().strip('"\'') != rel:
                txt = txt.replace('url(' + raw + ')', 'url(' + rel + ')')
                changed = True
        if changed:
            open(cf, 'w', encoding='utf-8').write(txt)
    with ThreadPoolExecutor(16) as ex:
        ok2 = sum(ex.map(fetch, nested))
    print('nested css assets:', len(nested), 'downloaded:', ok2)

    if 'wpmn-reskin.css' not in html:
        html = html.replace('</head>', '<link rel="stylesheet" href="wpmn-reskin.css">\n</head>', 1)
    open(os.path.join(ROOT, 'page.html'), 'w', encoding='utf-8').write(html)
    print('wrote page.html')

if __name__ == '__main__':
    main()
