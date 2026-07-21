#!/usr/bin/env python3
"""Snap a mirrored WPMN product page onto design-system tokens.
Generic: colours map to the NEAREST token (brand ramp + neutrals + feedback),
lengths snap to the spacing / radius / type scales. Handles px, rem, em,
3-digit hex, rgb()/rgba(), and radius longhands.

  usage: tokenize2.py <root-dir> <brand-key>
"""
import re, os, sys, glob, json

ROOT = sys.argv[1]
BRAND = sys.argv[2] if len(sys.argv) > 2 else 'wpmanagenia'

# All 16 brand ramps live in reference/brand-ramps.json next to this skill.
_HERE = os.path.dirname(os.path.abspath(__file__))
_RAMPS = os.path.join(_HERE, '..', 'reference', 'brand-ramps.json')
try:
    BRAND_RAMPS = json.load(open(_RAMPS, encoding='utf-8'))
except Exception:
    BRAND_RAMPS = {}
if BRAND not in BRAND_RAMPS:
    raise SystemExit("unknown brand '%s'. known: %s" % (BRAND, ', '.join(sorted(BRAND_RAMPS))))
NEUTRALS = ['#ffffff','#f6f7f8','#edeef1','#dbdee4','#c9ced6','#b8bec9','#a6aebb','#949dae',
            '#838da0','#717d93','#5f6d85','#4e5d78',
            '#46536c','#3e4a60','#364154','#2e3748','#272e3c','#1f2530','#171b24','#0f1218',
            '#07090c','#000000',
            '#dcdee2','#b7bec7','#939dab','#6e7d8f','#4c5c73','#3c4a5c','#2d3745','#1d252e',
            '#101217','#07090b']
FEEDBACK = ['#22b814','#55eb47','#80f075','#cc6600','#ff9933','#ffcc99','#ffe5cc','#fff2e5',
            '#ff3333','#ff0000','#ff6666']
TOKENS = BRAND_RAMPS[BRAND] + NEUTRALS + FEEDBACK

SPACE  = [0,2,4,8,12,16,20,24,32,40,48,56,64,80,96,120,160,192,224,256]
RADII  = [8,12,16,32]
FONTSZ = [10,13,14,16,18,20,23,25,31,39,49,61]
ROOT_FS = 16.0

SHADOWS = {
    "0px 0px 8px -2px rgba(0,0,0,0.05)": "0px 1px 3px 0px rgba(0, 0, 0, 0.20)",
    "0px 0px 50px 0px rgba(0,0,0,0.05)": "0px 24px 38px 0px rgba(0, 0, 0, 0.10)",
}

def rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        h = ''.join(c*2 for c in h)
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

TOK_RGB = [(t, rgb(t)) for t in TOKENS]

def nearest_colour(hexval):
    r, g, b = rgb(hexval)
    best, bd = None, 1e9
    for t, (tr, tg, tb) in TOK_RGB:
        # luma-weighted distance reads closer to how the eye judges "same colour"
        d = 2*(r-tr)**2 + 4*(g-tg)**2 + 3*(b-tb)**2
        if d < bd:
            best, bd = t, d
    return best

def snap(v, scale):
    return min(scale, key=lambda t: abs(t - v))

def snap_lengths(value, scale, units=("px",)):
    unit_re = "|".join(units)
    def rep(m):
        num = float(m.group(1)); unit = m.group(2).lower()
        pxv = num * ROOT_FS if unit in ("rem", "em") else num
        return ("-" if pxv < 0 else "") + str(snap(abs(pxv), scale)) + "px"
    return re.sub(r'(-?\d*\.?\d+)(%s)\b' % unit_re, rep, value)

SPACE_PROPS = (r'(?:padding|margin|gap|row-gap|column-gap|grid-gap|grid-row-gap|grid-column-gap)'
               r'(?:-(?:top|right|bottom|left))?')
RADIUS_PROPS = r'(?:border(?:-(?:top|bottom)-(?:left|right))?-radius)'

