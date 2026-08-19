// dependencies
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

// components
import Banner from './components/Banner'
import NavBarMenu from './components/NavBarMenu'
import Posts from './components/Posts'
import BackToTop from './components/BackToTop'
import { useBlogMainLogic } from './hooks/useBlogMainLogic';
import archiveLogo from '../assets/images/l33t_supa_h4x0r_icon.svg'

const Blog = ({ mode = 'main', isActive = true, revealMenu = false }) => {
    const {
        posts,
        showLoading,
        showMenu,
        postsRef,
        toggleMenu,
        updateHeightMenu,
        getPosts,
        setShowMenu,
        showBackToTop,
        showMiniBar,
        scrollToTop,
        openMenuFromMini,
    } = useBlogMainLogic(mode, isActive, revealMenu);

    return (
        <div className="page-container">
            <div className="header-wrapper">
                <Banner 
                    onClick={toggleMenu}
                    onMiniClick={openMenuFromMini}
                    icon={mode === 'archive' ? archiveLogo : undefined}
                    mini={showMiniBar}
                />
                <NavBarMenu 
                    mode={mode}
                    onClick={getPosts}
                    onHeightMenuChange={updateHeightMenu}
                    showMenu={showMenu}
                    onOpenLink={() => setShowMenu(false)}
                />
                <p className={`site-credit ${showMenu ? 'visible' : ''}`}>
                    made with love by Cursor and the{' '}
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/supa-haxor">@supa-haxor</a>
                </p>
            </div>
            <div ref={postsRef} id="posts">
                <Posts 
                    posts={posts}
                    showLoading={showLoading}
                    mode={mode}
                />
            </div>
            <BackToTop visible={showBackToTop} onClick={scrollToTop} />
        </div>
    )
}

export default Blog