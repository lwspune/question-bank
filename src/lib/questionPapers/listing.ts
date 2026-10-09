/**
 * The shapes /question-papers renders, built from the stored papers
 * (migration 0146). PURE: the loaders are in ./query.ts.
 * Spec: tests/question-papers-listing.test.ts.
 */
import type { BoardQuestion } from "@/lib/board/query";

/** One published paper as the list pages see it (no items). */
export type PaperListing = {
  id: string;
  examId: string;
  subjectId: string;
  subjectName: string;
  slug: string;
  groupSlug: string;
  setNumber: number | null;
  year: number;
  sitting: string | null;
  paperCode: string | null;
  title: string;
  totalMarks: number;
  durationMinutes: number | null;
};

export type PaperGroupListing = {
  groupSlug: string;
  label: string;
  sets: { setNumber: number | null; slug: string; paperCode: string | null }[];
};

export type PaperYearListing = { year: number; groups: PaperGroupListing[] };

/** "55/1" for a CBSE group (its code without the set); the sitting otherwise. */
export function groupLabel(p: Pick<PaperListing, "paperCode" | "setNumber" | "sitting" | "year">): string {
  if (p.paperCode && p.setNumber !== null) return p.paperCode.split("/").slice(0, -1).join("/");
  return p.sitting ?? p.paperCode ?? String(p.year);
}

/** One subject's papers: years newest first, groups by code, sets in order. */
export function subjectListing(papers: PaperListing[]): PaperYearListing[] {
  const byYear = new Map<number, Map<string, PaperListing[]>>();
  for (const p of papers) {
    const groups = byYear.get(p.year) ?? new Map<string, PaperListing[]>();
    groups.set(p.groupSlug, [...(groups.get(p.groupSlug) ?? []), p]);
    byYear.set(p.year, groups);
  }
  return [...byYear.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, groups]) => ({
      year,
      groups: [...groups.entries()]
        .sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true }))
        .map(([groupSlug, sets]) => {
          const ordered = [...sets].sort((a, b) => (a.setNumber ?? 0) - (b.setNumber ?? 0));
          return {
            groupSlug,
            label: groupLabel(ordered[0]),
            sets: ordered.map((s) => ({ setNumber: s.setNumber, slug: s.slug, paperCode: s.paperCode })),
          };
        }),
    }));
}

/** One stored item (board_paper_items). */
export type PaperItemRow = {
  position: number;
  printedNumber: string;
  section: string;
  marks: number;
  alternativeTo: number | null;
  caseKey: string | null;
  questionId: string;
};

export type PaperViewItem = {
  position: number;
  section: string;
  marks: number;
  /** An "OR" alternative: the page prints "OR" before it. */
  isAlternative: boolean;
  caseKey: string | null;
  /** Its bank question, numbered as printed ("Q.18 (b)"). */
  question: BoardQuestion;
};

/**
 * A paper's items in printed order, each with its question. Null when any
 * question is no longer available (unpublished or deleted since the paper was
 * built): a paper with a hole would print the wrong numbers, so the page says
 * it is unavailable rather than showing it short.
 */
export function assemblePaper(items: PaperItemRow[], questions: BoardQuestion[]): PaperViewItem[] | null {
  const byId = new Map(questions.map((q) => [q.id, q]));
  const ordered = [...items].sort((a, b) => a.position - b.position);
  const out: PaperViewItem[] = [];
  for (const it of ordered) {
    const q = byId.get(it.questionId);
    if (!q) return null;
    out.push({
      position: it.position,
      section: it.section,
      marks: it.marks,
      isAlternative: it.alternativeTo !== null,
      caseKey: it.caseKey,
      question: { ...q, questionNumber: `Q.${it.printedNumber}` },
    });
  }
  return out;
}
