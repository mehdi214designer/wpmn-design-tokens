#!/usr/bin/env python3
"""Replace the legacy `height:0 + padding-bottom:X%` aspect-ratio hack with a
real `aspect-ratio`, so the box keeps its exact proportion but no longer
reports arbitrary computed padding.

Scoped deliberately: only <style> blocks and .css files are touched, never
raw HTML/JS/prose (a bare {...} regex would happily eat JS object literals).

  usage: aspect.py <root-dir>
"""
import re, os, sys, glob

ROOT = sys.argv[1]

RULE = re.compile(r'\{([^{}]*)\}')

def fix_block(css):
    n = [0]
    def rep(m):
        body = m.group(1)
        pb = re.search(r'padding-bottom:\s*([0-9.]+)%', body, re.I)
        h0 = re.search(r'height:\s*0(?:px)?\s*(?:;|$)', body, re.I)
        if not pb or not h0:
            return m.group(0)
        pct = float(pb.group(1))
        if pct <= 0:
            return m.group(0)
        out = re.sub(r'padding-bottom:\s*[0-9.]+%\s*;?', '', body, flags=re.I)
        out = re.sub(r'height:\s*0(?:px)?\s*;?', 'height:auto;', out, flags=re.I)
        out = out.strip().rstrip(';')
        # padding-bottom:X% => height is X% of width => ratio w/h = 100/X
        out += ';aspect-ratio:%s/%s;position:relative;' % (100, ('%g' % pct))
        n[0] += 1
        return '{' + out + '}'
    return RULE.sub(rep, css), n[0]

def main():
    total = 0
    # 1) <style> blocks inside the page only
    page = os.path.join(ROOT, 'page.html')
    html = open(page, encoding='utf-8', errors='ignore').read()
    def style_rep(m):
        nonlocal_total[0] += 0
        fixed, c = fix_block(m.group(2))
        nonlocal_total[0] += c
        return m.group(1) + fixed + m.group(3)
    nonlocal_total = [0]
    html = re.sub(r'(<style\b[^>]*>)(.*?)(</style>)', style_rep, html, flags=re.S | re.I)
    open(page, 'w', encoding='utf-8').write(html)
    total += nonlocal_total[0]

    # 2) stylesheets
    for f in glob.glob(os.path.join(ROOT, 'wp-content/**/*.css'), recursive=True):
        txt = open(f, encoding='utf-8', errors='ignore').read()
        fixed, c = fix_block(txt)
        if c:
            open(f, 'w', encoding='utf-8').write(fixed)
            total += c
    print('ratio boxes converted to aspect-ratio:', total)

if __name__ == '__main__':
    main()
