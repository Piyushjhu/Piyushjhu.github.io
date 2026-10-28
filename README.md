# Piyush’s personal website

A lightweight, Apple-inspired personal website with an animated impact-to-discovery sequence, project filters and detail dialogs, active and past research, publications, a news feed, a work timeline, a personal overview, teaching, and a photo gallery. Plain HTML, CSS, and JavaScript. No package installation, build framework, paid service, or API key required. All assets are local.

**Website:** https://piyushwanchoo.com/

**Repository:** https://github.com/Piyushjhu/Piyushjhu.github.io

## Preview

From this directory, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **http://localhost:8000**. You can also open `index.html` directly, but a local server better represents GitHub Pages.

## Personalize

Edit **content.js**. This file controls your name, bio, interests, portrait, projects, selected papers, career history, education, teaching approach and courses, mentorship, gallery, awards, capabilities, talks, service, email, résumé, and profile links. Profile and teaching prose draw on your supplied research and teaching statements. The site contains seven research/software projects, including Dynamic Ashby Atlas with website and repository links, 14 curated journal articles (including the accepted article), and five preprints/manuscripts with their status shown. Those curated bibliographic details use your September 2026 CV. Google Scholar metrics and its publication list refresh automatically as described below. Media sources are listed in `assets/CREDITS.md`. The HELIX photo and Cu–Ti animation were supplied by Piyush.

- `researchDescription` and `researchVision` set the research goal and the Measure → Explain → Choose the next test workflow. `researchStudies` contains three active research stories and two past research stories. Each entry has a unique `id`, `status: "active"` or `"past"`, `label`, `title`, `summary`, `institution`, `tags`, optional `details` (each with `title` and `text`), and optional `links` (each with `label` and `url`). Optional `image`, `imageAlt`, and `caption` add a photo; `video`, `poster`, `mediaLabel`, and `caption` add a video. Keep media under `assets/research/`. Videos use native controls, do not autoplay, and pause when their research tab is hidden. Research tabs support arrow keys, Home, and End. Direct links such as `#publications`, `#past-research`, and `#research-spall-strength` reveal the corresponding panel.
- Your GitHub, Google Scholar, LinkedIn, and university email are connected. `email` is the only address shown in the contact dialog.
- `news` holds the curated talks, conferences, workshops, and organizing updates. Paper updates are generated automatically from `scholar-data.js` on the same daily refresh as publication metrics; `newsPublicationStartYear` (currently 2025) sets the earliest publication year included in News. Paper cards preserve Scholar's titles, authors, venues, links, and year-only dates. Preprints are labeled separately; records without a year remain in Publications. The default feed shows recent activity first, with future events after it. Papers, Talks & events, Upcoming, and Past events filters are available, with six entries initially shown and a button to expand the feed.
- Add new talks to `news` with a unique `id`, `date`, optional `endDate`, `dateLabel`, `category`, `title`, `event`, `location`, and `summary`. Dates are event dates in New York time. Use exact dates where known; a current-year event with only a year stays Announced until more precise dates are supplied. Upcoming, In progress, and Past event labels update on each page load. Optional `summaryOngoing`, `summaryPast`, and `titlePast` provide the appropriate wording during and after an event; keep base copy time-neutral when alternatives are absent. `presentations` contains `title`, `presenter`, `format`, and optional `formatPast`. Presenters distinguish your own talks from coauthored contributions. New talk discovery still requires a curated entry or an additional calendar/event source; Scholar is the source for papers only. Other fields: `detailsTitle` and `detailsText`, `links` (`label`, `url`), `note`, and `gallery: true`.

