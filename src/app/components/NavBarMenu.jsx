import { useEffect, useRef, useState } from 'react';
import Link from './Link'
import { navigateInApp } from '../../utils/navigate'

const NavBarMenu = (({ mode = 'main', showMenu, onClick, onHeightMenuChange, onOpenLink }) => {
    const menuRef = useRef(null);
    const [styles, setStyles] = useState({})
    const [selectedItem, setSelectedItem] = useState('home')

    const triggerSearch = ((tag, pageId = null) => {
        setSelectedItem(tag || pageId)
        if (tag === 'home')
            tag = null

        onClick(true, tag, pageId)
    })

    const updateStyles = () => {
        const clientHeight = menuRef?.current?.clientHeight;

        if (clientHeight) {
          setStyles({
            marginTop: showMenu ? 0 : ((clientHeight + 30) * -1),
          });
          onHeightMenuChange(clientHeight + 30)
        }
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
            {mode === 'archive' ? (
                <div 
                    onClick={() => triggerSearch(null, '8664796053498369069')}
                    className={selectedItem === '8664796053498369069' ? 'selected' : ''}
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
            {mode === 'archive' ? (
                <a href="/" onClick={(e) => { e.preventDefault(); navigateInApp('/'); }}>today</a>
            ) : (
                <a href="/archive" onClick={(e) => { e.preventDefault(); navigateInApp('/archive'); }}>archive</a>
            )}
            
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
        </div>
    )
})

export default NavBarMenu
