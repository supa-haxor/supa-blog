import { isArchivePath, hrefHasPost, getPostId } from './routes';

const LEAVE_MS = 280;
const LEAVE_DOWN_MS = 450;
const FROM_BG_KEY = 'nmd-from-bg';

export const ARCHIVE_BG = '#a27bb7';
export const MAIN_BG = '#f9f9f9';

const themeColor = (isArchive) => (isArchive ? ARCHIVE_BG : MAIN_BG);

const paintBg = (color) => {
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
};

let pendingEnterPost = false;
let pendingEnterHome = false;
let navigating = false;
let feedScroll = { win: 0, posts: 0 };

const snapshotFeedScroll = () => {
    const feed = document.querySelector('.page-container:not(.single) #posts');
    feedScroll = {
        win: window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0,
        posts: feed ? feed.scrollTop : 0,
    };
};

export const restoreFeedScroll = () => {
    const apply = () => {
        const feed = document.querySelector('.page-container:not(.single) #posts');
        window.scrollTo(0, feedScroll.win);
        document.documentElement.scrollTop = feedScroll.win;
        document.body.scrollTop = feedScroll.win;
        if (feed) feed.scrollTop = feedScroll.posts;
    };
    apply();
    window.requestAnimationFrame(() => {
        apply();
        window.requestAnimationFrame(apply);
    });
};

export const consumePendingEnterPost = () => {
    const value = pendingEnterPost;
    pendingEnterPost = false;
    return value;
};

export const consumePendingEnterHome = () => {
    const value = pendingEnterHome;
    pendingEnterHome = false;
    return value;
};

export const preparePageBackground = (isArchive) => {
    const to = themeColor(isArchive);
    const from = sessionStorage.getItem(FROM_BG_KEY);
    sessionStorage.removeItem(FROM_BG_KEY);

    if (!from || from === to) {
        paintBg(to);
        return;
    }

    paintBg(from);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => paintBg(to));
    });
};

const finishLeave = () => {
    document.documentElement.classList.remove('is-leaving', 'is-leaving-down');
    document.body.classList.remove('is-leaving', 'is-leaving-down');
};

export const navigateInApp = (href) => {
    if (navigating) return;

    const sameTheme = isArchivePath(href) === isArchivePath(window.location.pathname);
    const vertical = hrefHasPost(href) || !!getPostId();
    const from = themeColor(isArchivePath(window.location.pathname));
    const to = themeColor(isArchivePath(href));

    sessionStorage.setItem(FROM_BG_KEY, from);
    paintBg(to);

    if (!sameTheme) {
        document.documentElement.classList.add(vertical ? 'is-leaving-down' : 'is-leaving');
        document.body.classList.add(vertical ? 'is-leaving-down' : 'is-leaving');
        window.setTimeout(() => {
            window.location.href = href;
        }, vertical ? LEAVE_DOWN_MS : LEAVE_MS);
        return;
    }

    if (hrefHasPost(href)) {
        snapshotFeedScroll();
        pendingEnterPost = true;
    } else if (getPostId()) {
        pendingEnterHome = true;
    }

    navigating = true;
    document.body.classList.remove('enter-from-below');
    document.documentElement.classList.add(vertical ? 'is-leaving-down' : 'is-leaving');
    document.body.classList.add(vertical ? 'is-leaving-down' : 'is-leaving');

    window.setTimeout(() => {
        window.history.pushState({}, '', href);
        finishLeave();
        window.dispatchEvent(new Event('nmd:route'));
        navigating = false;
    }, vertical ? LEAVE_DOWN_MS : LEAVE_MS);
};
