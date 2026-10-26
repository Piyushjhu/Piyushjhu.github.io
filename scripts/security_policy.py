"""Generate the static site's CSP without allowing arbitrary inline JavaScript."""
import base64
import hashlib
import re
from pathlib import Path

JSON_LD = re.compile(r'<script\b[^>]*\btype="application/ld\+json"[^>]*>(.*?)</script\s*>', re.I | re.S)
CSP_META = re.compile(r'<meta\s+http-equiv="Content-Security-Policy"\s+content="[^"]*"\s*/?>', re.I)


def script_hashes(html):
    return ["'sha256-" + base64.b64encode(hashlib.sha256(body.encode()).digest()).decode() + "'" for body in JSON_LD.findall(html)]


def policy_for(html):
    directives = {
        "default-src": "'self'",
        "script-src": " ".join(["'self'", *script_hashes(html)]),
        "script-src-attr": "'none'",
        "style-src": "'self'",
        "style-src-attr": "'none'",
        "img-src": "'self'",
        "media-src": "'self'",
        "font-src": "'self'",
        "connect-src": "'none'",
        "object-src": "'none'",
        "frame-src": "'none'",
        "worker-src": "'none'",
        "base-uri": "'none'",
        "form-action": "'none'",
    }
    return "; ".join(f"{name} {value}" for name, value in directives.items())


def secure_html(html):
    replacement = '<meta http-equiv="Content-Security-Policy" content="' + policy_for(html) + '" />'
    result, count = CSP_META.subn(lambda _: replacement, html)
    if count != 1:
        raise ValueError("Exactly one CSP meta element is required in the source HTML.")
    return result


if __name__ == "__main__":
    source = Path(__file__).resolve().parent.parent / "index.html"
    source.write_text(secure_html(source.read_text(encoding="utf-8")), encoding="utf-8")
    print("Updated the source CSP hashes for structured data.")
