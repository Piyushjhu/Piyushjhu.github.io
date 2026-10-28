#!/usr/bin/env python3
"""Refresh one Scholar profile, using SerpApi when its private key is configured."""
import argparse
import base64
from dataclasses import dataclass, field
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import parse_qs, urlencode, urljoin, urlsplit
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
PROFILE_ID = "L0GoOBAAAAAJ"
PROFILE_NAME = "Piyush Wanchoo"
PROFILE_URL = "https://scholar.google.com/citations?" + urlencode({"user": PROFILE_ID, "hl": "en"})
SNAPSHOT = ROOT / "scholar-data.js"
PREFIX = "window.SCHOLAR_DATA = "
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}


@dataclass
class Element:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)

    def has_class(self, name):
        return name in self.attrs.get("class", "").split()

    def find_all(self, predicate):
        for child in self.children:
            if isinstance(child, Element):
                if predicate(child):
                    yield child
                yield from child.find_all(predicate)

    def find(self, predicate):
        return next(self.find_all(predicate), None)

    def text(self, exclude_class=None):
        if exclude_class and self.has_class(exclude_class):
            return ""
        return "".join(child.text(exclude_class) if isinstance(child, Element) else child for child in self.children)


class ProfileHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Element("document")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        element = Element(tag, dict(attrs))
        self.stack[-1].children.append(element)
        if tag not in VOID_TAGS:
            self.stack.append(element)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def clean_text(element, exclude_class=None):
    return " ".join(element.text(exclude_class).split()) if element else ""


def integer(text, empty_zero=False):
    text = re.sub(r"\s+", "", text.strip().rstrip("*").replace(",", ""))
    if not text and empty_zero:
        return 0
    if not re.fullmatch(r"[0-9]+", text):
        raise ValueError("Scholar returned a missing or invalid count.")
    return int(text)


def parse_profile(html, updated_at=None):
    parser = ProfileHTML()
    parser.feed(html)
    root = parser.root
    by_id = lambda name: root.find(lambda element: element.attrs.get("id") == name)
    name = clean_text(by_id("gsc_prf_in"))
    if name.casefold() != PROFILE_NAME.casefold():
        raise ValueError("The response is not the expected public Scholar profile (it may be a block page).")
    table = by_id("gsc_rsb_st")
    if table is None:
        raise ValueError("Scholar citation metrics are missing.")
    metric_names = {"Citations": "citations", "h-index": "hIndex", "i10-index": "i10Index"}
    metrics = {}
    for row in table.find_all(lambda element: element.tag == "tr"):
        label = clean_text(row.find(lambda element: element.has_class("gsc_rsb_sc1")))
        if label in metric_names:
            # The first numeric cell is the all-time value, not the recent value.
            value = row.find(lambda element: element.has_class("gsc_rsb_std"))
            metrics[metric_names[label]] = integer(clean_text(value))
    if set(metrics) != set(metric_names.values()):
        raise ValueError("Scholar did not return all three citation metrics.")
    more = by_id("gsc_bpf_more")
    if more is None or "disabled" not in more.attrs:
        raise ValueError("The publication list is incomplete; refusing to publish a partial count.")
    publications = []
    seen = set()
    for row in root.find_all(lambda element: element.has_class("gsc_a_tr")):
        title = row.find(lambda element: element.has_class("gsc_a_at"))
        if title is None or not clean_text(title):
            raise ValueError("A Scholar publication has no title.")
        query = parse_qs(urlsplit(urljoin(PROFILE_URL, title.attrs.get("href", ""))).query)
        citation_id = query.get("citation_for_view", [""])[0]
        if not re.fullmatch(re.escape(PROFILE_ID) + r":[A-Za-z0-9_-]+", citation_id):
            raise ValueError("A publication belongs to another or unknown Scholar profile.")
        if citation_id in seen:
            raise ValueError("Scholar returned duplicate publication records.")
        seen.add(citation_id)
        details = list(row.find_all(lambda element: element.has_class("gs_gray")))
        if len(details) < 2:
            raise ValueError("A Scholar publication is missing its author or venue field.")
        year = clean_text(row.find(lambda element: element.has_class("gsc_a_y")))
        publications.append({
            "id": citation_id,
            "title": clean_text(title),
            "authors": clean_text(details[0]),
            "venue": clean_text(details[1], exclude_class="gs_oph"),
            "year": year,
            "citations": integer(clean_text(row.find(lambda element: element.has_class("gsc_a_ac"))), empty_zero=True),
            "url": "https://scholar.google.com/citations?" + urlencode({"view_op": "view_citation", "hl": "en", "user": PROFILE_ID, "citation_for_view": citation_id}),
        })
    result = {
        "schemaVersion": 1,
        "profileId": PROFILE_ID,
        "sourceUrl": PROFILE_URL,
        "name": name,
        "updatedAt": updated_at or datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "metrics": metrics,
        "publications": publications,
    }
    validate_snapshot(result)
    return result


