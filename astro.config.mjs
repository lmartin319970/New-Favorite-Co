import { defineConfig } from 'astro/config';
export default defineConfig({ site: 'https://newfavorite.co', output: 'static', trailingSlash: 'always', redirects: { '/journal/': '/discover/' } });
