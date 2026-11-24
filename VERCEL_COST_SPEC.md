# Vercel cost: what it costs, why, and the plan to bring it down

Written 2026-11-24 from the billing export for the cycle 20 Nov to 19 Dec and
from Vercel's own request breakdown. Status: **items 1 and 2 built on branch
`perf/hold-cdn-tier` (2026-11-24), not yet merged; the rest is plan.**

## 1. What it costs today

| Line | Per month, at the pace of 22-23 Nov | Kind |
|---|---|---|
| Pro seat | $20 | Fixed |
| Flat Rate CDN, 10M tier | $20 | Fixed, but see section 2 |
| Fast Origin Transfer (8-9 GB a day) | ~$32 | Metered |
| ISR writes (110k-165k a day) | ~$16 | Metered |
| ISR reads (650k-875k a day) | ~$10 | Metered |
| Deployment storage (77 GB) | ~$8 | Metered |
| Function CPU (1-2 hours a day) | ~$6 | Metered |
| Web Analytics (7,200 events a day) | ~$6.50 | Metered |
| Function memory | ~$2 | Metered; was ~$24 before 22 Nov |
| Builds, invocations, storage | ~$2 | Metered |
| **Total** | **~$127**, before GST and any Pro credit | |

Function memory fell tenfold on 22 Nov, the day the database moved to Small
and the Challenge rule went live. That saving is already in the table.

## 2. The risk that matters most: the CDN tier

The Flat Rate CDN plan covers all CDN requests and data transfer for a fixed
price. Its tiers (read from Billing, 2026-11-24):

| Tier | Requests a month | Price |
|---|---|---|
| Included with Pro | 1M | $0 |
| **Ours** | **10M** | **$20** |
| Next | 50M | $100 |

**The rule:** if a whole cycle's requests go over the tier, Vercel moves the
team up a tier at the start of the next cycle. One busy day does not do it.
There is no per-request overage.

**Where we stand:** 1,485,725 requests in the four days 20-23 Nov, about
371k a day, which is 11.1M over the cycle. To finish under 10M, the remaining
26 days must average **under 327k a day**, a cut of about 12%.

Going over costs $80 a month more. That is larger than every other saving in
this document together, so it comes first.

Turning the plan off is not an option: we are far above the included 1M, and
off means paying per request for all of it.

## 3. What the requests are

Vercel Observability, 08:02 to 20:02 IST on 24 Nov, 228K requests, top 100
routes:

| Source | Requests | Share |
|---|---|---|
| Pages fetched in advance by links (`*.segments/*`) | 41K or more | 18%+ |
| Icons, manifest, favicon, service worker, V's picture | 20K | 9% |
| JS, CSS and font files (about 30 files, 800-950 each) | ~27K | 12% |
| Named bots (OpenAI search, Meta, Claude, Perplexity, Google, Bing) | 35K | 15% |
| Web Analytics pings | 5.7K | 2.5% |
| Real pages and API calls (`/browse` 12K, `/questions` 6.2K, ...) | the rest | |

**Read this table with care.** The quiet-link change (PAGE_WEIGHT_SPEC.md
item 1) went live at about 18:15 IST on 24 Nov, so ten of these twelve hours
are from before it. The first row is mostly the old site. What the new site
does is not yet measured.

Of the 41K fetched in advance:

| Links | Requests | State after the quiet-link change |
|---|---|---|
| Footer, Store, Visuals, Play | ~17K | Fixed (fetch on touch) |
| Study tabs: Notes, Board, Homework (Most Asked), Mock | ~14K | Unchanged on purpose: these taps stay instant |
| Sign in (`/login`) | 5.3K | **Not fixed** |
| The logo (home page) | 2K | Not fixed |

## 4. Work items, in order

### Item 0. Measure the new site first (no code)

On 25 Nov, after a full day on the quiet-link build, read the day's CDN
requests from the Usage page and the routes table from Observability.

- **Under 327k a day:** the tier is safe on today's traffic. Items 1 and 2
  become a safety margin; still worth doing, since traffic grows.
- **Over 327k:** items 1 and 2 are needed now, and item 3 is decided on the
  new numbers.

Expected from the table above: the quiet links remove about 17K of every
228K, or 7%. That alone is not enough.

### Item 1. Let browsers keep icons and the manifest

**The problem:** every file in `public/` and every app icon is served with
`Cache-Control: public, max-age=0, must-revalidate` (checked with curl,
2026-11-24). A browser asks for each one again on every page view. The answer
is "unchanged", but each ask is a billed request. About 20K of 228K.

**The change:** a `headers()` block in `next.config.mjs`:

| Files | Browser may keep for |
|---|---|
| `/icons/*`, `/chat/*`, `/marketing/*` | 7 days |
| `/favicon.ico`, `/icon.png`, `/apple-icon.png` | 7 days |
| `/manifest.webmanifest` | 1 day |
| `/sw.js` | **No change.** A service worker must be re-checked, or an update never arrives |

**Cost of the change:** a replaced icon or picture can take up to 7 days to
reach a returning visitor. To change one sooner, give the file a new name.

**Expected gain:** 5 to 8% of requests. Not all 9%: a first visit still
fetches each file once.

**Tests first:** a test that loads the config's `headers()` and checks each
path above carries its `max-age`, and that `/sw.js` matches none of them.

**Check after the push:** curl each file. The three app icons are served by
Next's own route, which may set its own header over ours. If so, they stay as
they are and the gain is smaller by about 5K.

**Undo:** remove the block. One commit.

