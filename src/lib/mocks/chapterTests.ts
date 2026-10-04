/**
 * Chapter tests, found from their own questions, and the "test yourself" copy
 * that points at them.
 *
 * WHY: chapter tests (scope='sectional', 2026-09-30) were reachable only from
 * the mock catalogue, while most new visitors land on a chapter's /questions
 * or notes page. Those pages now point at the chapter's own test when there is
 * one, and at the exam's past papers when there is not.
 *
 * mock_tests stores no chapter. A test is matched to a chapter only when EVERY
 * one of its questions belongs to that chapter: a whole-subject sectional test
 * is not a chapter test, and a question we cannot place (not PUBLIC, deleted)
 * skips the test rather than guessing. Works for any exam that gains chapter
 * tests, with no per-exam data.
 *
 * Pure: no React, no DB, so the client card can import the copy. The cached
 * loader is ./chapterTestsQuery.ts. Spec: tests/chapter-tests.test.ts.
 */
import { withArticle } from "@/lib/text/article";

export type ChapterTest = {
  chapterId: string;
  slug: string;
  title: string;
  questions: number;
  minutes: number;
};

export type SectionalMock = {
  slug: string;
  title: string;
  totalQuestions: number;
  durationSecs: number;
  questionIds: readonly string[];
};

/** chapterId → its test; the first by slug wins when a chapter has two. */
export function chapterTestsByChapter(
  mocks: readonly SectionalMock[],
  chapterOf: ReadonlyMap<string, string>
): Map<string, ChapterTest> {
  const out = new Map<string, ChapterTest>();
  const ordered = [...mocks].sort((a, b) => a.slug.localeCompare(b.slug));
  for (const m of ordered) {
    if (m.questionIds.length === 0) continue;
    const chapters = new Set(m.questionIds.map((id) => chapterOf.get(id)));
    if (chapters.size !== 1) continue;
    const [chapterId] = chapters;
    if (!chapterId || out.has(chapterId)) continue;
    out.set(chapterId, {
      chapterId,
      slug: m.slug,
      title: m.title,
      questions: m.totalQuestions,
      minutes: Math.round(m.durationSecs / 60),
    });
  }
  return out;
}

export type PaperCta = { href: string; examDisplay: string };

export type MockCta =
  | ({ kind: "paper" } & PaperCta)
  | {
      kind: "chapter";
      href: string;
      examDisplay: string;
      chapterName: string;
      questions: number;
      minutes: number;
    };

/**
 * The chapter's test when it has one, else the exam's past papers. `paper` is
 * null for an exam without mocks, and then there is nothing to offer.
 */
export function withChapterTest(
  paper: PaperCta | null,
  test: ChapterTest | undefined,
  chapterName: string
): MockCta | null {
  if (!paper) return null;
  if (!test) return { kind: "paper", ...paper };
  return {
    kind: "chapter",
    href: `/mock/${test.slug}`,
    examDisplay: paper.examDisplay,
    chapterName,
    questions: test.questions,
    minutes: test.minutes,
  };
}

export type MockCtaCopy = {
  /** The notes card's heading. */
  title: string;
  /** The notes card's paragraph. */
  body: string;
  /** The notes card's button. */
  button: string;
  /** The slide-up bar's line. */
  bar: string;
  /** The /questions chapter page's button. */
  short: string;
};

const AFTER = "You see your score and every answer the moment you finish. Free to start.";

export function mockCtaCopy(cta: MockCta): MockCtaCopy {
  if (cta.kind === "paper") {
    return {
      title: "Test yourself on a real paper",
      body: `Sit a past ${cta.examDisplay} paper, timed and marked the way the exam marks it. ${AFTER}`,
      button: `Sit ${withArticle(cta.examDisplay)} past paper`,
      bar: `Sit a real ${cta.examDisplay} paper, timed.`,
      short: `Sit ${withArticle(cta.examDisplay)} paper as a timed mock`,
    };
  }
  return {
    title: `Test yourself on ${cta.chapterName}`,
    body: `${cta.questions} past ${cta.examDisplay} questions from this chapter, timed at ${cta.minutes} minutes and marked the way the exam marks it. ${AFTER}`,
    button: `Take the ${cta.chapterName} chapter test`,
    bar: `${cta.chapterName} chapter test: ${cta.questions} questions, ${cta.minutes} minutes.`,
    short: `Take the ${cta.chapterName} chapter test`,
  };
}
