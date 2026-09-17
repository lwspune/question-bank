# The `<32-hex>.txt` file in this directory is an IndexNow key. It is NOT a secret.

**Do not delete it, do not move it into an env var, and do not treat it as a
leaked credential.**

IndexNow proves you own a domain by having you serve the key as plain text at
`https://www.pyqvault.com/<key>.txt`. Publishing it *is* the mechanism. A key
that is not publicly fetchable fails the ownership check and every submission is
rejected, so hiding it would break the feature it exists to enable.

It grants no access to anything. The worst a third party can do with it is ask
Bing to re-crawl pages on this site, which is what we ask Bing to do anyway.

## What uses it

`npm run seo:indexnow` (dry run) / `npm run seo:indexnow -- --apply`.

The script discovers the key by looking for the single `.txt` file in this
directory whose name is a valid IndexNow key, so rotating means: add the new
file, delete the old one. `INDEXNOW_KEY` overrides the lookup if both ever
exist at once.

## What it does and does not reach

Reaches Bing, Yandex, Naver and Seznam.

**Google does not participate in IndexNow.** Google's only manual lever is URL
Inspection → Request Indexing at ~10 URLs/day, which is what
[SEO_INDEXING_WORKLIST.md](../SEO_INDEXING_WORKLIST.md) ranks. Nothing here
affects Google, and a successful submission must never be read as if it did.

Bing is worth reaching on its own merits: it sent 204 visitors in the 30 days to
2026-09-17 — the #3 referrer behind only Google and Reddit — and Bing's index is
what ChatGPT search reads.
