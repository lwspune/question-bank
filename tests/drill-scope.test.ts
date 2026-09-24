/**
 * Scoping the drill to ONE attempt — "fix these mistakes" from a result page.
 *
 * The pool is still the due pool: a question the student got wrong in this
 * attempt but has since fixed (cooling or retired) is NOT served again just
 * because the result page linked here. The attempt only narrows; it never
 * widens.
 */
import { describe, it, expect } from "vitest";
import { scopeToAttempt, type DueQuestion } from "@/lib/drill/select";

const due = (questionId: string, chapter = "Algebra", subtopic = "Sets"): DueQuestion => ({
  questionId,
  chapter,
  subtopic,
  lastWrongAt: "2026-09-01T00:00:00Z",
});

describe("scopeToAttempt", () => {
  it("keeps only due questions that were wrong in the attempt", () => {
    const pool = [due("a"), due("b"), due("c")];
    const out = scopeToAttempt(pool, new Set(["a", "c"]));
    expect(out.map((q) => q.questionId)).toEqual(["a", "c"]);
  });

  it("never adds a question that is not due, even if it was wrong in the attempt", () => {
    const pool = [due("a")];
    const out = scopeToAttempt(pool, new Set(["a", "fixed-since"]));
    expect(out.map((q) => q.questionId)).toEqual(["a"]);
  });

  it("preserves the pool's order", () => {
    const pool = [due("c"), due("a"), due("b")];
    const out = scopeToAttempt(pool, new Set(["a", "b", "c"]));
    expect(out.map((q) => q.questionId)).toEqual(["c", "a", "b"]);
  });

  it("is empty when the attempt had no wrong answers", () => {
    expect(scopeToAttempt([due("a")], new Set())).toEqual([]);
  });
});
