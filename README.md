# Somiil Gupta Australia Website — VS Code Pro Project

This is the editable source project. It is organised like a professional static website, but remains beginner-friendly and has no framework dependencies.

## Required public URLs

| Page | URL |
|---|---|
| Home | `/` |
| Business Astro Vastu | `/business-astro-vastu/` |
| Factory & Warehouse Vastu | `/factory-warehouse-vastu/` |
| Home Vastu | `/home-vastu/` |
| About Somiil Gupta | `/about/` |
| How It Works | `/how-it-works/` |
| Vastu in Australia & FAQs | `/vastu-in-australia/` |
| Book a Consultation | `/book/` |
| Insights & Resources | `/insights/` |

Those paths are generated exactly by the build.

## Open in VS Code

1. Extract this folder.
2. In VS Code choose **File → Open Folder** and select this project.
3. Open the VS Code terminal (`Ctrl + backtick`).
4. Run:

```bash
npm run dev
```

No `npm install` is required. The project uses Node.js only. Your local preview opens at `http://localhost:8080`.

## What you edit most often

### Business-wide details
`src/assets/config.js`

Edit WhatsApp, email, booking URL, payment URL and prices here.

### Main page copy
`src/index.html` — Home

`src/pages/business-astro-vastu.html` — Business Astro Vastu

`src/pages/factory-warehouse-vastu.html` — Factory & Warehouse

`src/pages/home-vastu.html` — Home Vastu

`src/pages/about.html` — About

`src/pages/how-it-works.html` — How It Works

`src/pages/vastu-in-australia.html` — Australia FAQ/SEO pillar

`src/pages/book.html` — A$249 booking funnel

`src/pages/insights.html` — Insights

### Colours and design
`src/assets/styles.css`

At the top of the file you will see the design tokens. Main brand colours are:

- `--brand-red: #8f1d2c`
- `--brand-red-dark: #65151f`
- `--charcoal: #17161a`
- `--accent-gold: #c8a25a`
- `--ivory: #f5eee7`

Change a token once and it updates the full website.

### Photos
`src/assets/images/`

### Header / navigation
`src/components/header.html`

### Footer
`src/components/footer.html`

### Site-wide navigation / domain / role
`src/data/site.json`

## Why this structure?

The original version repeated the header and footer inside every HTML file. That is error-prone. This project has **one shared header and one shared footer**, then a tiny dependency-free Node build script generates normal static HTML for deployment.

You edit normal HTML/CSS/JavaScript. No React, database, Nunjucks, Eleventy or external framework is required.

## Build for deployment

```bash
npm run build
```

The deployable website is created in:

`dist/`

Do not manually edit `dist/`; it is generated output. Always edit `src/`.

## Check internal links

After building:

```bash
npm run check
```

## Old URL redirects

`src/static/_redirects` contains redirect rules for hosts such as Netlify. If another hosting provider is used, apply the same mappings at server level so old SEO value is not lost.

## Important before launch

- Add the real Cal.com/Calendly URL in `src/assets/config.js`.
- Connect the AUD Stripe payment flow.
- Confirm legal wording with an Australian adviser.
- Verify every published credential/statistic and testimonial.
- Keep the hidden A$29 Discovery page out of navigation.
- Do not rename primary URLs without adding 301 redirects.

## Folder map

```text
src/
├── data/                  # site-wide navigation/domain details
├── components/            # shared layout, header and footer
├── assets/
│   ├── images/            # real Somiil/training photography
│   ├── styles.css         # complete visual system
│   ├── config.js          # contact/booking/business settings
│   └── app.js             # interactions/forms
├── pages/                 # every internal page
├── static/                # robots, sitemap, redirects
└── index.html             # homepage source
```
