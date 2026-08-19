import { useEffect, useRef, useState } from 'react';
import Banner from './components/Banner'
import Post from './components/Post'
import { useSinglePost } from './hooks/useSinglePost'
import { consumePendingEnterPost, navigateInApp } from '../utils/navigate'
import { homeHref } from '../utils/routes'
import { checkIfMobile } from '../utils/deviceUtils'
import archiveLogo from '../assets/images/l33t_supa_h4x0r_icon.svg'

const SinglePost = ({ mode, postId }) => {
    const { post, showLoading } = useSinglePost(mode, postId);
    const shouldAnimate = useRef(consumePendingEnterPost());
    const pageRef = useRef(null);
    const [enter, setEnter] = useState(false);
    const [showMiniBar, setShowMiniBar] = useState(false);

    useEffect(() => {
        if (showLoading || !post || !shouldAnimate.current) return;
        shouldAnimate.current = false;
        const frame = window.requestAnimationFrame(() => setEnter(true));
        return () => window.cancelAnimationFrame(frame);
    }, [showLoading, post]);

    useEffect(() => {
        const page = pageRef.current;
        const onScroll = () => {
            const scrolled = Math.max(page?.scrollTop || 0, window.scrollY || 0);
            setShowMiniBar(checkIfMobile() && scrolled > 120);
        };
        page?.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            page?.removeEventListener('scroll', onScroll);
            window.removeEventListener('scroll', onScroll);
        };
    }, [post]);

    const ready = !showLoading && post;
    const goHome = () => navigateInApp(homeHref(mode));
    const scrollToTop = () => {
        pageRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            ref={pageRef}
            className={`page-container single${mode === 'archive' ? ' archive' : ''}${enter ? ' enter-from-below' : ''}`}
            onAnimationEnd={(e) => {
                if (e.animationName === 'page-enter-from-below') setEnter(false);
            }}
        >
            {ready ? (
                <>
                    <Banner
                        onClick={goHome}
                        onMiniClick={scrollToTop}
                        mini={showMiniBar}
                        icon={mode === 'archive' ? archiveLogo : undefined}
                    />
                    <div id="posts">
                        <Post post={post} />
                    </div>
                    <footer className="single-footer">
                        <div className="single-footer-links">
                            <a target="_blank" rel="noopener noreferrer" href="https://supa-haxor.com">about</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://x.com/supa_haxor">X</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/supa_haxor">insta</a>
                            <a target="_blank" rel="noopener noreferrer" href="https://youtube.com/@supahaxor">youtube</a>
                        </div>
                        <p className="single-footer-slogan">siendo usted mismo, así duela</p>
                        <p className="single-footer-credit">
                            made with love by Cursor and the{' '}
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/supa-haxor">@supa-haxor</a>
                        </p>
                    </footer>
                </>
            ) : (
                <div id="posts">
                    <div className="loading-posts"><i className="fas fa-spinner fa-pulse"></i></div>
                </div>
            )}
        </div>
    )
}

export default SinglePost
