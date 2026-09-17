/**
 * IndexNow submission payloads — the push channel Google does not offer.
 *
 * WHY THIS EXISTS (2026-09-17). The Search Console exports put a number on the
 * indexing problem: **12 pages indexed, 1,462 not**, of which 1,424 are
 * "Discovered - currently not indexed" — known from the sitemap, never fetched.
 * The crawl-stats export explains why. In 51 days Googlebot made 1,173 requests
 * here, of which **79% were JavaScript, JSON and CSS**, 17.5% were HTML, and
 * only **1.79% (21 requests) had Discovery as their purpose**. At 0.41 discovery
 * requests a day the backlog clears in roughly 9.5 years.
 *
 * Google offers no API to change that — its only manual lever is URL Inspection
 * at ~10 URLs/day (see SEO_INDEXING_WORKLIST.md, which ranks what to spend that
 * quota on). IndexNow is the lever that does exist: Bing, Yandex, Naver and
 * Seznam accept a pushed URL list and act on it in days.
 *
 * **Google does NOT participate in IndexNow.** Nothing in this module helps
 * Google, and a future reader should not infer otherwise from a green run. What
 * it does reach is worth reaching on its own merits: Bing sent 204 visitors in
 * the 30 days to 2026-09-17 — the #3 referrer, ahead of everything except
 * Google and Reddit — and Bing's index is what ChatGPT search reads, which is
 * where the 46 chatgpt.com referrals in the same window came from.
 *
 * THE KEY IS NOT A SECRET. IndexNow proves ownership by having you serve the
 * key as plain text at `https://<host>/<key>.txt`, so it is public by design and
 * belongs in the repo. Do not "fix" it into an env var and do not treat a
 * committed key as a leak — see public/README-indexnow.md.
 *
 * Pure — no fetch, no env, no clock. The caller submits.
 */

/** The shared endpoint; participating engines forward between themselves. */
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** Protocol maximum per submission. */
export const MAX_URLS_PER_SUBMISSION = 10000;

export type IndexNowPayload = {
  /** Bare hostname, no scheme, no trailing slash. */
  host: string;
  key: string;
  /** Absolute URL of the public key file. */
  keyLocation: string;
  urlList: string[];
};

export type IndexNowOptions = {
  host: string;
  key: string;
  keyLocation: string;
};

/**
 * A key is 8–128 characters of `[A-Za-z0-9-]`.
 *
 * The character class is tighter than "URL-safe" on purpose: the key is also
 * the FILENAME served at `/<key>.txt`, so a dot would create a second extension
 * and a slash would create a path — either way the ownership check resolves
 * somewhere other than where the payload claims.
 */
export function isValidIndexNowKey(key: string): boolean {
  return /^[A-Za-z0-9-]{8,128}$/.test(key);
}

/**
 * Turn a URL list into submission-ready payloads, chunked at the protocol limit.
 *
 * REJECTS rather than filters. IndexNow answers 422 for the WHOLE submission if
 * any URL is off-host, so a builder that quietly dropped the offender would let
 * a caller report "submitted 1,279 URLs" after submitting a different set —
 * and the one case where that matters most (an apex-domain URL, which 308s to
 * www and looks identical to a human) is exactly the one a filter would hide.
 */
export function buildIndexNowPayloads(
  urls: readonly string[],
  opts: IndexNowOptions
): IndexNowPayload[] {
  if (!isValidIndexNowKey(opts.key)) {
    throw new Error(
      `IndexNow key is invalid: expected 8-128 chars of [A-Za-z0-9-], got ${JSON.stringify(opts.key)}`
    );
  }

  const seen = new Set<string>();
  const clean: string[] = [];

  for (const raw of urls) {
    let parsed: URL;
    try {
      parsed = new URL(raw);
    } catch {
      throw new Error(
        `IndexNow needs absolute URLs; got ${JSON.stringify(raw)}. ` +
          `A site-relative path means the origin was stripped upstream.`
      );
    }

    if (parsed.protocol !== "https:") {
      throw new Error(`IndexNow URL must be https, got ${raw}`);
    }
    if (parsed.host !== opts.host) {
      throw new Error(
        `IndexNow rejects the whole submission on an off-host URL. ` +
          `Expected host ${opts.host}, got ${parsed.host} (${raw}).`
      );
    }

    if (seen.has(raw)) continue;
    seen.add(raw);
    clean.push(raw);
  }

  const payloads: IndexNowPayload[] = [];
  for (let i = 0; i < clean.length; i += MAX_URLS_PER_SUBMISSION) {
    payloads.push({
      host: opts.host,
      key: opts.key,
      keyLocation: opts.keyLocation,
      urlList: clean.slice(i, i + MAX_URLS_PER_SUBMISSION),
    });
  }
  return payloads;
}
