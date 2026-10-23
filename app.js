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

  $$('[data-name]').forEach(element => { element.textContent = content.name; });
  $(".wordmark").setAttribute("aria-label", `${content.name}, home`);
  $(".monogram").innerHTML = `${escape(content.initials.toLowerCase())}<span>·</span>`;
  $(".portrait-corner").textContent = `${content.initials}.`;
  document.title = content.title || `${content.name} — Research & Discovery`;
  $('meta[name="description"]').content = content.description || `The personal space of ${content.name}. Projects, research, experiences, and a little curiosity.`;
  $('meta[property="og:title"]').content = document.title;
  $("[data-hero-description]").textContent = content.heroDescription;
  $("[data-research-description]").textContent = content.researchDescription;
  $("#about-bio").innerHTML = content.bio.map(paragraph => `<p>${escape(paragraph)}</p>`).join("");
  $("#interests").innerHTML = content.interests.map(interest => `<span>${escape(interest)}</span>`).join("");
  const portraitUrl = safeUrl(content.portrait, true);
  if (portraitUrl) $("[data-portrait]").src = portraitUrl;
  $("[data-portrait]").alt = content.name;
  $("#year").textContent = new Date().getFullYear();
  $("#metrics").innerHTML = (content.metrics || []).map(metric => `<div class="metric"><span class="metric-value">${escape(metric.value)}</span><span class="metric-label">${escape(metric.label)}</span></div>`).join("");

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
  const newsDate = new Date();
  const newsToday = `${newsDate.getFullYear()}-${String(newsDate.getMonth() + 1).padStart(2, "0")}-${String(newsDate.getDate()).padStart(2, "0")}`;
  const newsTiming = story => {
    const date = typeof story.date === "string" ? story.date : "";
    if (/^\d{4}$/.test(date)) return date > newsToday.slice(0, 4) ? "upcoming" : date < newsToday.slice(0, 4) ? "past" : "announced";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "announced";
    if (date > newsToday) return "upcoming";
    return (story.endDate || date) < newsToday ? "past" : "ongoing";
  };
  const newsStatusLabels = { upcoming: "Upcoming", past: "Past event", announced: "Announced", ongoing: "In progress" };
  let newsFilter = "all";
  let newsExpanded = false;
  const renderNews = () => {
    const stories = (content.news || []).filter(story => newsFilter === "all" || newsTiming(story) === newsFilter);
    const visible = newsExpanded ? stories : stories.slice(0, 6);
    const openDetails = new Set($$("#news-stories details[open]").map(detail => detail.dataset.newsId));
    $("#news-stories").innerHTML = visible.length ? visible.map(story => {
      const timing = newsTiming(story);
      const year = (story.date || "").slice(0, 4);
      const dateLabel = typeof story.dateLabel === "string" && story.dateLabel !== year ? story.dateLabel.replace(/,? \d{4}$/, "") : "";
      const dateText = `<span class="news-year">${escape(year)}</span>${dateLabel ? `<span class="news-date-label">${escape(dateLabel)}</span>` : ""}`;
      const date = /^\d{4}-\d{2}-\d{2}$/.test(story.date || "") ? `<time class="news-date" datetime="${escape(story.date)}">${dateText}</time>` : `<div class="news-date">${dateText}</div>`;
      const presentations = story.presentations || [];
      const detailsText = (story.detailsText || []).map(paragraph => `<p class="news-story-text">${escape(paragraph)}</p>`).join("");
      const presentationDetails = presentations.length ? `<ul>${presentations.map(presentation => `<li><h4>${escape(presentation.title)}</h4><p class="news-presenter">Presenting author${(presentation.presenter || "").includes(";") ? "s" : ""}: ${escape(presentation.presenter)}</p><p class="news-format">${escape(presentation.format)}</p></li>`).join("")}</ul>` : "";
      const detailsLabel = story.detailsTitle || `View ${presentations.length > 1 ? `${presentations.length} presentations` : "presentation"}`;
      const links = (story.links || []).filter(link => safeUrl(link.url)).map(link => externalLink(link.url, link.label)).join("");
      return `<li><article class="news-entry" data-news-id="${escape(story.id)}">${date}<div class="news-body"><p class="news-meta"><span class="news-status news-status-${timing}">${newsStatusLabels[timing]}</span><span>${escape(story.category)}</span></p><h3>${escape(story.title)}</h3><p class="news-venue">${escape(story.event)}${story.location ? `<span>${escape(story.location)}</span>` : ""}</p><p class="news-summary">${escape(story.summary)}</p>${presentationDetails || detailsText ? `<details class="news-details" data-news-id="${escape(story.id)}"${openDetails.has(story.id) ? " open" : ""}><summary>${escape(detailsLabel)} ${icon("arrow-down")}</summary>${presentationDetails}${detailsText}</details>` : ""}${story.note ? `<p class="news-note">${escape(story.note)}</p>` : ""}${links || story.gallery ? `<div class="news-links">${links}${story.gallery ? `<a class="text-link" href="#gallery">See the gallery ${icon("arrow-down")}</a>` : ""}</div>` : ""}</div></article></li>`;
    }).join("") : '<li class="news-empty">No updates in this category yet. Explore all updates for more presentations.</li>';
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
  $("#teaching-courses").innerHTML = (content.teaching || []).map(course => `<article class="teaching-course"><p class="course-role">${escape(course.role)}</p><h3>${escape(course.title)}</h3><p class="course-institution">${escape(course.institution)}</p><p class="course-description">${escape(course.detail)}</p></article>`).join("");
  $("#teaching-areas").innerHTML = (teachingApproach.areas || []).map(area => `<span>${escape(area)}</span>`).join("");
  $("#gallery-grid").innerHTML = (content.gallery || []).map((item, index) => {
    const imageUrl = safeUrl(item.image, true);
    if (!imageUrl) return "";
    const sourceUrl = safeUrl(item.sourceUrl);
    return `<figure class="gallery-card${item.kind === "document" ? " gallery-document" : ""}"><button type="button" class="gallery-open" data-gallery="${index}" aria-label="Enlarge ${escape(item.title)}" aria-haspopup="dialog"><img src="${escape(imageUrl)}" alt="${escape(item.alt)}" width="${Number(item.width) || 1600}" height="${Number(item.height) || 1200}" loading="lazy" /><span class="gallery-enlarge">View image ${icon("arrow-up-right")}</span></button><figcaption><p class="gallery-meta">${escape(item.dateLabel)}<span>${escape(item.location)}</span></p><h3>${escape(item.title)}</h3><p>${escape(item.caption)}</p>${sourceUrl ? externalLink(sourceUrl, item.sourceLabel || "View source") : ""}</figcaption></figure>`;
  }).join("");

  const art = {
    code: `<div class="mini-window" aria-hidden="true"><div class="window-top"><i></i><i></i><i></i><span>HELIX / analysis workflow</span></div><div class="code-lines"><div class="code-comment"># From signals to understanding.</div><div><em>experiment</em> → raw_signal</div><div>&nbsp;</div><div><em>analysis</em> = {</div><div class="code-indent">velocity: <b>extract(signal)</b>,</div><div class="code-indent">strength: <b>detect_spall()</b>,</div><div class="code-indent">uncertainty: <b>quantify()</b></div><div>}</div><div class="code-comment"># Discover. Repeat.</div></div></div>`,
    data: `<div class="chart-window" aria-hidden="true"><div class="chart-caption">ACTIVE LEARNING</div><div class="chart-value">What’s next?<span>↗ Explore</span></div><div class="chart-bars">${[26, 39, 32, 48, 42, 59, 53, 73, 68, 89].map(height => `<i style="height:${height}%"></i>`).join("")}</div><div class="chart-axis"><span>OBSERVE · LEARN · SELECT</span><span>ILLUSTRATION</span></div></div>`,
    orb: '<div class="small-orb" aria-hidden="true"></div>',
    wave: '<div class="wave-illustration" aria-hidden="true"><span>SHOCK → RESPONSE</span><svg viewBox="0 0 300 160"><path class="wave-grid" d="M0 40h300M0 80h300M0 120h300M50 0v160M100 0v160M150 0v160M200 0v160M250 0v160"/><path class="wave-area" d="M0 130H50L65 30H105L123 56H147L166 93L179 68L198 106H300V160H0Z"/><path class="wave-trace" d="M0 130H50L65 30H105L123 56H147L166 93L179 68L198 106H300"/></svg><small>ONE-DIMENSIONAL HYDROCODE · ILLUSTRATION</small></div>',
    signal: '<div class="signal-illustration" aria-hidden="true"><div class="signal-label">SPADE <span>SIGNAL → INSIGHT</span></div><svg viewBox="0 0 300 145"><path class="signal-noise" d="m0 85 7-12 7 19 7-9 7 12 7-25 7 13 7-6 7 10 7-60 7 13 7-22 7 17 7-9 7 13 7-8 7 17 7-6 7 15 7-8 7 11 7-3 7 17 7-7 7 16 7-10 7 3 7-16 7 11 7-6 7 13 7-4 7 16 7-8 7 8 7-9 7 5 7-2 7 6 7-8 7 5 13-2"/><path class="signal-clean" d="M0 85H53L66 29C90 16 119 49 149 66S177 103 198 85S230 100 256 103H300"/></svg><small>AUTOMATED EXTRACTION · ILLUSTRATION</small></div>',
    bubble: '<div class="bubble-illustration" aria-hidden="true"><span>THE MOMENT BETWEEN FRAMES.</span><div class="bubble-row"><i></i><i></i><i></i><i></i><i></i></div><small>HIGH-SPEED IMAGING · ILLUSTRATION</small></div>'
  };
  const projectArt = (project, dialog = false) => {
    const imageUrl = safeUrl(project.image, true);
    const visual = imageUrl ? `<img src="${escape(imageUrl)}" alt="${escape(project.imageAlt || project.title)}" loading="lazy" />` : (art[project.art] || art.orb);
    return `<div class="${dialog ? "dialog-art" : "project-image"} ${escape(["code", "data", "orb", "lab", "wave", "signal", "bubble"].includes(project.art) ? project.art : "orb")}-art">${visual}</div>`;
  };
  const renderProjects = (filter = "all") => {
    const projects = content.projects.map((project, index) => ({...project, index})).filter(project => filter === "all" || project.category === filter);
    $("#sample-label").hidden = !projects.some(project => project.example);
    $("#projects").innerHTML = projects.length ? projects.map(project => `<article class="project-card">${projectArt(project)}<div class="project-body"><p class="project-label">${escape(project.label)}</p><h3>${escape(project.title)}</h3>${icon("arrow-up-right").replace('class="icon"', 'class="icon project-arrow"')}<p>${escape(project.description)}</p><div class="project-tags">${(project.tags || []).map(tag => `<span>${escape(tag)}</span>`).join("")}</div></div><button type="button" class="project-open" data-project="${project.index}" aria-label="Explore ${escape(project.title)}${project.example ? " (illustrative project)" : ""}"></button></article>`).join("") : '<p class="empty-filter">More projects are on the way. Explore another category.</p>';
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
  const allPapersButton = $('[data-paper-filter="all"]');
  if (allPapersButton) allPapersButton.textContent = `All ${publications.length} articles`;
  const renderPublications = (filter = "selected") => {
    const papers = filter === "progress" ? (content.manuscripts || []) : filter === "all" ? publications : publications.filter(paper => paper.featured);
    $("#publications").innerHTML = papers.length ? papers.map(publication => {
    const paperUrl = safeUrl(publication.url);
    const pdfUrl = safeUrl(publication.pdf, true);
    return `<article class="publication"><div class="publication-summary"><div><p class="publication-year">${escape(publication.year)}</p><h3>${escape(publication.title)}</h3><p class="publication-meta publication-authors">${escape(publication.authors).replaceAll("P. Wanchoo", "<strong>P. Wanchoo</strong>")}</p>${publication.venue ? `<p class="publication-meta">${escape(publication.venue)}</p>` : ""}${publication.note ? `<p class="publication-note">${escape(publication.note)}</p>` : ""}</div><div class="publication-actions">${paperUrl ? externalLink(paperUrl, "Read paper", "paper-link") : ""}${pdfUrl ? externalLink(pdfUrl, "PDF", "paper-link") : ""}</div></div>${publication.abstract ? `<details><summary>Read abstract</summary><p>${escape(publication.abstract)}</p></details>` : ""}</article>`;
  }).join("") : '<div class="publication-empty"><p>Research notes and selected publications.<br />A little more to share soon.</p><span class="coming-soon">Coming soon</span></div>';
  };
  renderPublications();
  $$('[data-paper-filter]').forEach(button => button.addEventListener("click", () => {
    $$('[data-paper-filter]').forEach(filter => {
      const active = button === filter;
      filter.classList.toggle("active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderPublications(button.dataset.paperFilter);
  }));
  const scholarUrl = safeUrl(content.scholar);
  if (scholarUrl) $("#scholar-link").href = scholarUrl;
  else $("#scholar-link").hidden = true;

  $("#timeline").innerHTML = content.experience.length ? content.experience.map(experience => `<article class="timeline-item"><div class="timeline-period">${experience.current ? '<span class="status-dot"></span>' : ""}${escape(experience.period)}</div><div><h3>${escape(experience.role)}</h3><p class="timeline-organization">${escape(experience.organization)}</p><p class="timeline-description">${escape(experience.description)}</p></div></article>`).join("") : `<div class="timeline-empty"><div><h3>The story is still unfolding.</h3><p>Work, learning, and the experiences in between.<br />More of the journey will be shared here soon.</p></div>${icon("sparkle")}</div>`;

  const academicItem = (kicker, title, subtitle, description = "") => `<article class="academic-item">${kicker ? `<span class="academic-kicker">${escape(kicker)}</span>` : ""}<div><h4>${escape(title)}</h4>${subtitle ? `<p class="academic-subtitle">${escape(subtitle)}</p>` : ""}${description ? `<p>${escape(description)}</p>` : ""}</div></article>`;
  const academicGroups = [
    ["Education", (content.education || []).map(item => academicItem(item.period, item.degree, item.institution, item.detail)).join("")],
    ["Awards & recognition", (content.awards || []).map(item => academicItem(item.year, item.text, "")).join("")],
    ["Experimental & computational capabilities", (content.capabilities || []).map(item => academicItem("", item.title, "", item.text)).join("")],
    ["Mentorship & outreach", `<div class="mentorship-note"><h4>Mentoring the next generation</h4><p>${escape(content.mentorship)}</p><h4>Learning beyond the classroom</h4><p>${escape(content.outreach)}</p></div>`],
    ["Selected talks & presentations", (content.talks || []).map(item => academicItem(item.year, item.title, item.detail)).join("")],
    ["Service & community", `<ul class="service-list">${(content.service || []).map(item => `<li>${escape(item)}</li>`).join("")}</ul>`]
  ];
  $("#academic-accordion").innerHTML = academicGroups.map(([label, body], index) => `<details class="academic-detail"><summary><span class="academic-number">0${index + 1}</span><span>${escape(label)}</span><span class="accordion-plus" aria-hidden="true">+</span></summary><div class="academic-detail-body">${body}</div></details>`).join("");

  const dialog = $("#detail-dialog");
  let previousFocus = null;
  const openDialog = (html, mode = "") => {
    previousFocus = document.activeElement;
    dialog.classList.toggle("gallery-dialog", mode === "gallery");
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
  $("#projects").addEventListener("click", event => {
    const card = event.target.closest("[data-project]");
    if (!card) return;
    const project = content.projects[Number(card.dataset.project)];
    const url = safeUrl(project.url);
    openDialog(`<p class="dialog-eyebrow">${escape(project.label)}${project.example ? " · ILLUSTRATIVE PROJECT" : ""}</p><h2 id="dialog-title">${escape(project.title)}</h2>${projectArt(project, true)}${project.imageCredit ? `<p class="image-credit">${escape(project.imageCredit)}</p>` : ""}<p>${escape(project.detail || project.description)}</p><div class="project-tags">${(project.tags || []).map(tag => `<span>${escape(tag)}</span>`).join("")}</div>${url ? `<div class="dialog-actions">${externalLink(url, project.linkLabel || "Explore project", "button")}</div>` : ""}`);
  });
  $$('[data-contact]').forEach(button => button.addEventListener("click", () => {
    const emails = [["University", content.email], ["Personal", content.personalEmail]].filter(([, address]) => typeof address === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address));
    openDialog(`<p class="dialog-eyebrow">A CONVERSATION IS A GOOD START.</p><h2 id="dialog-title">Good things start<br />with a hello.</h2><p>Interested in experimental mechanics, autonomous laboratories, or a research collaboration? I’d love to hear what you have in mind.</p>${emails.length ? `<div class="contact-addresses">${emails.map(([label, address]) => `<div><span class="contact-address-label">${escape(label)}</span><a class="contact-email" href="mailto:${escape(address)}">${escape(address)}</a></div>`).join("")}</div>` : '<div class="contact-detail"><p>Contact details are coming soon. Thanks for stopping by.</p></div>'}${socials.length ? `<div class="dialog-actions">${socials.map(([label, url]) => externalLink(url, label, "button button-outline")).join("")}</div>` : ""}<p class="dialog-affiliation">${escape(content.affiliation)}<br />${escape(content.location)}</p>`);
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
      if (entry.isIntersecting) $$("[data-nav]").forEach(link => {
        if (link.dataset.nav === entry.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }), { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
    $$("main section[id]").forEach(section => sectionObserver.observe(section));
  }
})();
