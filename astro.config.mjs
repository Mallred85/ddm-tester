import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://duckduckmow.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://duckduckmow.com/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        if (
          item.url.includes('/herriman-lawn-care') ||
          item.url.includes('/riverton-lawn-care') ||
          item.url.includes('/south-jordan-lawn-care') ||
          item.url.includes('/bluffdale-lawn-care')
        ) {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        if (item.url.includes('/pricing')) {
          return { ...item, priority: 0.85, changefreq: 'monthly' };
        }
        if (item.url.includes('/services/')) {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        if (item.url === 'https://duckduckmow.com/services') {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }
        if (item.url === 'https://duckduckmow.com/blog') {
          return { ...item, priority: 0.5, changefreq: 'weekly' };
        }
        return { ...item, priority: 0.5 };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
