# Piyush’s personal website

A lightweight, Apple-inspired personal website with original interactive 3D artwork, project filters and detail dialogs, active and past research, publications, a news feed, a work timeline, a personal overview, teaching, and a photo gallery. Plain HTML, CSS, and JavaScript. No package installation, build framework, paid service, or API key required. All assets are local.

**Website:** https://piyushwanchoo.com/

**Repository:** https://github.com/Piyushjhu/Piyushjhu.github.io

## Preview

From this directory, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **http://localhost:8000**. You can also open `index.html` directly, but a local server better represents GitHub Pages.

## Personalize

Edit **content.js**. This file controls your name, bio, interests, portrait, projects, papers, career history, education, teaching approach and courses, mentorship, gallery, awards, capabilities, talks, service, email, résumé, and profile links. Profile and teaching prose draw on your supplied research and teaching statements. The site contains seven research/software projects, including Dynamic Ashby Atlas with website and repository links, 14 journal articles (including the accepted article), and five preprints/manuscripts with their status shown. Bibliographic details and metrics use your September 2026 CV; they do not update automatically. Media sources are listed in `assets/CREDITS.md`. The HELIX photo and Cu–Ti animation were supplied by Piyush.

- `researchDescription` and `researchVision` set the big-picture goal and the Measure → Understand → Guide design workflow. `researchStudies` contains three active research stories and two past research stories. Each entry has a unique `id`, `status: "active"` or `"past"`, `label`, `title`, `summary`, `institution`, `tags`, optional `details` (each with `title` and `text`), and optional `links` (each with `label` and `url`). Optional `image`, `imageAlt`, and `caption` add a photo; `video`, `poster`, `mediaLabel`, and `caption` add a video. Keep media under `assets/research/`. Videos use native controls, do not autoplay, and pause when their research tab is hidden. Research tabs support arrow keys, Home, and End. Direct links such as `#publications`, `#past-research`, and `#research-spall-strength` reveal the corresponding panel.
- Your GitHub, Google Scholar, LinkedIn, university email, and Gmail are connected. `email` and `personalEmail` appear with separate labels in the contact dialog.
- Edit `news` to add or update the news feed. It contains 15 event updates covering 2025–2027: conference and invited-talk entries from your CV, your Rising Stars workshop participation, and your SEM 2027 symposium. Each entry has a unique `id`, `date`, optional `endDate`, `dateLabel`, `category`, `title`, `event`, `location`, and `summary`. Use `presentations` (each with `title`, `presenter`, and `format`) for talks, or `detailsTitle` and `detailsText` for other stories. Optional `links` contain a `label` and `url`; `note` holds context such as the original abstract deadline; `gallery: true` adds a gallery link. Keep announcements first, followed by recent events. Dates are event dates. Preserve year-only dates when no exact dates are supplied. Upcoming, past, and in-progress labels are calculated from the visitor's local date; a year-only event in the current year is labeled Announced. Six entries are initially shown, with expansion and upcoming/past filters. Presenting authors follow the CV's asterisks, and coauthored contributions are labeled separately from your own speaking roles. Content is manually curated.
- `teachingApproach` controls the introduction to why mechanics matters, three learning principles, topics, and the forward-looking `outlook` (`title` and `text`). `teaching` controls three subject cards, each with a `label`, `title`, and `detail`, describing what students explore and discuss. The section emphasizes learning and future teaching directions. `mentorship` and `outreach` appear in Education & beyond.
- `gallery` controls the photo and flyer cards. Use a unique `id`, local `image`, its actual `width` and `height`, descriptive `alt`, `title`, `event`, `location`, `dateLabel`, and `caption`. Optional `sourceUrl` and `sourceLabel` add an external source link. `kind: "document"` keeps a flyer fully visible inside its preview. All cards open a larger image in a native dialog. Photos are resized, oriented correctly, and stripped of embedded metadata.
- Save a résumé under `assets/`, then set `resume: "./assets/resume.pdf"`.
- Put your images under `assets/` and use relative paths such as `"./assets/my-project.webp"`. Supply descriptive `imageAlt` text. Aim for landscape images around 1200px wide. For a sharper portrait, replace the 250px original with a photo at least 800px wide and update `portrait`.
- Update or add `projects` entries. Use `category: "code"` or `"experiments"` for filtering and add a repository or paper `url`. `detail` is the longer text shown when a card is opened; `linkLabel` customizes its action. For multiple actions, use `links: [{ label: "Explore the atlas", url: "https://piyushwanchoo.com/Dynamic-Ashby-Atlas/" }, { label: "View on GitHub", url: "https://github.com/Piyushjhu/Dynamic-Ashby-Atlas" }]` instead of `url` and `linkLabel`. `art` can be `"code"`, `"data"`, `"wave"`, `"signal"`, `"bubble"`, or `"orb"` when no image is provided. Decorative data illustrations are marked as illustrations, not measurements.
- The main headlines and section headings are in `index.html`. Design tokens and responsive styling are in `styles.css`.

