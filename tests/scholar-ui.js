// Exercise app rendering and publication filters without network or a browser.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const read = name => fs.readFileSync(path.join(root, name), "utf8");

function element(tag, attrs) {
  const classes = new Set((attrs.class || "").split(/\s+/));
  return {
    tag, attrs, innerHTML: "", textContent: "", hidden: "hidden" in attrs,
    dataset: Object.fromEntries(Object.entries(attrs).filter(([key]) => key.startsWith("data-")).map(([key, value]) => [key.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), value])),
    listeners: {},
    classList: { add: name => classes.add(name), remove: name => classes.delete(name), toggle: (name, active) => active ? classes.add(name) : classes.delete(name), contains: name => classes.has(name) },
    getAttribute(name) { return this.attrs[name] ?? null; },
    setAttribute(name, value) { this.attrs[name] = String(value); },
    addEventListener(name, callback) { (this.listeners[name] ||= []).push(callback); },
    click() { for (const listener of this.listeners.click || []) listener({target: this}); },
    querySelectorAll() { return []; },
    closest() { return null; },
    focus() {},
    style: {setProperty() {}}
  };
}

function render({snapshot = true, mutate, now = "2026-10-27T16:00:00Z"} = {}) {
  // Only the static elements queried by app.js need DOM methods here.
  const elements = [...html.matchAll(/<([a-z][a-z0-9-]*)\b([^>]*)>/gi)].map(([, tag, source]) => {
    const attrs = Object.fromEntries([...source.matchAll(/([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)].map(([, name, double, single, bare]) => [name, double ?? single ?? bare ?? ""]));
    return element(tag, attrs);
  });
  function matches(item, selector) {
    if (selector.startsWith("#")) return item.attrs.id === selector.slice(1);
    if (selector.startsWith(".")) return (item.attrs.class || "").split(/\s+/).includes(selector.slice(1));
    const attribute = selector.match(/^(\w+)?\[([^=\]]+)(?:="([^"]*)")?\]$/);
    if (attribute) return (!attribute[1] || item.tag === attribute[1]) && attribute[2] in item.attrs && (attribute[3] === undefined || item.attrs[attribute[2]] === attribute[3]);
    return item.tag === selector;
  }
  const document = {
    querySelectorAll: selector => elements.filter(item => matches(item, selector)),
    querySelector: selector => elements.find(item => matches(item, selector)) || null,
    getElementById: id => elements.find(item => item.attrs.id === id) || null,
    addEventListener() {}, body: element("body", {})
  };
  const window = {location: {href: "https://piyushwanchoo.com/", hash: ""}, addEventListener() {}, matchMedia: () => ({matches: false, addEventListener() {}})};
  class FixedDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return new Date(now).getTime(); }
  }
  const context = vm.createContext({document, window, URL, Intl, Date: FixedDate});
  vm.runInContext(read("content.js"), context);
  if (snapshot) vm.runInContext(read("scholar-data.js"), context);
  if (mutate) mutate(window);
  vm.runInContext(read("app.js"), context);
  return {document, window, query: selector => document.querySelector(selector)};
}

const page = render();
const snapshot = page.window.SCHOLAR_DATA;
assert.ok(page.query("#metrics").innerHTML.includes(`>${snapshot.metrics.citations.toLocaleString("en-US")}<`));
assert.ok(page.query("#metrics").innerHTML.includes("Publications · Google Scholar"));
assert.ok(page.query("#scholar-metrics").innerHTML.includes(`h-index ${snapshot.metrics.hIndex}`));
assert.equal(page.query('[data-paper-filter="scholar"]').getAttribute("aria-pressed"), "true");
assert.equal((page.query("#publications").innerHTML.match(/class="publication"/g) || []).length, snapshot.publications.length);
assert.ok(page.query("#publications").innerHTML.includes("View on Scholar"));
for (const [filter, expected] of [["all", page.window.SITE_CONTENT.publications.length], ["progress", page.window.SITE_CONTENT.manuscripts.length], ["selected", page.window.SITE_CONTENT.publications.filter(paper => paper.featured).length], ["scholar", snapshot.publications.length]]) {
  page.query(`[data-paper-filter="${filter}"]`).click();
  assert.equal((page.query("#publications").innerHTML.match(/class="publication"/g) || []).length, expected);
  assert.equal(page.query(`[data-paper-filter="${filter}"]`).getAttribute("aria-pressed"), "true");
}

const fallback = render({snapshot: false});
assert.equal(fallback.query('[data-paper-filter="scholar"]').hidden, true);
assert.equal(fallback.query('[data-paper-filter="selected"]').getAttribute("aria-pressed"), "true");
assert.ok(fallback.query("#metrics").innerHTML.includes("September 2026"));
assert.equal(fallback.query('[data-news-filter="papers"]').hidden, true);
assert.ok(fallback.query("#news-stories").innerHTML.includes('data-news-id="ses-2026"'));

