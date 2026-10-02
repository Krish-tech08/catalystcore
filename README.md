# CatalystCore Studios — Website

A static website for **CatalystCore Studios**, built as a central hub for all
CatalystCore Studios Android apps — including each app's About, Privacy
Policy, and Terms of Use pages.

The site is plain HTML, CSS, and vanilla JavaScript. No build step, backend,
or database is required. It is designed to be deployed directly on
**GitHub Pages**.

---

## Project Structure

```
/
├── index.html                     Homepage
├── about.html                     About CatalystCore Studios
├── apps/
│   ├── index.html                 Full list of all apps
│   ├── privacy.html               Single shared privacy policy
│   ├── grind-quest/
│   │   ├── index.html             App overview / landing page
│   │   ├── privacy.html           Legacy privacy URL redirect
│   │   └── terms.html             Terms of Use
│   └── pdf-image-toolkit/
│       ├── index.html
│       ├── privacy.html           Legacy privacy URL redirect
│       └── terms.html
├── assets/
│   ├── images/                    General images (OG covers, screenshots)
│   ├── logos/                     App and studio logos
│   └── icons/                     Favicon and small icons
├── css/
│   └── style.css                  Shared design system + styles
├── js/
│   └── main.js                    Shared JS (mobile nav toggle only)
└── README.md
```

All internal links use **relative paths**, so the site works correctly
whether it's hosted at the root of a GitHub Pages domain
(`username.github.io`) or in a subpath
(`username.github.io/repo-name`).

---

## Deploying to GitHub Pages

1. Push this project to a GitHub repository.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or your default branch), folder `/ (root)`
4. Save. GitHub will publish the site at:
   `https://<your-username>.github.io/<repo-name>/`
5. Once you know the final URL, update the `<!-- TODO -->` canonical and
   Open Graph URLs in each HTML file's `<head>`.

No build step is required — the site is served as-is.

---

## How to Add a New App

The project is structured so a new app can be added without restructuring
anything else.

1. **Create the new app folder** under `apps/`, e.g. `apps/new-app/`.
2. **Copy the overview and terms templates** from an existing app folder
      (e.g. `apps/pdf-image-toolkit/`):
   - `index.html`
   - `terms.html`
3. **Replace app name, description, logo, and links** in both copied
   files:
   - Page `<title>` and meta description
   - Open Graph tags and canonical URL
   - App name, tagline, and description in the visible content
   - Icon initials / logo image (see `assets/logos/`)
4. **Add an app card** to `apps/index.html`, using an existing
      `<article class="card app-card">` block as a template. Point its privacy
      link to the new app's `privacy.html` entry point.
5. **Add the app to the homepage** (`index.html`) if it should be featured
   there too — copy the same app card block into the `#apps` section.
6. **Add the Play Store URL** by replacing the `<!-- TODO: Add actual Play
   Store URL -->` placeholder button `href` in the new app's `index.html`.
7. **Update the shared policy** in `apps/privacy.html` to cover the new app's
      actual data collection, permissions, storage, third-party services, and
      advertising details. Keep `apps/new-app/privacy.html` as a redirect to
      `../privacy.html` if the app's public URL must remain available.

No changes to `css/style.css`, `js/main.js`, or the overall folder structure
are needed — the design system and shared components already support
additional apps.

---

## Design System

Colors, spacing, and other design tokens are defined as CSS custom
properties at the top of `css/style.css`:

```css
--background
--surface
--surface-secondary
--text
--text-muted
--accent
--border
```

Change these values to re-theme the entire site from one place.

---

## TODO Placeholders — Review Before Publishing

Search the project for `TODO` to find every item below in context.

**Sitewide**
- [ ] Replace `https://example.github.io/catalystcore-studios/...` canonical
      and Open Graph URLs with the real production URL, in every HTML file.
- [ ] Add `assets/icons/favicon.ico`.
- [ ] Add `assets/images/og-cover.png` (homepage) and per-app OG cover
      images.
- [ ] Add a support email address on `about.html`, in `apps/privacy.html`,
      and in each `terms.html` "Contact" section.
- [ ] Optionally expand the "Approach" section on `about.html`.

**Grind Quest**
- [ ] Add the real Google Play Store URL in `apps/grind-quest/index.html`.
- [ ] Review the shared policy in `apps/privacy.html` for Grind Quest: data
      collected, use, permissions, storage, third-party services, advertising.
- [ ] Confirm the children's privacy statement matches the app's actual
      audience.
- [ ] Set the "Last updated" date on both `privacy.html` and `terms.html`.
- [ ] Have the Terms of Use liability section reviewed if needed.

**PDF & Image Toolkit**
- [ ] Add the real Google Play Store URL in
      `apps/pdf-image-toolkit/index.html`.
- [ ] Add the specific list of PDF and image tools included, in
      `apps/pdf-image-toolkit/index.html`.
- [ ] Review the shared policy in `apps/privacy.html` for PDF & Image Toolkit:
      data collected, use, permissions, storage, third-party services,
      advertising.
- [ ] Confirm the children's privacy statement matches the app's actual
      audience.
- [ ] Set the "Last updated" date on both `privacy.html` and `terms.html`.
- [ ] Have the Terms of Use liability section reviewed if needed.

---

## Notes

- The site has no dependencies beyond static HTML/CSS/JS — nothing to
  install and nothing to build.
- Privacy Policy and Terms of Use pages intentionally contain placeholder
  text rather than invented claims about data collection, permissions, or
  advertising. Fill these in accurately before publishing, since these
  pages may be required by Google Play's app listing requirements.
