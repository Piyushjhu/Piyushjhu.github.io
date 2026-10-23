#!/usr/bin/env python3
"""Stage only public website files for GitHub Pages. No dependencies required."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
DESTINATION = ROOT / "_site"
if DESTINATION.exists():
    shutil.rmtree(DESTINATION)
DESTINATION.mkdir()
for name in ("index.html", "styles.css", "content.js", "app.js", "sculpture.js", "logo.jpg", ".nojekyll"):
    shutil.copy2(ROOT / name, DESTINATION / name)
shutil.copytree(ROOT / "assets", DESTINATION / "assets")
print(f"Site ready: {DESTINATION}")
