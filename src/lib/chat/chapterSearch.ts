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
  /** The chapter's id, where the list carries it (the landing list does): pasted questions are matched within it. */
  chapterId?: string;
  /** The chapter's subtopic names (lib/chat/subtopicIndex.ts), so "budget" finds the chapter holding "Union Budget". */
  subtopicNames?: readonly string[];
};

/** A found chapter, with the subtopics that matched when its own name did not. */
export type ChapterHit = ChapterSearchRow & { matchedSubtopics?: string[] };

export type ChapterSearchInput = {
  /** Chapter or subject words, e.g. "laws of motion" or "science 2". Chapter numbers are ignored. */
  query: string;
  /** Exam name or slug, e.g. "cbse 12" or "neet". Ignored when it matches no exam. */
  exam?: string;
};

// A whole subject fits, so V can pick "chapter 1" from the list by name.
const MAX_HITS = 20;
// A chapter's own name outranks a subtopic inside it, which outranks the subject.
const CHAPTER_SCORE = 3;
const SUBTOPIC_SCORE = 2;
const SUBJECT_SCORE = 1;
// Subtopics named on a hit's line: enough to show why it matched.
const MAX_MATCHED_SUBTOPICS = 2;
// Words a name is made of that say nothing about the topic.
const NAME_STOPWORDS = new Set(["and", "of", "the", "in", "to", "a", "an", "for", "with", "on", "by", "part"]);

