import { useEffect, useRef, useState } from 'react';
import Link from './Link'
import { navigateInApp } from '../../utils/navigate'
import { getConfig } from '../../utils/config'

const NavBarMenu = (({ mode = 'main', showMenu, onClick, onHeightMenuChange, onOpenLink }) => {
    const menuRef = useRef(null);
    const [styles, setStyles] = useState({})
    const [selectedItem, setSelectedItem] = useState('home')
    const { aboutPageId } = getConfig(mode)

    const triggerSearch = ((tag, pageId = null) => {
        setSelectedItem(tag || pageId)
        if (tag === 'home')
            tag = null

        onClick(true, tag, pageId)
    })

    const updateStyles = () => {
        const menu = menuRef?.current;
        if (!menu) return;

        const clientHeight = menu.clientHeight;
        if (!clientHeight) return;

        // keep CSS bottom margin when open; when closed collapse exactly
        // so posts don't climb into #banner (the old +30 overshot on mobile)
        setStyles(
            showMenu
                ? { marginTop: 0, marginBottom: '' }
                : { marginTop: -clientHeight, marginBottom: 0 }
        );
        onHeightMenuChange(clientHeight);
    };

    useEffect(() => {
        updateStyles(); // Initial style calculation
    
        const handleResize = () => {
          updateStyles(); // Update styles on window resize
        };
    
        window.addEventListener('resize', handleResize);

        window.onload = () => {
            updateStyles();
        };
    
        return () => {
          window.removeEventListener('resize', handleResize); // Cleanup on unmount
        };
      }, [showMenu]); 

    return (
        <div 
            className={`menu ${showMenu ? 'opened' : ''}`}
            ref={menuRef}
            style={styles}
        >
            <div 
                onClick={() => triggerSearch('home')}
                className={selectedItem === 'home' ? 'selected' : ''}
            >
                    home
            </div>
            {aboutPageId ? (
                <div 
                    onClick={() => triggerSearch(null, aboutPageId)}
                    className={selectedItem === aboutPageId ? 'selected' : ''}
                >
                    about
                </div>
            ) : (
                <Link
                    label="about"
                    href="https://supa-haxor.com"
                    onClick={onOpenLink}
                />
            )}
            {mode === 'archive' && (
                <div 
                    onClick={() => triggerSearch('scripture')}
                    className={selectedItem === 'scripture' ? 'selected' : ''}
                >
                    scriptures
                </div>
            )}
            {mode === 'archive' && (
                <a href="/" onClick={(e) => { e.preventDefault(); navigateInApp('/'); }}>back</a>
            )}
            {mode !== 'archive' && (
                <>
                    <Link 
                        label="X"
                        href="https://x.com/supa_haxor"
                        onClick={onOpenLink}
                    />
                    <Link 
                        label="insta"
                        href="https://instagram.com/supa_haxor"
                        onClick={onOpenLink}
                    />
                    <Link 
                        label="youtube"
                        href="https://youtube.com/@supahaxor"
                        onClick={onOpenLink}
                    />
                </>
            )}
        </div>
    )
})

export default NavBarMenu
