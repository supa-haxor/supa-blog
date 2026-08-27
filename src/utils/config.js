export const getConfig = (mode = 'main') => {
    const current = {
        blogId: process.env.REACT_APP_BLOGGER_ID || process.env.BLOGGER_ID,
        apiKey: process.env.REACT_APP_BLOGGER_API_KEY || process.env.BLOGGER_API_KEY,
        aboutPageId: process.env.REACT_APP_ABOUT_PAGE_ID || '8664796053498369069',
    };

    if (mode === 'archive') return current;

    return {
        blogId: process.env.REACT_APP_MAIN_BLOGGER_ID || current.blogId,
        apiKey: process.env.REACT_APP_MAIN_BLOGGER_API_KEY || current.apiKey,
        aboutPageId: process.env.REACT_APP_MAIN_ABOUT_PAGE_ID || '4279940189949214043',
    };
};