- `teachingApproach` controls the teaching introduction, three learning principles, topics, and the course-development `outlook` (`title` and `text`). `teaching` controls three subject cards, each with a `label`, `title`, and `detail`, describing what students explore and discuss. The section emphasizes learning and future teaching directions. `mentorship` and `outreach` appear in Education & service.
- `gallery` controls the photo and flyer cards. Use a unique `id`, local `image`, its actual `width` and `height`, descriptive `alt`, `title`, `event`, `location`, `dateLabel`, and `caption`. Optional `sourceUrl` and `sourceLabel` add an external source link. `kind: "document"` keeps a flyer fully visible inside its preview. All cards open a larger image in a native dialog. Photos are resized, oriented correctly, and stripped of embedded metadata.
- Save a résumé under `assets/`, then set `resume: "./assets/resume.pdf"`.
- Put your images under `assets/` and use relative paths such as `"./assets/my-project.webp"`. Supply descriptive `imageAlt` text. Aim for landscape images around 1200px wide. For a sharper portrait, replace the 250px original with a photo at least 800px wide and update `portrait`.
- Update or add `projects` entries. Use `category: "code"` or `"experiments"` for filtering and add a repository or paper `url`. `detail` is the longer text shown when a card is opened; `linkLabel` customizes its action. For multiple actions, use `links: [{ label: "Explore the atlas", url: "https://piyushwanchoo.com/Dynamic-Ashby-Atlas/" }, { label: "View on GitHub", url: "https://github.com/Piyushjhu/Dynamic-Ashby-Atlas" }]` instead of `url` and `linkLabel`. `art` can be `"code"`, `"data"`, `"wave"`, `"signal"`, `"bubble"`, or `"orb"` when no image is provided. Decorative data illustrations are marked as illustrations, not measurements.
- The main headlines and section headings are in `index.html`. Design tokens and responsive styling are in `styles.css`.

## Automatic Google Scholar updates

The Pages workflow is scheduled to refresh your public profile (`L0GoOBAAAAAJ`) daily at 10:17 UTC, and on pushes to `main` or manual runs. It updates total citations, h-index, i10-index, publication count, and the Google Scholar publication list. That list opens by default in Publications; selected papers, journal articles, and in-progress manuscripts remain separate views. Scholar records can include preprints, conference contributions, and other works, so its count is labeled **Publications · Google Scholar**, not journal articles. The citation card and publication section show the last successful refresh date in New York time.

