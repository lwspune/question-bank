/**
 * Where a /drill visit came from (2026-10-05).
 *
 * Every link into /drill carries `?from=<source>` and the page records it on
 * the view and on `drill_started`. Before this, 23 students opened the drill
 * and nothing said whether they came from the avatar menu, the Today card, the
 * result page, an email or the bank, so no change to any of those could be
 * measured.
 *
 * A FIXED LIST, because the value lands in user_activity metadata and the PMF
 * readout groups on it: an unlisted value becomes "other", a missing one
 * "direct", so a hand-typed URL cannot fragment the field.
 *
 * Pure. Spec: tests/drill-from.test.ts.
 */

export const DRILL_FROM = [
  "bank", // the "5 wrong today" line on a bank card
  "menu", // the avatar menu's "Fix your mistakes"
  "today", // the /me Today card
  "me_tile", // the /me progress row's "fixed" tile (2026-11-05)
  "me_weak", // a chapter's Fix button in /me's Weak spots (2026-11-06)
  "me_points", // the Fix link on /me's Vault Points card (2026-11-09)
  "result", // the mock result page's headline button
  "findings", // the result page's findings card
  "map", // /me/map
  "start", // /start and the welcome screen (lib/education/howItWorks)
  "email", // the due-nudge email
  "push", // the due-nudge notification
  "again", // "Another five" at the end of a drill
  "nav", // the Fix tab graduates get in place of Board (lib/nav/fifthTab)
  "review", // "Saved for review" under a written model answer (lib/questions/selfMark)
  "homework", // the homework plan and day pages' review links (lib/homework/progress)
  // "Fix N mistakes in this chapter" above a chapter's questions (2026-11-07,
  // lib/drill/chapterFix), one tag per page so each can be read apart.
  "chapter", // a /questions chapter page
  "board_chapter", // a /board chapter page
  "browse_chapter", // /browse filtered to one chapter
  "path", // the board path's Fix task on /me (2026-11-07, MENTOR_SPEC.md)
  "review_tab", // the Review tab's Fix buttons, whole list or one chapter (2026-11-08)
  "v_chapter", // the chapter line under V's explanation (2026-11-10 to 11-11, removed; kept so its rows still read)
  "score_plan", // "How to raise your score" on a full paper's result (2026-11-10, lib/mocks/scorePlan)
] as const;

/** The chapter line's tag on each page it sits on. */
export const CHAPTER_FIX_FROM = {
  questions: "chapter",
  board: "board_chapter",
  browse: "browse_chapter",
  // Under V's explanation (2026-11-10): counted apart from the chapter pages (experiment chapter-fix).
  v: "v_chapter",
} as const satisfies Record<string, DrillFrom>;

export type ChapterFixFrom = (typeof CHAPTER_FIX_FROM)[keyof typeof CHAPTER_FIX_FROM];

export type DrillFrom = (typeof DRILL_FROM)[number];

const FROM_SET: ReadonlySet<string> = new Set(DRILL_FROM);

export function parseDrillFrom(raw: unknown): DrillFrom | "other" | "direct" {
  if (raw === undefined || raw === null || raw === "") return "direct";
  if (typeof raw !== "string") return "other";
  return FROM_SET.has(raw) ? (raw as DrillFrom) : "other";
}

/** A tagged link into the drill, optionally scoped to one mock attempt. */
export function drillHref(from: DrillFrom, attemptId?: string): string {
  return attemptId ? `/drill?attempt=${attemptId}&from=${from}` : `/drill?from=${from}`;
}

/** A tagged link into the drill narrowed to one chapter (/me's Weak spots). */
export function drillChapterHref(from: DrillFrom, chapterId: string): string {
  return `/drill?chapter=${chapterId}&from=${from}`;
}
