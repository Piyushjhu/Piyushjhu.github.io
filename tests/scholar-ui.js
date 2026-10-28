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

function render({snapshot = true, mutate} = {}) {
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
  const context = vm.createContext({document, window, URL, Intl, Date});
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

const hostile = render({mutate: window => {
  window.SCHOLAR_DATA.publications[0].title = '<img src=x onerror="alert(1)">';
  window.SCHOLAR_DATA.publications[0].url = "javascript:alert(1)";
  window.SCHOLAR_DATA.updatedAt = "2026-09-01T10:00:00+00:00";
}});
assert.ok(hostile.query("#publications").innerHTML.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
assert.ok(!hostile.query("#publications").innerHTML.includes("javascript:"));
assert.ok(hostile.query("#publication-source-note").textContent.includes("Sep 1, 2026"));
const foreign = render({mutate: window => { window.SCHOLAR_DATA.profileId = "another-profile"; }});
assert.equal(foreign.query('[data-paper-filter="scholar"]').hidden, true);
console.log("Scholar UI checks passed: current metrics, new papers, all filters, missing data, source identity, escaping, and cached update dates.");
