#!/usr/bin/env python3
"""Stage only public website files for GitHub Pages. No dependencies required."""
from pathlib import Path
import hashlib
import shutil

ROOT = Path(__file__).resolve().parent.parent
DESTINATION = ROOT / "_site"
if DESTINATION.exists():
    shutil.rmtree(DESTINATION)
DESTINATION.mkdir()
for name in ("index.html", "styles.css", "content.js", "app.js", "sculpture.js", "logo.jpg", ".nojekyll"):
    shutil.copy2(ROOT / name, DESTINATION / name)
shutil.copytree(ROOT / "assets", DESTINATION / "assets")
html = (ROOT / "index.html").read_text(encoding="utf-8")
for name in ("styles.css", "content.js", "app.js", "sculpture.js"):
    source = ROOT / name
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    versioned_name = f"{source.stem}.{digest}{source.suffix}"
    shutil.copy2(source, DESTINATION / versioned_name)
    html = html.replace(f'"./{name}"', f'"./{versioned_name}"')
(DESTINATION / "index.html").write_text(html, encoding="utf-8")
print(f"Site ready: {DESTINATION}")
