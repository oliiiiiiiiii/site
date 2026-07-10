// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkSpoilers from './src/lib/remark-spoilers.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://oliiiiiiiiii.csie.org',
  integrations: [mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath, remarkSpoilers],
      rehypePlugins: [rehypeKatex],
    }),
  },
});
