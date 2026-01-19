import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vibecodingclaude.com',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true
    }
  }
});
