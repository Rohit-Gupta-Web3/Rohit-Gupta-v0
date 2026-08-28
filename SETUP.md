# Production Setup & Post-Launch Checklist

Operational steps for `https://rohit-gupta.in` that live outside the app code
(hosting/edge config and analytics settings). The code-side work — meta CSP,
externalized GA bootstrap, optimized hero, Person JSON-LD — is already committed.

---

## 1. Security headers (Mozilla Observatory: D → A-)

The app emits a `<meta http-equiv="Content-Security-Policy">` and a
`<meta name="referrer">` for real, browser-side defense in depth. **These do not
change the Observatory grade**, because Observatory scores the HTTP *response
header*, not the meta tag — and `X-Frame-Options`, `X-Content-Type-Options`, and
`Strict-Transport-Security` are ignored entirely when delivered as meta tags.

The site is a Next.js **static export on GitHub Pages**, which cannot emit custom
response headers (and `next.config` `headers()` is a no-op under
`output: "export"`). So the grade only moves once an edge layer sets real headers.

### Recommended: Cloudflare in front of GitHub Pages (free, no migration)

Keeps GitHub Pages as the origin; Cloudflare adds the headers at the edge.

1. Add `rohit-gupta.in` to a Cloudflare account (Websites → Add a site).
2. At the registrar, change the nameservers to the two Cloudflare gives you.
3. In Cloudflare DNS, keep the existing GitHub Pages records (the apex `A`
   records to GitHub's IPs and/or the `www` `CNAME`) and set them to
   **Proxied** (orange cloud).
4. **SSL/TLS → Overview →** set mode to **Full (strict)**.
5. **SSL/TLS → Edge Certificates →** enable **HSTS** with:
   `max-age = 31536000`, **Include subdomains** on, **Preload** on. (This is the
   cleanest way to ship the HSTS header; do not rely on GitHub Pages for it.)
6. **Rules → Transform Rules → Modify Response Header → Create rule.** Apply to
   *all incoming requests*, and **Set** each of these headers:

```text
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests; img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://www.googletagmanager.com
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

(HSTS is delivered by step 5, so it is not repeated in the Transform Rule.)

### Alternative: migrate hosting

If you would rather not use Cloudflare, host on Cloudflare Pages or Netlify and
ship the same headers via a `_headers` file or `netlify.toml [[headers]]`. This
**replaces** the GitHub Pages deploy in `.github/workflows/pages.yml` — do not
switch without deciding to migrate.

### Honest note on the CSP `script-src`

The policy above keeps `'unsafe-inline'` in `script-src`. This is deliberate:
the static export emits one inline Next.js hydration script
(`self.__next_f.push(...)`) into every page's HTML, and GitHub Pages serves that
HTML verbatim, so the edge header must permit it. Consequences:

- With `'unsafe-inline'`, expect Observatory to land around **B+ / A-** (all five
  headers present, but the CSP `script-src` is not "strict"). That is already a
  large jump from D and satisfies the four failing tests.
- To reach a **clean A / A+ strict CSP**, replace `'unsafe-inline'` with a
  `'sha256-...'` hash of that inline script. Because the script content is stable
  per build, a small post-`next build` step can compute the hash from `out/` and
  inject it into both the meta tag and the edge header. Treat that as a separate
  follow-up if the B+/A- grade is not enough.

### Verify

```bash
curl -sI https://rohit-gupta.in | grep -iE 'content-security-policy|x-frame|x-content-type|referrer-policy|strict-transport'
```

All five headers should appear. Then re-scan at
`https://developer.mozilla.org/en-US/observatory/analyze?host=rohit-gupta.in`,
and confirm the live site shows **no CSP violations** in the browser console and
that GA still fires (a request to `google-analytics.com/g/collect` on a CTA click).

---

## 2. Analytics (GA4) — key events

The app already fires `book_calendar` and `resume_download` via
`lib/analytics.ts`. Both are now **marked as key events** in GA4
(Admin → Data display → Events → star), done 2026-08-28 on property
`rohit-gupta.in` (551031002), so CTA clicks count as conversions going forward.

- Verify: **Reports → Engagement → Key events** should list `book_calendar` and
  `resume_download` once new conversions come in (data is not retroactive).
- Housekeeping: three unused key events from an earlier setup
  (`close_convert_lead`, `purchase`, `qualify_lead`, all "No stream data
  detected") can be unstarred to keep the list clean — optional.

---

## 3. Search Console

- The homepage sitemap is submitted and read. To speed initial surfacing, use
  **URL Inspection → Request Indexing** on `https://rohit-gupta.in/`.
- Search data is expected to be near-zero for the first few weeks after the
  domain cutover; recheck impressions/queries and average position in ~2-3 weeks,
  by which point the recrawl should have picked up the new `Person` JSON-LD.
