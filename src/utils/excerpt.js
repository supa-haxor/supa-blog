const EXCERPT_CHARS = 320
const PLAY_RE = /youtube\.com|youtu\.be|spotify\.com|soundcloud\.com|snd\.sc/i

export const isPlayLink = (href = '') => PLAY_RE.test(href)

const pushText = (parts, count, max, raw, truncated) => {
    if (truncated.value) return count
    const text = String(raw || '').replace(/\s+/g, ' ')
    if (!text || (text === ' ' && !parts.length)) return count
    const remaining = max - count
    if (remaining <= 0) {
        truncated.value = true
        return count
    }
    if (text.length <= remaining) {
        const last = parts[parts.length - 1]
        if (typeof last === 'string') parts[parts.length - 1] = last + text
        else parts.push(text)
        return count + text.length
    }
    const cut = text.slice(0, remaining).replace(/\s+\S*$/, '').trimEnd()
    if (cut) {
        const last = parts[parts.length - 1]
        if (typeof last === 'string') parts[parts.length - 1] = last + cut
        else parts.push(cut)
    }
    truncated.value = true
    return max
}

export const excerptFromHtml = (html = '', max = EXCERPT_CHARS) => {
    const parts = []
    const truncated = { value: false }
    let count = 0
    const parser = new DOMParser()
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html')
    const root = doc.body.firstChild

    const walk = (node) => {
        if (truncated.value || !node) return
        if (node.nodeType === 3) {
            count = pushText(parts, count, max, node.nodeValue, truncated)
            return
        }
        if (node.nodeType !== 1) return

        const tag = node.tagName.toLowerCase()
        if (tag === 'script' || tag === 'style') return

        const href = node.getAttribute('href') || ''
        const src = node.getAttribute('src') || ''

        if (tag === 'a' && isPlayLink(href)) {
            parts.push({ play: href })
            return
        }
        if ((tag === 'iframe' || tag === 'video' || tag === 'audio') && isPlayLink(src)) {
            parts.push({ play: src })
            return
        }
        if (tag === 'img') return
        if (tag === 'br') {
            count = pushText(parts, count, max, ' ', truncated)
            return
        }

        const block = /^(p|div|h[1-6]|li|blockquote)$/.test(tag)
        if (block) count = pushText(parts, count, max, ' ', truncated)
        node.childNodes.forEach(walk)
        if (block) count = pushText(parts, count, max, ' ', truncated)
    }

    walk(root)

    const hasMore = /<(img|iframe|video|audio)\b/i.test(html)
    if (hasMore) truncated.value = true

    if (truncated.value) {
        const last = parts[parts.length - 1]
        if (typeof last === 'string' && last.trim()) {
            parts[parts.length - 1] = last.trimEnd() + '…'
        }
    }

    return { parts, truncated: truncated.value }
}
