// Deterministic monoalphabetic substitution that preserves casing and non-letters.
// Only letters [A-Za-z] are substituted; digits, punctuation, whitespace, and diacritics are left unchanged.
const BASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
// A fixed shuffled alphabet (stable across runs)
const SUBSTITUTION_ALPHABET = 'phqgiumeaylnofdxjkrcvstzwb';

const lowerMap = (() => {
  const mapping = {};
  for (let i = 0; i < BASE_ALPHABET.length; i += 1) {
    mapping[BASE_ALPHABET[i]] = SUBSTITUTION_ALPHABET[i];
  }
  return mapping;
})();

export function obfuscateTextPreserveShape(input) {
  if (!input || typeof input !== 'string') return input;
  let result = '';
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    const lower = ch.toLowerCase();
    if (lowerMap[lower]) {
      const mapped = lowerMap[lower];
      result += ch === ch.toUpperCase() ? mapped.toUpperCase() : mapped;
    } else {
      result += ch;
    }
  }
  return result;
}

// Walks a DOM subtree and obfuscates only text nodes that are not inside <a> elements.
export function obfuscateHtmlPreservingLinks(htmlString) {
  if (!htmlString || typeof document === 'undefined') return htmlString;
  const container = document.createElement('div');
  container.innerHTML = htmlString;

  const isInsideAnchor = (node) => {
    let current = node && node.parentNode;
    while (current) {
      if (current.nodeType === Node.ELEMENT_NODE && current.nodeName.toLowerCase() === 'a') return true;
      current = current.parentNode;
    }
    return false;
  };

  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  const textNodes = [];
  let current = walker.nextNode();
  while (current) {
    textNodes.push(current);
    current = walker.nextNode();
  }

  for (let i = 0; i < textNodes.length; i += 1) {
    const textNode = textNodes[i];
    if (!isInsideAnchor(textNode)) {
      textNode.nodeValue = obfuscateTextPreserveShape(textNode.nodeValue);
    }
  }

  return container.innerHTML;
}