// Science and Technology II, Part I: students type the number.
const ROMAN: Record<string, string> = { i: "1", ii: "2", iii: "3", iv: "4" };
// Short forms the word-start rule cannot reach ("maths" is not the start of "mathematics").
const ALIASES: Record<string, string> = { maths: "math", sst: "social" };
// Words about what the student wants rather than which chapter, dropped so they cannot fail a search.
const FILLER = new Set([
  "imp", "important", "question", "questions", "pyq", "pyqs", "mcq", "mcqs",
  "notes", "previous", "year", "all", "std", "standard",
  // "science part 2" means the subject Science and Technology II; its number still counts (2026-10-18).
  "part",
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

/** The subtopics holding the most query words, best first. */
function bestSubtopics(subtopics: readonly { name: string; words: string[] }[], queryWords: readonly string[]): string[] {
  return subtopics
    .map((st) => ({ name: st.name, n: queryWords.filter((q) => hasWord(st.words, q)).length }))
    .filter((st) => st.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, MAX_MATCHED_SUBTOPICS)
    .map((st) => st.name);
}

function poolFor(rows: readonly ChapterSearchRow[], exam: string | undefined): readonly ChapterSearchRow[] {
  const examWords = words(exam ?? "");
  if (examWords.length === 0) return rows;
  const inExam = rows.filter((r) => matchesExam(r, examWords));
  return inExam.length > 0 ? inExam : rows;
}

function rank(scored: { hit: ChapterHit; score: number }[]): ChapterHit[] {
  scored.sort((a, b) => b.score - a.score || b.hit.questionCount - a.hit.questionCount);
  return scored.slice(0, MAX_HITS).map((s) => s.hit);
}

/** Every query word must land in the chapter, a subtopic, the subject or the exam. */
function strictSearch(pool: readonly ChapterSearchRow[], queryWords: readonly string[]): ChapterHit[] {
  const scored: { hit: ChapterHit; score: number }[] = [];
  for (const row of pool) {
    const chapterWords = words(row.chapterName);
    const subjectWords = words(row.subjectName);
    const examText = examWordsOf(row);
    const subtopics = (row.subtopicNames ?? []).map((name) => ({ name, words: words(name) }));
    let score = 0;
    let matched = 0;
    const viaSubtopic: string[] = [];
    for (const q of queryWords) {
      if (hasWord(chapterWords, q)) {
        score += CHAPTER_SCORE;
        matched += 1;
      } else if (subtopics.some((st) => hasWord(st.words, q))) {
        score += SUBTOPIC_SCORE;
        matched += 1;
        viaSubtopic.push(q);
      } else if (hasWord(subjectWords, q)) {
        score += SUBJECT_SCORE;
        matched += 1;
      } else if (hasWord(examText, q)) {
        // "class 12 physics": the exam's words may ride in the query, but find nothing alone.
        matched += 1;
      }
    }
    // Every query word must land somewhere, or "atoms" would drag in all of Physics.
    if (matched !== queryWords.length || score === 0) continue;
    const hit: ChapterHit = { ...row };
    // Words like "and" land in the chapter name too, so name the subtopics only for a real topic word.
    if (viaSubtopic.some((q) => !NAME_STOPWORDS.has(q))) hit.matchedSubtopics = bestSubtopics(subtopics, viaSubtopic);
    scored.push({ hit, score });
  }
  return rank(scored);
}

function topicWords(name: string): string[] {
  return words(name).filter((w) => !NAME_STOPWORDS.has(w));
}

/**
 * A sentence ("my 1st semester exam related to chapter 7 introduction to
 * microbiology") never has every word in one chapter. When the strict search
 * finds nothing, a chapter or subtopic whose whole name is in the sentence is
 * the answer, longest name first.
 */
function nameInSentenceSearch(pool: readonly ChapterSearchRow[], queryWords: readonly string[]): ChapterHit[] {
  const inQuery = new Set(queryWords);
  const covered = (name: string) => {
    const t = topicWords(name);
    return t.length > 0 && t.every((w) => inQuery.has(w)) ? t.length : 0;
  };
  const scored: { hit: ChapterHit; score: number }[] = [];
  for (const row of pool) {
    const own = covered(row.chapterName);
    if (own > 0) {
      scored.push({ hit: { ...row }, score: own * CHAPTER_SCORE });
      continue;
    }
    const subs = (row.subtopicNames ?? []).map((name) => ({ name, n: covered(name) })).filter((s) => s.n > 0);
    if (subs.length === 0) continue;
    subs.sort((a, b) => b.n - a.n);
    scored.push({
      hit: { ...row, matchedSubtopics: subs.slice(0, MAX_MATCHED_SUBTOPICS).map((s) => s.name) },
      score: subs[0].n * SUBTOPIC_SCORE,
    });
  }
  return rank(scored);
}

export function searchChapters(rows: readonly ChapterSearchRow[], input: ChapterSearchInput): ChapterHit[] {
  const queryWords = queryWordsOf(input.query);
  if (queryWords.length === 0) return [];
  const pool = poolFor(rows, input.exam);
  const strict = strictSearch(pool, queryWords);
  return strict.length > 0 ? strict : nameInSentenceSearch(pool, queryWords);
}

/**
 * The search V's tool runs. When V names an exam that has no such chapter, the
 * search looks in every exam and says so (`missedExam`), so V can ask the
 * student which exam they mean instead of saying "not found". On 2026-10-18 V
 * guessed CBSE for "class 12th physics rotational dynamics" and the chapter,
 * in Maharashtra HSC 12, was never seen.
 */
export function findChapters(
  rows: readonly ChapterSearchRow[],
  input: ChapterSearchInput
): { hits: ChapterHit[]; missedExam: string | null } {
  const hits = searchChapters(rows, input);
  const exam = input.exam?.trim();
  if (hits.length > 0 || !exam) return { hits, missedExam: null };
  const examWords = words(exam);
  // A name matching no exam was already ignored by searchChapters: nothing was missed.
  if (!rows.some((r) => matchesExam(r, examWords))) return { hits, missedExam: null };
  const elsewhere = searchChapters(rows, { query: input.query });
  return { hits: elsewhere, missedExam: elsewhere.length > 0 ? exam : null };
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
export function formatChapterHits(
  hits: readonly ChapterHit[],
  opts: { missedExam?: string | null } = {}
): string {
  if (hits.length === 0) return "No chapter matched. Suggest /browse to search, or ask which exam they mean.";
  const groups = new Map<string, string[]>();
  for (const h of hits) {
    const header = `${h.examName} | ${h.subjectName}`;
    const lines = groups.get(header) ?? [];
    const count = `${h.questionCount} q${h.practiceOnly ? ", textbook practice" : ""}`;
    const has = h.matchedSubtopics?.length ? ` [has: ${h.matchedSubtopics.join(", ")}]` : "";
    lines.push(`- ${h.chapterName} (${count}) ${chapterPath(h)}${has}`);
    groups.set(header, lines);
  }
  const list = [...groups.entries()].flatMap(([header, lines]) => [header, ...lines]);
  if (opts.missedExam) list.unshift(`Nothing matched in ${opts.missedExam}. It is in these other exams:`);
  return list.join("\n");
}
