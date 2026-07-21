import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://vipyou163.github.io',
  base: '/vexilon',
  build: {
    assets: '_assets',
  },
  output: 'static',
});
