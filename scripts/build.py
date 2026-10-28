#!/usr/bin/env python3
"""Stage only public website files for GitHub Pages. No dependencies required."""
from pathlib import Path
import hashlib
import shutil
from security_policy import secure_html
from update_scholar import load_snapshot

ROOT = Path(__file__).resolve().parent.parent
DESTINATION = ROOT / "_site"
load_snapshot(ROOT / "scholar-data.js")
if DESTINATION.exists():
    shutil.rmtree(DESTINATION)
DESTINATION.mkdir()
for name in ("index.html", "styles.css", "content.js", "scholar-data.js", "app.js", "sculpture.js", "logo.jpg", ".nojekyll", "robots.txt", "sitemap.xml", "googled4d0811a1c9ead7f.html"):
    shutil.copy2(ROOT / name, DESTINATION / name)
shutil.copytree(ROOT / "assets", DESTINATION / "assets")
html = (ROOT / "index.html").read_text(encoding="utf-8")
for name in ("styles.css", "content.js", "scholar-data.js", "app.js", "sculpture.js"):
    source = ROOT / name
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    versioned_name = f"{source.stem}.{digest}{source.suffix}"
    shutil.copy2(source, DESTINATION / versioned_name)
    html = html.replace(f'"./{name}"', f'"./{versioned_name}"')
(DESTINATION / "index.html").write_text(secure_html(html), encoding="utf-8")
print(f"Site ready: {DESTINATION}")
