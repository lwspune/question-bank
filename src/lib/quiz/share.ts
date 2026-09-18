/**
 * The share link on the public-quiz results screen. Pure; unit-tested in
 * tests/quiz-share.test.ts.
 *
 * THE DEFECT THIS FIXES: the results screen has shared a bare
 * `${window.location.origin}/quiz/${slug}` since 2026-06-09. WhatsApp strips the
 * referrer, so an arriving click reaches parseAcquisition (0106) with no tags
 * and no referrer host, falls through to its `if (!refHost)` branch, and is
 * stored as `source: "direct"`. Those arrivals were not invisible — they were
 * MISATTRIBUTED, and every signup this loop has ever produced was credited to
 * nobody. The tag is what separates a quiz share from genuine direct traffic.
 *
 * MIRRORS lib/mocks/share.ts (0109) rather than importing from it. That module
 * shipped the day before and is not in scope for rework here; what the two share
 * is a canonical host and three query params. Consolidating them is logged as a
 * backfill candidate instead.
 *
 * NOT CHANGED HERE: the message still leads with the score, unlike the mock
 * share, which defaults to naming the paper with the score opt-in. That is a
 * product decision, not a defect, and it belongs in its own change.
 */

/** Hardcoded, never `window.location.origin`: a share from the apex or from a
 *  preview deploy must still emit the canonical URL. */
const SITE_URL = "https://www.pyqvault.com";

/** One campaign for the whole loop, so inbound arrivals read as one loop. */
export const QUIZ_SHARE_CAMPAIGN = "quiz-result";

/**
 * How the link left. `share` is the OS sheet, which NEVER reports the app the
 * user chose — calling it 'whatsapp' would be inventing attribution. `copy` is
 * the clipboard fallback.
 */
export const QUIZ_SHARE_CHANNELS = ["share", "copy"] as const;
export type QuizShareChannel = (typeof QUIZ_SHARE_CHANNELS)[number];

export function buildQuizShareUrl(slug: string, channel: QuizShareChannel): string {
  const u = new URL(`${SITE_URL}/quiz/${encodeURIComponent(slug)}`);
  u.searchParams.set("utm_source", channel);
  u.searchParams.set("utm_medium", "share");
  u.searchParams.set("utm_campaign", QUIZ_SHARE_CAMPAIGN);
  return u.toString();
}
