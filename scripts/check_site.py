#!/usr/bin/env python3
"""Reject unsafe or accidentally private content before a Pages deployment."""
import base64
import hashlib
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class PublicHTML(HTMLParser):
    def __init__(self):
        super().__init__()
        self.policy = None
        self.referrer = None
        self.scripts = []
        self.current_script = None
        self.errors = []
        self.loaded_resource = False
        self.resources = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if any(key.lower().startswith("on") for key in attrs):
            self.errors.append("Inline event handlers are not allowed.")
        if "style" in attrs or tag == "style":
            self.errors.append("Use the stylesheet or trusted JS style properties, not inline CSS markup.")
        if tag == "base":
            self.errors.append("A base element can change the meaning of relative resource URLs.")
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "content-security-policy":
            if self.policy is not None:
                self.errors.append("Only one CSP meta element is allowed.")
            if self.loaded_resource:
                self.errors.append("CSP must precede scripts, stylesheets, and media.")
            self.policy = attrs.get("content", "")
        if tag == "meta" and attrs.get("name") == "referrer":
            self.referrer = attrs.get("content")
        if tag == "script":
            self.current_script = {"attrs": attrs, "body": ""}
            self.scripts.append(self.current_script)
        if tag in {"script", "img", "video", "source", "iframe", "embed", "object"} or (tag == "link" and attrs.get("rel") in {"stylesheet", "icon", "preload"}):
            self.loaded_resource = True
            for key in ("src", "poster", "data", "href"):
                if attrs.get(key):
                    self.resources.append(attrs[key])

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)

    def handle_data(self, data):
        if self.current_script is not None:
            self.current_script["body"] += data

    def handle_endtag(self, tag):
        if tag == "script":
            self.current_script = None


def check_site(root):
    errors = []
    parser = PublicHTML()
    parser.feed((root / "index.html").read_text(encoding="utf-8"))
    errors.extend(parser.errors)
    directives = {}
    for entry in (parser.policy or "").split(";"):
        tokens = entry.split()
        if tokens:
            if tokens[0] in directives:
                errors.append("CSP has a duplicate directive: " + tokens[0])
            directives[tokens[0]] = tokens[1:]
    for name in ("default-src", "style-src", "img-src", "media-src", "font-src"):
        if directives.get(name) != ["'self'"]:
            errors.append(name + " must load only same-origin resources.")
    for name in ("script-src-attr", "style-src-attr", "connect-src", "object-src", "frame-src", "worker-src", "base-uri", "form-action"):
        if directives.get(name) != ["'none'"]:
            errors.append(name + " must be disabled.")
    if "'self'" not in directives.get("script-src", []):
        errors.append("Same-origin JavaScript must be permitted.")
    if any(token != "'self'" and not re.fullmatch(r"'sha256-[A-Za-z0-9+/]{43}='", token) for token in directives.get("script-src", [])):
        errors.append("Scripts may use only self and exact SHA-256 hashes, with no unsafe-inline/eval.")
    if any(name in directives for name in ("frame-ancestors", "report-uri", "sandbox")):
        errors.append("Do not put header-only CSP directives in a meta element.")
    if parser.referrer != "strict-origin-when-cross-origin":
        errors.append("An explicit referrer policy is required.")
    for script in parser.scripts:
        if script["attrs"].get("src"):
            continue
        if script["attrs"].get("type") != "application/ld+json":
            errors.append("Inline executable JavaScript is not allowed.")
            continue
        try:
            json.loads(script["body"])
        except ValueError:
            errors.append("Structured data must remain valid JSON.")
        digest = base64.b64encode(hashlib.sha256(script["body"].encode()).digest()).decode()
        if "'sha256-" + digest + "'" not in directives.get("script-src", []):
            errors.append("CSP hash does not match structured data.")
    for value in parser.resources:
        parsed = urlsplit(value)
        if parsed.scheme or parsed.netloc or "\\" in value:
            errors.append("Subresources must be local: " + value)
            continue
        resource = (root / unquote(parsed.path).lstrip("/")).resolve()
        if root.resolve() not in resource.parents or not resource.is_file():
            errors.append("Resource is missing or escapes the public directory: " + value)
    forbidden = {".git", ".github", ".env", ".aws", ".ssh", ".codex", ".agents", "reports", "scripts", "tests"}
    secret_patterns = [
        rb"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
        rb"\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})",
        rb"\b(?:AKIA|ASIA)[A-Z0-9]{16}\b",
        rb"\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}",
    ]
    for path in root.rglob("*"):
        relative = path.relative_to(root)
        if any(part in forbidden or part.startswith(".env.") for part in relative.parts) or path.suffix.lower() in {".pem", ".key", ".p12", ".pfx"}:
            errors.append("Private or internal path in the public artifact: " + str(relative))
        if path.is_symlink():
            errors.append("Symlinks are not permitted in the public artifact: " + str(relative))
        if path.is_file() and path.suffix.lower() in {".js", ".html", ".css", ".svg", ".json", ".txt", ".md"}:
            payload = path.read_bytes()
            if any(re.search(pattern, payload) for pattern in secret_patterns):
                errors.append("Possible credential material in " + str(relative) + "; value suppressed.")
    return errors


if __name__ == "__main__":
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent / "_site"
    problems = check_site(root)
    if problems:
        raise SystemExit("Public-site security checks failed:\n" + "\n".join("- " + problem for problem in problems))
    print("Public-site checks passed: CSP, structured data, local resources, referrer policy, and public-file boundaries.")
