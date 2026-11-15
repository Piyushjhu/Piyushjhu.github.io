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
for (const [filter, expected] of [["all", page.window.SITE_CONTENT.publications.length], ["conference", page.window.SITE_CONTENT.conferencePublications.length], ["progress", page.window.SITE_CONTENT.manuscripts.length], ["selected", page.window.SITE_CONTENT.publications.filter(paper => paper.featured).length], ["scholar", snapshot.publications.length]]) {
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

// Paper explanations keep the findings visible while allowing methods and media to be optional.
const paperArticles = (page, panel) => [...(panel ? page.query(panel).innerHTML : page.query("#active-research").innerHTML + page.query("#past-research").innerHTML).matchAll(/<article class="research-paper"[^>]*>[\s\S]*?<\/article>/g)].map(match => match[0]);
const paperById = (page, id) => paperArticles(page).find(article => article.includes(`id="paper-${id}"`)) || "";
const explained = page.window.SITE_CONTENT.researchStudies.filter(study => study.status === "past").flatMap(study => study.papers || []);
assert.equal(explained.length, 4);
assert.equal(paperArticles(page, "#past-research").length, 4);
for (const paper of explained) {
  const article = paperById(page, paper.id);
  const visibleReading = article.replace(/<details\b[\s\S]*?<\/details>/g, "");
  assert.ok(visibleReading.includes('class="paper-description"'));
  assert.match(visibleReading, /<h5>Key results<\/h5><ul><li>.+<\/li><\/ul>/);
  assert.match(visibleReading, /<h5>Why it matters<\/h5><p>.+<\/p>/);
  assert.ok(article.includes(`aria-labelledby="paper-${paper.id}-title"`));
  assert.ok(article.includes(`href="${paper.url}"`));
  assert.ok(!article.includes("<figure") && !article.includes("<video") && !article.includes("<img"));
}
page.query('[data-research-tab="past"]').click();
assert.equal(page.query("#research-panel-past").hidden, false);
assert.equal(page.query("#research-panel-active").hidden, true);
page.query('[data-paper-filter="all"]').click();
for (const paper of explained) assert.ok(page.query("#publications").innerHTML.includes(`href="#paper-${paper.id}"`));
page.query('[data-paper-filter="progress"]').click();
assert.ok(page.query("#publications").innerHTML.includes('href="#paper-aimdl-laboratory"'));

// Published postdoctoral work and the preprint keep their distinct source types.
const postdoc = page.window.SITE_CONTENT.researchStudies.filter(study => study.status === "active").flatMap(study => study.papers || []);
assert.equal(postdoc.length, 4);
assert.equal(paperArticles(page, "#active-research").length, 4);
for (const [id, type] of [["copper-spall-statistics", "Journal article"], ["helix-automation", "Journal article"], ["flyer-positioning", "Conference paper"], ["aimdl-laboratory", "Preprint"]]) {
  const paper = postdoc.find(paper => paper.id === id);
  assert.equal(paper?.publicationType, type);
  const article = paperById(page, id);
  const visibleReading = article.replace(/<details\b[\s\S]*?<\/details>/g, "");
  assert.ok(visibleReading.includes(`>${type}</p>`));
  assert.ok(visibleReading.includes("Key results") && visibleReading.includes("Why it matters"));
  assert.ok(article.includes(`href="${paper.url}"`));
}
const activeReading = page.query("#active-research").innerHTML;
assert.ok(activeReading.includes('src="./assets/research/cuti-plate-impact-spall.mp4"'));
assert.ok(activeReading.includes('src="./assets/research/helix-facility.jpg"'));
assert.ok(activeReading.includes('aria-describedby="research-spall-strength-caption"'));
assert.ok(paperById(page, "aimdl-laboratory").includes(">Read preprint "));
page.query('[data-paper-filter="conference"]').click();
assert.equal(page.query('[data-paper-filter="conference"]').textContent, "Conference papers (1)");
assert.ok(page.query("#publications").innerHTML.includes('href="#paper-flyer-positioning"'));
assert.ok(!page.query("#publications").innerHTML.includes('href="#paper-copper-spall-statistics"'));
page.query('[data-paper-filter="all"]').click();
assert.equal(page.query('[data-paper-filter="all"]').textContent, "Journal articles (14)");
assert.ok(!page.query("#publications").innerHTML.includes('href="#paper-flyer-positioning"'));
for (const id of ["copper-spall-statistics", "helix-automation"]) assert.ok(page.query("#publications").innerHTML.includes(`href="#paper-${id}"`));
const publishedAutomation = page.window.SITE_CONTENT.publications.find(paper => paper.url === "https://doi.org/10.1007/s40192-026-00482-1");
assert.equal(publishedAutomation?.year, "2026");
assert.equal(publishedAutomation?.title, postdoc.find(paper => paper.id === "helix-automation").publicationTitle);
assert.ok(!JSON.stringify(publishedAutomation).includes("Accepted"));

const withoutMethods = render({mutate: window => {
  delete window.SITE_CONTENT.researchStudies.find(study => study.status === "past" && study.papers?.length).papers[0].methods;
}});
assert.ok(!paperById(withoutMethods, explained[0].id).includes('class="study-details paper-methods"'));
assert.ok(paperById(withoutMethods, explained[1].id).includes('class="study-details paper-methods"'));
const scholarPunctuation = render({mutate: window => {
  const paper = window.SITE_CONTENT.researchStudies.find(study => study.status === "past" && study.papers?.length).papers[0];
  window.SCHOLAR_DATA.publications[0].title = paper.publicationTitle.toUpperCase().replaceAll("-", " ") + ".";
}});
const scholarFirst = scholarPunctuation.query("#publications").innerHTML.match(/<article class="publication">[\s\S]*?<\/article>/)[0];
assert.ok(scholarFirst.includes(`href="#paper-${explained[0].id}"`));

const hostilePaper = render({mutate: window => {
  const paper = window.SITE_CONTENT.researchStudies.find(study => study.status === "past" && study.papers?.length).papers[0];
  paper.title = '<img src=x onerror="title()">';
  paper.summary = '<script>summary()</script>';
  paper.results = ['<svg onload="result()">'];
  paper.importance = '</aside><img src=x onerror="importance()">';
  paper.publicationType = '<img src=x onerror="type()">';
  paper.note = '<script>note()</script>';
  paper.url = "javascript:paper()";
  paper.links = [{label: "Unsafe link", url: "javascript:extra()"}];
  paper.image = "javascript:image()";
}});
const hostileArticle = paperById(hostilePaper, explained[0].id);
for (const expected of [
  '&lt;img src=x onerror=&quot;title()&quot;&gt;',
  '&lt;script&gt;summary()&lt;/script&gt;',
  '&lt;svg onload=&quot;result()&quot;&gt;',
  '&lt;/aside&gt;&lt;img src=x onerror=&quot;importance()&quot;&gt;',
  '&lt;img src=x onerror=&quot;type()&quot;&gt;',
  '&lt;script&gt;note()&lt;/script&gt;'
]) assert.ok(hostileArticle.includes(expected));
assert.ok(!hostileArticle.includes("javascript:") && !hostileArticle.includes("Unsafe link"));
assert.ok(!hostileArticle.includes("<img") && !hostileArticle.includes("<script") && !hostileArticle.includes("<figure"));

const withMedia = render({mutate: window => {
  const papers = window.SITE_CONTENT.researchStudies.filter(study => study.status === "past").flatMap(study => study.papers || []);
  Object.assign(papers[0], {video: "./assets/research/example.mp4", caption: "Pressure & deformation", mediaLabel: "Underwater experiment"});
  Object.assign(papers[1], {image: "./assets/research/example.jpg", imageAlt: "Crack & strain field", caption: "Measured strain field"});
  Object.assign(papers[2], {video: "./assets/research/example.mp4"});
}});
const videoPaper = paperById(withMedia, explained[0].id);
assert.match(videoPaper, /<video controls playsinline preload="none"/);
assert.ok(!videoPaper.includes("autoplay"));
assert.ok(videoPaper.includes(`aria-describedby="paper-${explained[0].id}-caption"`));
assert.ok(videoPaper.includes(`<figcaption id="paper-${explained[0].id}-caption">Pressure &amp; deformation</figcaption>`));
assert.ok(videoPaper.includes('aria-label="Underwater experiment"'));
const imagePaper = paperById(withMedia, explained[1].id);
assert.ok(imagePaper.includes('alt="Crack &amp; strain field"'));
assert.ok(imagePaper.includes(`<figcaption id="paper-${explained[1].id}-caption">Measured strain field</figcaption>`));
const uncaptionedPaper = paperById(withMedia, explained[2].id);
assert.ok(uncaptionedPaper.includes("<video"));
assert.ok(!uncaptionedPaper.includes("aria-describedby") && !uncaptionedPaper.includes("<figcaption"));
console.log("Scholar, news, and research UI checks passed: publication filters and explanation links, Ph.D. and postdoctoral findings, journal/conference/preprint distinctions, retained media, hostile content escaping, news timing, source identity, and cached update dates.");
