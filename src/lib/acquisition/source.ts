/**
 * Pure acquisition-source parsing: turn a landing URL + document.referrer into
 * a first-touch attribution record.
 *
 * WHY THIS EXISTS: nothing in this codebase captured where a student came from,
 * so no cohort could be attributed to a channel and the top of the funnel had no
 * denominator at all (see the coverage map in lib/pmf/snapshot.ts).
 *
 * Design rules, each one load-bearing:
 *  · FIRST TOUCH WINS. A student may arrive from Google, leave, and come back
 *    via WhatsApp. The channel that earned the account is the first one, so a
 *    stored value is never overwritten (isFirstTouchWorthStoring).
 *  · DIRECT IS NOT A FIRST TOUCH. Storing "direct" on the first load would let
 *    an ordinary internal page view claim credit for a campaign click that
 *    happened seconds earlier, so a bare direct hit is deliberately not stored.
 *  · PATH ONLY. The landing page is stored without its query string: a search
 *    query a student typed can contain their own name, and this row is not the
 *    place for it.
 *  · FAIL SAFE. Every parse is wrapped — this runs during a page render on the
 *    client, and an attribution detail must never throw into a student's face.
 *
 * Pure (no DOM, no storage, no network) so it is unit-testable; the capture
 * component supplies location/referrer. Spec: tests/acquisition-source.test.ts.
 */

/** Every stored field is capped — a crafted URL must not write an essay to the row. */
export const ACQ_MAX_LEN = 64;
const LANDING_MAX_LEN = 64;

export type Acquisition = {
  source: string;
  medium: string;
  campaign: string | null;
  landing: string;
  referrerHost: string | null;
};

/**
 * Known channels, matched as a SUBSTRING of the referrer host and collapsed to a
 * canonical name. The collapsing is the point: google.com, google.co.in and
 * www.google.co.uk are ONE channel, and l.facebook.com is not a different
 * channel from facebook.com. Keeping raw hosts would split a single source
 * across several rows and make every channel look smaller than it is.
 *
 * Order matters — the first match wins, so put specific hosts before the
 * families that would also match them.
 */
const KNOWN_CHANNELS: readonly { match: string; name: string; medium: "organic" | "social" }[] = [
  { match: "google.", name: "google", medium: "organic" },
  { match: "bing.", name: "bing", medium: "organic" },
  { match: "duckduckgo.", name: "duckduckgo", medium: "organic" },
  { match: "yahoo.", name: "yahoo", medium: "organic" },
  { match: "ecosia.", name: "ecosia", medium: "organic" },
  { match: "brave.", name: "brave", medium: "organic" },
  { match: "baidu.", name: "baidu", medium: "organic" },
  { match: "yandex.", name: "yandex", medium: "organic" },
  { match: "startpage.", name: "startpage", medium: "organic" },
  { match: "facebook.", name: "facebook", medium: "social" },
  { match: "instagram.", name: "instagram", medium: "social" },
  { match: "t.co", name: "twitter", medium: "social" },
  { match: "twitter.", name: "twitter", medium: "social" },
  { match: "x.com", name: "twitter", medium: "social" },
  { match: "linkedin.", name: "linkedin", medium: "social" },
  { match: "youtube.", name: "youtube", medium: "social" },
  { match: "youtu.be", name: "youtube", medium: "social" },
  { match: "whatsapp.", name: "whatsapp", medium: "social" },
  { match: "telegram.", name: "telegram", medium: "social" },
  { match: "t.me", name: "telegram", medium: "social" },
  { match: "reddit.", name: "reddit", medium: "social" },
  { match: "quora.", name: "quora", medium: "social" },
  { match: "pinterest.", name: "pinterest", medium: "social" },
];

function clean(v: string | null | undefined, max = ACQ_MAX_LEN): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().toLowerCase();
  if (!t) return null;
  return t.slice(0, max);
}

/** Lowercase, strip a leading `www.`; null when unparseable or absent. */
function hostOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h.replace(/^www\./, "") || null;
  } catch {
    return null;
  }
}

/** Collapse a referrer host to its channel, or fall back to the host itself. */
function classifyHost(host: string): { source: string; medium: "organic" | "social" | "referral" } {
  for (const c of KNOWN_CHANNELS) {
    if (host === c.match || host.includes(c.match)) return { source: c.name, medium: c.medium };
  }
  return { source: host.slice(0, ACQ_MAX_LEN), medium: "referral" };
}

/**
 * Classify one arrival. Returns null when there is nothing to attribute — an
 * internal navigation with no campaign tag, or a URL we cannot parse.
 */
export function parseAcquisition(input: {
  url: string;
  referrer: string | null;
  selfHost: string;
}): Acquisition | null {
  let parsed: URL;
  try {
    parsed = new URL(input.url);
  } catch {
    return null; // cannot even locate ourselves — record nothing
  }

  const self = input.selfHost.toLowerCase().replace(/^www\./, "");
  const refHost = hostOf(input.referrer);
  const isInternal = refHost !== null && refHost === self;

  const utmSource = clean(parsed.searchParams.get("utm_source"));
  const utmMedium = clean(parsed.searchParams.get("utm_medium"));
  const campaign = clean(parsed.searchParams.get("utm_campaign"));

  // An internal navigation is a page move, not an arrival — unless it carries a
  // campaign tag, which makes it a tagged click worth attributing.
  if (isInternal && !utmSource) return null;

  const landing = (parsed.pathname || "/").slice(0, LANDING_MAX_LEN);

  if (utmSource) {
    return {
      source: utmSource,
      medium: utmMedium ?? "campaign",
      campaign,
      landing,
      // The referrer is kept alongside the tag — it is corroborating evidence,
      // not a contradiction of it.
      referrerHost: isInternal ? null : refHost,
    };
  }

  if (!refHost) {
    return { source: "direct", medium: "direct", campaign, landing, referrerHost: null };
  }

  const classified = classifyHost(refHost);
  return {
    source: classified.source,
    medium: classified.medium,
    campaign,
    landing,
    referrerHost: refHost,
  };
}

/**
 * Should this arrival be written as the account's first touch? Only when we have
 * nothing yet AND the arrival actually names a channel — see the "direct is not
 * a first touch" rule above.
 */
export function isFirstTouchWorthStoring(input: {
  existing: { source: string; medium: string } | null;
  incoming: { source: string; medium: string };
}): boolean {
  if (input.existing) return false;
  if (input.incoming.medium === "direct") return false;
  return true;
}
