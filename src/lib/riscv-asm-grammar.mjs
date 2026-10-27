// Custom Shiki/TextMate grammar for the assembly snippets in the notes.
// Registered as `riscv-asm`; astro.config.mjs aliases ```asm fences to it, replacing
// Shiki's bundled x86-oriented `asm` grammar. Tailored for RISC-V (and the course's
// pseudo-assembly): the first word on a line is the mnemonic, labels end in `:`,
// and `#`, `;` and `//` all start comments (`#1` is still an immediate).
const REG =
  'x(?:[12]?[0-9]|3[01])|zero|ra|sp|gp|tp|fp|t[0-6]|s(?:1[01]|[0-9])|a[0-7]|rs[12]|rd|R[0-9]+';

export default {
  name: 'riscv-asm',
  scopeName: 'source.asm.course',
  patterns: [
    { include: '#comment' },
    {
      // label, optionally followed by an instruction on the same line
      match: '^\\s*([A-Za-z_.][\\w.]*)(:)(?:\\s*([A-Za-z][\\w.]*))?',
      captures: {
        1: { name: 'entity.name.function.label.asm' },
        2: { name: 'punctuation.separator.label.asm' },
        3: { name: 'keyword.mnemonic.asm' },
      },
    },
    { match: '^\\s*(\\.[A-Za-z]\\w*)', captures: { 1: { name: 'storage.type.directive.asm' } } },
    { match: '^\\s*([A-Za-z][\\w.]*)', captures: { 1: { name: 'keyword.mnemonic.asm' } } },
    { match: `(?<![\\w$])(?:${REG})\\b`, name: 'variable.register.asm' },
    { match: '\\$[A-Za-z0-9]+\\b', name: 'variable.register.asm' },
    { match: '(?<![\\w])#?-?(?:0[xX][0-9a-fA-F]+|0[bB][01]+|[0-9]+)\\b', name: 'constant.numeric.asm' },
    { match: '"(?:[^"\\\\]|\\\\.)*"', name: 'string.quoted.double.asm' },
  ],
  repository: {
    comment: {
      patterns: [
        { begin: '/\\*', end: '\\*/', name: 'comment.block.asm' },
        { match: '(?:^|(?<=\\s))(?:#(?![0-9])|;|//).*$', name: 'comment.line.asm' },
      ],
    },
  },
};
