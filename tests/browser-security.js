"use strict";
const frame = document.getElementById("site");
const output = document.getElementById("results");
const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const run = async () => {
  const checks = [];
  const check = (name, passed) => checks.push({ name, passed: Boolean(passed) });
  const w = frame.contentWindow;
  const d = frame.contentDocument;
  const q = selector => d.querySelector(selector);
  const all = selector => [...d.querySelectorAll(selector)];
  const violations = [];
  d.addEventListener("securitypolicyviolation", event => violations.push(event.effectiveDirective));
  try {
    check("seven project cards render", all(".project-card").length === 7);
    check("four gallery cards render", all(".gallery-card").length === 4);
    check("six initial news items render", all(".news-entry").length === 6);
    check("three teaching topics render", all(".teaching-course").length === 3);
    check("identity structured data remains valid", JSON.parse(q('script[type="application/ld+json"]').textContent)["@graph"].length === 3);
    check("gallery aspect ratio survives strict CSS policy", w.getComputedStyle(q("[data-gallery]")).aspectRatio.replace(/\s/g, "") === "1680/1036");
    check("chart styles survive strict CSS policy", parseFloat(w.getComputedStyle(q(".chart-bars i")).height) > 0);
    check("impact-to-discovery sequence renders", all(".discovery-stage").length === 3 && q(".discovery-trace") && all(".discovery-map-new circle").length === 6);
    q('[data-filter="code"]').click();
    check("software filter", all(".project-card").length === 5);
    q('[data-filter="experiments"]').click();
    check("experiment filter", all(".project-card").length === 2);
    q('[data-filter="all"]').click();
    q('[data-project="1"]').click();
    check("Atlas detail dialog opens", q("#detail-dialog").open && q('#dialog-content a[href="https://piyushwanchoo.com/Dynamic-Ashby-Atlas/"]'));
    q(".dialog-close").click();
    q('[data-research-tab="past"]').click();
    check("past research tab", !q("#research-panel-past").hidden);
    q('[data-research-tab="publications"]').click();
    q('[data-paper-filter="all"]').click();
    check("all publications render", all(".publication").length === 14);
    q('[data-paper-filter="progress"]').click();
    check("in-progress publications render", all(".publication").length === 5);
    q('[data-research-tab="active"]').click();
    check("video uses native on-demand controls", q("video").controls && !q("video").autoplay && q("video").preload === "none");
    q('[data-gallery="0"]').click();
    check("HELIX gallery lightbox", q("#detail-dialog").open && q(".gallery-lightbox img").src.endsWith("helix-facility.jpg"));
    q(".dialog-close").click();
    q("#news-toggle").click();
    const paperUpdates = (w.SCHOLAR_DATA?.publications || []).filter(paper => Number(paper.year) >= w.SITE_CONTENT.newsPublicationStartYear).length;
    check("expanded news feed includes Scholar papers", all(".news-entry").length === w.SITE_CONTENT.news.length + paperUpdates);
    q("[data-contact]").click();
    check("university contact address only", q("#dialog-content").textContent.includes("pwanchoo@jhu.edu") && q("#dialog-content").querySelectorAll('a[href^="mailto:"]').length === 1);
    q(".dialog-close").click();
    check("external tabs use noopener", all('a[target="_blank"]').every(link => link.rel.includes("noopener")));
    frame.width = "390";
    await wait(80);
    q(".menu-toggle").click();
    check("mobile menu opens", q(".menu-toggle").getAttribute("aria-expanded") === "true");
    q(".menu-toggle").click();
    check("mobile menu closes", q(".menu-toggle").getAttribute("aria-expanded") === "false");
    await wait(80);
    check("normal interactions cause no CSP violations", violations.length === 0);

    // Controlled probes run only against the local build in an isolated browser.
    const injected = d.createElement("script");
    injected.textContent = "window.__securityInlineProbe = true";
    d.body.append(injected);
    const button = d.createElement("button");
    button.setAttribute("onclick", "window.__securityHandlerProbe = true");
    d.body.append(button);
    button.click();
    let evalBlocked = false;
    try { w.eval("window.__securityEvalProbe = true"); } catch (error) { evalBlocked = error.name === "EvalError"; }
    const remote = d.createElement("script");
    remote.src = "https://example.invalid/security-probe.js";
    d.head.append(remote);
    let connectionBlocked = false;
    try { await w.fetch("./security-connection-probe"); } catch { connectionBlocked = true; }
    await wait(150);
    check("inline script injection blocked", !w.__securityInlineProbe && violations.includes("script-src-elem"));
    check("inline event handler blocked", !w.__securityHandlerProbe && violations.includes("script-src-attr"));
    check("dynamic evaluation blocked", evalBlocked && !w.__securityEvalProbe);
    check("third-party script blocked", violations.filter(value => value === "script-src-elem").length >= 2);
    check("script network connections blocked", connectionBlocked && violations.includes("connect-src"));
  } catch (error) {
    checks.push({ name: "Unexpected browser error: " + error.message, passed: false });
  }
  const failed = checks.filter(check => !check.passed);
  output.dataset.result = failed.length ? "fail" : "pass";
  output.textContent = JSON.stringify({ passed: checks.length - failed.length, total: checks.length, failed, checks }, null, 2);
};
frame.addEventListener("load", run, { once: true });
if (frame.contentDocument?.readyState === "complete" && frame.contentDocument.querySelector("#projects .project-card")) run();
