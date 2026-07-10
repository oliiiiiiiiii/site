const spoilerPattern = /\|\|([^|]+?)\|\|/g;

const spoilerNode = (value) => ({
  type: 'mdxJsxTextElement',
  name: 'span',
  attributes: [
    { type: 'mdxJsxAttribute', name: 'className', value: 'spoiler' },
    { type: 'mdxJsxAttribute', name: 'data-spoiler', value: '' },
    { type: 'mdxJsxAttribute', name: 'role', value: 'button' },
    { type: 'mdxJsxAttribute', name: 'tabIndex', value: '0' },
    { type: 'mdxJsxAttribute', name: 'aria-label', value: 'Spoiler：點擊顯示內容' },
  ],
  children: [{ type: 'text', value }],
});

const transformChildren = (parent) => {
  if (!Array.isArray(parent?.children)) return;

  for (let index = 0; index < parent.children.length; index += 1) {
    const child = parent.children[index];

    if (child.type !== 'text' || !child.value.includes('||')) {
      transformChildren(child);
      continue;
    }

    const replacements = [];
    let cursor = 0;
    spoilerPattern.lastIndex = 0;

    for (const match of child.value.matchAll(spoilerPattern)) {
      if (match.index > cursor) replacements.push({ type: 'text', value: child.value.slice(cursor, match.index) });
      replacements.push(spoilerNode(match[1]));
      cursor = match.index + match[0].length;
    }

    if (cursor === 0) continue;
    if (cursor < child.value.length) replacements.push({ type: 'text', value: child.value.slice(cursor) });
    parent.children.splice(index, 1, ...replacements);
    index += replacements.length - 1;
  }
};

export default function remarkSpoilers() {
  return transformChildren;
}
