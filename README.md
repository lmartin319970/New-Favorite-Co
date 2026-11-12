# NewFavorite

Dark editorial food blog built with Astro 5 and TypeScript, deployed statically with GitHub Pages.

## Quick start

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open http://localhost:4321. For a production build:

```bash
npm run build
npm run preview
```

## Publishing with GitHub Actions

1. Create a GitHub repository and commit all project files, (commit the generated `package-lock.json` after running `npm install`).
2. Push to the `main` branch.
3. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
4. Set custom domain `newfavorite.co` in Pages and configure the required DNS records at your domain registrar. Enable HTTPS after DNS verifies.
5. The workflow `.github/workflows/deploy.yml` runs on every push to `main`.
6. Add optional repository **Actions secrets** `PUBLIC_GA_ID` and `PUBLIC_NEWSLETTER_ACTION` (the latter must be the actual HTML POST form endpoint for your provider, not its public signup page). `PUBLIC_*` values are exposed in the generated website; never put private API keys in them.

**Note:** The workflow uses `npm install` so the starter deploys without a pre-generated lockfile. Once you commit a `package-lock.json`, change the workflow to `npm ci` for reproducible installs. The site assumes the custom root domain `newfavorite.co`; for a GitHub `username.github.io/repository` subpath deployment, update `site` and `base` configuration and asset URLs.

## Content

- `src/content/recipes/*.md`: structured recipe metadata and editorial body.
- `src/content/discover/*.md`: ingredient and technique articles.
- `src/content/journal/*.md`: casual cooking posts.
- `src/content.config.ts`: validation schemas.
- Replace sample recipes with tested recipes and accurate images before launch.
- Your uploaded photographs are included as sample images; replace the temporary hero image with a higher-resolution landscape image for best results.

## Engagement and backend limits

- **Surprise Me** navigates to a random recipe.
- **Save recipe** and **I tried it** persist per browser using `localStorage`. They do not sync across devices and do not produce aggregated counts.
- **I tried it** includes optional feedback via `mailto:`; it is not a public review database or star rating system. To add actual public ratings, comments, moderation, and aggregated stats, integrate a backend such as Supabase and implement spam controls, authentication, and rate limits.
- **Newsletter** uses a configurable provider form action. Confirm the provider's exact form field names, embed method, consent language, and anti-spam controls. The default field name is `email`.
- **Analytics** is opt-in via `PUBLIC_GA_ID`; add a suitable consent solution before enabling analytics where required.
- **Recipe structured data** is included; only publish accurate tested recipes, images, and cooking times. No fake ratings are emitted.
- Add a sitemap integration (e.g. `@astrojs/sitemap`) before launch; then update `robots.txt` with the generated sitemap URL.
- Review and complete `/privacy/`, email addresses, branding, social links, and legal disclosures before launch.

## Scaling

Astro content collections are static, SEO-friendly, and straightforward to extend. If you need user accounts, synced bookmarks, submitted reviews, or paid subscriptions, use an external API/database or migrate the Astro adapter to a server-capable host. GitHub Pages cannot execute server-side functions. Ad scripts and affiliate links can be integrated in shared layouts and article templates after meeting provider policies and disclosure requirements.

## Important

The code is a starter, not a finished commercial product. Sample recipes and copy are placeholders. Check accessibility, mobile layout, image licensing, food safety, privacy/consent, and analytics before going live.
