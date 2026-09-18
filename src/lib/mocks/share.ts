/**
 * Pure share-link + share-message construction for the mock result screen.
 *
 * WHY THIS EXISTS: 733 mock attempts had produced zero distribution events. The
 * only share affordance in the app was staff-only, on the catalogue page. A
 * finished mock is the one moment a student feels something worth passing on,
 * and NDA aspirants organise in WhatsApp and Telegram groups — so the result
 * screen is where a share button is worth the most.
 *
 * Design rules, each load-bearing:
 *
 *  · SHARE THE MOCK, NOT THE RESULT. /mock/attempt/<id>/result is per-attempt,
 *    auth-gated and noindex — a recipient opening it gets a redirect, not a
 *    test. The shareable artifact is the mock's public page, which anyone can
 *    open and then sit the same paper.
 *
 *  · THE SCORE IS OPT-IN, AND OFF BY DEFAULT. A score-forward share only fires
 *    for students who did well, so the loop would sample the top of the
 *    distribution and lose most of its volume. Worse, scores broadcast into a
 *    class group rebuild the peer ranking that the engagement-principles gate
 *    forbids leaderboards for ("demotivate the bottom half in a known-peer
 *    setting"). Defaulting to the TEST lets a student who scored 61/300 still
 *    pass the paper on.
 *
 *  · THE CHANNEL IS NAMED HONESTLY. navigator.share() hands off to an OS
 *    chooser that never reports which app was picked, so that path is tagged
 *    'share', not 'whatsapp'. Same rule as the 0107 reveal surfaces: an unknown
 *    value is stated as unknown, never defaulted to a plausible one.
 *
 *  · THE CANONICAL HOST IS HARDCODED. ShareMock builds from
 *    window.location.origin, which is right for staff copying a link on prod;
 *    here it would let a preview deployment's URL loose in a WhatsApp group.
 *
 * The utm triple is not new plumbing: parseAcquisition (migration 0106) already
 * reads utm_source/medium/campaign and already classifies whatsapp + telegram,
 * so an inbound tagged click attributes itself with no extra code. That matters
 * because WhatsApp strips the referrer — without the tag these arrivals would
 * be indistinguishable from direct traffic.
 *
 * Pure (no DOM, no network) so it is unit-testable; the component supplies the
 * attempt's numbers. Spec: tests/mock-share.test.ts.
 */

const SITE_URL = "https://www.pyqvault.com";

/** Ties every share affordance to one rollup in student_profiles.acq_campaign. */
export const SHARE_CAMPAIGN = "mock-result";

/**
 * How the link left the page. Kept separate from the campaign so the rollup
 * still aggregates while each affordance stays individually countable — "the
 * native sheet is used 10x more than the WhatsApp button" is actionable, and
 * collapsing them would hide it.
 */
export const SHARE_CHANNELS = ["whatsapp", "share", "copy"] as const;
export type ShareChannel = (typeof SHARE_CHANNELS)[number];

/** The mock's public page, tagged so the arrival can be attributed. */
export function buildMockShareUrl(slug: string, channel: ShareChannel): string {
  const u = new URL(`${SITE_URL}/mock/${encodeURIComponent(slug)}`);
  u.searchParams.set("utm_source", channel);
  u.searchParams.set("utm_medium", "share");
  u.searchParams.set("utm_campaign", SHARE_CAMPAIGN);
  return u.toString();
}

export type ShareTextInput = {
  slug: string;
  title: string;
  score: number;
  maxScore: number;
  /** Student ticked "include my score". Off by default — see the header. */
  includeScore: boolean;
  channel?: ShareChannel;
};

/**
 * The pre-filled message. Two variants only: the paper, or the paper plus the
 * student's score. Both close on the link, because a message whose call to
 * action scrolled off is a message nobody taps.
 */
export function buildMockShareText(input: ShareTextInput): string {
  const url = buildMockShareUrl(input.slug, input.channel ?? "whatsapp");
  // An unmarked paper has no score to state. Saying "0/0" or a NaN percentage
  // into a group chat is worse than saying nothing, so fall back to the paper.
  const scorable = input.includeScore && input.maxScore > 0;

  const lead = scorable
    ? `I scored ${input.score}/${input.maxScore} on ${input.title} — a full timed mock on PYQ Vault, free with instant scoring.`
    : `I just sat ${input.title} as a full timed mock on PYQ Vault — free, with instant scoring.`;

  return `${lead}\n\nTry it: ${url}`;
}

/**
 * wa.me with NO recipient: the empty phone slot is what makes WhatsApp open its
 * own contact-and-group chooser. Addressing a number instead would reduce this
 * to a one-to-one message and lose the groups that are the whole point.
 */
export function buildWhatsappHref(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
