import { createHighlighter } from 'shiki';
import g from '/sessions/rcw-011rrzkhsxkb1ml1tkqkfqsd/mnt/site/src/lib/asm-grammar.mjs';
const h = await createHighlighter({ themes: ['github-dark'], langs: [g] });
const code = `fact:
    addi sp, sp, -16 ; save x1
L1: lw x10, offset($sp) ## load arguments
  li x4, #1
  ; sd x5, 16(sp)
  // comment
  load a, 2:3
  beq a1, zero, one # k = 0`;
for (const line of h.codeToTokensBase(code, { lang: 'asm', theme: 'github-dark' }))
  console.log(line.map(t => `${t.content}<${t.color}>`).join(''));
