import moment from 'moment';
import parse from 'html-react-parser';

import MusicButton from '../components/MusicButton'
import { navigateInApp } from '../../utils/navigate'
import { postHref } from '../../utils/routes'
import { excerptFromHtml, isPlayLink } from '../../utils/excerpt'

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
    const excerpt = linkTitle ? excerptFromHtml(post.content) : null;
    const goToPost = (e) => {
        if (e.target.closest('a, button')) return
        navigateInApp(href)
    };

    return (
        <div
            id={post.id}
            className={`post${linkTitle ? ' feed' : ''}${hasScriptureLabel(post.labels) ? ' scripture' : ''}`}
            onClick={linkTitle ? goToPost : undefined}
        >
            {post.title && <h2>{post.title}</h2>}
            <span className="date">
                {moment(post.published).format('Do MMMM YYYY')}
                <span className="hours">{moment(post.published).format(', h:mm a')}</span>
            </span>
            <div className="post-content">
                {excerpt?.truncated ? (
                    <>
                        {excerpt.parts.map((part, i) => (
                            typeof part === 'string'
                                ? part
                                : <MusicButton key={`${part.play}-${i}`} href={part.play} />
                        ))}
                        <span className="read-more">leer más</span>
                    </>
                ) : (
                    replaceLinks(post.content)
                )}
            </div>
        </div>
    )
})

export default Post
