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
  /** Chapter or subject words, e.g. "laws of motion" or "science 2". Chapter numbers are ignored. */
  query: string;
  /** Exam name or slug, e.g. "cbse 12" or "neet". Ignored when it matches no exam. */
  exam?: string;
};

// A whole subject fits, so V can pick "chapter 1" from the list by name.
const MAX_HITS = 20;

// Science and Technology II, Part I: students type the number.
const ROMAN: Record<string, string> = { i: "1", ii: "2", iii: "3", iv: "4" };
// Short forms the word-start rule cannot reach ("maths" is not the start of "mathematics").
const ALIASES: Record<string, string> = { maths: "math", sst: "social" };
// Words about what the student wants rather than which chapter, dropped so they cannot fail a search.
const FILLER = new Set([
  "imp", "important", "question", "questions", "pyq", "pyqs", "mcq", "mcqs",
  "notes", "previous", "year", "all", "std", "standard",
]);
// "chapter 7": chapter numbers are not stored (chapters.order_index is not the book's order).
const CHAPTER_WORDS = new Set(["chapter", "chapters", "ch", "chap", "lesson", "lessons", "unit"]);

function rawWords(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

/** One word as both sides compare it: "II" and "2" are the same, so are "12th" and "12". */
function normalise(w: string): string {
  const ordinal = /^(\d+)(st|nd|rd|th)$/.exec(w);
  if (ordinal) return ordinal[1];
  return ROMAN[w] ?? ALIASES[w] ?? w;
}

function words(s: string): string[] {
  return rawWords(s).map(normalise);
}

/** The search words of a query, with chapter numbers and filler dropped. */
function queryWordsOf(s: string): string[] {
  const raw = rawWords(s);
  const out: string[] = [];
  for (let i = 0; i < raw.length; i += 1) {
    const w = raw[i];
    if (CHAPTER_WORDS.has(w)) {
      if (i + 1 < raw.length && /^\d+$/.test(raw[i + 1])) i += 1;
      continue;
    }
    if (FILLER.has(w)) continue;
    out.push(normalise(w));
  }
  return out;
}

/** A query word counts when a row word equals it or starts with it (3+ letters). */
function hasWord(rowWords: readonly string[], q: string): boolean {
  return rowWords.some((w) => w === q || (q.length >= 3 && w.startsWith(q)));
}

function examWordsOf(row: ChapterSearchRow): string[] {
  return words(`${row.examName} ${row.examSlug}`);
}

function matchesExam(row: ChapterSearchRow, examWords: readonly string[]): boolean {
  const examText = examWordsOf(row);
  return examWords.every((w) => hasWord(examText, w));
}

export function searchChapters(rows: readonly ChapterSearchRow[], input: ChapterSearchInput): ChapterSearchRow[] {
  const queryWords = queryWordsOf(input.query);
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
    const examText = examWordsOf(row);
    let score = 0;
    let matched = 0;
    for (const q of queryWords) {
      if (hasWord(chapterWords, q)) {
        score += 2;
        matched += 1;
      } else if (hasWord(subjectWords, q)) {
        score += 1;
        matched += 1;
      } else if (hasWord(examText, q)) {
        // "class 12 physics": the exam's words may ride in the query, but find nothing alone.
        matched += 1;
      }
    }
    // Every query word must land somewhere, or "atoms" would drag in all of Physics.
    if (matched === queryWords.length && score > 0) scored.push({ row, score });
  }

  scored.sort((a, b) => b.score - a.score || b.row.questionCount - a.row.questionCount);
  return scored.slice(0, MAX_HITS).map((s) => s.row);
}

export function chapterPath(row: ChapterSearchRow): string {
  return `/questions/${row.examSlug}/${row.subjectSlug}/${row.chapterSlug}`;
}

/**
 * What the model reads back: a header per exam and subject, then one line per
 * chapter with its page to link. The model pays for every token it reads, so
 * the exam and subject are named once, not on each of up to 20 lines. Groups
 * keep the ranking: they appear in the order of their best chapter.
 */
export function formatChapterHits(hits: readonly ChapterSearchRow[]): string {
  if (hits.length === 0) return "No chapter matched. Suggest /browse to search, or ask which exam they mean.";
  const groups = new Map<string, string[]>();
  for (const h of hits) {
    const header = `${h.examName} | ${h.subjectName}`;
    const lines = groups.get(header) ?? [];
    const count = `${h.questionCount} q${h.practiceOnly ? ", textbook practice" : ""}`;
    lines.push(`- ${h.chapterName} (${count}) ${chapterPath(h)}`);
    groups.set(header, lines);
  }
  return [...groups.entries()].flatMap(([header, lines]) => [header, ...lines]).join("\n");
}
