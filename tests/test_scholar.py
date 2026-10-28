"""Scholar imports must be complete, attributable, and safe to keep as cached data."""
import base64
from copy import deepcopy
from email.message import Message
import json
import io
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import MagicMock, patch
from urllib.error import HTTPError

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
import update_scholar as scholar

FIXTURE = '''<!doctype html><html><head><meta charset="utf-8"></head><body>
<div id="gsc_prf_in">Piyush Wanchoo</div>
<table id="gsc_rsb_st"><thead><tr><th></th><th>All</th><th>Since 2021</th></tr></thead><tbody>
<tr><td class="gsc_rsb_sc1"><a>Citations</a></td><td class="gsc_rsb_std">1,234</td><td class="gsc_rsb_std">1,000</td></tr>
<tr><td class="gsc_rsb_sc1">h-index</td><td class="gsc_rsb_std">1</td><td class="gsc_rsb_std">0</td></tr>
<tr><td class="gsc_rsb_sc1">i10-index</td><td class="gsc_rsb_std">1</td><td class="gsc_rsb_std">0</td></tr>
</tbody></table>
<table><tbody><tr class="gsc_a_tr">
<td class="gsc_a_t"><a class="gsc_a_at" href="/citations?view_op=view_citation&amp;citation_for_view=L0GoOBAAAAAJ:example">Impact &amp; failure &lt;script&gt;alert(1)&lt;/script&gt;</a>
<div class="gs_gray">P Wanchoo, A Researcher, ...</div>
<div class="gs_gray">Mechanics Journal 1, 100<span class="gs_oph">, 2026</span></div></td>
<td class="gsc_a_c"><a class="gsc_a_ac"></a></td><td class="gsc_a_y"><span>2026</span></td>
</tr></tbody></table><button id="gsc_bpf_more" disabled>Show more</button></body></html>'''

API_FIXTURE = {
    "search_metadata": {"status": "Success", "json_endpoint": "https://serpapi.com/private?api_key=must-not-be-published"},
    "search_parameters": {"author_id": scholar.PROFILE_ID, "api_key": "must-not-be-published"},
    "author": {"name": scholar.PROFILE_NAME},
    "cited_by": {"table": [{"citations": {"all": 1234, "since_2021": 1000}}, {"h_index": {"all": 1}}, {"i10_index": {"all": 1}}]},
    "articles": [{"citation_id": scholar.PROFILE_ID + ":example", "title": "A new paper", "authors": "P Wanchoo, A Researcher", "publication": "Mechanics Journal", "year": "2026", "cited_by": {"value": 17}}]
}


