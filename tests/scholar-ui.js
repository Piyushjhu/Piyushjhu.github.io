// Exercise app rendering and publication filters without network or a browser.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"})[character]);

function element(tag, attrs) {
  const classes = new Set((attrs.class || "").split(/\s+/));
  return {
    tag, attrs, innerHTML: "", textContent: "", value: attrs.value || "", hidden: "hidden" in attrs,
    dataset: Object.fromEntries(Object.entries(attrs).filter(([key]) => key.startsWith("data-")).map(([key, value]) => [key.slice(5).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()), value])),
    listeners: {},
    classList: { add: name => classes.add(name), remove: name => classes.delete(name), toggle: (name, active) => active ? classes.add(name) : classes.delete(name), contains: name => classes.has(name) },
    getAttribute(name) { return this.attrs[name] ?? null; },
    setAttribute(name, value) { this.attrs[name] = String(value); },
    removeAttribute(name) { delete this.attrs[name]; },
    addEventListener(name, callback) { (this.listeners[name] ||= []).push(callback); },
    dispatch(name, event = {}) { for (const listener of this.listeners[name] || []) listener({target: this, ...event}); },
    click(target = this) { this.dispatch("click", {target}); },
    querySelectorAll() { return []; },
    closest() { return null; },
    focus() { this.focused = true; },
    showModal() { this.open = true; },
    close() { this.open = false; this.dispatch("close"); },
    getBoundingClientRect() { return {left: 10, right: 900, top: 10, bottom: 700}; },
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
const countPublications = target => (target.query("#publication-results").innerHTML.match(/class="publication"/g) || []).length;
const setPublicationControl = (target, selector, value) => {
  const control = target.query(selector);
  control.value = value;
  control.dispatch(selector === "#publication-search" ? "input" : "change");
};
assert.ok(page.query("#metrics").innerHTML.includes(`>${snapshot.metrics.citations.toLocaleString("en-US")}<`));
assert.ok(page.query("#metrics").innerHTML.includes("Publications · Google Scholar"));
assert.ok(page.query("#scholar-metrics").innerHTML.includes(`h-index ${snapshot.metrics.hIndex}`));
assert.equal(page.query('[data-paper-filter="selected"]').getAttribute("aria-pressed"), "true");
assert.equal(countPublications(page), page.window.SITE_CONTENT.publications.filter(paper => paper.featured).length);
assert.ok(page.query("#publication-source-note").textContent.includes("Curated bibliography"));
assert.ok(page.query("#publication-count").textContent.includes(`${countPublications(page)} of ${countPublications(page)} papers shown`));
for (const [filter, expected] of [["all", page.window.SITE_CONTENT.publications.length], ["conference", page.window.SITE_CONTENT.conferencePublications.length], ["progress", page.window.SITE_CONTENT.manuscripts.length], ["selected", page.window.SITE_CONTENT.publications.filter(paper => paper.featured).length], ["scholar", snapshot.publications.length]]) {
  page.query(`[data-paper-filter="${filter}"]`).click();
  assert.equal(countPublications(page), expected);
  assert.equal(page.query(`[data-paper-filter="${filter}"]`).getAttribute("aria-pressed"), "true");
}
assert.ok(page.query("#publication-results").innerHTML.includes("View on Scholar"));

// Visitors can narrow any source list by keyword, year, and research topic.
const finder = render();
const bibliography = finder.window.SITE_CONTENT.publications;
finder.query('[data-paper-filter="all"]').click();
for (const [query, field] of [["rubber-modified", "title"], ["A. Bhattacharjee", "authors"], ["Mechanics of Materials", "venue"]]) {
  setPublicationControl(finder, "#publication-search", `  ${query.toUpperCase()}  `);
  const expected = bibliography.filter(paper => String(paper[field]).toLowerCase().includes(query.toLowerCase()));
  assert.ok(expected.length > 0 && expected.length < bibliography.length, `Search fixture must narrow the ${field} results`);
  assert.equal(countPublications(finder), expected.length, `Search must match ${field}, ignoring case and outer whitespace`);
  for (const paper of expected) assert.ok(finder.query("#publication-results").innerHTML.includes(escapeHtml(paper.title)));
}
finder.query("#publication-reset").click();
setPublicationControl(finder, "#publication-search", "copper");
assert.equal(countPublications(finder), 1, "Common research terms also match plain-language paper explanations");
assert.ok(finder.query("#publication-results").innerHTML.includes('href="#paper-copper-spall-statistics"'));
finder.query("#publication-reset").click();
setPublicationControl(finder, "#publication-year", "2024");
assert.equal(countPublications(finder), bibliography.filter(paper => paper.year === "2024").length);
assert.ok(finder.query("#publication-year").innerHTML.includes('<option value="2026">2026</option>'));
assert.ok(finder.query("#publication-year").innerHTML.includes('<option value="2023">2023</option>'));
const topic = finder.window.SITE_CONTENT.researchStudies.find(study => study.id === "blast-composites");
setPublicationControl(finder, "#publication-topic", topic.id);
const topicPublications = bibliography.filter(paper => paper.year === "2024" && topic.papers.some(studyPaper => studyPaper.url === paper.url));
assert.ok(topicPublications.length > 0);
assert.equal(countPublications(finder), topicPublications.length, "Year and topic restrictions combine");
for (const paper of topicPublications) assert.ok(finder.query("#publication-results").innerHTML.includes(escapeHtml(paper.title)));
setPublicationControl(finder, "#publication-search", "no matching research paper 987654");
assert.equal(countPublications(finder), 0);
assert.ok(finder.query("#publication-results").innerHTML.includes("No papers match these filters"));
assert.equal(finder.query("#publication-count").textContent, `0 of ${bibliography.length} papers shown`);
finder.query('[data-paper-filter="scholar"]').click();
assert.equal(countPublications(finder), 0, "Changing source preserves the active refinements");
finder.query("#publication-reset").click();
for (const selector of ["#publication-search", "#publication-year", "#publication-topic"]) assert.equal(finder.query(selector).value, "");
assert.equal(finder.query('[data-paper-filter="scholar"]').getAttribute("aria-pressed"), "true", "Clearing refinements retains the source list");
assert.equal(countPublications(finder), finder.window.SCHOLAR_DATA.publications.length);
assert.equal(finder.query("#publication-search").focused, true);
setPublicationControl(finder, "#publication-topic", "other");
assert.ok(countPublications(finder) > 0 && countPublications(finder) < finder.window.SCHOLAR_DATA.publications.length, "Other work remains discoverable outside the detailed research topics");
finder.query("#publication-reset").click();
setPublicationControl(finder, "#publication-search", '<img src=x onerror="search()">');
assert.equal(countPublications(finder), 0);
assert.ok(!finder.query("#publication-results").innerHTML.includes("<img"), "Search text cannot become markup");

// Publication dates remain separate from manuscript status labels.
const yearFinder = render();
yearFinder.query('[data-paper-filter="progress"]').click();
const manuscriptYears = yearFinder.query("#publication-year").innerHTML;
assert.ok(!manuscriptYears.includes("Under review") && !manuscriptYears.includes("In preparation") && !manuscriptYears.includes("2026 · Preprint"), "Year choices must contain dates rather than publication statuses");
setPublicationControl(yearFinder, "#publication-year", "2026");
assert.equal(countPublications(yearFinder), 1, "The dated preprint appears under its publication year");
assert.ok(yearFinder.query("#publication-results").innerHTML.includes('href="#paper-aimdl-laboratory"'));
assert.ok(yearFinder.query("#publication-results").innerHTML.includes("2026 · Preprint"), "A preprint keeps its visible status label");
const undatedYear = manuscriptYears.match(/<option value="([^"]*)">Year not listed<\/option>/)?.[1];
assert.ok(undatedYear, "An explicit option finds manuscripts without a listed year");
setPublicationControl(yearFinder, "#publication-year", undatedYear);
assert.equal(countPublications(yearFinder), 4, "The undated choice includes all four manuscripts without dates");
assert.ok(yearFinder.query("#publication-results").innerHTML.includes("Under review") && yearFinder.query("#publication-results").innerHTML.includes("In preparation"));
assert.ok(!yearFinder.query("#publication-results").innerHTML.includes('href="#paper-aimdl-laboratory"'));
yearFinder.query("#publication-reset").click();
assert.equal(countPublications(yearFinder), yearFinder.window.SITE_CONTENT.manuscripts.length);

