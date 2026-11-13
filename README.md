# 9six3.foo

Mysterious, image-driven static site built with **Astro 7** + **Tailwind CSS 4**, deployed as pure **Cloudflare Workers Static Assets** (no adapter, assets-only).

## Stack

- Astro 7 (static output)
- Tailwind CSS 4 via `@tailwindcss/vite`
- `@astrojs/sitemap`
- Content Collections (ready)
- Cloudflare Images CDN for the primary visual
- Full Open Graph + Twitter cards + JSON-LD structured data
- `robots.txt` + auto-generated sitemap

## Local development

```bash
npm install
npm run dev
```

## Build & Deploy (Cloudflare Workers Static Assets)

```bash
npm run build
# outputs pure static files to ./dist

# Deploy (requires wrangler logged in)
npm run deploy
# or
npx wrangler deploy
```

`wrangler.toml` is configured for assets-only:

```toml
[assets]
directory = "./dist"
```

No Worker script or `@astrojs/cloudflare` adapter is required.

## Domain

Production target: **https://9six3.foo**

CTA routes to: `sales@desertrich.com`

## SEO / canonical URLs

- Canonical host is **https://9six3.foo** (apex). `www.9six3.foo` → apex via **301**.
- `/index.html` (and `/index`) are **internal Worker rewrites** that return **200** homepage HTML — not HTTP redirects — so Search Console does not flag them as “Page with redirect”. The HTML canonical still points at `/`.

## Notes

- Fully static, edge-cached via Cloudflare.
- Mobile-first, full-viewport image with atmospheric fades, vignette, grain, and subtle drift.
- No body copy — visual + single acquisition CTA + required disclaimer footer.
