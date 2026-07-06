"""
WPMN Design System — Dev Server
  http://localhost:8910/demo.html

Features:
  • Static file serving (CSS, JSX, SVG, HTML, …)
  • GET /api/components  → JSON list of discovered components
  • GET /livereload      → SSE stream; sends "reload" on any file change
"""

import http.server
import socketserver
import os
import re
import time
import threading
import json
from pathlib import Path

# ── Threaded server so SSE + static files run concurrently ──────
class ThreadedTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    daemon_threads     = True   # threads die when main process exits
    allow_reuse_address = True

PORT     = 8910
BASE_DIR = Path(__file__).parent
WATCH_EXTS = {'.css', '.jsx', '.js', '.html', '.json', '.svg'}

# ── Shared reload state ──────────────────────────────────────────
_version     = 0
_version_lock = threading.Lock()
_cond        = threading.Condition()   # broadcast to all SSE clients


def _watch_loop():
    """Poll file mtimes every 400 ms; bump version on any change."""
    global _version
    mtimes: dict[str, float] = {}

    while True:
        changed_files = []
        for root, dirs, files in os.walk(BASE_DIR):
            dirs[:] = [d for d in dirs if not d.startswith('.') and d != '__pycache__']
            for fn in files:
                if Path(fn).suffix in WATCH_EXTS:
                    path = os.path.join(root, fn)
                    try:
                        mtime = os.path.getmtime(path)
                        if path in mtimes and mtimes[path] != mtime:
                            changed_files.append(os.path.relpath(path, BASE_DIR))
                        mtimes[path] = mtime
                    except OSError:
                        pass

        if changed_files:
            for f in changed_files:
                print(f'  ↻  {f}')
            with _version_lock:
                _version += 1
            with _cond:
                _cond.notify_all()

        time.sleep(0.4)


threading.Thread(target=_watch_loop, daemon=True).start()


# ── Request handler ──────────────────────────────────────────────
class Handler(http.server.SimpleHTTPRequestHandler):

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def do_GET(self):
        path = self.path.split('?')[0]
        if path == '/livereload':
            self._sse_livereload()
        elif path == '/api/components':
            self._api_components()
        elif path == '/api/hugeicons':
            self._api_hugeicons()
        else:
            super().do_GET()

    # ── SSE live-reload ──────────────────────────────────────────
    def _sse_livereload(self):
        self.send_response(200)
        self.send_header('Content-Type',  'text/event-stream')
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Connection',    'keep-alive')
        self.end_headers()

        last_ver = _version
        try:
            self.wfile.write(b'data: connected\n\n')
            self.wfile.flush()
            while True:
                with _cond:
                    notified = _cond.wait(timeout=20)
                cur = _version
                if notified and cur != last_ver:
                    last_ver = cur
                    self.wfile.write(b'data: reload\n\n')
                else:
                    self.wfile.write(b': ping\n\n')   # keep-alive
                self.wfile.flush()
        except Exception:
            pass   # client disconnected

    # ── Component discovery ──────────────────────────────────────
    def _api_components(self):
        comps_dir = BASE_DIR / 'components'
        result = []
        if comps_dir.exists():
            for d in sorted(comps_dir.iterdir()):
                if not d.is_dir() or d.name.startswith('.'):
                    continue
                jsx = d / f'{d.name}.jsx'
                css = d / f'{d.name}.css'
                if jsx.exists():
                    result.append({
                        'name': d.name,
                        'jsx':  f'components/{d.name}/{d.name}.jsx',
                        'css':  f'components/{d.name}/{d.name}.css' if css.exists() else None,
                    })

        body = json.dumps(result).encode()
        self.send_response(200)
        self.send_header('Content-Type',   'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    # ── Hugeicons index ──────────────────────────────────────────
    # Lists icon base names + available variants from the LOCALLY installed
    # @hugeicons/react-pro package. Reads node_modules live — no icon data is
    # ever stored or committed. On a clone without the licensed package this
    # returns empty lists and the browser shows a "not installed" note.
    def _api_hugeicons(self):
        icons_dir = (BASE_DIR / 'node_modules' / '@hugeicons' /
                     'react-pro' / 'dist' / 'esm' / 'icons')
        names, variants, installed = [], [], icons_dir.exists()
        if installed:
            for f in sorted(icons_dir.iterdir()):
                if f.suffix == '.js' and f.name.endswith('-icon.js'):
                    names.append(f.name[:-len('-icon.js')])
            # Derive the real variant list from one file so it stays accurate.
            if names:
                sample = (icons_dir / f'{names[0]}-icon.js').read_text(encoding='utf-8')
                seen = []
                for m in re.finditer(r'"([a-z]+\.[a-z]+)":\[\[', sample):
                    if m.group(1) not in seen:
                        seen.append(m.group(1))
                variants = seen
        body = json.dumps({
            'installed': installed,
            'dir': 'node_modules/@hugeicons/react-pro/dist/esm/icons',
            'suffix': '-icon.js',
            'variants': variants,
            'names': names,
        }).encode()
        self.send_response(200)
        self.send_header('Content-Type',   'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        # Suppress routine 200/304 lines
        if len(args) >= 2 and args[1] in ('200', '304'):
            return
        super().log_message(fmt, *args)

    def handle_error(self, request, client_address):
        import traceback, sys
        exc = sys.exc_info()[1]
        # ConnectionResetError / BrokenPipeError happen when the browser
        # closes an SSE connection — completely normal, don't log them.
        if isinstance(exc, (ConnectionResetError, BrokenPipeError)):
            return
        super().handle_error(request, client_address)


# ── Boot ─────────────────────────────────────────────────────────
if __name__ == '__main__':
    print(f'  WPMN Dev Server → http://localhost:{PORT}/demo.html')
    print(f'  Watching: {BASE_DIR}')
    print(f'  Press Ctrl+C to stop.\n')
    with ThreadedTCPServer(('', PORT), Handler) as httpd:
        httpd.serve_forever()