const news = page => page.query("#news-stories").innerHTML;
const entry = (page, id) => news(page).match(new RegExp(`<article class="news-entry" data-news-id="${id}">[\\s\\S]*?</article>`))?.[0] || "";
const countNews = page => (news(page).match(/class="news-entry"/g) || []).length;
assert.equal(countNews(page), 6);
assert.ok(news(page).includes(snapshot.publications[0].title));
assert.ok(entry(page, "ses-2026").includes('datetime="2026-10-14"'));
assert.ok(entry(page, "ses-2026").includes("Past event"));
assert.ok(entry(page, "ses-2026").includes("I presented"));
assert.ok(!entry(page, "ses-2026").includes("Accepted"));
page.query('[data-news-filter="papers"]').click();
const expectedPapers = snapshot.publications.filter(paper => Number(paper.year) >= page.window.SITE_CONTENT.newsPublicationStartYear).length;
assert.equal(countNews(page), Math.min(expectedPapers, 6));
assert.ok(news(page).includes("Preprint"));
assert.ok(!news(page).includes('<time class="news-date"')); // Scholar supplies years, not publication days.
assert.ok(!news(page).includes('data-news-id="ses-2026"'));
page.query('[data-news-filter="events"]').click();
page.query("#news-toggle").click();
assert.equal(countNews(page), page.window.SITE_CONTENT.news.length);
assert.ok(!news(page).includes('data-news-id="paper-'));
page.query('[data-news-filter="upcoming"]').click();
assert.ok(entry(page, "mrs-2026").includes("will give"));
assert.ok(!news(page).includes('data-news-id="ses-2026"'));
page.query('[data-news-filter="past"]').click();
assert.ok(entry(page, "ses-2026").includes("Past event"));
assert.ok(!news(page).includes('data-news-id="paper-'));
page.query('[data-news-filter="all"]').click();
page.query("#news-toggle").click();
assert.equal(countNews(page), page.window.SITE_CONTENT.news.length + expectedPapers);
assert.equal(page.query('[data-news-filter="all"]').getAttribute("aria-pressed"), "true");

const ongoing = render({now: "2026-11-30T16:00:00Z"});
ongoing.query('[data-news-filter="events"]').click();
ongoing.query("#news-toggle").click();
assert.ok(entry(ongoing, "mrs-2026").includes("In progress"));
assert.ok(!entry(ongoing, "mrs-2026").includes("will give"));
const after = render({now: "2026-12-05T16:00:00Z"});
after.query('[data-news-filter="events"]').click();
after.query("#news-toggle").click();
assert.ok(entry(after, "mrs-2026").includes("Past event"));
assert.ok(entry(after, "mrs-2026").includes("contributions covered"));
assert.ok(!entry(after, "mrs-2026").includes("will give"));
assert.ok(!entry(after, "mrs-2026").includes("Accepted oral presentation"));
const newYorkDate = render({now: "2026-12-05T02:00:00Z"}); // Still December 4 in New York.
newYorkDate.query('[data-news-filter="events"]').click();
newYorkDate.query("#news-toggle").click();
assert.ok(entry(newYorkDate, "mrs-2026").includes("In progress"));
const future = render({now: "2028-01-01T16:00:00Z"});
future.query('[data-news-filter="events"]').click();
future.query("#news-toggle").click();
assert.ok(entry(future, "tms-2027").includes("Coauthored talks at TMS 2027"));
assert.ok(!entry(future, "tms-2027").includes("will present"));

const added = render({mutate: window => {
  const paper = {...window.SCHOLAR_DATA.publications[0], id: "L0GoOBAAAAAJ:new-paper", title: "A newly listed paper"};
  window.SCHOLAR_DATA.publications.unshift(paper);
}});
assert.ok(news(added).includes("A newly listed paper"));
assert.equal((news(added).match(/data-news-id="paper-L0GoOBAAAAAJ:new-paper"/g) || []).length, 1);

const hostile = render({mutate: window => {
  window.SCHOLAR_DATA.publications[0].title = '<img src=x onerror="alert(1)">';
  window.SCHOLAR_DATA.publications[0].url = "javascript:alert(1)";
  window.SCHOLAR_DATA.updatedAt = "2026-09-01T10:00:00+00:00";
}});
assert.ok(hostile.query("#publications").innerHTML.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
assert.ok(!hostile.query("#publications").innerHTML.includes("javascript:"));
assert.ok(hostile.query("#publication-source-note").textContent.includes("Sep 1, 2026"));
assert.ok(news(hostile).includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
assert.ok(!news(hostile).includes("javascript:"));
assert.ok(hostile.query("#news-source-note").textContent.includes("Sep 1, 2026"));
const foreign = render({mutate: window => { window.SCHOLAR_DATA.profileId = "another-profile"; }});
assert.equal(foreign.query('[data-paper-filter="scholar"]').hidden, true);
console.log("Scholar and news UI checks passed: metrics, new paper updates, filters, October 14 talk, event date transitions, New York dates, missing data, source identity, escaping, and cached update dates.");
