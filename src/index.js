import React from 'react';
import ReactDOM from 'react-dom';
import './styles/fonts.scss';
import './styles/blog.scss';
import Blog from './app/Blog';
import Home from './app/Home';
import { getSurface } from './utils/surface';

const App = () => {
  return getSurface() === 'blog' ? <Blog></Blog> : <Home></Home>
}

ReactDOM.render(
  <App></App>,
  document.querySelector('#supa-blog')
)