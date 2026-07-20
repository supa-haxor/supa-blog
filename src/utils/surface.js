// supa-haxor.com serves the homepage; blog.supa-haxor.com serves the blog.
// Override locally with ?surface=home or ?surface=blog
export const getSurface = () => {
  const override = new URLSearchParams(window.location.search).get('surface');
  if (override === 'home' || override === 'blog') return override;

  return window.location.hostname.startsWith('blog.') ? 'blog' : 'home';
};
