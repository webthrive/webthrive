# webthrive.io

Static site for Colin Harbut — Fractional CMO. Deployed on Vercel from `main`.

## Structure

```
/                                        homepage
/professional-experience/                experience timeline
/core-strengths/                         capabilities
/methodology/                            strategic + execution philosophy
/ai-search/                              AI search / LLM visibility approach
/contact/                                contact form (Web3Forms)
/managed-ai-content-generation-services/ managed AI content service landing page
/assets/site.css                         shared stylesheet
/assets/site.js                          mobile nav + contact form handler
/images/                                 site imagery
```

Each page is a folder with an `index.html`, which gives clean extensionless URLs
on Vercel with no rewrite config.

## Indexing

The whole site is currently blocked from search engines in three places:

1. `noindex,nofollow` meta on every page
2. `robots.txt` — `Disallow: /`
3. `vercel.json` — `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`

**To go live in search, all three must be reversed.**

## Outstanding

- `images/colin-harbut.jpg` — export the headshot from Figma at ~600px wide and
  save it here. Until then the homepage shows an initials placeholder.
- Client logos currently render as text wordmarks. Swap for images if wanted.
