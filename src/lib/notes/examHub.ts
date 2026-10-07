/**
 * The /notes/<exam> hub's chapter list and "Continue reading" pick.
 *
 * The hub used to show one card per subject, so reaching a chapter took two
 * more taps (exam -> subject -> chapter), and Clarity showed most visits
 * stopping at the hub. Now every chapter is on the hub under subject tabs,
 * most-asked first, and a returning reader gets the subtopic they read last.
 *
 * Pure (no DB, no React). Spec: tests/notes-exam-hub.test.ts.
 */
import type { NotesProgressRow } from "@/lib/notes/progress";

/** Chapters shown per subject before "Show all", on a phone. */
export const HUB_VISIBLE_CHAPTERS = 5;
/** The same from tablet width up, where chapters sit in a grid: three rows of three. */
export const HUB_VISIBLE_CHAPTERS_WIDE = 9;

export type HubChapterInput = {
  slug: string;
  name: string;
  subtopicCount: number;
  /** PUBLIC past questions in the chapter; 0 when the count could not be read. */
  count: number;
};

export type HubChapter = HubChapterInput & { href: string };

export type HubSubject = {
  subjectRoute: string;
  subjectDisplay: string;
  /** The tab's text: the label without the exam name ("NDA Maths" -> "Maths"). */
  tabLabel: string;
  chapters: HubChapter[];
  /** The most-asked chapter, or null when no chapter has a count to rank by. */
  startHereSlug: string | null;
};

export function subjectTabLabel(subjectDisplay: string, examDisplay: string): string {
  const prefix = `${examDisplay} `;
  return subjectDisplay.startsWith(prefix) ? subjectDisplay.slice(prefix.length) : subjectDisplay;
}

export function buildHubSubject(
  subjectRoute: string,
  subjectDisplay: string,
  examDisplay: string,
  chapters: readonly HubChapterInput[]
): HubSubject {
  const ranked = chapters.some((c) => c.count > 0);
  // Array.prototype.sort is stable, so equal counts keep registry order.
  const ordered = ranked ? [...chapters].sort((a, b) => b.count - a.count) : [...chapters];
  return {
    subjectRoute,
    subjectDisplay,
    tabLabel: subjectTabLabel(subjectDisplay, examDisplay),
    chapters: ordered.map((c) => ({ ...c, href: `/notes/${subjectRoute}/${c.slug}` })),
    startHereSlug: ranked ? ordered[0].slug : null,
  };
}

export type ContinueTarget = {
  subjectRoute: string;
  chapterSlug: string;
  subtopicSlug: string;
  href: string;
  /** Subtopics of that chapter the reader has opened, capped at `total`. */
  readCount: number;
  total: number;
};

/** The key `totals` uses: `<subjectRoute>/<chapterSlug>`. */
export function chapterKey(subjectRoute: string, chapterSlug: string): string {
  return `${subjectRoute}/${chapterSlug}`;
}

/**
 * The subtopic a reader opened most recently among THIS hub's chapters
 * (`totals` holds only those), or null. A row with no view (a bookmark alone)
 * is not reading, so it never wins.
 */
export function pickContinueTarget(
  rows: readonly NotesProgressRow[],
  totals: Readonly<Record<string, number>>
): ContinueTarget | null {
  const read = rows.filter(
    (r) => r.lastViewedAt !== "" && totals[chapterKey(r.subjectRoute, r.chapterSlug)] !== undefined
  );
  if (read.length === 0) return null;
  const latest = read.reduce((a, b) => (b.lastViewedAt > a.lastViewedAt ? b : a));
  const key = chapterKey(latest.subjectRoute, latest.chapterSlug);
  const total = totals[key];
  const inChapter = new Set(
    read.filter((r) => chapterKey(r.subjectRoute, r.chapterSlug) === key).map((r) => r.subtopicSlug)
  );
  return {
    subjectRoute: latest.subjectRoute,
    chapterSlug: latest.chapterSlug,
    subtopicSlug: latest.subtopicSlug,
    href: `/notes/${latest.subjectRoute}/${latest.chapterSlug}/${latest.subtopicSlug}`,
    readCount: Math.min(inChapter.size, total),
    total,
  };
}
