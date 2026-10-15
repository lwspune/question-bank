/**
 * The past paper reading page, /mock/<slug>/paper (2026-10-15).
 *
 * /mock/<slug> is the START page of a timed mock: a title, four numbers and a
 * button, the same 98 words on every paper. Asked "best free website for MHT
 * CET previous year questions", ChatGPT named three sites that SHOW their
 * papers; it had nothing of ours to read. This page prints the whole paper,
 * every question in the order it was set, with the answer and solution behind
 * the same tap and free-answer meter as a board paper (/question-papers).
 *
 * Pure: no React, no DB. Spec: tests/mock-paper-page.test.ts.
 */
import type { BoardQuestion } from "@/lib/board/query";
import { mockDownloadHref, mockTypeOf } from "./catalogue";
import type { MockScope, MockSection, MockSnapshotQuestion, MockSource, ReviewQuestionContent } from "./query";
import { BRAND, TITLE_MAX } from "@/lib/seo/title";

/** Only a whole past paper gets a reading page: a practice paper or a chapter test is not a paper anyone sat. */
export function isReadablePaper(m: { source: MockSource; scope: MockScope }): boolean {
  return mockTypeOf(m) === "past-papers";
}

export function paperPageHref(slug: string): string {
  return `/mock/${slug}/paper`;
}

/** The stored title with its dashes turned into commas: no em dashes in visible text. */
export function plainPaperTitle(title: string): string {
  return title.replace(/\s+[\u2014\u2013]\s+/g, ", ").trim();
}

/** The first candidate that fits a search result, longest first. */
function firstThatFits(candidates: string[]): string {
  return candidates.find((c) => c.length <= TITLE_MAX) ?? candidates[candidates.length - 1];
}

/**
 * The page title. Words come off the end first; when "question paper" would
 * not fit, a paper number followed by its subject ("Paper II, Physics &
 * Chemistry") loses the number, which the subject already says.
 */
export function paperPageTitle(title: string): string {
  const name = plainPaperTitle(title);
  const short = name.replace(/, Paper [IVX0-9]+(?=, )/, "");
  return firstThatFits([
    `${name} question paper with answers · ${BRAND}`,
    `${name} question paper with answers`,
    `${name} question paper`,
    `${short} question paper`,
    name,
  ]);
}

/**
 * `withSolutions`: does this paper carry worked solutions? MPSC, IPMAT and
 * JIPMAT papers have answers only, so the page must not promise more.
 */
export function paperPageDescription(
  m: { title: string; totalQuestions: number; totalMarks: number; durationSecs: number },
  withSolutions: boolean
): string {
  const mins = Math.round(m.durationSecs / 60);
  return (
    `${plainPaperTitle(m.title)}: all ${m.totalQuestions} questions in the order they were set, ` +
    `${withSolutions ? "with answers and worked solutions" : "with answers"}. ${m.totalMarks} marks, ${mins} minutes. Free to read online.`
  );
}

/** A paper counts as solved when nine in ten of its questions carry a worked solution. */
export const SOLVED_SHARE = 0.9;

export type PaperItem = { position: number; marks: number; question: BoardQuestion };
export type PaperSectionView = { key: string; title: string; items: PaperItem[] };

/** What the reveal shows: why a question was not scored, the value for a numeric question, then the solution. */
function solutionText(c: ReviewQuestionContent, grace: boolean): string | null {
  const parts: string[] = [];
  if (c.cancelledNote) parts.push(`**Cancelled:** ${c.cancelledNote}`);
  // A dropped question has no correct option; without this line its reveal
  // would show nothing marked right and no reason why.
  else if (grace) parts.push("**Dropped:** this question was dropped from scoring, so every candidate got its marks.");
  if (c.format === "numeric" && c.numericAnswer !== null) parts.push(`**Answer: ${c.numericAnswer}**`);
  if (c.solution) parts.push(c.solution);
  return parts.length ? parts.join("\n\n") : null;
}

/**
 * The paper, section by section in the order the sections first appear, each
 * question in snapshot order. A question whose content no longer loads is
 * counted in `missing`, never printed as a blank.
 *
 * A numeric question (JEE Section B) has no options, so it is shown as a
 * written question whose answer is the value: the board reader has no numeric
 * input, and "show the answer" is all a reading page needs.
 */
export function buildPaperSections(
  snapshot: MockSnapshotQuestion[],
  content: Map<string, ReviewQuestionContent>,
  sections: MockSection[]
): { sections: PaperSectionView[]; missing: number; solved: number } {
  const labelOf = new Map(sections.map((s) => [s.key, s.label]));
  const out: PaperSectionView[] = [];
  const byKey = new Map<string, PaperSectionView>();
  let missing = 0;
  let solved = 0;

  for (const s of [...snapshot].sort((a, b) => a.position - b.position)) {
    const c = content.get(s.questionId);
    if (!c) {
      missing++;
      continue;
    }
    let section = byKey.get(s.sectionKey);
    if (!section) {
      section = { key: s.sectionKey, title: labelOf.get(s.sectionKey) ?? s.sectionKey, items: [] };
      byKey.set(s.sectionKey, section);
      out.push(section);
    }
    if (c.solution?.trim()) solved++;
    const numeric = c.format === "numeric";
    section.items.push({
      position: s.position,
      marks: s.marks,
      question: {
        id: s.questionId,
        questionNumber: String(s.position),
        text: c.text,
        context: c.context,
        solution: solutionText(c, s.grace === true),
        imageUrl: c.imageUrl,
        solutionImageUrl: c.solutionImageUrl,
        format: numeric ? "subjective" : "mcq",
        setId: null,
        options: numeric ? [] : c.options.map((o) => ({ ...o })),
      },
    });
  }
  return { sections: out, missing, solved };
}

/** "2021-2026", "2026", or null when no paper is dated. */
export function paperYearRange(papers: { pyqYear: number | null }[]): string | null {
  const years = papers.map((p) => p.pyqYear).filter((y): y is number => y !== null);
  if (years.length === 0) return null;
  const lo = Math.min(...years);
  const hi = Math.max(...years);
  return lo === hi ? String(lo) : `${lo}-${hi}`;
}

/**
 * The download list's title, in the words students search ("previous year
 * question papers"). `withSolutions` is the exam's registry flag
 * (EXAM_REGISTRY.pastPaperSolutions), re-measured daily by
 * tests/past-paper-solutions-registry.test.ts.
 */
export function downloadPageTitle(examName: string, range: string | null, withSolutions: boolean): string {
  const lead = `${examName} Previous Year Question Papers`;
  const years = range ? ` (${range})` : "";
  const what = withSolutions ? "Solutions" : "Answers";
  return firstThatFits([
    `${lead} with ${what}${years} · ${BRAND}`,
    `${lead} with ${what}${years}`,
    `${lead}${years} · ${BRAND}`,
    `${lead}${years}`,
    lead,
  ]);
}

/** The exam hub's link to its past papers, or null when it has no whole past paper. */
export function pastPaperHubLink(
  examSlug: string,
  examName: string,
  mocks: { examName: string; source: MockSource; scope: MockScope; pyqYear: number | null }[]
): { href: string; label: string } | null {
  const papers = mocks.filter((m) => m.examName === examName && isReadablePaper(m));
  if (papers.length === 0) return null;
  const range = paperYearRange(papers);
  return {
    href: mockDownloadHref(examSlug),
    label: `Previous year question papers${range ? ` (${range})` : ""}, free to read`,
  };
}
