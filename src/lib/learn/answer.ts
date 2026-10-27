import "server-only";
import type { RenderedBlock, RenderedInline } from "./renderedText";
import { renderInlineText, renderRichText } from "./richText";
import type { Figure } from "./types";

/**
 * A graded answer as the lesson screen shows it, with its math rendered on the server.
 * Built from `learn_record_attempt` (a signed-in student: saved, with progress) or
 * `learn_check_answer` (a guest: checked, nothing saved), migration 0190.
 */

export type Route =
  | { kind: "refresher"; chapter: string; concept: string; title: string }
  | { kind: "revise"; label: string };

export type RenderedSolution = { steps: RenderedInline[][]; figure: Figure | null };

export type SavedProgress = {
  streak: number;
  toRetry: number;
  needed: number;
  mastered: boolean;
  masteredNow: boolean;
  review: { reviewing: boolean; done: boolean; passed: boolean; correct: number; needed: number; nextReviewAt: string | null };
};

export type AnswerResult = {
  correct: boolean;
  correctKey: string;
  remediation: RenderedBlock[] | null;
  solution: RenderedSolution;
  /** False for a guest: the answer was checked, not stored. */
  saved: boolean;
  progress: SavedProgress | null;
  route: Route | null;
};

/** The JSON the two database functions return; the progress fields come only from learn_record_attempt. */
export type GradedAnswer = {
  correct: boolean;
  correct_key: string;
  misconception_code?: string | null;
  remediation: string | null;
  solution: { steps: string[]; figure?: Figure };
  streak?: number;
  to_retry?: number;
  needed?: number;
  state?: string;
  mastered_now?: boolean;
  reviewing?: boolean;
  review_done?: boolean;
  review_passed?: boolean;
  review_correct?: number;
  review_needed?: number;
  next_review_at?: string | null;
  route?: Route | null;
};

export function toAnswerResult(g: GradedAnswer, saved: boolean): AnswerResult {
  return {
    correct: g.correct,
    correctKey: g.correct_key,
    remediation: g.remediation ? renderRichText(g.remediation) : null,
    solution: { steps: g.solution.steps.map(renderInlineText), figure: g.solution.figure ?? null },
    saved,
    progress: saved
      ? {
          streak: g.streak ?? 0,
          toRetry: g.to_retry ?? 0,
          needed: g.needed ?? 0,
          mastered: g.state === "mastered",
          masteredNow: g.mastered_now ?? false,
          review: {
            reviewing: g.reviewing ?? false,
            done: g.review_done ?? false,
            passed: g.review_passed ?? false,
            correct: g.review_correct ?? 0,
            needed: g.review_needed ?? 0,
            nextReviewAt: g.next_review_at ?? null,
          },
        }
      : null,
    route: g.route ?? null,
  };
}
