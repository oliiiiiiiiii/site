import { createShikiHighlighter } from '@astrojs/internal-helpers/shiki';
import g from './src/lib/asm-grammar.mjs';
const h = await createShikiHighlighter({ langs: [g], theme: 'github-dark', langAlias: { asm: 'riscv-asm' } });
console.log(await h.codeToHtml('load R3 A ; c', 'asm', {}));