class ScholarImport(unittest.TestCase):
    def setUp(self):
        self.environment = patch.dict(os.environ, {"SERPAPI_API_KEY": ""})
        self.environment.start()
        self.addCleanup(self.environment.stop)

    def test_api_import_discards_request_metadata_and_keys(self):
        data = scholar.parse_serpapi(API_FIXTURE)
        self.assertEqual(data["metrics"]["citations"], 1234)
        self.assertEqual(data["publications"][0]["citations"], 17)
        self.assertEqual(data["publications"][0]["title"], "A new paper")
        self.assertNotIn("must-not-be-published", scholar.serialize_snapshot(data))
        self.assertNotIn("serpapi.com", scholar.serialize_snapshot(data))

    def test_api_rejects_errors_wrong_authors_and_partial_results(self):
        for field, value in (("error", "API error containing must-not-be-published"), ("author", {"name": "Another researcher"}), ("serpapi_pagination", {"next": "https://serpapi.com/search.json?api_key=must-not-be-published"}), ("search_metadata", {"status": "Processing"})):
            payload = deepcopy(API_FIXTURE)
            payload[field] = value
            with self.subTest(field=field), self.assertRaises(ValueError) as error:
                scholar.parse_serpapi(payload)
            self.assertNotIn("must-not-be-published", str(error.exception))

    def test_configured_api_key_uses_only_the_provider_request(self):
        with tempfile.TemporaryDirectory() as directory, patch.dict(os.environ, {"SERPAPI_API_KEY": "test-provider-key"}), patch.object(scholar, "request_bytes", return_value=json.dumps(API_FIXTURE).encode()) as request:
            data = scholar.refresh(output=Path(directory) / "scholar-data.js")
            self.assertEqual(request.call_count, 1)
            self.assertTrue(request.call_args.args[0].startswith("https://serpapi.com/search.json?"))
            self.assertIn("num=100", request.call_args.args[0])
            self.assertEqual(data["publications"][0]["title"], "A new paper")

    def test_all_time_metrics_and_exact_publication_text(self):
        data = scholar.parse_profile(FIXTURE)
        self.assertEqual(data["metrics"], {"citations": 1234, "hIndex": 1, "i10Index": 1})
        self.assertEqual(len(data["publications"]), 1)
        paper = data["publications"][0]
        self.assertEqual(paper["title"], "Impact & failure <script>alert(1)</script>")
        self.assertEqual(paper["authors"], "P Wanchoo, A Researcher, ...")
        self.assertEqual(paper["venue"], "Mechanics Journal 1, 100")
        self.assertEqual(paper["year"], "2026")
        self.assertEqual(paper["citations"], 0)
        self.assertIn("citation_for_view=L0GoOBAAAAAJ%3Aexample", paper["url"])

    def test_estimated_paper_citation_count(self):
        data = scholar.parse_profile(FIXTURE.replace('class="gsc_a_ac"></a>', 'class="gsc_a_ac">17*</a>'))
        self.assertEqual(data["publications"][0]["citations"], 17)

    def test_profile_response_uses_its_declared_character_encoding(self):
        response = MagicMock()
        response.__enter__.return_value = response
        response.status = 200
        response.headers = Message()
        response.headers["Content-Type"] = "text/html; charset=ISO-8859-1"
        response.read.return_value = FIXTURE.replace("1,234", "1\u00a0234").encode("iso-8859-1")
        with patch.object(scholar, "urlopen", return_value=response):
            html = scholar.request_bytes(scholar.PROFILE_URL, as_text=True)
        self.assertEqual(scholar.parse_profile(html)["metrics"]["citations"], 1234)

    def test_block_page_and_wrong_author_rejected(self):
        for html in ("<html>Too many requests</html>", FIXTURE.replace("Piyush Wanchoo", "Another Researcher")):
            with self.subTest(html=html[:30]), self.assertRaises(ValueError):
                scholar.parse_profile(html)

    def test_partial_publication_list_rejected(self):
        for html in (FIXTURE.replace(" disabled", ""), FIXTURE.replace('id="gsc_bpf_more"', 'id="changed_markup"')):
            with self.subTest(html=html[-150:]), self.assertRaises(ValueError):
                scholar.parse_profile(html)

    def test_missing_or_non_numeric_metrics_rejected(self):
        for html in (FIXTURE.replace("i10-index", "unknown"), FIXTURE.replace("1,234", "unavailable")):
            with self.subTest(html=html[:30]), self.assertRaises(ValueError):
                scholar.parse_profile(html)

    def test_foreign_publication_rejected(self):
        with self.assertRaises(ValueError):
            scholar.parse_profile(FIXTURE.replace("L0GoOBAAAAAJ:example", "wrongprofile:example"))

    def test_missing_and_duplicate_publications_rejected(self):
        data = scholar.parse_profile(FIXTURE)
        for papers in ([], data["publications"] * 2):
            invalid = deepcopy(data)
            invalid["publications"] = papers
            with self.subTest(papers=len(papers)), self.assertRaises(ValueError):
                scholar.validate_snapshot(invalid)

    def test_foreign_urls_and_invalid_metrics_rejected(self):
        original = scholar.parse_profile(FIXTURE)
        for mutation in ("url", "metric", "timestamp"):
            data = deepcopy(original)
            if mutation == "url":
                data["publications"][0]["url"] = "javascript:alert(1)"
            elif mutation == "metric":
                data["metrics"]["citations"] = True
            else:
                data["updatedAt"] = "2026-10-27T10:00:00"
            with self.subTest(mutation=mutation), self.assertRaises(ValueError):
                scholar.validate_snapshot(data)

    def test_snapshot_is_only_a_fixed_assignment_and_json(self):
        data = scholar.parse_profile(FIXTURE)
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "scholar-data.js"
            path.write_text(scholar.serialize_snapshot(data))
            self.assertEqual(scholar.load_snapshot(path), data)
            path.write_text(path.read_text() + "alert('injection');")
            with self.assertRaises(ValueError):
                scholar.load_snapshot(path)

    def test_fetch_failure_preserves_last_good_data_and_date(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "scholar-data.js"
            previous = scholar.serialize_snapshot(scholar.parse_profile(FIXTURE, updated_at="2026-09-01T10:00:00+00:00"))
            path.write_text(previous)
            with HTTPError("https://scholar.google.com/", 429, "Rate limited", {}, None) as error, patch.object(scholar, "request_bytes", side_effect=error):
                with self.assertRaises(HTTPError):
                    scholar.refresh(output=path)
            self.assertEqual(path.read_text(), previous)

    def test_invalid_response_preserves_last_good_data(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "scholar-data.js"
            previous = scholar.serialize_snapshot(scholar.parse_profile(FIXTURE))
            path.write_text(previous)
            with self.assertRaises(ValueError):
                scholar.refresh(output=path, html="<html>Verify you are human</html>")
            self.assertEqual(path.read_text(), previous)

    def test_successful_refresh_replaces_the_snapshot(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "scholar-data.js"
            data = scholar.refresh(output=path, html=FIXTURE)
            self.assertEqual(scholar.load_snapshot(path), data)
            self.assertFalse(path.with_suffix(".tmp").exists())

    def test_publish_changes_only_the_snapshot_with_conflict_protection(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "outputs"
            env = {"GITHUB_REPOSITORY": "example/site", "GITHUB_SHA": "a" * 40, "GH_TOKEN": "test-only-token", "GITHUB_OUTPUT": str(output)}
            responses = [json.dumps({"sha": "previous-file-sha"}).encode(), json.dumps({"commit": {"sha": "b" * 40}}).encode()]
            with patch.dict(os.environ, env), patch.object(scholar, "request_bytes", side_effect=responses) as request:
                scholar.publish_snapshot()
            first, second = request.call_args_list
            self.assertEqual(first.args[0], "https://api.github.com/repos/example/site/contents/scholar-data.js?ref=" + "a" * 40)
            self.assertEqual(second.args[0], "https://api.github.com/repos/example/site/contents/scholar-data.js")
            payload = second.kwargs["payload"]
            self.assertEqual(payload["sha"], "previous-file-sha")
            self.assertEqual(payload["branch"], "main")
            self.assertEqual(base64.b64decode(payload["content"]), scholar.SNAPSHOT.read_bytes())
            self.assertEqual(output.read_text(), "revision=" + "b" * 40 + "\n")
            self.assertNotIn(env["GH_TOKEN"], output.read_text())

    def test_checked_in_snapshot_is_valid(self):
        self.assertEqual(scholar.load_snapshot(scholar.SNAPSHOT)["profileId"], scholar.PROFILE_ID)

    def test_public_failure_annotation_identifies_service_without_secrets(self):
        for publish in (False, True):
            phase_host = "api.github.com" if publish else "scholar.google.com"
            argv = ["update_scholar.py", "--publish"] if publish else ["update_scholar.py"]
            output = io.StringIO()
            target = "publish_snapshot" if publish else "refresh"
            with HTTPError("https://" + phase_host + "/?token=must-not-appear", 403, "Forbidden", {}, None) as error:
                with patch.dict(os.environ, {"GITHUB_ACTIONS": "true"}), patch.object(sys, "argv", argv), patch.object(sys, "stdout", output), patch.object(sys, "stderr", io.StringIO()):
                    if publish:
                        with patch.object(scholar, "refresh", return_value=scholar.parse_profile(FIXTURE)), patch.object(scholar, target, side_effect=error):
                            self.assertEqual(scholar.main(), 1)
                    else:
                        with patch.object(scholar, target, side_effect=error):
                            self.assertEqual(scholar.main(), 1)
            self.assertIn("::warning::Scholar refresh failed while", output.getvalue())
            self.assertIn("HTTP 403 from " + phase_host, output.getvalue())
            self.assertNotIn("must-not-appear", output.getvalue())


if __name__ == "__main__":
    unittest.main()