const hostileFinder = render({mutate: window => {
  Object.assign(window.SITE_CONTENT.publications.find(paper => paper.featured), {
    title: '<img src=x onerror="bibliography()">',
    authors: '<svg onload="author()">',
    venue: '<script>venueinjection()</script>',
    year: 'not a year"><script>year()</script>'
  });
}});
setPublicationControl(hostileFinder, "#publication-search", "venueinjection");
assert.equal(countPublications(hostileFinder), 1);
for (const expected of ['&lt;img src=x onerror=&quot;bibliography()&quot;&gt;', '&lt;svg onload=&quot;author()&quot;&gt;', '&lt;script&gt;venueinjection()&lt;/script&gt;']) assert.ok(hostileFinder.query("#publication-results").innerHTML.includes(expected));
assert.ok(hostileFinder.query("#publication-results").innerHTML.includes('not a year&quot;&gt;&lt;script&gt;year()&lt;/script&gt;'));
assert.ok(!hostileFinder.query("#publication-year").innerHTML.includes("year()"), "An invalid year cannot become a filter option");
assert.ok(!hostileFinder.query("#publication-results").innerHTML.includes("<script") && !hostileFinder.query("#publication-year").innerHTML.includes("<script"));

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
hostile.query('[data-paper-filter="scholar"]').click();
assert.ok(hostile.query("#publication-results").innerHTML.includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
assert.ok(!hostile.query("#publication-results").innerHTML.includes("javascript:"));
assert.ok(hostile.query("#publication-source-note").textContent.includes("Sep 1, 2026"));
assert.ok(news(hostile).includes("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;"));
assert.ok(!news(hostile).includes("javascript:"));
assert.ok(hostile.query("#news-source-note").textContent.includes("Sep 1, 2026"));
const foreign = render({mutate: window => { window.SCHOLAR_DATA.profileId = "another-profile"; }});
assert.equal(foreign.query('[data-paper-filter="scholar"]').hidden, true);

// An overview and concise study cards lead into complete, initially collapsed stories.
assert.ok(html.indexOf('id="research"') < html.indexOf('id="work"'), "Research precedes tools and facilities");
assert.ok(html.indexOf('id="research-overview-title"') < html.indexOf('id="research-tabs"'));
assert.ok(page.query('[data-nav="research"]'));
assert.equal(page.query('[data-nav="research"]').getAttribute("href"), "#research");
assert.equal(page.query('[data-nav="publications"]').getAttribute("href"), "#publications");
assert.ok(html.includes('id="work-title">Tools &amp; facilities</h2>'));
const overview = page.window.SITE_CONTENT.researchOverview;
assert.ok(overview.directions.length >= 3);
assert.equal(page.query("#research-overview-title").textContent, overview.heading);
assert.equal(page.query("#research-overview-intro").textContent, overview.introduction);
for (const direction of overview.directions) {
  const reading = page.query("#research-directions").innerHTML;
  assert.ok(reading.includes(escapeHtml(direction.title)));
  assert.ok(reading.includes(escapeHtml(direction.finding)));
  assert.ok(reading.includes(`href="${direction.href}"`));
}
const paperArticles = (page, panel) => [...(panel ? page.query(panel).innerHTML : page.query("#active-research").innerHTML + page.query("#past-research").innerHTML).matchAll(/<article class="research-paper"[^>]*>[\s\S]*?<\/article>/g)].map(match => match[0]);
const paperById = (page, id) => paperArticles(page).find(article => article.includes(`id="paper-${id}"`)) || "";
const compactPaper = article => article.split('<details class="paper-story"')[0];
const explained = page.window.SITE_CONTENT.researchStudies.filter(study => study.status === "past").flatMap(study => study.papers || []);
assert.equal(paperArticles(page, "#past-research").length, explained.length);
for (const id of ["sandwich-undex-interaction", "curved-sandwich-air-shock", "foam-shear-loading-rate", "gyroid-core-shock", "smooth-mode-decomposition", "rate-stiffening-soft-polymer"]) {
  assert.ok(explained.some(paper => paper.id === id), `Missing coauthored PhD explanation: ${id}`);
}
for (const id of ["blast-composites", "porous-materials", "models-and-measurements", "reviews-and-design"]) {
  assert.ok(page.query("#past-research").innerHTML.includes(`id="research-${id}"`), `Missing PhD research theme: ${id}`);
}
for (const paper of explained) {
  const article = paperById(page, paper.id);
  const preview = compactPaper(article);
  assert.ok(paper.teaser && paper.takeaway, `Missing introductory copy for ${paper.id}`);
  assert.ok(preview.includes(`<p class="paper-teaser">${escapeHtml(paper.teaser)}</p>`));
  assert.ok(preview.includes(escapeHtml(paper.takeaway)));
  assert.ok(!preview.includes('class="paper-description"') && !preview.includes('class="paper-figures"'));
  assert.ok(article.includes(`<details class="paper-story" id="paper-${paper.id}-details">`), "Full story starts closed");
  assert.ok(article.includes('class="paper-description"'));
  assert.ok(article.includes(`<h5>${escapeHtml(paper.resultsHeading || "Key results")}</h5><ul><li>`));
  assert.match(article, /<div class="paper-results"><h5>.+<\/h5><ul><li>.+<\/li><\/ul>/);
  assert.match(article, /<h5>Why it matters<\/h5><p>.+<\/p>/);
  assert.ok(article.includes(`aria-labelledby="paper-${paper.id}-title"`));
  assert.ok(article.includes(`href="${paper.url}"`));
  assert.ok(article.includes('>Back to topic ') && article.includes('href="#research">Research overview '));
}
page.query('[data-research-tab="past"]').click();
assert.equal(page.query("#research-panel-past").hidden, false);
assert.equal(page.query("#research-panel-active").hidden, true);
assert.equal(page.query('[data-nav="research"]').getAttribute("aria-current"), "location");
let preventedTabArrow = false;
page.query('[data-research-tab="past"]').dispatch("keydown", {key: "ArrowRight", preventDefault() { preventedTabArrow = true; }});
assert.equal(preventedTabArrow, true);
assert.equal(page.query("#research-panel-publications").hidden, false);
assert.equal(page.query("#research-topic-label").hidden, true);
assert.equal(page.query('[data-nav="publications"]').getAttribute("aria-current"), "location");
assert.equal(page.query('[data-research-tab="publications"]').focused, true);
page.query('[data-research-tab="publications"]').dispatch("keydown", {key: "Home", preventDefault() {}});
assert.equal(page.query("#research-panel-active").hidden, false);
assert.equal(page.query("#research-topic-label").hidden, false);
assert.equal(page.query('[data-research-tab="active"]').getAttribute("aria-selected"), "true");
assert.equal(page.query('[data-nav="publications"]').getAttribute("aria-current"), null);
page.query('[data-paper-filter="all"]').click();
for (const paper of explained) assert.ok(page.query("#publication-results").innerHTML.includes(`href="#paper-${paper.id}"`));
page.query('[data-paper-filter="progress"]').click();
assert.ok(page.query("#publication-results").innerHTML.includes('href="#paper-aimdl-laboratory"'));

// Published postdoctoral work and the preprint keep their distinct source types.
const postdoc = page.window.SITE_CONTENT.researchStudies.filter(study => study.status === "active").flatMap(study => study.papers || []);
assert.equal(postdoc.length, 4);
assert.equal(paperArticles(page, "#active-research").length, postdoc.length);
for (const [id, type] of [["copper-spall-statistics", "Journal article"], ["helix-automation", "Journal article"], ["flyer-positioning", "Conference paper"], ["aimdl-laboratory", "Preprint"]]) {
  const paper = postdoc.find(paper => paper.id === id);
  assert.equal(paper?.publicationType, type);
  const article = paperById(page, id);
  const preview = compactPaper(article);
  assert.ok(preview.includes(`>${type}</p>`));
  assert.ok(preview.includes(escapeHtml(paper.teaser)) && preview.includes(escapeHtml(paper.takeaway)));
  assert.ok(article.includes(`<details class="paper-story" id="paper-${paper.id}-details">`));
  assert.ok(article.includes("Key results") && article.includes("Why it matters"));
  assert.ok(article.includes(`href="${paper.url}"`));
}
const activeReading = page.query("#active-research").innerHTML;
assert.ok(activeReading.includes('src="./assets/research/cuti-plate-impact-spall.mp4"'));
assert.ok(activeReading.includes('src="./assets/research/helix-facility.jpg"'));
assert.ok(activeReading.includes('aria-describedby="research-spall-strength-caption"'));
assert.ok(paperById(page, "aimdl-laboratory").includes(">Read preprint "));
page.query('[data-paper-filter="conference"]').click();
assert.equal(page.query('[data-paper-filter="conference"]').textContent, `Conference papers (${page.window.SITE_CONTENT.conferencePublications.length})`);
assert.ok(page.query("#publication-results").innerHTML.includes('href="#paper-flyer-positioning"'));
assert.ok(!page.query("#publication-results").innerHTML.includes('href="#paper-copper-spall-statistics"'));
page.query('[data-paper-filter="all"]').click();
assert.equal(page.query('[data-paper-filter="all"]').textContent, `Journal articles (${page.window.SITE_CONTENT.publications.length})`);
assert.ok(!page.query("#publication-results").innerHTML.includes('href="#paper-flyer-positioning"'));
for (const id of ["copper-spall-statistics", "helix-automation"]) assert.ok(page.query("#publication-results").innerHTML.includes(`href="#paper-${id}"`));
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
scholarPunctuation.query('[data-paper-filter="scholar"]').click();
const scholarFirst = scholarPunctuation.query("#publication-results").innerHTML.match(/<article class="publication">[\s\S]*?<\/article>/)[0];
assert.ok(scholarFirst.includes(`href="#paper-${explained[0].id}"`));

const hostilePaper = render({mutate: window => {
  const paper = window.SITE_CONTENT.researchStudies.find(study => study.status === "past" && study.papers?.length).papers[0];
  paper.title = '<img src=x onerror="title()">';
  paper.teaser = '<script>teaser()</script>';
  paper.takeaway = '<svg onload="takeaway()">';
  paper.contribution = '<script>contribution()</script>';
  paper.summary = '<script>summary()</script>';
  paper.results = ['<svg onload="result()">'];
  paper.resultsHeading = '<svg onload="heading()">';
  paper.importance = '</aside><img src=x onerror="importance()">';
  paper.publicationType = '<img src=x onerror="type()">';
  paper.note = '<script>note()</script>';
  paper.url = "javascript:paper()";
  paper.links = [{label: "Unsafe link", url: "javascript:extra()"}];
  paper.image = "javascript:image()";
  paper.figures = [];
}});
const hostileArticle = paperById(hostilePaper, explained[0].id);
for (const expected of [
  '&lt;img src=x onerror=&quot;title()&quot;&gt;',
  '&lt;script&gt;teaser()&lt;/script&gt;',
  '&lt;svg onload=&quot;takeaway()&quot;&gt;',
  '&lt;script&gt;contribution()&lt;/script&gt;',
  '&lt;script&gt;summary()&lt;/script&gt;',
  '&lt;svg onload=&quot;result()&quot;&gt;',
  '&lt;svg onload=&quot;heading()&quot;&gt;',
  '&lt;/aside&gt;&lt;img src=x onerror=&quot;importance()&quot;&gt;',
  '&lt;img src=x onerror=&quot;type()&quot;&gt;',
  '&lt;script&gt;note()&lt;/script&gt;'
]) assert.ok(hostileArticle.includes(expected));
assert.ok(!hostileArticle.includes("javascript:") && !hostileArticle.includes("Unsafe link"));
assert.ok(!hostileArticle.includes("<img") && !hostileArticle.includes("<script") && !hostileArticle.includes("<figure"));

const withMedia = render({mutate: window => {
  const papers = window.SITE_CONTENT.researchStudies.filter(study => study.status === "past").flatMap(study => study.papers || []);
  for (const paper of papers.slice(0, 3)) paper.figures = [];
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

// Original paper figures retain readable context and a direct source in cards and the dialog.
const figureCards = article => [...article.matchAll(/<figure class="paper-figure">[\s\S]*?<\/figure>/g)].map(match => match[0]);
const allExplained = [...postdoc, ...explained];
const illustrated = allExplained.filter(paper => paper.figures?.length);
assert.ok(illustrated.length > 0, "Research explanations must include original paper figures");
for (const id of ["underwater-energy", "rubber-composites", "foam-stress-waves", "foam-hydrostatic", "curved-sandwich-air-shock", "foam-shear-loading-rate", "smooth-mode-decomposition", "rate-stiffening-soft-polymer", "copper-spall-statistics", "helix-automation", "flyer-positioning", "aimdl-laboratory"]) {
  assert.ok(allExplained.find(paper => paper.id === id)?.figures?.length, `Missing paper figures for ${id}`);
}
for (const paper of allExplained) {
  const article = paperById(page, paper.id);
  for (const reading of [paper.summary, paper.importance, paper.publicationTitle, paper.authors, ...(paper.results || [])]) assert.ok(article.includes(escapeHtml(reading)), `Study content retained for ${paper.id}`);
  if (paper.methods) assert.ok(article.includes(escapeHtml(paper.methods)), `Methods retained for ${paper.id}`);
  const cards = figureCards(article);
  assert.equal(cards.length, (paper.figures || []).length, `Figure count for ${paper.id}`);
  if (cards.length) assert.ok(article.includes('class="paper-figures" role="group" aria-label="Figures from this paper"'));
  for (const [index, figure] of (paper.figures || []).entries()) {
    assert.ok(figure.alt && figure.label && figure.caption && figure.credit, `Incomplete figure context for ${paper.id}-${index}`);
    const card = cards[index];
    assert.ok(card.includes(`data-paper-figure="${paper.id}-${index}"`));
    assert.ok(card.includes('aria-haspopup="dialog"'));
    assert.ok(card.includes(`src="${escapeHtml(figure.preview || figure.image)}"`));
    assert.ok(card.includes(`alt="${escapeHtml(figure.alt)}"`));
    assert.ok(card.includes(`width="${figure.previewWidth || figure.width}" height="${figure.previewHeight || figure.height}" loading="lazy" decoding="async"`));
    assert.ok(card.includes(`<strong>${escapeHtml(figure.label)}</strong><p>${escapeHtml(figure.caption)}</p>`));
    assert.ok(card.includes(`class="figure-source" href="${escapeHtml(figure.sourceUrl || paper.url)}"`));
    assert.ok(card.includes(escapeHtml(figure.credit)));
    if (figure.licenseUrl) {
      assert.ok(card.includes(`class="figure-source figure-license" href="${escapeHtml(figure.licenseUrl)}"`));
      assert.ok(card.includes(`>${escapeHtml(figure.licenseLabel || "License")}</a>`));
    }
    assert.ok(card.includes('target="_blank" rel="noopener noreferrer"'));
    if (figure.image.startsWith("./")) assert.ok(fs.existsSync(path.resolve(root, figure.image)), `Missing figure image: ${figure.image}`);
    if (figure.preview?.startsWith("./")) assert.ok(fs.existsSync(path.resolve(root, figure.preview)), `Missing figure preview: ${figure.preview}`);
  }
}

// Exercise delegated clicks with a nested target, as clicking an image inside its button does.
function openFigure(targetPage, key) {
  const button = element("button", {"data-paper-figure": key});
  const image = {closest: selector => selector === "[data-paper-figure]" ? button : null};
  targetPage.document.activeElement = button;
  targetPage.query("#research").click(image);
  return button;
}
const illustratedPaper = illustrated[0];
const firstFigure = illustratedPaper.figures[0];
const figureTrigger = openFigure(page, `${illustratedPaper.id}-0`);
const dialog = page.query("#detail-dialog");
const enlarged = page.query("#dialog-content").innerHTML;
assert.equal(dialog.open, true);
assert.ok(dialog.classList.contains("research-figure-dialog"));
assert.ok(!dialog.classList.contains("gallery-dialog"));
assert.ok(page.document.body.classList.contains("modal-open"));
assert.ok(enlarged.includes(`src="${escapeHtml(firstFigure.image)}"`));
assert.ok(enlarged.includes(`alt="${escapeHtml(firstFigure.alt)}"`));
assert.ok(enlarged.includes(`<h2 id="dialog-title">${escapeHtml(firstFigure.label)}</h2>`));
assert.ok(enlarged.includes(`<p>${escapeHtml(firstFigure.caption)}</p>`));
assert.ok(enlarged.includes(`href="${escapeHtml(firstFigure.sourceUrl || illustratedPaper.url)}"`));
assert.ok(enlarged.includes(`href="${escapeHtml(firstFigure.image)}" target="_blank" rel="noopener noreferrer">Open full-resolution image`));
page.query(".dialog-close").click();
assert.equal(dialog.open, false);
assert.ok(!page.document.body.classList.contains("modal-open"));
assert.equal(figureTrigger.focused, true, "Closing a figure returns focus to its trigger");
openFigure(page, "not-a-registered-paper-figure");
assert.equal(dialog.open, false, "Unregistered figure keys must not open a dialog");
openFigure(page, `${illustratedPaper.id}-0`);
dialog.dispatch("click", {clientX: 0, clientY: 0});
assert.equal(dialog.open, false, "Clicking the dialog backdrop closes the figure");

const hostileFigures = render({mutate: window => {
  const paper = window.SITE_CONTENT.researchStudies.find(study => study.status === "past" && study.papers?.length).papers[0];
  paper.url = "https://example.org/source-paper";
  paper.figures = [
    {image: "javascript:figure()", label: "Rejected JavaScript image"},
    {image: "data:image/svg+xml,<svg onload=alert(1)>", label: "Rejected data image"},
    {image: "./assets/research/safe.png", preview: "javascript:preview()", label: "Unsafe source omitted", caption: "Safe image", alt: "Safe alternative", credit: "Unsafe source", sourceUrl: "javascript:source()", licenseUrl: "javascript:license()"},
    {image: 'https://example.org/image.png?label="x"&n=1', alt: '<img onerror="alt()">', label: '<svg onload="label()">', caption: '<script>caption()</script>', credit: '<img onerror="credit()">', width: '1" onload="dimension()', height: 200, sourceUrl: "https://example.org/source?x=1&y=2", licenseUrl: "https://example.org/license?x=1&y=2", licenseLabel: '<script>license()</script>'},
    {image: "./assets/research/fallback.png", alt: "Source fallback", label: "Paper source", caption: "No separate source URL", credit: "Fallback credit", width: 300, height: 200}
  ];
}});
const hostileFigureArticle = paperById(hostileFigures, explained[0].id);
const safeFigureCards = figureCards(hostileFigureArticle);
assert.equal(safeFigureCards.length, 3);
assert.ok(!hostileFigureArticle.includes("javascript:") && !hostileFigureArticle.includes("data:image"));
assert.ok(!hostileFigureArticle.includes("Rejected JavaScript image") && !hostileFigureArticle.includes("Rejected data image"));
assert.ok(!safeFigureCards[0].includes('class="figure-source"'));
assert.ok(!safeFigureCards[0].includes("figure-license"));
assert.ok(safeFigureCards[0].includes('src="./assets/research/safe.png"'), "Unsafe previews fall back to the original safe image");
assert.ok(safeFigureCards[1].includes('src="https://example.org/image.png?label=&quot;x&quot;&amp;n=1"'));
assert.ok(safeFigureCards[1].includes('alt="&lt;img onerror=&quot;alt()&quot;&gt;"'));
assert.ok(safeFigureCards[1].includes('&lt;svg onload=&quot;label()&quot;&gt;'));
assert.ok(safeFigureCards[1].includes('&lt;script&gt;caption()&lt;/script&gt;'));
assert.ok(safeFigureCards[1].includes('&lt;img onerror=&quot;credit()&quot;&gt;'));
assert.ok(safeFigureCards[1].includes('width="1600" height="200"'));
assert.ok(safeFigureCards[1].includes('href="https://example.org/source?x=1&amp;y=2"'));
assert.ok(safeFigureCards[1].includes('href="https://example.org/license?x=1&amp;y=2"'));
assert.ok(safeFigureCards[1].includes('&lt;script&gt;license()&lt;/script&gt;'));
assert.ok(safeFigureCards[2].includes('class="figure-source" href="https://example.org/source-paper"'));
openFigure(hostileFigures, `${explained[0].id}-1`);
const hostileEnlarged = hostileFigures.query("#dialog-content").innerHTML;
assert.equal(hostileFigures.query("#detail-dialog").open, true);
for (const expected of ['&lt;svg onload=&quot;label()&quot;&gt;', '&lt;script&gt;caption()&lt;/script&gt;', '&lt;img onerror=&quot;credit()&quot;&gt;', 'alt="&lt;img onerror=&quot;alt()&quot;&gt;"', 'href="https://example.org/license?x=1&amp;y=2"', '&lt;script&gt;license()&lt;/script&gt;']) assert.ok(hostileEnlarged.includes(expected));
assert.ok(!hostileEnlarged.includes("javascript:") && !hostileEnlarged.includes("<script") && !hostileEnlarged.includes("<img onerror"));
console.log("Scholar, news, and research UI checks passed: curated defaults, keyword/year/topic filtering and reset, research overview and keyboard tabs, compact studies with complete stories, explanation links, source types, figure previews and original enlargement, retained media, URL safety and escaping, news timing, source identity, and cached update dates.");
