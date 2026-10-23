# Piyush’s personal website

A lightweight, Apple-inspired personal website with original interactive 3D artwork, project filters and detail dialogs, publications, LinkedIn news stories, a work timeline, and a portrait. Plain HTML, CSS, and JavaScript. No package installation, build framework, paid service, or API key required. All assets are local.

**Website:** https://piyushjhu.github.io/

**Repository:** https://github.com/Piyushjhu/Piyushjhu.github.io

## Preview

From this directory, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **http://localhost:8000**. You can also open `index.html` directly, but a local server better represents GitHub Pages.

## Personalize

Edit **content.js**. This file controls your name, bio, interests, portrait, projects, papers, career history, education, teaching, awards, capabilities, talks, service, email, résumé, and profile links. The site is populated with the professional details you supplied, your existing portrait, six research/software projects, 14 journal articles (including the accepted article), and five preprints/manuscripts with their status shown. Bibliographic details and metrics use your September 2026 CV; they do not update automatically. The source and license for the laboratory photo are in `assets/CREDITS.md` and attributed in the HELIX project dialog.

- Your GitHub, Google Scholar, LinkedIn, university email, and Gmail are connected. `email` and `personalEmail` appear with separate labels in the contact dialog.
- Edit `news` to add or update story cards. These are curated summaries, not an automatically synchronized LinkedIn feed. Each entry has `category`, `year`, `topic`, `title`, `summary`, `url`, and `linkLabel`; `paperUrl` is optional. Decorative `art` can be `"wave"`, `"exchange"`, or `"layers"`. The years refer to the research or conference, not an inferred post date. The initial stories summarize your publicly visible JMPS announcement, USNC-TAM/SEM speaking updates, and 2023 composite research post. The first two link to your LinkedIn profile because direct post permalinks were not publicly available; replace those `url` values when you have the links. The archive story links directly to your original post.
- Save a résumé under `assets/`, then set `resume: "./assets/resume.pdf"`.
- Put your images under `assets/` and use relative paths such as `"./assets/my-project.webp"`. Supply descriptive `imageAlt` text. Aim for landscape images around 1200px wide. For a sharper portrait, replace the 250px original with a photo at least 800px wide and update `portrait`.
- Update or add `projects` entries. Use `category: "code"` or `"experiments"` for filtering and add a repository or paper `url`. `detail` is the longer text shown when a card is opened; `linkLabel` customizes its action. `art` can be `"code"`, `"data"`, `"wave"`, `"signal"`, `"bubble"`, or `"orb"` when no image is provided. Decorative data illustrations are marked as illustrations, not measurements.
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

The workflow stages only public site files into `_site/`, keeping scripts, documentation, and repository files out of the deployed artifact. You can run `python3 scripts/build.py` to inspect it locally. Add extra public directories to that script if needed; files inside `assets/` are included automatically.

Official instructions: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Design and accessibility

The interface uses system fonts, a frosted navigation bar, responsive layouts, keyboard focus styles, semantic sections, a skip link, native dialogs, and a mobile menu. Motion respects the visitor’s reduced-motion setting; the sculpture pauses outside the viewport and in inactive tabs. Browsers without WebGL receive a local SVG alternative. External links open in a new tab with `noopener noreferrer`.

Validation performed: JavaScript syntax, 26 DOM-based functional checks (project/publication filtering, dialog behavior, contact links, navigation, academic content, and internal anchors), local asset references, and the Pages build output. Live visual/browser testing was unavailable because this session has no browser connector and computer-control permission was not granted. Check the preview on your desktop and phone before publishing.

The social preview SVG is a source asset. For social sharing, export it to a 1200 × 630 PNG and add `og:image` metadata in `index.html` with its **absolute public URL**. The canonical URL and `og:url` are set to `https://piyushjhu.github.io/`. Also update the initial `<title>` and descriptions in `index.html` if changing the name, since link-preview crawlers may not run JavaScript.