def parse_serpapi(payload, updated_at=None):
    if payload.get("error") or payload.get("search_metadata", {}).get("status") != "Success":
        raise ValueError("The Scholar API did not return a successful profile.")
    if payload.get("search_parameters", {}).get("author_id") != PROFILE_ID or payload.get("author", {}).get("name") != PROFILE_NAME:
        raise ValueError("The Scholar API returned another author.")
    if payload.get("serpapi_pagination", {}).get("next"):
        raise ValueError("The Scholar API publication list is incomplete; keeping the previous full snapshot.")
    metrics = {}
    for row in payload.get("cited_by", {}).get("table", []):
        for field_name, output in (("citations", "citations"), ("h_index", "hIndex"), ("i10_index", "i10Index")):
            if field_name in row:
                metrics[output] = integer(str(row[field_name].get("all", "")))
    publications = []
    for paper in payload.get("articles", []):
        citation_id = paper.get("citation_id", "")
        publications.append({
            "id": citation_id,
            "title": paper.get("title", ""),
            "authors": paper.get("authors", ""),
            "venue": paper.get("publication", ""),
            "year": str(paper.get("year") or ""),
            "citations": integer(str(paper.get("cited_by", {}).get("value") or 0)),
            "url": "https://scholar.google.com/citations?" + urlencode({"view_op": "view_citation", "hl": "en", "user": PROFILE_ID, "citation_for_view": citation_id}),
        })
    result = {
        "schemaVersion": 1,
        "profileId": PROFILE_ID,
        "sourceUrl": PROFILE_URL,
        "name": PROFILE_NAME,
        "updatedAt": updated_at or datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "metrics": metrics,
        "publications": publications,
    }
    # Discard provider metadata, request parameters, and response URLs entirely.
    validate_snapshot(result)
    return result


def validate_snapshot(data):
    if not isinstance(data, dict) or data.get("schemaVersion") != 1 or data.get("profileId") != PROFILE_ID or data.get("sourceUrl") != PROFILE_URL or data.get("name") != PROFILE_NAME:
        raise ValueError("Invalid Scholar snapshot identity or schema.")
    timestamp = datetime.fromisoformat(data["updatedAt"])
    if timestamp.tzinfo is None:
        raise ValueError("The Scholar refresh timestamp needs a timezone.")
    metrics = data["metrics"]
    if set(metrics) != {"citations", "hIndex", "i10Index"} or any(type(value) is not int or value < 0 for value in metrics.values()):
        raise ValueError("Invalid Scholar citation metrics.")
    publications = data["publications"]
    if not isinstance(publications, list) or not 1 <= len(publications) <= 100:
        raise ValueError("The complete Scholar publication list is missing or too large.")
    seen = set()
    for paper in publications:
        for key in ("id", "title", "authors", "venue", "year", "url"):
            if not isinstance(paper.get(key), str) or len(paper[key]) > 4000:
                raise ValueError("Invalid publication text.")
        if not paper["title"] or not paper["authors"] or (paper["year"] and not re.fullmatch(r"[12][0-9]{3}", paper["year"])):
            raise ValueError("Invalid publication title, authors, or year.")
        if type(paper.get("citations")) is not int or paper["citations"] < 0:
            raise ValueError("Invalid publication citation count.")
        if paper["id"] in seen or not re.fullmatch(re.escape(PROFILE_ID) + r":[A-Za-z0-9_-]+", paper["id"]):
            raise ValueError("Invalid or repeated Scholar publication ID.")
        seen.add(paper["id"])
        url = urlsplit(paper["url"])
        if url.scheme != "https" or url.netloc != "scholar.google.com" or url.path != "/citations" or parse_qs(url.query).get("citation_for_view") != [paper["id"]]:
            raise ValueError("A publication has an unexpected source URL.")
    if metrics["hIndex"] > len(publications) or metrics["i10Index"] > len(publications) or metrics["citations"] < metrics["hIndex"] ** 2:
        raise ValueError("Scholar metrics are inconsistent with the publication list.")


def serialize_snapshot(data):
    validate_snapshot(data)
    # Only a fixed assignment and JSON are emitted; fetched HTML is never published.
    return PREFIX + json.dumps(data, indent=2, ensure_ascii=True) + ";\n"


