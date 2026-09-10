# webthrive.io

Static site served from this repo by Vercel. No build step: every route is a
folder with an `index.html`, which is what gives the clean extensionless URLs
without any rewrite config.

## Routes

| URL                                        | What it is                                        |
|--------------------------------------------|---------------------------------------------------|
| `/`                                        | Holding page — name and email only, no links out  |
| `/home`                                    | Portfolio homepage (hero + client strip)          |
| `/professional-experience`                 | Experience timeline                               |
| `/core-strengths`                          | Eight capability rows                             |
| `/methodology`                             | 001–005                                           |
| `/ai-search`                               | 001–009                                           |
| `/contact`                                 | Contact form (Web3Forms)                          |
| `/submission-received`                     | Post-submit thank-you page                        |
| `/experience`                              | "Journey" — deliberately not in the nav           |
| `/managed-ai-content-generation-services`  | Managed-services landing page (own dark styling)   |

The portfolio lives under `/home` on purpose. `/` is a dead end: it carries no
internal links and sets `referrer: no-referrer`, so it can't be used to
discover the rest of the site.

## Design

The portfolio pages are a port of the Figma Make source (`Portfolio`,
file key `HSRavoL9moIcQGmOsGHWzP`). Tailwind utility values from that source
are resolved to their literal equivalents in `assets/site.css`. The pieces
that matter if you edit it:

- **Shell** — fixed 320px (`w-80`) left sidebar, `--gray-50` on a `--gray-200`
  right border, main content offset by the same 320px. Below 1024px the
  sidebar is replaced by a fixed header and a right-hand slide-in drawer.
- **Type** — Inter only, weights 400/500/600/700. Body is 16px/1.75rem at
  `-0.16px`. Page titles are 2.25rem → 4.5rem at 700/1.1/`-0.72px`. The hero
  h1 is the exception: 600 weight, `-4.32px` tracking, `#0c0407`.
- **Grid** — the signature layout is a 12-column row split 3/9: the
  `// label //` in the left three columns at `--gray-500`, content in the
  right nine. Sections are separated by `border-top` + `4rem` above and below.

`assets/site.js` handles the mobile drawer and the contact-form submit.

## Not indexed

Three layers, all deliberate. **To go live in search, all three must be
reversed:**

1. `<meta name="robots" content="noindex, nofollow">` on every page
2. `robots.txt` — `Disallow: /`
3. `vercel.json` — `X-Robots-Tag` response header (this one also covers
   non-HTML assets, which the meta tag can't)

## Third-party

- **Web3Forms** — the contact form posts to `api.web3forms.com` with the
  public access key carried in the source of the original site. It redirects
  to `/submission-received` on success.
- **Google Tag Manager** — container `GTM-N2G32HR`, carried over from the
  original site. On the portfolio pages only; not on `/`.

## Outstanding

- Client logos on `/home` are text wordmarks. The originals are PNGs on
  Figma's asset CDN, which returns 403 to anything but the Figma runtime —
  they need to be exported from the Figma file by hand and dropped into
  `/images`.
- Second landing page (Blog Topic Bank Generator) not started.
