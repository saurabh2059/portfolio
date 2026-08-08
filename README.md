# Saurabh Aryal — Portfolio

Static, single-page portfolio. No frameworks, no build step. Plain HTML + CSS + vanilla JS.

## File structure

```
portfolio/
├── index.html          # markup only — content comes from js/data.js
├── css/
│   └── style.css       # design tokens at the top, then section-by-section
├── js/
│   ├── data.js         # ALL personal content (name, bio, skills, socials, CV path)
│   ├── projects.js     # project array — add/edit projects here
│   └── script.js       # renderProjects(), initNav(), initScrollAnimations(), initThemeToggle()…
└── assets/
    ├── cv.pdf          # PLACEHOLDER — replace with your real CV
    ├── images/         # profile.jpg + project screenshots
    └── icons/          # optional extra icons (icons are inline SVG in script.js)
```

## Run locally

Any of these work:

```bash
# Python (already installed on macOS)
python3 -m http.server 5173
# then open http://localhost:5173
```

```bash
# Node
npx serve .
```

Or right-click `index.html` in VS Code → **Open with Live Server**.
Opening `index.html` directly via `file://` also works, since everything is relative.

## What to replace

| What | Where |
| --- | --- |
| Name, role, tagline, hero intro | `js/data.js` → top of `SITE_DATA` |
| About paragraphs, fun fact, stat chips | `js/data.js` → `about` |
| Skills groups | `js/data.js` → `skills` |
| Email + social links | `js/data.js` → `email`, `socials` |
| Page `<title>` / meta description | `index.html` `<head>` |
| Profile photo | `assets/images/profile.jpg` (square, ~600×600) |
| CV | `assets/cv.pdf` |

If `assets/images/profile.jpg` is missing, the hero automatically shows an
initials placeholder instead — no broken image.

## Adding a project

Open `js/projects.js` and append an object:

```js
{
  title: 'My App',
  description: 'One or two short sentences about what it does.',
  tech: ['React', 'Node.js', 'MongoDB'],
  image: 'assets/images/my-app.png', // '' → auto gradient placeholder
  repo: 'https://github.com/saurabh2059/my-app',
  demo: 'https://my-app.vercel.app',  // omit or '' to hide the button
  featured: true                       // optional "Featured" badge
}
```

Cards render automatically — no HTML edits.

**Screenshots:** 16:9 works best (e.g. 1280×720 PNG/JPG), keep them under ~300 KB.

## Swapping the CV

1. Drop your PDF at `assets/cv.pdf` (overwrite the placeholder).
2. Optionally change the download filename in `js/data.js`:

```js
cv: { path: 'assets/cv.pdf', downloadName: 'Saurabh-Aryal-CV.pdf' }
```

Both the navbar "CV" button and the hero "Download CV" button pick this up.
The hero also has a "View CV" link that opens the PDF in a new tab.

## Theming

Change one variable at the top of `css/style.css` to re-skin the site:

```css
:root {
  --accent: #06b6d4;  /* cyan/teal */
}
```

`--accent-strong`, `--accent-soft` and `--accent-border` should be adjusted to match.
Light-theme accent overrides live in the `[data-theme='light']` block.

Theme choice is saved to `localStorage` under `portfolio-theme`, and defaults to
the visitor's OS preference on first visit.

## Contact form

The form uses a **`mailto:` handoff** — on submit it validates the fields and opens
the visitor's mail client pre-filled with the message, addressed to `SITE_DATA.email`.

To switch to Formspree later, replace the submit handler in
`initContactForm()` (`js/script.js`) with a `fetch()` POST to your endpoint.

## Deploying

It's a static site — drag the folder into Netlify, or push to GitHub and enable
GitHub Pages / Vercel. No build command, no output directory.

## Accessibility notes

- Skip link, semantic landmarks (`header`/`nav`/`main`/`section`/`footer`)
- Keyboard-navigable menu (Esc closes the mobile drawer, focus moves on anchor jump)
- `aria-pressed` / `aria-expanded` on the theme toggle and hamburger
- Respects `prefers-reduced-motion` (animations disabled)
# portfolio
