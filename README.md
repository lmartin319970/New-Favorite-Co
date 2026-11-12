# NewFavorite

Dark editorial food blog built with Astro 5 and TypeScript, deployed statically with GitHub Pages.

## Quick start

Use Node.js 22 to match the deployment workflow.

```bash
npm install
npm run dev
```

Open http://localhost:4321. For a production build:

```bash
npm run build
npm run preview
```

`npm run build` runs Astro's type checks before generating the static site in `dist/`. For local newsletter configuration, copy `.env.example` to `.env` and set `PUBLIC_NEWSLETTER_ACTION` to your provider's form endpoint.

## Publishing with GitHub Actions

The repository is already connected to `https://github.com/lmartin319970/New-Favorite-Co`.

1. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
2. Set custom domain `newfavorite.co` in Pages before configuring its DNS records at GoDaddy. Enable HTTPS after DNS verifies.
3. Add the optional repository **Actions secret** `PUBLIC_NEWSLETTER_ACTION` (the actual HTML POST form endpoint for your provider, not its public signup page). `PUBLIC_*` values are exposed in the generated website; never put private API keys in them.
4. Commit your changes, including dependency changes to the tracked `package-lock.json`, and push to `main`.
5. The workflow `.github/workflows/deploy.yml` builds and deploys `dist/` on every push to `main`. You can also select **Actions → Deploy NewFavorite → Run workflow** to deploy manually. Check that both the `build` and `deploy` jobs succeed.

The workflow currently uses `npm install --no-audit --no-fund`. A lockfile is already tracked; switching the workflow to `npm ci` is an optional improvement for reproducible installs.

The site assumes the custom root domain `newfavorite.co`; for a GitHub `username.github.io/repository` subpath deployment, update `site` and `base` configuration and asset URLs.

## Google Analytics

The shared layout `src/layouts/Base.astro` installs Google Tag Manager container `GTM-W2W2FB9N` immediately after `<head>` on every page using Google's manual installation snippet. The scripts use Astro's `is:inline` directive to preserve the supplied code. No analytics GitHub secret or `PUBLIC_GA_ID` is needed. Configure analytics in this container rather than installing a second tag in the site code. See [Google's current container installation instructions](https://support.google.com/tagmanager/answer/14847097).

1. In Google Analytics, open **Admin > Data streams**, select the web stream for `https://newfavorite.co`, and copy its `G-...` Measurement ID.
2. In Google Tag Manager, open container `GTM-W2W2FB9N`. Confirm that it is connected to that Analytics destination. If it is not already configured, add a **Google tag** with that Measurement ID and the **Initialization - All Pages** trigger.
3. Deploy the website changes through GitHub Actions, then use **Preview** / Tag Assistant against `https://newfavorite.co` to verify the tag. **Submit** and publish any container changes.
4. Open the live site and check Google Analytics **Realtime**. Installing the website snippet alone does not confirm that Analytics is receiving data.

The container must have an Analytics destination configured and published for visits to reach Analytics. The layout initializes `gtag` so existing recipe interaction events can be queued; verify event delivery with your container configuration in Tag Assistant.

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
- **Analytics** is managed through Google Tag Manager container `GTM-W2W2FB9N` in `src/layouts/Base.astro`.
- **Recipe structured data** is included; only publish accurate tested recipes, images, and cooking times. No fake ratings are emitted.
- Add a sitemap integration (e.g. `@astrojs/sitemap`) before launch; then update `robots.txt` with the generated sitemap URL.
- Review and complete `/privacy/`, email addresses, branding, social links, and legal disclosures before launch.

## Scaling

Astro content collections are static, SEO-friendly, and straightforward to extend. If you need user accounts, synced bookmarks, submitted reviews, or paid subscriptions, use an external API/database or migrate the Astro adapter to a server-capable host. GitHub Pages cannot execute server-side functions. Ad scripts and affiliate links can be integrated in shared layouts and article templates after meeting provider policies and disclosure requirements.

## Important

The code is a starter, not a finished commercial product. Sample recipes and copy are placeholders. Check accessibility, mobile layout, image licensing, food safety, privacy/consent, and analytics before going live.
