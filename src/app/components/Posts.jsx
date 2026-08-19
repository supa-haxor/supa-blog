import { useRef } from 'react';
import Post from './Post'

const RenderedPosts = (({ posts, mode }) => {
    const renderedPosts = posts.map(post => {
        return <Post key={post.id} post={post} mode={mode} linkTitle /> 
    })

    return renderedPosts
})

const Loading = (({ showLoading }) => {
    if (showLoading)
        return (
            <div className="loading-posts"><i className="fas fa-spinner fa-pulse"></i></div>
        )
    
    return null
})

const Posts = (({ posts, showLoading, mode }) => {
    const postsRef = useRef(null)

    if (!posts || !posts.length)
        return (
            <div ref={ postsRef }>
                <Loading showLoading={ true } />
            </div>
        )
        
    return (
        <div className={ posts.length ? 'shown' : '' } ref={ postsRef }>
            <RenderedPosts posts={ posts } mode={ mode } />
            <Loading showLoading={ showLoading } />
        </div>
    )
})

export default Posts