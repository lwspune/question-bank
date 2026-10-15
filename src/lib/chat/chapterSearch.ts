/**
 * V's find_chapters tool (2026-10-15). Students type "atoms cbse pyq" or
 * "11th physics all chapters"; the model turns that into a search here and
 * links the chapter pages that come back. It searches the cached /questions
 * landing list (lib/questions/landing.ts), so a search costs no database read.
 *
 * Pure. Spec: tests/chat-chapter-search.test.ts.
 */

export type ChapterSearchRow = {
  examSlug: string;
  examName: string;
  subjectSlug: string;
  subjectName: string;
  chapterSlug: string;
  chapterName: string;
  questionCount: number;
  practiceOnly: boolean;
};

export type ChapterSearchInput = {
  /** Chapter or subject words, e.g. "laws of motion" or "science 2". */
  query: string;
  /** Exam name or slug, e.g. "cbse 12" or "neet". Ignored when it matches no exam. */
  exam?: string;
};

const MAX_HITS = 10;

function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

/** A query word counts when a row word equals it or starts with it (3+ letters). */
function hasWord(rowWords: readonly string[], q: string): boolean {
  return rowWords.some((w) => w === q || (q.length >= 3 && w.startsWith(q)));
}

function matchesExam(row: ChapterSearchRow, examWords: readonly string[]): boolean {
  const examText = words(`${row.examName} ${row.examSlug}`);
  return examWords.every((w) => hasWord(examText, w));
}

export function searchChapters(rows: readonly ChapterSearchRow[], input: ChapterSearchInput): ChapterSearchRow[] {
  const queryWords = words(input.query);
  if (queryWords.length === 0) return [];

  let pool: readonly ChapterSearchRow[] = rows;
  const examWords = words(input.exam ?? "");
  if (examWords.length > 0) {
    const inExam = rows.filter((r) => matchesExam(r, examWords));
    if (inExam.length > 0) pool = inExam;
  }

  const scored: { row: ChapterSearchRow; score: number }[] = [];
  for (const row of pool) {
    const chapterWords = words(row.chapterName);
    const subjectWords = words(row.subjectName);
    let score = 0;
    let matched = 0;
    for (const q of queryWords) {
      if (hasWord(chapterWords, q)) {
        score += 2;
        matched += 1;
      } else if (hasWord(subjectWords, q)) {
        score += 1;
        matched += 1;
      }
    }
    // Every query word must land somewhere, or "atoms" would drag in all of Physics.
    if (matched === queryWords.length) scored.push({ row, score });
  }

  scored.sort((a, b) => b.score - a.score || b.row.questionCount - a.row.questionCount);
  return scored.slice(0, MAX_HITS).map((s) => s.row);
}

export function chapterPath(row: ChapterSearchRow): string {
  return `/questions/${row.examSlug}/${row.subjectSlug}/${row.chapterSlug}`;
}

/** What the model reads back: one line per chapter, with the page to link. */
export function formatChapterHits(hits: readonly ChapterSearchRow[]): string {
  if (hits.length === 0) return "No chapter matched. Suggest /browse to search, or ask which exam they mean.";
  return hits
    .map(
      (h) =>
        `${h.examName} | ${h.subjectName} | ${h.chapterName} | ${h.questionCount} questions` +
        `${h.practiceOnly ? " (textbook practice)" : ""} | ${chapterPath(h)}`
    )
    .join("\n");
}
