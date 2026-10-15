/**
 * The questions V asks to build a practice test, in order, as plain data.
 *
 * The step is DERIVED from the answers given so far (the first one missing),
 * never stored beside them, so the two cannot disagree. Back forgets the last
 * answer. Choosing chapters is one step that may hold several picks, so it
 * counts as answered only when the student confirms at least one.
 *
 * Pure. Spec: tests/practice-tests-builder.test.ts.
 */
import type { PracticeDifficulty } from "./pick";

export const BUILDER_STEPS = ["exam", "subject", "chapters", "length", "difficulty", "fresh", "summary"] as const;
export type BuilderStep = (typeof BUILDER_STEPS)[number];

/** The most chapters one test may mix. */
export const MAX_CHAPTERS = 5;

export type BuilderAnswers = {
  exam?: string;
  subject?: string;
  /** Confirmed chapters. Empty or missing = the chapters step is not done. */
  chapterIds?: string[];
  /** The student chose "Most-asked chapters" rather than naming chapters. */
  mostAsked?: boolean;
  length?: number;
  difficulty?: PracticeDifficulty;
  /** Skip questions already answered. */
  fresh?: boolean;
};

function answered(a: BuilderAnswers, step: BuilderStep): boolean {
  switch (step) {
    case "exam":
      return !!a.exam;
    case "subject":
      return !!a.subject;
    case "chapters":
      return (a.chapterIds?.length ?? 0) > 0;
    case "length":
      return a.length !== undefined;
    case "difficulty":
      return a.difficulty !== undefined;
    case "fresh":
      return a.fresh !== undefined;
    case "summary":
      return false;
  }
}

export function currentStep(a: BuilderAnswers): BuilderStep {
  return BUILDER_STEPS.find((s) => !answered(a, s)) ?? "summary";
}

/** The answers with the last one forgotten. */
export function backFrom(a: BuilderAnswers): BuilderAnswers {
  const at = BUILDER_STEPS.indexOf(currentStep(a));
  if (at === 0) return a;
  const out = { ...a };
  switch (BUILDER_STEPS[at - 1]) {
    case "exam":
      delete out.exam;
      break;
    case "subject":
      delete out.subject;
      break;
    case "chapters":
      delete out.chapterIds;
      delete out.mostAsked;
      break;
    case "length":
      delete out.length;
      break;
    case "difficulty":
      delete out.difficulty;
      break;
    case "fresh":
      delete out.fresh;
      break;
  }
  return out;
}

/** Add or remove one chapter; a sixth is ignored. */
export function toggleChapter(ids: readonly string[], id: string): string[] {
  if (ids.includes(id)) return ids.filter((x) => x !== id);
  if (ids.length >= MAX_CHAPTERS) return [...ids];
  return [...ids, id];
}
