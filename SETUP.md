# Security Headers Setup

The app now emits browser-side defense-in-depth headers with a `<meta http-equiv="Content-Security-Policy">` tag and a referrer policy meta tag, but those do not change Mozilla Observatory's HTTP response-header score on their own.

To move the grade for `https://rohit-gupta.in`, put an edge layer in front of GitHub Pages and add the headers at the response boundary.

## Recommended option: Cloudflare in front of GitHub Pages

1. Point the apex DNS for `rohit-gupta.in` at Cloudflare and proxy the record.
2. Keep GitHub Pages as the origin.
3. Set Cloudflare SSL/TLS mode to `Full (strict)`.
4. Add a Transform Rule that modifies response headers on all routes with these exact values:

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

5. Enable HSTS in Cloudflare SSL/TLS -> Edge Certificates rather than relying on GitHub Pages.

## Alternative hosting option

If you do not want Cloudflare, migrate hosting to Cloudflare Pages or Netlify and configure the same five headers there with `_headers` or `netlify.toml`.

Do not switch the deployment target without confirming the hosting migration, because that would replace the existing GitHub Pages flow.

## Analytics note

The GA4 bootstrap was moved to `public/analytics-init.js` so the app can keep a CSP without `script-src 'unsafe-inline'`.

## App CSP note

The app-level CSP meta keeps `script-src 'unsafe-inline'` because the Next.js App Router export emits inline Flight scripts that are not nonce-hash friendly in a static export. The edge-layer response header remains strict and should still carry the production policy without `unsafe-inline`.
