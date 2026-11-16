(() => {
  "use strict";
  const content = window.SITE_CONTENT;
  if (!content) return;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#${name}" /></svg>`;
  const escape = (value = "") => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const safeUrl = (value, allowRelative = false) => {
    if (typeof value !== "string" || !value.trim()) return "";
    try {
      const parsed = new URL(value, window.location.href);
      if (!["https:", "http:"].includes(parsed.protocol)) return "";
      if (!allowRelative && !/^https?:\/\//i.test(value)) return "";
      return value;
    } catch { return ""; }
  };
  const externalLink = (url, text, className = "text-link") => `<a class="${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(text)} ${icon("arrow-up-right")}</a>`;
  const snapshot = window.SCHOLAR_DATA;
  const profileId = safeUrl(content.scholar) ? new URL(content.scholar).searchParams.get("user") : "";
  const scholar = snapshot?.schemaVersion === 1 && snapshot.profileId === profileId ? snapshot : null;
  const scholarUpdated = scholar ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/New_York" }).format(new Date(scholar.updatedAt)) : "";
  const scholarPapers = (scholar?.publications || []).map(paper => ({
    ...paper,
    source: "scholar",
    year: paper.year || "Year not listed",
    note: `${paper.citations.toLocaleString("en-US")} citation${paper.citations === 1 ? "" : "s"} · Google Scholar`
  }));

  $$('[data-name]').forEach(element => { element.textContent = content.name; });
  $(".wordmark").setAttribute("aria-label", `${content.name}, home`);
  $(".monogram").innerHTML = `${escape(content.initials.toLowerCase())}<span>·</span>`;
  $(".portrait-corner").textContent = `${content.initials}.`;
  document.title = content.title || `${content.name} — Research`;
  $('meta[name="description"]').content = content.description || `Research, software, and publications by ${content.name}.`;
  $('meta[property="og:title"]').content = document.title;
  $("[data-hero-description]").textContent = content.heroDescription;
  $("[data-research-description]").textContent = content.researchDescription;
  const researchVision = content.researchVision || {};
  $("#research-vision-title").textContent = researchVision.title || "";
  $("#research-vision-description").textContent = researchVision.description || "";
  $("#research-steps").innerHTML = (researchVision.steps || []).map((step, index) => `<li><span class="research-step-number">0${index + 1}</span><h4>${escape(step.title)}</h4><p>${escape(step.text)}</p></li>`).join("");
  const researchStudies = content.researchStudies || [];
  const overview = content.researchOverview || {};
  $("#research-overview-title").textContent = overview.heading || "Explore my research";
  $("#research-overview-intro").textContent = overview.introduction || "";
  $("#research-directions").innerHTML = (overview.directions || []).map(direction => `<article class="research-direction"><p class="eyebrow">${escape(direction.label)}</p><h4>${escape(direction.title)}</h4><p>${escape(direction.summary)}</p><p class="direction-finding"><strong>One finding</strong>${escape(direction.finding)}</p>${/^#[a-z0-9-]+$/.test(direction.href || "") ? `<a class="text-link light-link" href="${escape(direction.href)}">${escape(direction.linkLabel)} ${icon("arrow-down")}</a>` : ""}</article>`).join("");
  const researchFigures = new Map();
  const renderPaperFigures = paper => {
    const figures = (paper.figures || []).filter(figure => safeUrl(figure.image, true));
    return figures.length ? `<div class="paper-figures" role="group" aria-label="Figures from this paper">${figures.map((figure, index) => {
      const key = `${paper.id}-${index}`;
      researchFigures.set(key, { ...figure, paper });
      const sourceUrl = safeUrl(figure.sourceUrl || paper.url);
      return `<figure class="paper-figure"><button type="button" class="paper-figure-open" aria-haspopup="dialog" data-paper-figure="${escape(key)}" aria-label="Enlarge ${escape(figure.label)}: ${escape(paper.title)}"><img src="${escape(safeUrl(figure.preview, true) || figure.image)}" alt="${escape(figure.alt)}" width="${Number(figure.previewWidth || figure.width) || 1600}" height="${Number(figure.previewHeight || figure.height) || 1000}" loading="lazy" decoding="async" /><span class="figure-enlarge">Enlarge ${icon("arrow-up-right")}</span></button><figcaption><strong>${escape(figure.label)}</strong><p>${escape(figure.caption)}</p>${sourceUrl ? externalLink(sourceUrl, figure.credit || "Source paper", "figure-source") : ""}${safeUrl(figure.licenseUrl) ? ` <a class="figure-source figure-license" href="${escape(figure.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escape(figure.licenseLabel || "License")}</a>` : ""}</figcaption></figure>`;
    }).join("")}</div>` : "";
  };
  const researchMedia = (item, id) => {
    const videoUrl = safeUrl(item.video, true);
    const imageUrl = safeUrl(item.image, true);
    const posterUrl = safeUrl(item.poster, true);
    const captionId = `${id}-caption`;
    const describedBy = item.caption ? ` aria-describedby="${escape(captionId)}"` : "";
    const media = videoUrl ? `<video controls playsinline preload="none"${posterUrl ? ` poster="${escape(posterUrl)}"` : ""} width="1920" height="1080" aria-label="${escape(item.mediaLabel || item.title)}"${describedBy}><source src="${escape(videoUrl)}" type="video/mp4" /><p>Your browser does not support this video. <a href="${escape(videoUrl)}">Download the video</a>.</p></video>` : imageUrl ? `<img src="${escape(imageUrl)}" alt="${escape(item.imageAlt || item.title)}" width="${escape(item.imageWidth || 1680)}" height="${escape(item.imageHeight || 1036)}" loading="lazy" />` : "";
    return media ? `<figure class="study-media">${media}${item.caption ? `<figcaption id="${escape(captionId)}">${escape(item.caption)}${item.imageCredit ? `<span class="study-credit">${escape(item.imageCredit)}</span>` : ""}</figcaption>` : ""}</figure>` : "";
  };
  const renderResearchPaper = paper => {
    const id = `paper-${paper.id}`;
    const paperUrl = safeUrl(paper.url);
    const links = (paper.links || []).filter(link => safeUrl(link.url));
    return `<article class="research-paper" id="${escape(id)}" tabindex="-1" aria-labelledby="${escape(id)}-title"><header class="research-paper-header"><div>${paper.publicationType ? `<p class="paper-type${paper.publicationType === "Preprint" ? " paper-type-preprint" : ""}">${escape(paper.publicationType)}</p>` : ""}<p class="research-paper-meta">${escape(paper.year)} · ${escape(paper.venue)}</p><h4 id="${escape(id)}-title"><a href="#${escape(id)}">${escape(paper.title)}</a></h4></div></header><p class="paper-teaser">${escape(paper.teaser || paper.summary)}</p>${paper.takeaway ? `<p class="paper-takeaway"><strong>Key takeaway</strong> ${escape(paper.takeaway)}</p>` : ""}<details class="paper-story" id="${escape(id)}-details"><summary><span>Read study <span class="paper-story-hint">· results, figures &amp; methods</span></span>${icon("arrow-down")}</summary><div class="paper-story-body">${paper.highlight ? `<p class="paper-highlight"><strong>${escape(paper.highlight.value)}</strong><span>${escape(paper.highlight.label)}</span></p>` : ""}<p class="paper-description">${escape(paper.summary)}</p>${paper.contribution ? `<p class="paper-contribution"><strong>My contribution</strong> ${escape(paper.contribution)}</p>` : ""}${paper.note ? `<p class="paper-note">${escape(paper.note)}</p>` : ""}${researchMedia(paper, id)}<div class="paper-findings"><div class="paper-results"><h5>${escape(paper.resultsHeading || "Key results")}</h5><ul>${(paper.results || []).map(result => `<li>${escape(result)}</li>`).join("")}</ul></div><aside class="paper-importance"><h5>Why it matters</h5><p>${escape(paper.importance)}</p></aside></div>${renderPaperFigures(paper)}${paper.methods ? `<details class="study-details paper-methods"><summary>How we studied it ${icon("arrow-down")}</summary><p>${escape(paper.methods)}</p></details>` : ""}<footer class="paper-reference"><div><p class="paper-reference-title"><cite>${escape(paper.publicationTitle)}</cite></p><p class="paper-authors">${escape(paper.authors)}</p></div><div class="study-links">${paperUrl ? externalLink(paperUrl, paper.linkLabel || "Read paper") : ""}${links.map(link => externalLink(link.url, link.label)).join("")}</div></footer><div class="paper-return"><a href="#${escape(paper.topicAnchor)}">Back to topic ${icon("arrow-up-right")}</a><a href="#research">Research overview ${icon("arrow-up-right")}</a></div></div></details></article>`;
  };
  const renderResearchStudies = status => researchStudies.filter(study => study.status === status).map((study, index) => {
    const studyId = `research-${study.id}`;
    const media = researchMedia(study, studyId);
    if (study.papers?.length) return `<section class="research-theme" id="${escape(studyId)}" tabindex="-1" aria-labelledby="${escape(studyId)}-title"><div class="research-theme-overview${media ? " has-media" : ""}"><div class="research-theme-heading"><p class="study-label">0${index + 1} / ${escape(study.label)}</p><h3 id="${escape(studyId)}-title">${escape(study.title)}</h3><p class="study-summary">${escape(study.summary)}</p>${status === "active" ? `<div class="study-tags">${(study.tags || []).map(tag => `<span>${escape(tag)}</span>`).join("")}</div>${(study.details || []).length ? `<details class="study-details"><summary>Research context ${icon("arrow-down")}</summary>${study.details.map(detail => `<div><h4>${escape(detail.title)}</h4><p>${escape(detail.text)}</p></div>`).join("")}</details>` : ""}` : ""}</div>${media}</div><div class="research-papers">${study.papers.map(paper => renderResearchPaper({ ...paper, topicAnchor: studyId })).join("")}</div></section>`;
    const links = (study.links || []).filter(link => safeUrl(link.url)).map(link => externalLink(link.url, link.label)).join("");
    return `<article class="research-study${media ? " has-media" : ""}" id="${escape(studyId)}" tabindex="-1" aria-labelledby="${escape(studyId)}-title">${media || `<div class="study-marker" aria-hidden="true"><span>${status === "active" ? "EXPLORING" : "FOUNDATIONS"}</span><strong>0${index + 1}</strong></div>`}<div class="study-copy"><p class="study-label">${escape(study.label)}</p><h3 id="${escape(studyId)}-title">${escape(study.title)}</h3><p class="study-institution">${escape(study.institution)}</p><p class="study-summary">${escape(study.summary)}</p><div class="study-tags">${(study.tags || []).map(tag => `<span>${escape(tag)}</span>`).join("")}</div>${(study.details || []).length ? `<details class="study-details"><summary>Research details ${icon("arrow-down")}</summary>${study.details.map(detail => `<div><h4>${escape(detail.title)}</h4><p>${escape(detail.text)}</p></div>`).join("")}</details>` : ""}${links ? `<div class="study-links">${links}</div>` : ""}</div></article>`;
  }).join("");
  $("#active-research").innerHTML = renderResearchStudies("active");
  $("#past-research").innerHTML = renderResearchStudies("past");

  const researchTabs = $$("[data-research-tab]");
  let currentResearchTab = "active";
  const markCurrentNavigation = name => {
    $$("[data-nav]").forEach(link => {
      if (link.dataset.nav === name) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  const activateResearchTab = (name, moveFocus = false) => {
    const selected = researchTabs.find(tab => tab.dataset.researchTab === name);
    if (!selected) return;
    currentResearchTab = name;
    $("#research-topic-label").hidden = name === "publications";
    $("#research-topic").innerHTML = '<option value="">Choose a topic</option>' + researchStudies.filter(study => study.status === name).map(study => `<option value="research-${escape(study.id)}">${escape(study.title)}</option>`).join("");
    $("#research-topic").value = "";
    markCurrentNavigation(name === "publications" ? "publications" : "research");
    researchTabs.forEach(tab => {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      panel.hidden = !active;
      if (!active) $$("video", panel).forEach(video => video.pause());
    });
    if (moveFocus) selected.focus();
  };
  researchTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateResearchTab(tab.dataset.researchTab));
    tab.addEventListener("keydown", event => {
      const next = event.key === "ArrowRight" ? (index + 1) % researchTabs.length : event.key === "ArrowLeft" ? (index + researchTabs.length - 1) % researchTabs.length : event.key === "Home" ? 0 : event.key === "End" ? researchTabs.length - 1 : -1;
      if (next < 0) return;
      event.preventDefault();
      activateResearchTab(researchTabs[next].dataset.researchTab, true);
    });
  });
  const revealResearchAnchor = (hash = window.location.hash.slice(1), moveFocus = false) => {
    const anchor = document.getElementById(hash);
    const panel = anchor?.closest('[role="tabpanel"]');
    if (!panel || !panel.id.startsWith("research-panel-")) return;
    activateResearchTab(panel.id.slice("research-panel-".length));
    const paper = anchor.closest(".research-paper");
    const story = paper?.querySelector(".paper-story");
    if (story) story.open = true;
    const topic = anchor.closest(".research-theme, .research-study");
    if (topic) $("#research-topic").value = topic.id;
    const target = anchor;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({block: "start"});
      if (moveFocus) target.focus({preventScroll: true});
    });
  };
  document.addEventListener("click", event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    revealResearchAnchor(link.getAttribute("href").slice(1), true);
  });
  $("#research-topic").addEventListener("change", event => {
    const id = event.target.value;
    if (!id) return;
    window.location.hash = id;
    revealResearchAnchor(id, true);
  });
  $("#research").addEventListener("toggle", event => {
    if (event.target.classList.contains("paper-story") && !event.target.open) $$("video", event.target).forEach(video => video.pause());
  }, true);
  activateResearchTab("active");
  window.addEventListener("hashchange", () => revealResearchAnchor(window.location.hash.slice(1), true));
  revealResearchAnchor();
  $("#about-bio").innerHTML = content.bio.map(paragraph => `<p>${escape(paragraph)}</p>`).join("");
  $("#interests").innerHTML = content.interests.map(interest => `<span>${escape(interest)}</span>`).join("");
  const portraitUrl = safeUrl(content.portrait, true);
  if (portraitUrl) $("[data-portrait]").src = portraitUrl;
  $("[data-portrait]").alt = content.name;
  $("#year").textContent = new Date().getFullYear();
  const metrics = (content.metrics || []).map(metric => {
    if (scholar && metric.source === "scholar-publications") return { value: scholarPapers.length.toLocaleString("en-US"), label: "Publications · Google Scholar" };
    if (scholar && metric.source === "scholar-citations") return { value: scholar.metrics.citations.toLocaleString("en-US"), label: `Citations · Updated ${scholarUpdated}` };
    return metric;
  });
  $("#metrics").innerHTML = metrics.map(metric => `<div class="metric"><span class="metric-value">${escape(metric.value)}</span><span class="metric-label">${escape(metric.label)}</span></div>`).join("");
  if (scholar) $("#scholar-metrics").innerHTML = `h-index ${escape(scholar.metrics.hIndex)} · i10-index ${escape(scholar.metrics.i10Index)} <span> / Updated ${escape(scholarUpdated)}</span>`;

  const githubUrl = safeUrl(content.github);
  if (githubUrl) {
    const link = $("#github-link");
    link.href = githubUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;
  }
  const resumeUrl = safeUrl(content.resume, true);
  if (resumeUrl) {
    const link = $("#resume-link");
    link.href = resumeUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.hidden = false;
  }
  const socials = [["GitHub", content.github], ["Google Scholar", content.scholar], ["LinkedIn", content.linkedin]].filter(([, url]) => safeUrl(url));
  $("#social-links").innerHTML = socials.map(([label, url]) => externalLink(url, label, "social-link")).join("");

  const linkedinUrl = safeUrl(content.linkedin);
  if (linkedinUrl) $("#news-linkedin-link").href = linkedinUrl;
  else $("#news-linkedin-link").hidden = true;
  const newsToday = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "America/New_York" }).format(new Date());
  const paperNews = scholarPapers.filter(paper => Number(paper.year) >= (content.newsPublicationStartYear || 2025)).map(paper => ({
    id: `paper-${paper.id}`, kind: "paper", date: paper.year, dateLabel: paper.year,
    preprint: /\barxiv\b|\bssrn\b|\bpreprint\b/i.test(paper.venue),
    category: "Google Scholar", title: paper.title, event: paper.venue,
    summary: paper.authors, links: [{label: "View on Scholar", url: paper.url}]
  }));
  const newsTiming = story => {
    if (story.kind === "paper") return story.preprint ? "preprint" : "publication";
    const date = typeof story.date === "string" ? story.date : "";
    if (/^\d{4}$/.test(date)) return date > newsToday.slice(0, 4) ? "upcoming" : date < newsToday.slice(0, 4) ? "past" : "announced";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "announced";
    if (date > newsToday) return "upcoming";
    return (story.endDate || date) < newsToday ? "past" : "ongoing";
  };
  const newsStatusLabels = { upcoming: "Upcoming", past: "Past event", announced: "Announced", ongoing: "In progress", publication: "Publication", preprint: "Preprint" };
  const newsStories = [...(content.news || []), ...paperNews].sort((a, b) => {
    const upcomingA = newsTiming(a) === "upcoming";
    const upcomingB = newsTiming(b) === "upcoming";
    // Recent activity comes first; future events remain available under Upcoming.
    if (upcomingA !== upcomingB) return upcomingA ? 1 : -1;
    // Year-only records keep their displayed precision and Scholar's order within a year.
    const sortDate = story => /^\d{4}$/.test(story.date || "") ? `${story.date}-12-31` : story.date || "";
    return upcomingA ? sortDate(a).localeCompare(sortDate(b)) : sortDate(b).localeCompare(sortDate(a));
  });
  $("[data-news-filter=\"papers\"]").hidden = !paperNews.length;
  if (scholar) $("#news-source-note").textContent = `Papers from Google Scholar · Updated ${scholarUpdated}`;
  let newsFilter = "all";
  let newsExpanded = false;
  const renderNews = () => {
    const stories = newsStories.filter(story => newsFilter === "all" || (newsFilter === "papers" ? story.kind === "paper" : newsFilter === "events" ? story.kind !== "paper" : newsTiming(story) === newsFilter));
    const visible = newsExpanded ? stories : stories.slice(0, 6);
    const openDetails = new Set($$("#news-stories details[open]").map(detail => detail.dataset.newsId));
    $("#news-stories").innerHTML = visible.length ? visible.map(story => {
      const timing = newsTiming(story);
      const title = timing === "past" && story.titlePast ? story.titlePast : story.title;
      const summary = timing === "past" && story.summaryPast ? story.summaryPast : timing === "ongoing" && story.summaryOngoing ? story.summaryOngoing : story.summary;
      const year = (story.date || "").slice(0, 4);
      const dateLabel = typeof story.dateLabel === "string" && story.dateLabel !== year ? story.dateLabel.replace(/,? \d{4}$/, "") : "";
      const dateText = `<span class="news-year">${escape(year)}</span>${dateLabel ? `<span class="news-date-label">${escape(dateLabel)}</span>` : ""}`;
      const date = /^\d{4}-\d{2}-\d{2}$/.test(story.date || "") ? `<time class="news-date" datetime="${escape(story.date)}">${dateText}</time>` : `<div class="news-date">${dateText}</div>`;
      const presentations = story.presentations || [];
      const detailsText = (story.detailsText || []).map(paragraph => `<p class="news-story-text">${escape(paragraph)}</p>`).join("");
      const presentationDetails = presentations.length ? `<ul>${presentations.map(presentation => `<li><h4>${escape(presentation.title)}</h4><p class="news-presenter">Presenting author${(presentation.presenter || "").includes(";") ? "s" : ""}: ${escape(presentation.presenter)}</p><p class="news-format">${escape(timing === "past" && presentation.formatPast ? presentation.formatPast : presentation.format)}</p></li>`).join("")}</ul>` : "";
      const detailsLabel = story.detailsTitle || `View ${presentations.length > 1 ? `${presentations.length} presentations` : "presentation"}`;
      const links = (story.links || []).filter(link => safeUrl(link.url)).map(link => externalLink(link.url, link.label)).join("");
      return `<li><article class="news-entry" data-news-id="${escape(story.id)}">${date}<div class="news-body"><p class="news-meta"><span class="news-status news-status-${timing}">${newsStatusLabels[timing]}</span><span>${escape(story.category)}</span></p><h3>${escape(title)}</h3><p class="news-venue">${escape(story.event)}${story.location ? `<span>${escape(story.location)}</span>` : ""}</p><p class="news-summary">${escape(summary)}</p>${presentationDetails || detailsText ? `<details class="news-details" data-news-id="${escape(story.id)}"${openDetails.has(story.id) ? " open" : ""}><summary>${escape(detailsLabel)} ${icon("arrow-down")}</summary>${presentationDetails}${detailsText}</details>` : ""}${story.note ? `<p class="news-note">${escape(story.note)}</p>` : ""}${links || story.gallery ? `<div class="news-links">${links}${story.gallery ? `<a class="text-link" href="#gallery">See the gallery ${icon("arrow-down")}</a>` : ""}</div>` : ""}</div></article></li>`;
    }).join("") : '<li class="news-empty">No updates in this category yet. Explore all updates for more papers and events.</li>';
    $("#news-count").textContent = `${visible.length} of ${stories.length} update${stories.length === 1 ? "" : "s"}`;
    const toggle = $("#news-toggle");
    toggle.hidden = stories.length <= 6;
    toggle.setAttribute("aria-expanded", String(newsExpanded));
    toggle.innerHTML = `${newsExpanded ? "Show fewer updates" : `Show ${stories.length - visible.length} more updates`} ${icon("arrow-down")}`;
  };
  renderNews();
  $$("[data-news-filter]").forEach(button => button.addEventListener("click", () => {
    newsFilter = button.dataset.newsFilter;
    newsExpanded = false;
    $$("[data-news-filter]").forEach(filter => {
      const active = button === filter;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderNews();
  }));
  $("#news-toggle").addEventListener("click", () => { newsExpanded = !newsExpanded; renderNews(); });

  const teachingApproach = content.teachingApproach || {};
  $("#teaching-intro").textContent = teachingApproach.intro || "";
  $("#teaching-principles").innerHTML = (teachingApproach.principles || []).map((principle, index) => `<article class="teaching-principle"><span aria-hidden="true">0${index + 1}</span><h3>${escape(principle.title)}</h3><p>${escape(principle.text)}</p></article>`).join("");
  $("#teaching-courses").innerHTML = (content.teaching || []).map(topic => `<article class="teaching-course"><p class="course-role">${escape(topic.label)}</p><h3>${escape(topic.title)}</h3><p class="course-description">${escape(topic.detail)}</p></article>`).join("");
  $("#teaching-areas").innerHTML = (teachingApproach.areas || []).map(area => `<span>${escape(area)}</span>`).join("");
  $("#teaching-outlook-title").textContent = teachingApproach.outlook?.title || "";
  $("#teaching-outlook-text").textContent = teachingApproach.outlook?.text || "";
  $("#gallery-grid").innerHTML = (content.gallery || []).map((item, index) => {
    const imageUrl = safeUrl(item.image, true);
    if (!imageUrl) return "";
    const sourceUrl = safeUrl(item.sourceUrl);
    return `<figure class="gallery-card${item.kind === "document" ? " gallery-document" : ""}"><button type="button" class="gallery-open" data-gallery="${index}" aria-label="Enlarge ${escape(item.title)}" aria-haspopup="dialog"><img src="${escape(imageUrl)}" alt="${escape(item.alt)}" width="${Number(item.width) || 1600}" height="${Number(item.height) || 1200}" loading="lazy" /><span class="gallery-enlarge">View image ${icon("arrow-up-right")}</span></button><figcaption><p class="gallery-meta">${escape(item.dateLabel)}<span>${escape(item.location)}</span></p><h3>${escape(item.title)}</h3><p>${escape(item.caption)}</p>${sourceUrl ? externalLink(sourceUrl, item.sourceLabel || "View source") : ""}</figcaption></figure>`;
  }).join("");
  $$("[data-gallery]").forEach(button => {
    const item = content.gallery[Number(button.dataset.gallery)];
    button.style.setProperty("--gallery-aspect", `${Number(item.width) || 1600}/${Number(item.height) || 1200}`);
  });

  const art = {
    code: `<div class="mini-window" aria-hidden="true"><div class="window-top"><i></i><i></i><i></i><span>HELIX / analysis workflow</span></div><div class="code-lines"><div class="code-comment"># Process impact data</div><div><em>experiment</em> → raw_signal</div><div>&nbsp;</div><div><em>analysis</em> = {</div><div class="code-indent">velocity: <b>extract(signal)</b>,</div><div class="code-indent">strength: <b>detect_spall()</b>,</div><div class="code-indent">uncertainty: <b>quantify()</b></div><div>}</div><div class="code-comment"># Save results</div></div></div>`,
    data: '<div class="chart-window" aria-hidden="true"><div class="chart-caption">ACTIVE LEARNING</div><div class="chart-value">Next test<span>↗ Select</span></div><div class="chart-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="chart-axis"><span>PREDICTION · UNCERTAINTY</span><span>ILLUSTRATION</span></div></div>',
    orb: '<div class="small-orb" aria-hidden="true"></div>',
    wave: '<div class="wave-illustration" aria-hidden="true"><span>SHOCK → RESPONSE</span><svg viewBox="0 0 300 160"><path class="wave-grid" d="M0 40h300M0 80h300M0 120h300M50 0v160M100 0v160M150 0v160M200 0v160M250 0v160"/><path class="wave-area" d="M0 130H50L65 30H105L123 56H147L166 93L179 68L198 106H300V160H0Z"/><path class="wave-trace" d="M0 130H50L65 30H105L123 56H147L166 93L179 68L198 106H300"/></svg><small>ONE-DIMENSIONAL HYDROCODE · ILLUSTRATION</small></div>',
    signal: '<div class="signal-illustration" aria-hidden="true"><div class="signal-label">SPADE <span>TIME-SERIES ANALYSIS</span></div><svg viewBox="0 0 300 145"><path class="signal-noise" d="m0 85 7-12 7 19 7-9 7 12 7-25 7 13 7-6 7 10 7-60 7 13 7-22 7 17 7-9 7 13 7-8 7 17 7-6 7 15 7-8 7 11 7-3 7 17 7-7 7 16 7-10 7 3 7-16 7 11 7-6 7 13 7-4 7 16 7-8 7 8 7-9 7 5 7-2 7 6 7-8 7 5 13-2"/><path class="signal-clean" d="M0 85H53L66 29C90 16 119 49 149 66S177 103 198 85S230 100 256 103H300"/></svg><small>AUTOMATED EXTRACTION · ILLUSTRATION</small></div>',
    bubble: '<div class="bubble-illustration" aria-hidden="true"><span>UNDERWATER BUBBLE TRACKING</span><div class="bubble-row"><i></i><i></i><i></i><i></i><i></i></div><small>HIGH-SPEED IMAGING · ILLUSTRATION</small></div>'
  };
  const projectArt = (project, dialog = false) => {
    const imageUrl = safeUrl(project.image, true);
    const visual = imageUrl ? `<img src="${escape(imageUrl)}" alt="${escape(project.imageAlt || project.title)}" loading="lazy" />` : (art[project.art] || art.orb);
    return `<div class="${dialog ? "dialog-art" : "project-image"} ${escape(["code", "data", "orb", "lab", "wave", "signal", "bubble"].includes(project.art) ? project.art : "orb")}-art">${visual}</div>`;
  };
  const renderProjects = (filter = "all") => {
    const projects = content.projects.map((project, index) => ({...project, index})).filter(project => filter === "all" || project.category === filter);
    $("#sample-label").hidden = !projects.some(project => project.example);
    $("#projects").innerHTML = projects.length ? projects.map(project => `<article class="project-card"${project.id ? ` id="project-${escape(project.id)}"` : ""}>${projectArt(project)}<div class="project-body"><p class="project-label">${escape(project.label)}</p><h3>${escape(project.title)}</h3>${icon("arrow-up-right").replace('class="icon"', 'class="icon project-arrow"')}<p>${escape(project.description)}</p><div class="project-tags">${(project.tags || []).map(tag => `<span>${escape(tag)}</span>`).join("")}</div></div><button type="button" class="project-open" data-project="${project.index}" aria-label="Explore ${escape(project.title)}${project.example ? " (illustrative project)" : ""}"></button></article>`).join("") : '<p class="empty-filter">No projects in this category. Try another filter.</p>';
  };
  renderProjects();
  $$("[data-filter]").forEach(button => button.addEventListener("click", () => {
    $$("[data-filter]").forEach(filter => {
      const active = button === filter;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderProjects(button.dataset.filter);
  }));

  const publications = content.publications || [];
  const conferencePublications = content.conferencePublications || [];
  const explainedPapers = researchStudies.flatMap(study => study.papers || []);
  const paperTitleKey = title => String(title || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  const allPapersButton = $('[data-paper-filter="all"]');
  if (allPapersButton) allPapersButton.textContent = `Journal articles (${publications.length})`;
  const conferencePapersButton = $('[data-paper-filter="conference"]');
  if (conferencePapersButton) {
    conferencePapersButton.hidden = !conferencePublications.length;
    conferencePapersButton.textContent = `Conference papers (${conferencePublications.length})`;
  }
  const scholarPapersButton = $('[data-paper-filter="scholar"]');
  if (scholarPapersButton && scholar) {
    scholarPapersButton.hidden = false;
    scholarPapersButton.textContent = `Google Scholar (${scholarPapers.length})`;
  }
  const findExplanation = publication => explainedPapers.find(paper => paper.url === safeUrl(publication.url) || paperTitleKey(paper.publicationTitle) === paperTitleKey(publication.title));
  const publicationTopic = publication => researchStudies.find(study => (study.papers || []).includes(findExplanation(publication)))?.id || "other";
  const publicationSearchText = paper => {
    const explanation = findExplanation(paper);
    return [paper.title, paper.authors, paper.venue, explanation?.title, explanation?.teaser, explanation?.summary].join(" ").toLocaleLowerCase();
  };
  const publicationYear = paper => String(paper.year || "").match(/\b(?:19|20)\d{2}\b/)?.[0] || "undated";
  const allPublications = [...publications, ...conferencePublications, ...(content.manuscripts || []), ...scholarPapers];
  $("#publication-year").innerHTML = '<option value="">All years</option>' + [...new Set(allPublications.map(publicationYear))].sort((a, b) => a === "undated" ? 1 : b === "undated" ? -1 : b.localeCompare(a, "en", { numeric: true })).map(year => `<option value="${escape(year)}">${year === "undated" ? "Year not listed" : escape(year)}</option>`).join("");
  $("#publication-topic").innerHTML = '<option value="">All topics</option>' + researchStudies.filter(study => study.papers?.length).map(study => `<option value="${escape(study.id)}">${escape(study.title)}</option>`).join("") + '<option value="other">Other work</option>';
  let currentPaperFilter = "selected";
  const renderPublications = (filter = currentPaperFilter) => {
    const categoryPapers = filter === "scholar" ? scholarPapers : filter === "progress" ? (content.manuscripts || []) : filter === "conference" ? conferencePublications : filter === "all" ? publications : publications.filter(paper => paper.featured);
    const query = ($("#publication-search").value || "").trim().toLocaleLowerCase();
    const year = $("#publication-year").value || "";
    const topic = $("#publication-topic").value || "";
    const papers = categoryPapers.filter(paper => (!query || publicationSearchText(paper).includes(query)) && (!year || publicationYear(paper) === year) && (!topic || publicationTopic(paper) === topic));
    $("#publication-count").textContent = `${papers.length} of ${categoryPapers.length} paper${categoryPapers.length === 1 ? "" : "s"} shown`;
    const bibliographySource = "Curated bibliography: September 2026 CV and verified postdoctoral publication updates";
    $("#publication-source-note").textContent = filter === "scholar" && scholar ? `Google Scholar · Updated ${scholarUpdated} · Includes journal papers, preprints, and other works` : scholar ? `${bibliographySource} · Scholar metrics updated ${scholarUpdated}` : bibliographySource;
    $("#publication-results").innerHTML = papers.length ? papers.map(publication => {
    const paperUrl = safeUrl(publication.url);
    const pdfUrl = safeUrl(publication.pdf, true);
    const explanation = findExplanation(publication);
    return `<article class="publication"><div class="publication-summary"><div><p class="publication-year">${escape(publication.year)}</p><h3>${escape(publication.title)}</h3><p class="publication-meta publication-authors">${escape(publication.authors).replaceAll("P. Wanchoo", "<strong>P. Wanchoo</strong>")}</p>${publication.venue ? `<p class="publication-meta">${escape(publication.venue)}</p>` : ""}${publication.note ? `<p class="publication-note">${escape(publication.note)}</p>` : ""}</div><div class="publication-actions">${explanation ? `<a class="paper-link" href="#paper-${escape(explanation.id)}">Results &amp; significance ${icon("arrow-up-right")}</a>` : ""}${paperUrl ? externalLink(paperUrl, publication.source === "scholar" ? "View on Scholar" : "Read paper", "paper-link") : ""}${pdfUrl ? externalLink(pdfUrl, "PDF", "paper-link") : ""}</div></div>${publication.abstract ? `<details><summary>Read abstract</summary><p>${escape(publication.abstract)}</p></details>` : ""}</article>`;
  }).join("") : '<div class="publication-empty"><p>No papers match these filters. Try a different search, year, or topic, or clear the filters.</p></div>';
  };
  const activatePaperFilter = name => {
    currentPaperFilter = name;
    $$('[data-paper-filter]').forEach(button => {
      const active = button.dataset.paperFilter === name;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    renderPublications(name);
  };
  $$('[data-paper-filter]').forEach(button => button.addEventListener("click", () => activatePaperFilter(button.dataset.paperFilter)));
  ["#publication-search", "#publication-year", "#publication-topic"].forEach(selector => $(selector).addEventListener(selector === "#publication-search" ? "input" : "change", () => renderPublications()));
  $("#publication-reset").addEventListener("click", () => {
    ["#publication-search", "#publication-year", "#publication-topic"].forEach(selector => { $(selector).value = ""; });
    renderPublications();
    $("#publication-search").focus();
  });
  activatePaperFilter("selected");
  const scholarUrl = safeUrl(content.scholar);
  if (scholarUrl) $("#scholar-link").href = scholarUrl;
  else $("#scholar-link").hidden = true;

  $("#timeline").innerHTML = content.experience.length ? content.experience.map(experience => `<article class="timeline-item"><div class="timeline-period">${experience.current ? '<span class="status-dot"></span>' : ""}${escape(experience.period)}</div><div><h3>${escape(experience.role)}</h3><p class="timeline-organization">${escape(experience.organization)}</p><p class="timeline-description">${escape(experience.description)}</p></div></article>`).join("") : `<div class="timeline-empty"><p>Experience details have not been added yet.</p></div>`;

  const academicItem = (kicker, title, subtitle, description = "") => `<article class="academic-item">${kicker ? `<span class="academic-kicker">${escape(kicker)}</span>` : ""}<div><h4>${escape(title)}</h4>${subtitle ? `<p class="academic-subtitle">${escape(subtitle)}</p>` : ""}${description ? `<p>${escape(description)}</p>` : ""}</div></article>`;
  const academicGroups = [
    ["Education", (content.education || []).map(item => academicItem(item.period, item.degree, item.institution, item.detail)).join("")],
    ["Awards & recognition", (content.awards || []).map(item => academicItem(item.year, item.text, "")).join("")],
    ["Experimental & computational capabilities", (content.capabilities || []).map(item => academicItem("", item.title, "", item.text)).join("")],
    ["Mentorship & outreach", `<div class="mentorship-note"><h4>Student mentoring</h4><p>${escape(content.mentorship)}</p><h4>Outreach &amp; teaching experience</h4><p>${escape(content.outreach)}</p></div>`],
    ["Selected talks & presentations", (content.talks || []).map(item => academicItem(item.year, item.title, item.detail)).join("")],
    ["Service & community", `<ul class="service-list">${(content.service || []).map(item => `<li>${escape(item)}</li>`).join("")}</ul>`]
  ];
  $("#academic-accordion").innerHTML = academicGroups.map(([label, body], index) => `<details class="academic-detail"><summary><span class="academic-number">0${index + 1}</span><span>${escape(label)}</span><span class="accordion-plus" aria-hidden="true">+</span></summary><div class="academic-detail-body">${body}</div></details>`).join("");

  const dialog = $("#detail-dialog");
  let previousFocus = null;
  const openDialog = (html, mode = "") => {
    previousFocus = document.activeElement;
    dialog.classList.toggle("gallery-dialog", mode === "gallery");
    dialog.classList.toggle("research-figure-dialog", mode === "research-figure");
    $("#dialog-content").innerHTML = html;
    dialog.showModal();
    document.body.classList.add("modal-open");
  };
  const closeDialog = () => dialog.close();
  $(".dialog-close").addEventListener("click", closeDialog);
  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
    }
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    previousFocus?.focus({preventScroll: true});
  });
  $("#gallery-grid").addEventListener("click", event => {
    const button = event.target.closest("[data-gallery]");
    if (!button) return;
    const index = Number(button.dataset.gallery);
    const item = Number.isInteger(index) ? (content.gallery || [])[index] : null;
    if (!item) return;
    const imageUrl = safeUrl(item.image, true);
    if (!imageUrl) return;
    const sourceUrl = safeUrl(item.sourceUrl);
    openDialog(`<figure class="gallery-lightbox"><img src="${escape(imageUrl)}" alt="${escape(item.alt)}" width="${Number(item.width) || 1600}" height="${Number(item.height) || 1200}" /><figcaption><p class="dialog-eyebrow">${escape(item.event)} · ${escape(item.dateLabel)}</p><h2 id="dialog-title">${escape(item.title)}</h2><p>${escape(item.caption)}</p>${sourceUrl ? externalLink(sourceUrl, item.sourceLabel || "View source") : ""}</figcaption></figure>`, "gallery");
  });
  $("#research").addEventListener("click", event => {
    const button = event.target.closest("[data-paper-figure]");
    const figure = button ? researchFigures.get(button.dataset.paperFigure) : null;
    if (!figure) return;
    const imageUrl = safeUrl(figure.image, true);
    if (!imageUrl) return;
    const sourceUrl = safeUrl(figure.sourceUrl || figure.paper.url);
    openDialog(`<figure class="research-figure-lightbox"><figcaption><p class="dialog-eyebrow">${escape(figure.paper.year)} · ${escape(figure.paper.venue)}</p><h2 id="dialog-title">${escape(figure.label)}</h2><p>${escape(figure.caption)}</p></figcaption><img src="${escape(imageUrl)}" alt="${escape(figure.alt)}" width="${Number(figure.width) || 1600}" height="${Number(figure.height) || 1000}" /><div class="figure-dialog-links">${sourceUrl ? externalLink(sourceUrl, figure.credit || "Source paper") : ""}${safeUrl(figure.licenseUrl) ? externalLink(figure.licenseUrl, figure.licenseLabel || "License") : ""}<a class="text-link" href="${escape(imageUrl)}" target="_blank" rel="noopener noreferrer">Open full-resolution image ${icon("arrow-up-right")}</a></div></figure>`, "research-figure");
    window.ResearchFigureViewer?.setup($(".research-figure-lightbox", $("#dialog-content")));
  });
  $("#projects").addEventListener("click", event => {
    const card = event.target.closest("[data-project]");
    if (!card) return;
    const project = content.projects[Number(card.dataset.project)];
    const links = (project.links || [{ url: project.url, label: project.linkLabel || "Explore project" }]).filter(link => safeUrl(link.url));
    openDialog(`<p class="dialog-eyebrow">${escape(project.label)}${project.example ? " · ILLUSTRATIVE PROJECT" : ""}</p><h2 id="dialog-title">${escape(project.title)}</h2>${projectArt(project, true)}${project.imageCredit ? `<p class="image-credit">${escape(project.imageCredit)}</p>` : ""}<p>${escape(project.detail || project.description)}</p><div class="project-tags">${(project.tags || []).map(tag => `<span>${escape(tag)}</span>`).join("")}</div>${links.length ? `<div class="dialog-actions">${links.map((link, index) => externalLink(link.url, link.label, index ? "button button-outline" : "button")).join("")}</div>` : ""}`);
  });
  $$('[data-contact]').forEach(button => button.addEventListener("click", () => {
    const emails = [["University", content.email]].filter(([, address]) => typeof address === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address));
    openDialog(`<p class="dialog-eyebrow">CONTACT</p><h2 id="dialog-title">Get in touch</h2><p>For questions about my research or potential collaborations, you can reach me by email.</p>${emails.length ? `<div class="contact-addresses">${emails.map(([label, address]) => `<div><span class="contact-address-label">${escape(label)}</span><a class="contact-email" href="mailto:${escape(address)}">${escape(address)}</a></div>`).join("")}</div>` : '<div class="contact-detail"><p>No email address is listed yet.</p></div>'}${socials.length ? `<div class="dialog-actions">${socials.map(([label, url]) => externalLink(url, label, "button button-outline")).join("")}</div>` : ""}<p class="dialog-affiliation">${escape(content.affiliation)}<br />${escape(content.location)}</p>`);
  }));

  const menu = $(".menu-toggle");
  const closeMenu = () => { menu.setAttribute("aria-expanded", "false"); $(".nav-links").classList.remove("is-open"); menu.setAttribute("aria-label", "Open navigation"); };
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    $(".nav-links").classList.toggle("is-open", open);
  });
  $$(".nav-links a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); } });
  document.addEventListener("click", event => { if (!event.target.closest(".nav")) closeMenu(); });
  const desktopQuery = window.matchMedia("(min-width: 1051px)");
  desktopQuery.addEventListener("change", event => { if (event.matches) closeMenu(); });

  if ("IntersectionObserver" in window) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducedMotion) {
      document.body.classList.add("motion-ready");
      const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); }
      }), { threshold: .08 });
      $$(".reveal").forEach(element => reveal.observe(element));
    }
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) markCurrentNavigation(entry.target.id === "research" && currentResearchTab === "publications" ? "publications" : entry.target.id);
    }), { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    const destinations = new Set($$("[data-nav]").map(link => link.dataset.nav));
    $$("main > section[id]").filter(section => destinations.has(section.id)).forEach(section => sectionObserver.observe(section));
  }
})();
