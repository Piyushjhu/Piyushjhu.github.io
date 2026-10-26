"""Canary checks for changes that would weaken the deployed site's policy."""
import shutil
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from check_site import check_site
from security_policy import secure_html


class SecurityCanaries(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.site = Path(self.temporary.name) / "site"
        shutil.copytree(ROOT / "_site", self.site)
        self.index = self.site / "index.html"

    def tearDown(self):
        self.temporary.cleanup()

    def change(self, old, new):
        html = self.index.read_text()
        self.assertIn(old, html)
        self.index.write_text(html.replace(old, new, 1))

    def test_clean_site_passes(self):
        self.assertEqual(check_site(self.site), [])

    def test_injected_executable_script_rejected(self):
        self.change("</head>", "<script>window.securityCanary = true;</script></head>")
        self.assertTrue(any("Inline executable" in error for error in check_site(self.site)))

    def test_external_script_rejected(self):
        self.change("</head>", '<script src="https://example.invalid/canary.js"></script></head>')
        self.assertTrue(any("must be local" in error for error in check_site(self.site)))

    def test_weakened_policy_rejected(self):
        self.change("script-src 'self'", "script-src 'self' 'unsafe-inline' 'unsafe-eval'")
        self.assertTrue(any("unsafe-inline/eval" in error for error in check_site(self.site)))

    def test_accidentally_staged_private_file_rejected(self):
        (self.site / ".env").write_text("PUBLIC_SITE_CANARY=true")
        self.assertTrue(any("Private or internal path" in error for error in check_site(self.site)))

    def test_structured_data_hash_updates_without_weakening_policy(self):
        self.change('"jobTitle": "Postdoctoral Fellow"', '"jobTitle": "Researcher"')
        self.assertTrue(any("hash does not match" in error for error in check_site(self.site)))
        self.index.write_text(secure_html(self.index.read_text()))
        self.assertEqual(check_site(self.site), [])


if __name__ == "__main__":
    unittest.main()
