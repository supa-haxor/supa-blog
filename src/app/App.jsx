import { useEffect, useRef, useState } from 'react';
import Blog from './Blog';
import SinglePost from './SinglePost';
import { getPostId } from '../utils/routes';
import { consumePendingEnterHome, restoreFeedScroll } from '../utils/navigate';

const App = ({ mode }) => {
    const [postId, setPostId] = useState(getPostId);
    const [enterHome, setEnterHome] = useState(false);
    const [revealMenu, setRevealMenu] = useState(false);
    const startedOnPost = useRef(!!getPostId());

    useEffect(() => {
        const sync = () => {
            const id = getPostId();
            setPostId(id);
            if (!id) {
                document.title = mode === 'archive' ? "supa hax0r's archives" : 'nomoredrama.co';
                if (startedOnPost.current) {
                    setRevealMenu(true);
                    startedOnPost.current = false;
                }
                if (consumePendingEnterHome()) {
                    setEnterHome(true);
                    window.setTimeout(() => setEnterHome(false), 600);
                }
            }
        };

        window.addEventListener('nmd:route', sync);
        window.addEventListener('popstate', sync);
        return () => {
            window.removeEventListener('nmd:route', sync);
            window.removeEventListener('popstate', sync);
        };
    }, [mode]);

    useEffect(() => {
        if (postId) {
            window.scrollTo(0, 0);
            return;
        }
        restoreFeedScroll();
    }, [postId]);

    return (
        <>
            <div className={`${postId ? 'route-hidden' : ''} ${enterHome ? 'enter-from-below' : ''}`.trim()}>
                <Blog mode={mode} isActive={!postId} revealMenu={revealMenu} />
            </div>
            {postId && <SinglePost mode={mode} postId={postId} />}
        </>
    );
};

export default App;
