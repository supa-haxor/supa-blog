import { useState, useEffect, useCallback, useRef } from 'react';
import { getConfig } from '../../utils/config';
import { checkIfMobile } from '../../utils/deviceUtils';

export const useBlogMainLogic = (mode = 'main', isActive = true, revealMenu = false) => {
  // State variables
  const [posts, setPosts] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [showLoading, setShowLoading] = useState(true);
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [blogTag, setBlogTag] = useState(null);
  const [menuHeight, setMenuHeight] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { blogId, apiKey } = getConfig(mode);


  const postsRef = useRef(null);

  const toggleMenu = useCallback(() => setShowMenu(prev => !prev), []);
  const updateHeightMenu = useCallback((height) => setMenuHeight(height), []);
  const scrollToTop = useCallback(() => {
    postsRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getPosts = useCallback((newSearch, tag, pageId = null) => {
    if (newSearch)
        setPosts([])

    let labelQuery
    let token = nextPageToken
    let url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=5`
    // if this is a new search, then we need to reset the posts, nextPageToken, and blogTag
    if (newSearch){
        token = ''
        setNextPageToken('')
        setPosts(() => [])
        setBlogTag(tag)

        if (pageId) {
            url = `https://www.googleapis.com/blogger/v3/blogs/${blogId}/pages/${pageId}?key=${apiKey}`;
        } else if (tag)
            url += `&labels=${tag}`;
    }
    // if this is not a new search, then we need to append the nextPageToken to the url
    else {
        url += `${token ? `&pageToken=${token}` : ''}`
        url += blogTag ? `&labels=${blogTag}` : ''
    }

    setFetchingPosts(true)
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            // if the pageId is set, then we are fetching a single page
            if (pageId){
                setPosts([data])
                setShowLoading(data.nextPageToken && true)
            }
            // if the pageId is not set, then we are fetching a list of posts
            else {
                if (data.items)
                    setPosts(prevPosts => [...prevPosts, ...data.items])
    
                setNextPageToken(data.nextPageToken)
                // this hides the loading icon when there are no more posts to load
                setShowLoading(data.nextPageToken && true)
            }

            if(newSearch)
                setShowMenu(false);

            return new Promise(resolve => {
                setTimeout(() => {
                    setFetchingPosts(false)
                    resolve()
                }, 500)
            })
        })
        .catch(error => {
            console.error(error)
            setShowLoading(false)
            return Promise.reject(error)
        });
  }, [blogId, apiKey, nextPageToken, blogTag]);

    // this listens for scroll events in order to load more posts
    const handleScroll = useCallback((e) => {
        const target = e.target.scrollingElement || e.target;
        const { scrollTop, clientHeight, scrollHeight } = target;
        const postsTop = postsRef.current ? postsRef.current.scrollTop : 0;
        const winTop = window.scrollY || document.documentElement.scrollTop || 0;

        setShowBackToTop(Math.max(scrollTop, postsTop, winTop) >= window.innerHeight);

        if (isMobile && menuHeight && scrollTop > menuHeight) {
            setShowMenu(false);
        }

        if (showLoading && !fetchingPosts && scrollTop + clientHeight >= scrollHeight - 200) {
            getPosts();
        }
    }, [isMobile, menuHeight, showLoading, fetchingPosts, getPosts]);

    // this listens for resize events on the window
    useEffect(() => {
        let isMobileLocal = checkIfMobile();
        setIsMobile(isMobileLocal);
        
        const handleResize = () => {
            isMobileLocal = checkIfMobile();
            setIsMobile(isMobileLocal);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // this listens for scroll events on the posts element
    useEffect(() => {
        const postsElement = postsRef.current;

        if (postsElement) {
            postsElement.addEventListener('scroll', handleScroll, { passive: true });
        }
        
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (postsElement) {
                postsElement.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    
    // this gets triggered every time posts[] is updated
    useEffect(() => {
        if (!posts.length && !fetchingPosts)
            getPosts().then(() => {
                if (!isActive) return
                setTimeout(() => {
                    setShowMenu(false)
                }, 3500)
            });
    }, [posts.length, fetchingPosts, getPosts, mode, isActive]);

    useEffect(() => {
        if (!isActive || !revealMenu) return
        setShowMenu(true)
        const timer = setTimeout(() => {
            setShowMenu(false)
        }, 3500)
        return () => clearTimeout(timer)
    }, [isActive, revealMenu, mode]);

  return {
    posts,
    showLoading,
    showMenu,
    postsRef,
    isMobile,
    toggleMenu,
    updateHeightMenu,
    getPosts,
    setShowMenu,
    showBackToTop,
    scrollToTop
  };
};