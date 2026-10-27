/**
 * surface_viewed — "did the student SEE it?"
 *
 * Until 2026-09-27 nothing recorded a page as viewed, only as acted on, so the
 * engagement read could not tell "never opened /drill" from "opened it and
 * left", and 51 of the 265 students who signed in that month counted as
 * absent. One row per student per surface per IST day (dedupe_key), so a
 * refresh cannot inflate it and a view doubles as the day's heartbeat.
 *
 * Pure. Server pages call logActivityOnce with surfaceViewedEvent; the /start
 * page (cached, no session on the server) sends it through the client beacon.
 */
import { istDayKey } from "@/lib/email/dueNudge";
import type { ActivityEvent } from "./events";

export const SURFACES = [
  "site", // the header's pulse fetch — fires on any signed-in page, the heartbeat
  "drill",
  "me",
  "map",
  "start",
  "result",
  "mock_start",
  "pricing",
  "handout", // the notes print handout (2026-10-02); metadata.browser = "standard" | "inapp"; metadata.chapter since 2026-10-16
  // A tap on a chapter's "Download as PDF" (2026-10-16), with metadata.chapter.
  // Beside the handout opens it counts the downloads that never arrived.
  "handout_request",
  "performance", // /performance, where the projected score lives (2026-10-05); never recorded before
  // The /browse download box's download view, as a signed-in student meets it
  // (2026-10-12): under the cap, or over it with the buttons greyed out. Lets
  // the download-box signups who never download be told apart from those
  // the 200-question cap stopped.
  "download_box",
  "download_box_over_cap",
  // Reading pages (2026-10-19), with metadata.path: answers there were
  // recorded, a read was not. Sent by the header for signed-in students only.
  "notes",
  "board",
  "questions",
  "guide",
  "formula",
  "question_papers",
  "past_paper",
  // The ebook store and each book's page (2026-10-20), with metadata.path, so
  // the book a student opened is in the address; and a signed-in student's
  // tap on a book's free sample, written by the sample route (ebookSampleEvent).
  "store",
  "ebook_sample",
  // V's "How's my progress" card was opened (2026-10-27, migration 0191),
  // written by GET /api/chat/progress: how many look, and whether they drill after.
  "v_progress",
] as const;

export type Surface = (typeof SURFACES)[number];
const SURFACE_SET: ReadonlySet<string> = new Set(SURFACES);

export function isSurface(v: unknown): v is Surface {
  return typeof v === "string" && SURFACE_SET.has(v);
}

export type ReadingSurface = "notes" | "board" | "questions" | "guide" | "formula" | "question_papers" | "past_paper" | "store";

/** A section's first path segment -> its reading surface. */
const READING_SECTIONS: Record<string, ReadingSurface> = {
  notes: "notes",
  board: "board",
  questions: "questions",
  guide: "guide",
  formula: "formula",
  "question-papers": "question_papers",
  store: "store",
};
const READING_SET: ReadonlySet<string> = new Set(Object.values(READING_SECTIONS).concat("past_paper"));
const PATH_RE = /^\/[a-z0-9-]+(\/[a-z0-9-]+)*$/;
const MAX_PATH = 200;

export function isReadingSurface(v: unknown): v is ReadingSurface {
  return typeof v === "string" && READING_SET.has(v);
}

/**
 * The reading surface a page address belongs to, and the address cleaned
 * (query, fragment and trailing slash dropped), or null when it is not a
 * reading page or not safe to store. A mock's own reading page is
 * /mock/<paper>/paper; its start page and attempts are not reading.
 */
export function readingViewFor(pathname: string): { surface: ReadingSurface; path: string } | null {
  let path = pathname.split(/[?#]/)[0];
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path.length > MAX_PATH || !PATH_RE.test(path)) return null;
  const segments = path.split("/").slice(1);
  const section = READING_SECTIONS[segments[0]];
  if (section) return { surface: section, path };
  if (segments.length === 3 && segments[0] === "mock" && segments[2] === "paper") return { surface: "past_paper", path };
  return null;
}

export function viewDedupeKey(userId: string, surface: Surface, now: Date): string {
  return `view:${surface}:${userId}:${istDayKey(now)}`;
}

export function surfaceViewedEvent(
  userId: string,
  surface: Surface,
  now: Date,
  refId?: string
): ActivityEvent {
  const event: ActivityEvent = {
    kind: "surface_viewed",
    metadata: { surface },
    dedupeKey: viewDedupeKey(userId, surface, now),
  };
  if (refId) {
    event.refId = refId;
    event.refKind = surface;
  }
  return event;
}

/**
 * A signed-in student took a book's free sample (2026-10-20): the step between
 * opening a book and buying it. Written by the sample route, which knows who
 * is asking; one row per book per student per IST day.
 */
export function ebookSampleEvent(userId: string, slug: string, now: Date): ActivityEvent {
  const path = `/store/${slug}`;
  return {
    kind: "surface_viewed",
    metadata: { surface: "ebook_sample", path },
    dedupeKey: `view:ebook_sample:${path}:${userId}:${istDayKey(now)}`,
  };
}
