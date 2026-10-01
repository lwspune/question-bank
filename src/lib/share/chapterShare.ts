/**
 * Pure share-link + share-message construction for a chapter's questions.
 *
 * WHY: students already ask their WhatsApp groups "anyone have PYQs for X?".
 * A `/questions` chapter page is the answer, and until now nothing on it or on
 * the notes made it easy to pass on. The mock-result share (lib/mocks/share.ts)
 * shares a result moment; this one shares a resource, which needs no score and
 * so rebuilds no peer ranking.
 *
 * Rules carried over from the mock share, for the same reasons:
 *  · the link is the PUBLIC page, opened without signing in;
 *  · the canonical host is hardcoded, so a preview URL never reaches a group;
 *  · the OS sheet is tagged 'share', never a guessed app;
 *  · the utm triple attributes an arrival through parseAcquisition (0106),
 *    which matters because WhatsApp strips the referrer.
 *
 * Only `/questions/<exam>/<subject>/<chapter>` is accepted: the notes page
 * shares its chapter's questions page too, so the same message goes out from
 * both. Taps are counted as the `chapter_share_click` funnel event, not here.
 *
 * Pure (no DOM, no network). Spec: tests/chapter-share.test.ts.
 */
import { SITE_URL, type ShareChannel } from "@/lib/mocks/share";

/** Ties every chapter share to one rollup in student_profiles.acq_campaign. */
export const CHAPTER_SHARE_CAMPAIGN = "chapter-share";

const CHAPTER_PATH = /^\/questions\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/;

/** The chapter's public questions page, tagged so the arrival can be attributed. */
export function buildChapterShareUrl(path: string, channel: ShareChannel): string {
  if (!CHAPTER_PATH.test(path)) {
    throw new Error(`Not a /questions chapter path: ${path.slice(0, 80)}`);
  }
  const u = new URL(`${SITE_URL}${path}`);
  u.searchParams.set("utm_source", channel);
  u.searchParams.set("utm_medium", "share");
  u.searchParams.set("utm_campaign", CHAPTER_SHARE_CAMPAIGN);
  return u.toString();
}

export type ChapterShareInput = {
  /** landingHref(landing) — `/questions/<exam>/<subject>/<chapter>`. */
  path: string;
  chapterName: string;
  /** The exam's display name, e.g. "MHT-CET". */
  examDisplay: string;
  questionCount: number;
  /** An exam with no past papers: say "practice questions", never "past". */
  practiceOnly: boolean;
  channel: ShareChannel;
};

/** The pre-filled message: one line of facts, then the link on its own line. */
export function buildChapterShareText(input: ChapterShareInput): string {
  const kind = input.practiceOnly ? "practice" : "past";
  const count = input.questionCount.toLocaleString("en-IN");
  const url = buildChapterShareUrl(input.path, input.channel);
  return `${input.chapterName}: ${count} ${input.examDisplay} ${kind} questions with answers, free on PYQ Vault.\n\n${url}`;
}
