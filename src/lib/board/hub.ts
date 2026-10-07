/**
 * The /board/<exam> hub: chapters under subject tabs (book order), and the
 * Continue card's target, the chapter of the last board question a signed-in
 * student answered. Pure; spec tests/board-hub.test.ts.
 *
 * The reader has no per-section anchors, so Continue opens the chapter and
 * names the book section ("Exercise 8.2") rather than linking into it.
 */

/** Chapters shown per subject tab before "Show all". */
export const HUB_BOARD_CHAPTERS = 6;

export type BoardHubChapterRef = { href: string; name: string; subjectName: string };

export type BoardContinue = {
  href: string;
  chapterName: string;
  subjectName: string;
  sectionLabel: string | null;
};

/**
 * Where to send a returning student. Null when they have answered no board
 * question, or when it belongs to a chapter this hub does not list (another
 * exam's board, or a chapter not yet in book structure).
 */
export function boardContinueTarget(
  last: { chapterId: string; sectionLabel: string | null } | null,
  chapters: Readonly<Record<string, BoardHubChapterRef>>
): BoardContinue | null {
  if (!last) return null;
  const c = chapters[last.chapterId];
  if (!c) return null;
  return { href: c.href, chapterName: c.name, subjectName: c.subjectName, sectionLabel: last.sectionLabel };
}
