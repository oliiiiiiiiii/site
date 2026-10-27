import { createShikiHighlighter } from '@astrojs/internal-helpers/shiki';
import g from './src/lib/asm-grammar.mjs';
const h = await createShikiHighlighter({ langs: [g], theme: 'github-dark' });
const out = await h.codeToHtml('load R3 A ; c\nlw x1, 0(sp)', 'asm', {});
console.log(out);
