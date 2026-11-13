/**
 * Edge SEO routing for Workers Static Assets:
 * - Canonical host: www → apex (301)
 * - HTML aliases (/index.html, /index, //): internal rewrite to /
 *   returning 200 homepage content (not an HTTP redirect)
 *
 * Why rewrites for aliases: GSC flags HTTP redirects of /index.html as
 * "Page with redirect". The page already declares canonical https://9six3.foo/,
 * so serving the same HTML at 200 avoids that while keeping one indexable URL.
 * Host canonicalization stays a permanent 301.
 */
const CANONICAL_HOST = '9six3.foo';

function needsHostCanonical(hostname) {
  return hostname === `www.${CANONICAL_HOST}`;
}

function isHomepageAlias(pathname) {
  return pathname === '/index.html' || pathname === '/index' || pathname === '//';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Prefer host canonicalization first (www + alias → 301 to apex; path may stay or normalize).
    if (needsHostCanonical(url.hostname)) {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // Apex path aliases: rewrite internally so the client gets 200 + homepage HTML.
    if (isHomepageAlias(url.pathname)) {
      const homepage = new URL('/', request.url);
      return env.ASSETS.fetch(new Request(homepage, request));
    }

    return env.ASSETS.fetch(request);
  },
};
