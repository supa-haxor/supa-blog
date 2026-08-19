import { useState, useEffect } from 'react';
import { getConfig } from '../../utils/config';

export const useSinglePost = (mode, postId) => {
    const [post, setPost] = useState(null);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        if (!postId) return;

        const { blogId, apiKey } = getConfig(mode);
        setShowLoading(true);

        fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts/${postId}?key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                setPost(data && data.id ? data : null);
                setShowLoading(false);
                if (data && data.title) document.title = data.title;
            })
            .catch(() => {
                setPost(null);
                setShowLoading(false);
            });
    }, [mode, postId]);

    return { post, showLoading };
};
