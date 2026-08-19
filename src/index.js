import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { preparePageBackground } from './utils/navigate';

const isArchive = window.location.pathname.replace(/\/+$/, '') === '/archive';

preparePageBackground(isArchive);
document.title = isArchive ? "supa hax0r's archives" : 'nomoredrama.co';

if (isArchive) {
  require('./archive/theme/index.scss');
} else {
  require('./styles/index.scss');
}

ReactDOM.render(
  <App mode={isArchive ? 'archive' : 'main'} />,
  document.querySelector('#supa-blog')
)
