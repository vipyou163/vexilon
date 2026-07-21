import { defineConfig } from 'astro/config';

// 站点部署在 /vexilon 子路径下，Markdown 正文中引用的 /images/xxx 需要补上前缀
const BASE = '/vexilon';

// 自定义 rehype 插件：给 Markdown 正文里的 <img src="/..."> 自动加上 base 前缀，
// 避免部署在子路径时图片跑到根路径 404。
function rehypeBaseImages() {
  const base = BASE.replace(/\/$/, ''); // '/vexilon'
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (
      node.type === 'element' &&
      node.tagName === 'img' &&
      node.properties &&
      typeof node.properties.src === 'string'
    ) {
      const src = node.properties.src;
      if (src.startsWith('/') && !src.startsWith(base) && !src.startsWith('//')) {
        node.properties.src = base + src;
      }
    }
    if (Array.isArray(node.children)) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  site: 'https://vipyou163.github.io',
  base: BASE,
  build: {
    assets: '_assets',
  },
  output: 'static',
  markdown: {
    rehypePlugins: [rehypeBaseImages],
  },
});
