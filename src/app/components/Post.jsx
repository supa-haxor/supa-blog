import moment from 'moment';
import parse from 'html-react-parser';
import { obfuscateHtmlPreservingLinks } from '../../utils/obfuscate';

import MusicButton from '../components/MusicButton'
import './Post.scss'

const Post = (({ post }) => {
    const replaceLinks = (htmlString) => {
        const processedHtml = obfuscateHtmlPreservingLinks(htmlString);
        const options = {
            replace: (domNode) => {
                if (domNode.name === 'a' && domNode.attribs && (domNode.attribs.href.includes('youtube.com') || domNode.attribs.href.includes('youtu.be') || domNode.attribs.href.includes('spotify.com'))) {
                    return (
                        <MusicButton href={domNode.attribs.href}/>
                    );
                }
            },
        };
        return parse(processedHtml, options);
    };

    return (
        <div id={post.id} className={`post ${post.labels && post.labels && post.labels.includes('scripture') ? 'scripture' : ''}`} key={post.id}>
            {post.title &&
                <h2>{post.title}</h2> 
            }
            <span className="date">
                {moment(post.published).format('Do MMMM YYYY')}
                <span className="hours">{moment(post.published).format(', h:mm a')}</span>
            </span>
            <div
                className="post-content" 
            >
                    {replaceLinks(post.content)}
                </div>
        </div>
    )
})

export default Post