def transform(text):
    out = text
    # ---- colours: every hex -> nearest token
    def hexrep(m):
        val = m.group(0)
        return nearest_colour(val)
    # (?<!&) — never touch HTML numeric entities: `&#038;` contains "#038",
    # which a bare 3-digit hex pattern happily eats and turns into mojibake.
    out = re.sub(r'(?<!&)#[0-9a-fA-F]{6}\b(?![0-9a-fA-F])', hexrep, out)
    out = re.sub(r'(?<!&)#[0-9a-fA-F]{3}\b(?![0-9a-fA-F;])', hexrep, out)
    # ---- rgb()/rgba() -> nearest token (keep alpha)
    def rgbrep(m):
        r, g, b = (int(float(x)) for x in (m.group(1), m.group(2), m.group(3)))
        tr, tg, tb = rgb(nearest_colour('#%02x%02x%02x' % (r, g, b)))
        alpha = m.group(4)
        return ('rgba(%d, %d, %d,%s)' % (tr, tg, tb, alpha)) if alpha else ('rgb(%d, %d, %d)' % (tr, tg, tb))
    out = re.sub(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,([^)]+))?\)', rgbrep, out)

    # ---- typography
    # Replace the VALUE of font-family declarations only. Never match bare
    # font names anywhere in the document: names like "inter" or "lato" occur
    # inside real words and identifiers (interaction, pointer, pinterest,
    # /fonts/inter/...) and a global replace corrupts copy, CSS and paths.
    out = re.sub(r'(font-family\s*:\s*)([^;{}]+)',
                 lambda m: m.group(1) + "'Work Sans', sans-serif", out, flags=re.I)
    out = re.sub(r'(font-weight\s*:\s*)(100|200|300)\b', r'\g<1>400', out, flags=re.I)
    out = re.sub(r'(font-size\s*:\s*)(-?\d*\.?\d+(?:px|rem))\b',
                 lambda m: m.group(1) + snap_lengths(m.group(2), FONTSZ, ("px","rem")), out, flags=re.I)

    # ---- spacing. % / calc() / auto are layout, not tokens -> left alone.
    #      var() fallbacks DO carry real lengths, so snap those while masking
    #      the custom-property names (which can contain digits).
    def snap_with_vars(val, scale):
        names = []
        def mask(mm):
            names.append(mm.group(0))
            return '\x00%d\x00' % (len(names) - 1)
        masked = re.sub(r'--[A-Za-z0-9_-]+', mask, val)
        masked = snap_lengths(masked, scale, ("px", "rem", "em"))
        return re.sub(r'\x00(\d+)\x00', lambda mm: names[int(mm.group(1))], masked)

    # Kadence wraps plain values as calc(10px) — unwrap those (real lengths).
    # Genuine expressions, e.g. calc(100% - 20px), are left alone.
    def unwrap_calc(v):
        # calc(10px) -> 10px
        v = re.sub(r'calc\(\s*(-?\d*\.?\d+(?:px|rem|em))\s*\)', r'\1', v, flags=re.I)
        # calc(20px / 2) and calc(20px * 1.5) -> resolve to a real length
        def arith(m):
            num, unit, op, factor = m.group(1), m.group(2), m.group(3), float(m.group(4))
            if factor == 0:
                return m.group(0)
            val = float(num) / factor if op == '/' else float(num) * factor
            return '%g%s' % (val, unit)
        v = re.sub(r'calc\(\s*(-?\d*\.?\d+)(px|rem|em)\s*([*/])\s*(\d*\.?\d+)\s*\)',
                   arith, v, flags=re.I)
        return v

    def sp(m):
        val = unwrap_calc(m.group(2))
        if '%' in val or 'calc(' in val or 'auto' in val:
            return m.group(1) + val
        return m.group(1) + snap_with_vars(val, SPACE)
    out = re.sub(r'(\b%s\s*:\s*)([^;{}"\']+)' % SPACE_PROPS, sp, out, flags=re.I)

    # ---- radius (leave true circles)
    def rad(m):
        val = unwrap_calc(m.group(2))
        if '%' in val:
            return m.group(1) + val
        return m.group(1) + snap_with_vars(val, RADII)
    out = re.sub(r'(%s\s*:\s*)([^;{}"\']+)' % RADIUS_PROPS, rad, out, flags=re.I)

    # ---- shadows
    for src, dst in SHADOWS.items():
        loose = re.escape(src).replace(r'\ ', r'\s*').replace(r'\,', r'\s*,\s*')
        out = re.sub(loose, dst, out, flags=re.I)
    return out

def main():
    targets = [os.path.join(ROOT, 'page.html')]
    targets += glob.glob(os.path.join(ROOT, 'wp-content/**/*.css'), recursive=True)
    targets += glob.glob(os.path.join(ROOT, 'wp-includes/**/*.css'), recursive=True)
    changed = 0
    for f in targets:
        if not os.path.exists(f):
            continue
        txt = open(f, encoding='utf-8', errors='ignore').read()
        new = transform(txt)
        if new != txt:
            open(f, 'w', encoding='utf-8').write(new)
            changed += 1
    print('brand:', BRAND, '| files changed:', changed)

if __name__ == '__main__':
    main()
