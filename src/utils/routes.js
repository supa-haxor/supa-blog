export const getPathname = (href = window.location.pathname) =>
    (href.split('?')[0] || '/').replace(/\/+$/, '') || '/';

export const isArchivePath = (href) => getPathname(href) === '/archive';

export const getPostId = () =>
    new URLSearchParams(window.location.search).get('post');

export const hrefHasPost = (href) => /(?:\?|&)post=/.test(href);

export const homeHref = (mode) => (mode === 'archive' ? '/archive' : '/');

export const postHref = (mode, postId) =>
    `${homeHref(mode)}?post=${encodeURIComponent(postId)}`;
