import moment from 'moment';
import parse from 'html-react-parser';

import MusicButton from '../components/MusicButton'
import { navigateInApp } from '../../utils/navigate'
import { postHref } from '../../utils/routes'

const isPlayLink = (href = '') =>
    /youtube\.com|youtu\.be|spotify\.com|soundcloud\.com|snd\.sc/.test(href)

const hasScriptureLabel = (labels) =>
    (labels || []).some((label) => String(label).replace(/^#/, '').toLowerCase() === 'scripture')

const Post = (({ post, mode, linkTitle }) => {
    const replaceLinks = (htmlString) => {
        const options = {
            replace: (domNode) => {
                if (domNode.name === 'a' && domNode.attribs && isPlayLink(domNode.attribs.href)) {
                    return (
                        <MusicButton href={domNode.attribs.href}/>
                    );
                }
            },
        };
        return parse(htmlString, options);
    };

    const href = postHref(mode, post.id);
    const goToPost = (e) => {
        e.preventDefault();
        navigateInApp(href);
    };

    return (
        <div id={post.id} className={`post ${hasScriptureLabel(post.labels) ? 'scripture' : ''}`} key={post.id}>
            {post.title && (
                linkTitle ? (
                    <h2>
                        <a href={href} onClick={goToPost}>{post.title}</a>
                    </h2>
                ) : (
                    <h2>{post.title}</h2>
                )
            )}
            {linkTitle ? (
                <a className="date" href={href} onClick={goToPost}>
                    {moment(post.published).format('Do MMMM YYYY')}
                    <span className="hours">{moment(post.published).format(', h:mm a')}</span>
                </a>
            ) : (
                <span className="date">
                    {moment(post.published).format('Do MMMM YYYY')}
                    <span className="hours">{moment(post.published).format(', h:mm a')}</span>
                </span>
            )}
            <div
                className="post-content" 
            >
                    {replaceLinks(post.content)}
                </div>
        </div>
    )
})

export default Post
