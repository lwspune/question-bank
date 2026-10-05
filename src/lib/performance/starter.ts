/**
 * The one test the empty /performance page offers.
 *
 * WHY: two in three active students (102 of 155, measured 2026-10-06) have no
 * graded paper, and for them this page was a blank box. A full paper is 90 to
 * 180 minutes, too much to ask from an empty page, so the offer is a chapter
 * test (15 to 25 minutes) whenever one exists.
 *
 * WHICH ONE (owner, 2026-10-06: "last chapter read"):
 *   1. the test for the chapter of the student's last practised question, if
 *      that chapter's exam is one they target (or they target none);
 *   2. else, for each target exam in the student's order, its first chapter
 *      test in catalogue (slug) order, or failing that its newest full paper;
 *   3. else, when they target exams with nothing published, say so;
 *   4. else ask which exam.
 *
 * Pure: the page supplies published tests and papers. Spec:
 * tests/performance-starter.test.ts.
 */

export type StarterPaper = {
  examSlug: string;
  slug: string;
  title: string;
  minutes: number;
  questions: number;
};

export type StarterChapterTest = StarterPaper & { chapterId: string };

export type Starter =
  | {
      kind: "chapter";
      test: StarterChapterTest;
      /** Chosen from the last practised chapter, or as the exam's first test. */
      why: "last-read" | "exam";
      /** The exam's newest full paper, offered as the smaller second link. */
      paper: StarterPaper | null;
    }
  | { kind: "paper"; paper: StarterPaper }
  | { kind: "not-yet"; examSlug: string }
  | { kind: "pick-exam" };

export function pickStarter(input: {
  /** student_profiles.target_exams, in the student's order. */
  targetExams: readonly string[];
  /** Chapter of the student's most recent practised question; null if none. */
  lastChapterId: string | null;
  /** Published chapter tests. Order does not matter; slug order is applied. */
  chapterTests: readonly StarterChapterTest[];
  /** Published full past papers, newest first. */
  fullPapers: readonly StarterPaper[];
}): Starter {
  const { targetExams, lastChapterId, fullPapers } = input;
  const tests = [...input.chapterTests].sort((a, b) => a.slug.localeCompare(b.slug));
  const newestPaper = (exam: string) => fullPapers.find((p) => p.examSlug === exam) ?? null;

  const lastRead = lastChapterId ? tests.find((t) => t.chapterId === lastChapterId) : undefined;
  if (lastRead && (targetExams.length === 0 || targetExams.includes(lastRead.examSlug))) {
    return { kind: "chapter", test: lastRead, why: "last-read", paper: newestPaper(lastRead.examSlug) };
  }

  for (const exam of targetExams) {
    const first = tests.find((t) => t.examSlug === exam);
    if (first) return { kind: "chapter", test: first, why: "exam", paper: newestPaper(exam) };
    const paper = newestPaper(exam);
    if (paper) return { kind: "paper", paper };
  }

  if (targetExams.length > 0) return { kind: "not-yet", examSlug: targetExams[0] };
  return { kind: "pick-exam" };
}