**One-time setup for unattended updates:** Google returned HTTP 403 to the GitHub-hosted runner during verification. Create a [SerpApi account](https://serpapi.com/pricing), then add its key as the repository Actions secret **`SERPAPI_API_KEY`** under [Settings → Secrets and variables → Actions](https://github.com/Piyushjhu/Piyushjhu.github.io/settings/secrets/actions). Its listed free plan includes 250 searches per month; one daily author-profile request uses approximately 30–31 searches, plus pushes and manual runs. Keep the key in GitHub secrets. After adding it, run the Pages workflow manually to verify a saved snapshot and deployment. Until the key is added, the workflow keeps the verified snapshot rather than claiming a successful refresh.

`scripts/update_scholar.py` uses the SerpApi Google Scholar Author API when that environment variable is configured; otherwise it tries the permitted public profile URL, which works from the local computer. Each refresh requests up to 100 records. It validates the author, all-time metrics, publication IDs, links, and completeness before atomically replacing `scholar-data.js`. It never fetches individual citation pages or search results. Provider request parameters, raw response metadata, and API keys are discarded; only public Scholar fields enter the snapshot. Errors report the service and status without request URLs or credentials. A blocked request, changed markup, provider error, or incomplete list leaves the saved data and its update date intact. The site loads only the local, versioned snapshot; visitors make no requests to Scholar or SerpApi, and the browser policy stays unchanged. No external Python package is required. API documentation: [Scholar author records](https://serpapi.com/google-scholar-author-api), [all-time citation metrics](https://serpapi.com/google-scholar-author-cited-by).

The workflow's Scholar job has `contents: write` only to save `scholar-data.js` through the GitHub Contents API. It uses the built-in job token, checks the previous file SHA to avoid overwriting a concurrent edit, and passes the resulting commit to the read-only build job. It does not persist Git credentials. Successful daily refreshes also record repository activity; a failed refresh produces a visible Actions warning and deploys the previous snapshot. GitHub can delay scheduled runs or disable inactive schedules; inspect **Actions → Deploy personal website to GitHub Pages** and use **Run workflow** when needed. See [GitHub scheduled workflow behavior](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

To refresh locally:

```sh
python3 scripts/update_scholar.py
python3 scripts/build.py
python3 scripts/check_site.py
python3 -m unittest discover -s tests
```

Commit `scholar-data.js` with other site edits when publishing a local refresh. Do not hand-edit its generated assignment. If the profile eventually contains more than 100 records, the importer will refuse to publish a partial count; the complete previous snapshot remains available until the importer is extended.

## Search visibility

The homepage has a descriptive name-first title, a canonical URL, and `WebSite`, `ProfilePage`, and `Person` structured data linking the site to your academic profiles. Keep the title and description in `index.html` and `content.js` consistent when updating them. Identity metadata lives in `index.html`; `robots.txt` and `sitemap.xml` are copied into the public build. The sitemap lists the canonical homepage, not section fragments.

To monitor Google indexing, add `https://piyushwanchoo.com/` as a URL-prefix property in Google Search Console, verify ownership, submit `sitemap.xml`, and inspect the homepage to request indexing. Search Console provides a unique verification tag if you choose HTML-tag verification; add that tag inside the HTML head. Link this website from your GitHub, LinkedIn, Google Scholar, and university profile where you control the links. These steps support discovery and identification; ranking is determined by Google.

The supplied HTML-file verification token, `googled4d0811a1c9ead7f.html`, is published unchanged at the site root and explicitly included in the build. Keep this file in place so Google can continue checking ownership. Finish verification in Search Console using the HTML file upload method.

The final typography block in `styles.css` keeps descriptions at 16px, secondary text at 14px, and small labels at 12px, using rem units so browser font preferences continue to apply.

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

## Security and deployment checks

The homepage uses a restrictive Content Security Policy and an explicit `strict-origin-when-cross-origin` referrer policy. Scripts, stylesheets, images, fonts, and video must be local. Inline executable JavaScript, event handlers, inline CSS markup, frames, plugins, workers, and script network connections are disabled. Gallery dimensions are assigned through trusted JavaScript style properties; illustrative chart bars use stylesheet rules. The JSON-LD identity metadata is allowed by its exact SHA-256 hash, which the build regenerates automatically. After editing structured data, run `python3 scripts/security_policy.py` to refresh the source-preview hash as well.

Before publishing, run:

```sh
python3 scripts/build.py
python3 scripts/check_site.py
python3 -m unittest discover -s tests
```

These checks reject weakened policies, executable inline scripts, nonlocal page subresources, missing files, common credential patterns, and accidentally staged internal paths. They do not replace reviewing every file placed in `assets/`, which is public. The workflow runs validation for pull requests with read-only permissions; pushes to `main`, scheduled refreshes, and manual dispatches can deploy. Only the separate Scholar snapshot job receives repository-write permission, and its built-in token is never included in public files. Official Actions are pinned to verified full commit IDs, checkout does not persist credentials, and Dependabot proposes weekly Actions updates as pull requests.

HTML meta policies cannot supply HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Permissions-Policy`, or CSP `frame-ancestors`. These response-header protections require a header-capable serving layer. Do not claim they are enabled by this HTML policy, or add an ineffective `_headers` file to GitHub Pages. Domain ownership verification belongs in **GitHub profile Settings → Pages**, separately from the repository's custom-domain setting and Google Search Console. Keep the generated GitHub verification TXT record in Spaceship DNS after verification.

The prepared edge configuration and account setup steps are in [deployment/README.md](deployment/README.md). They are not activated by the GitHub Pages workflow. For a browser check, serve this repository on localhost and open `tests/browser-security.html`; the harness exercises the staged site and controlled injection probes. It is excluded from the public build.

## Design and accessibility

The interface uses system fonts, a frosted navigation bar, responsive layouts, keyboard focus styles, semantic sections, a skip link, native dialogs, and a mobile menu. The opening SVG sequence illustrates flyer impact, a time-resolved response, and repeated measurements contributing to a material map. Its physics and data are labeled schematic. It has a pause/resume control, suspends offscreen and in inactive tabs, and shows a complete static composition when JavaScript is unavailable or reduced motion is requested. Each animated cycle adds a point; the illustrated dataset loops after six cycles. No WebGL, external animation library, or browser network request is required. External links open in a new tab with `noopener noreferrer`.

Validation performed: JavaScript and CSS syntax, DOM-based functional checks for research tabs and keyboard navigation, media behavior, direct links, gallery dialogs, and existing project/publication filters, news, teaching, and contact details. Media files are inspected and the Pages build output is checked against source files. The hero was additionally checked in an isolated headless Chrome browser at phone, tablet, and desktop widths, including pause/resume, reduced motion, and the JavaScript-disabled fallback.

The social preview SVG is a source asset. For social sharing, export it to a 1200 × 630 PNG and add `og:image` metadata in `index.html` with its **absolute public URL**. The canonical URL and `og:url` are set to `https://piyushwanchoo.com/`. Also update the initial `<title>` and descriptions in `index.html` if changing the name, since link-preview crawlers may not run JavaScript.