Example publication:

```js
publications: [
  {
    title: "Your paper title",
    authors: "Your name, Coauthor name",
    venue: "Journal or conference",
    year: "2026",
    url: "https://doi.org/your-paper-doi",
    pdf: "./assets/paper.pdf",
    abstract: "Your abstract."
  }
],
```

Example work history:

```js
experience: [
  {
    period: "2024 — Present",
    role: "Your role",
    organization: "Your company or institution",
    description: "What you work on and what you contributed.",
    current: true
  }
],
```

## Hosting and updates

This site is hosted on GitHub Pages from the `main` branch of `Piyushjhu/Piyushjhu.github.io`. The publishing source in **Settings → Pages** is **GitHub Actions**. Every push to `main` runs `.github/workflows/pages.yml` and deploys the updated site. You can also run the workflow manually from the repository’s **Actions** tab.

To update the website, edit `content.js` or the other site files, preview locally, then commit and push:

```sh
git add content.js
git commit -m "Update research and profile"
git push
```

Stage any other files you edited as well. Check deployment progress at https://github.com/Piyushjhu/Piyushjhu.github.io/actions.

The workflow stages only public site files into `_site/`, keeping scripts, documentation, and repository files out of the deployed artifact. JavaScript and CSS references in the staged HTML use filenames derived from each file’s contents, so a refreshed homepage loads updated files instead of a previously cached version. Source HTML keeps the original filenames for local previews. You can run `python3 scripts/build.py` to inspect the published version locally. Add extra public directories to that script if needed; files inside `assets/` are included automatically.

Official instructions: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

### Custom domain

`piyushwanchoo.com` is assigned to this repository in **Settings → Pages → Custom domain**. The domain is registered with Spaceship, and hosting remains on GitHub Pages. Keep the Spaceship nameservers and configure these records in **Advanced DNS → DNS records → Custom records**:

```text
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    piyushjhu.github.io
```

Use the default TTL and replace conflicting parking or redirect records for `@` and `www`. Preserve any email records. GitHub provides the HTTPS certificate after DNS is correct; enable **Enforce HTTPS** once the certificate is ready. With both DNS names configured, `www.piyushwanchoo.com` redirects to `piyushwanchoo.com`.

This site uses a custom GitHub Actions workflow, so the domain is configured in Pages settings rather than a `CNAME` file. Official instructions: [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Design and accessibility

The interface uses system fonts, a frosted navigation bar, responsive layouts, keyboard focus styles, semantic sections, a skip link, native dialogs, and a mobile menu. Motion respects the visitor’s reduced-motion setting; the sculpture pauses outside the viewport and in inactive tabs. Browsers without WebGL receive a local SVG alternative. External links open in a new tab with `noopener noreferrer`.

Validation performed: JavaScript and CSS syntax, DOM-based functional checks for research tabs and keyboard navigation, media behavior, direct links, gallery dialogs, and existing project/publication filters, news, teaching, and contact details. Media files are inspected and the Pages build output is checked against source files. Live visual/browser testing was unavailable because this session has no browser connector and computer-control permission was not granted.

The social preview SVG is a source asset. For social sharing, export it to a 1200 × 630 PNG and add `og:image` metadata in `index.html` with its **absolute public URL**. The canonical URL and `og:url` are set to `https://piyushwanchoo.com/`. Also update the initial `<title>` and descriptions in `index.html` if changing the name, since link-preview crawlers may not run JavaScript.
