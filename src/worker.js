/**
 * Edge redirects for SEO:
 * - Canonical host: www → apex (301)
 * - HTML aliases: /index.html (and similar) → / (301)
 *
 * Workers Static Assets defaults to 307 for HTML handling, which Search Console
 * often reports as "Redirect error". Intercepting first with permanent redirects.
 */
const CANONICAL_HOST = '9six3.foo';

function needsHostCanonical(hostname) {
  return hostname === `www.${CANONICAL_HOST}`;
}

function canonicalizePath(pathname) {
  if (pathname === '/index.html' || pathname === '/index' || pathname === '//') {
    return '/';
  }
  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostFix = needsHostCanonical(url.hostname);
    const pathFix = canonicalizePath(url.pathname);

    if (hostFix || pathFix) {
      if (hostFix) {
        url.hostname = CANONICAL_HOST;
      }
      if (pathFix) {
        url.pathname = pathFix;
      }
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