def load_snapshot(path):
    source = Path(path).read_text(encoding="utf-8")
    if not source.startswith(PREFIX) or not source.endswith(";\n"):
        raise ValueError("Invalid Scholar data file.")
    data = json.loads(source[len(PREFIX):-2])
    validate_snapshot(data)
    return data


def request_bytes(url, token=None, payload=None, as_text=False):
    headers = {"User-Agent": "PersonalWebsiteScholarSync/1.0", "Accept-Language": "en-US,en;q=0.8"}
    if token:
        headers.update({"Authorization": "Bearer " + token, "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"})
    body = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(payload).encode()
    with urlopen(Request(url, data=body, headers=headers, method="PUT" if body is not None else "GET"), timeout=30) as response:
        if response.status != 200 and not (payload is not None and response.status == 201):
            raise ValueError("Unexpected response status.")
        raw = response.read(2_000_001)
        charset = response.headers.get_content_charset() or "utf-8"
    if len(raw) > 2_000_000:
        raise ValueError("The response is unexpectedly large.")
    return raw.decode(charset) if as_text else raw


def refresh(output=SNAPSHOT, html=None):
    api_key = os.environ.get("SERPAPI_API_KEY", "").strip()
    if html is not None:
        data = parse_profile(html)
    elif api_key:
        url = "https://serpapi.com/search.json?" + urlencode({"engine": "google_scholar_author", "author_id": PROFILE_ID, "hl": "en", "num": 100, "sort": "pubdate", "api_key": api_key})
        data = parse_serpapi(json.loads(request_bytes(url)))
    else:
        # One permitted public-profile request. No search crawling or pagination.
        url = PROFILE_URL + "&pagesize=100&sortby=pubdate"
        html = request_bytes(url, as_text=True)
        data = parse_profile(html)
    output = Path(output)
    temporary = output.with_suffix(".tmp")
    temporary.write_text(serialize_snapshot(data), encoding="utf-8")
    temporary.replace(output)
    return data


def publish_snapshot():
    """Commit only the public snapshot using the job-scoped GitHub token."""
    repository = os.environ["GITHUB_REPOSITORY"]
    revision = os.environ["GITHUB_SHA"]
    token = os.environ["GH_TOKEN"]
    if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repository) or not re.fullmatch(r"[a-f0-9]{40}", revision):
        raise ValueError("Invalid repository or source revision.")
    endpoint = f"https://api.github.com/repos/{repository}/contents/scholar-data.js"
    original = json.loads(request_bytes(endpoint + "?ref=" + revision, token=token))
    payload = {
        "message": "Refresh Google Scholar metrics and publications",
        "content": base64.b64encode(SNAPSHOT.read_bytes()).decode("ascii"),
        "sha": original["sha"],
        "branch": "main",
    }
    result = json.loads(request_bytes(endpoint, token=token, payload=payload))
    updated_revision = result["commit"]["sha"]
    if not re.fullmatch(r"[a-f0-9]{40}", updated_revision):
        raise ValueError("GitHub did not return a valid snapshot commit.")
    with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as output:
        output.write("revision=" + updated_revision + "\n")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input-html", type=Path, help="Parse an already downloaded public profile (for local verification).")
    parser.add_argument("--publish", action="store_true", help="Commit the snapshot in GitHub Actions using its scoped token.")
    args = parser.parse_args()
    phase = "reading Google Scholar via SerpApi" if os.environ.get("SERPAPI_API_KEY") else "reading Google Scholar"
    try:
        data = refresh(html=args.input_html.read_text(encoding="utf-8") if args.input_html else None)
        if args.publish:
            phase = "saving the snapshot to GitHub"
            publish_snapshot()
        print(f"Scholar refreshed: {len(data['publications'])} publications, {data['metrics']['citations']} citations, h-index {data['metrics']['hIndex']}, i10-index {data['metrics']['i10Index']}.")
    except Exception as error:
        # Do not log fetched bodies, authorization headers, or provider exceptions.
        if isinstance(error, HTTPError):
            detail = f"HTTP {error.code} from {urlsplit(error.url).hostname}"
            if error.code == 403 and urlsplit(error.url).hostname == "scholar.google.com" and not os.environ.get("SERPAPI_API_KEY"):
                detail += ". Add SERPAPI_API_KEY in repository Actions secrets to enable unattended refreshes."
        else:
            detail = str(error) if isinstance(error, ValueError) else type(error).__name__
        message = f"Scholar refresh failed while {phase}; keep the last published snapshot. {detail}"
        print(message, file=sys.stderr)
        if os.environ.get("GITHUB_ACTIONS") == "true":
            print("::warning::" + message)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
