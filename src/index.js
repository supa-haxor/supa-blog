import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { preparePageBackground } from './utils/navigate';

const isArchive = window.location.pathname.replace(/\/+$/, '') === '/archive';

preparePageBackground(isArchive);
document.documentElement.classList.add(isArchive ? 'is-archive' : 'is-main');
document.title = isArchive ? "supa hax0r's archives" : 'nomoredrama.co';

const theme = isArchive
  ? import('./archive/theme/index.scss')
  : import('./styles/index.scss');

theme.then(() => {
  ReactDOM.render(
    <App mode={isArchive ? 'archive' : 'main'} />,
    document.querySelector('#supa-blog')
  );
});
