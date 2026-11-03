/**
 * A board chapter's quick-revision sheet (2026-11-03): the night-before page
 * for one /board chapter, shown in the reader's Revision tab and printed as a
 * PDF for Premium Pass holders.
 *
 * Not notes: a board student already has the textbook and its solutions on
 * the same page. The sheet is what a board paper rewards, in the textbook's
 * own wording: the points to state, the formulas, the derivations and
 * diagrams that are asked, the questions the board has set most often, and
 * the mistakes that lose marks.
 *
 * Every text field takes inline `\( \)` maths and `**bold**`. Checked by
 * lib/board/revision/lint.ts; one file per chapter under
 * lib/board/revision/sheets/, registered in registry.ts.
 */
import type { FormulaSpec } from "@/app/notes/_types";

export type RevisionKeyPoint = {
  /** The term, law or statement's name: "Moment of inertia". */
  term: string;
  /** What to write, close to the textbook's wording. */
  text: string;
};

export type RevisionDerivation = {
  /** As the board asks it: "Derive an expression for ...". */
  title: string;
  /** The outline, one line a step: what a full-marks answer goes through. */
  steps: string[];
};

export type RevisionDiagram = {
  /** "Conical pendulum". */
  title: string;
  /** The labels an examiner looks for. */
  labels: string[];
};

export type RevisionMostAsked = {
  /** The question in short, as the board sets it. */
  topic: string;
  /** Marks it carries, only where our past papers record them (no MH HSC 12
   *  row does, 2026-11-03). Never guessed. */
  marks?: number;
  /** Years it was asked, newest first, from our board past papers. */
  years: number[];
};

export type RevisionMistake = {
  title: string;
  body: string;
};

export type RevisionSheet = {
  /** The exam's slug, as /board/<examSlug> spells it. */
  examSlug: string;
  /** The DB subject name ("Physics"); `subjectRoute` must be its board slug. */
  subjectName: string;
  subjectRoute: string;
  /** The DB chapter name; `chapterSlug` must be its board slug. */
  chapterName: string;
  chapterSlug: string;
  /** The book every fact was checked against: "Balbharati Physics Std XII, Chapter 1". */
  source: string;
  keyPoints: RevisionKeyPoint[];
  /** Empty for a chapter taught without formulas (Biology, Geography). */
  formulas: FormulaSpec[];
  derivations: RevisionDerivation[];
  diagrams: RevisionDiagram[];
  mostAsked: RevisionMostAsked[];
  mistakes: RevisionMistake[];
};