**Built 2026-11-24:** the `headers()` block in `next.config.mjs` (also covers
`/marketing/*`), `tests/static-cache-headers.test.ts`. After the push, curl
each file above and check `/sw.js` still says `max-age=0`.

### Item 2. Sign-in links fetch on touch

**The problem:** the header's Sign in link fetches `/login` in advance on
every signed-out page view: 5.3K of 228K, the largest single link left. The
same component (`SignInLink`) sits in question cards, 13 files in all.

**The change:** `SignInLink` renders `QuietLink` instead of `Link`. The fetch
starts when a finger touches the link, about 100 ms before the tap completes.

**Rules A and B of PAGE_WEIGHT_SPEC.md apply:** the anchor a search engine
reads is identical (already proven for `QuietLink`), and nothing on screen
changes.

**Expected gain:** 2 to 3% of requests.

**Tests first:** add `SignInLink` to the source test in
`tests/quiet-link.test.ts`: it imports `QuietLink` and renders no plain
`<Link`.

**Owner check on a phone:** signed out, tap Sign in from the header and from a
question card. It should open as fast as before.

**Undo:** swap back. One commit.

**Built 2026-11-24:** `SignInLink` renders `QuietLink` in both places (the
Suspense fallback and the link with the query); test added to
`tests/quiet-link.test.ts`. No other file changed: all 13 callers go through
`SignInLink`.

### Item 3. The study tabs and the logo (decide after item 0)

About 16K of 228K, 7%. PAGE_WEIGHT_SPEC.md kept these instant on purpose.
Only reopen that decision if items 1 and 2 leave the daily count over 327k.
If reopened, the choice is fetch on touch for all four tabs, or only for the
tabs a student is least likely to tap next.

### Item 4. Watch the count through the cycle

The tier is decided on the whole cycle, so one reading is not enough. Read
the cycle's running total from the Usage page weekly until 19 Dec:

| Date | Total must be under |
|---|---|
| 30 Nov | 3.67M |
| 7 Dec | 6.0M |
| 14 Dec | 8.3M |
| 19 Dec | 10.0M |

## 5. Things to find out (no fix proposed yet)

- **Deployment storage (77 GB, ~$8 a month): found 2026-11-24, no cheap fix.**
  - Retention is 1 week for canceled, errored and pre-production, and
    **2 weeks for production**. Every deploy here is a production deploy.
  - On Pro, Vercel keeps the **last 20 production deployments whatever the
    policy says**. At the real pace of 1.4 deploys a day (33 in 24 days of
    November, from the deploy workflow's runs), 20 deployments is 14 days, so
    the policy and the floor already agree. A shorter policy changes nothing.
  - Deleted deployments are not billed during their recovery period.
  - So the bill is 20 deployments at about 3.9 GB each. The upload is 573 MB
    compressed; the stored output is several times that. Only a smaller build
    output lowers it: 3,929 pages are built ahead per deploy.
  - Worth at most $3-4 a month. Not worth work of its own; it falls when the
    page-weight work makes pages smaller.
- **ISR (reads + writes, ~$26 a month): found 2026-11-24.** Billed in units of
  8 KB, so page SIZE is what costs, not page count. 12 hours on 24 Nov:
  475K read units, 48K write units, only 760 timed refreshes.
  - **Reads:** three routes are half of all read units.
    `/questions/<exam>/<subject>/<chapter>` 165K (35%; a page is up to 254
    units, 2 MB), `/board/<exam>/<subject>/<chapter>` 55K (12%; up to 935
    units, 7.5 MB), `/homework/<plan>` 19K (4%; up to 606 units, 4.8 MB).
  - **Writes:** timed refreshes are too few to explain them. They are pages
    built on first visit after a deploy: only the well-read pages are built
    ahead, so each deploy makes the long tail rebuild as visitors and bots
    reach it (1,500 different `/questions` pages read in 12 hours). Largest:
    `/questions` and `/mock/<slug>/paper` 5.1K units each, question papers
    3.2K, formula pages 1.9K.
  - Levers: smaller `/questions`, `/board` and `/homework` pages (already
    PAGE_WEIGHT_SPEC.md items 1 and 6), and fewer deploys (each one restarts
    the long tail).
- **Fast Origin Transfer, 8-9 GB a day, is the largest metered line ($32).**
  It did not fall when the Challenge rule went live. The page-weight work
  (PAGE_WEIGHT_SPEC.md) is the lever; find which routes carry the bytes from
  Observability's Fast Data Transfer page.
- **`/browse` is 12K requests in 12 hours and never cached.** Find how much is
  bots and how much is students changing filters.

## 6. Declined

- **Blocking AI bots.** Standing rule: never. They are 15% of requests and
  also a source of visitors.
- **Turning Flat Rate CDN off.** See section 2.
- **Moving functions back to US-East.** Cheaper transfer, but every database
  query would cross the ocean again.
- **Turning Web Analytics off.** $6.50 a month and 2.5% of requests, but the
  traffic baseline depends on it.

## 7. Targets

| | Per month, before GST |
|---|---|
| Today | ~$127 |
| If the tier jumps | ~$207 |
| After items 0 to 2, tier held | ~$127, with the $80 jump avoided |
| After section 5 and the page-weight work | $90 to $100 (estimate, not measured) |
| The floor | $40 fixed |

## 8. What could not be measured

- The site after the quiet-link change: only two hours of data on 24 Nov.
- The saving from items 1 and 2: both are estimates from the old site's table
  until they are live for a day.
- Routes below the top 100 in Observability, so every share in section 3 is a
  floor.
- Whether the Pro plan's included credit nets against the lines above: read
  the invoice.
