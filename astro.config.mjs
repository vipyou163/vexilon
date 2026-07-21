import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/',
  build: {
    assets: '_assets',
  },
  output: 'static',
});
