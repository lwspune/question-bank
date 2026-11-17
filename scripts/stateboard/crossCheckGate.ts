/**
 * The step-6 answer-key cross-check, as a condition flip-public can test
 * (2026-11-17, SUGGESTIONS.md 2026-09-02). Rotational Dynamics reached one
 * command from PUBLIC with the cross-check never run: every other gate was green,
 * because a skipped step raises no error and leaves only a missing file.
 *
 * For a `derivedAnswers` chapter the only key the book provides is the inline
 * `[Ans: ...]` it prints beside some numericals (`bookAnswer` in the committed
 * questions.json). dump-book-answers.ts joins each to our solution for the
 * cross-check. This asks that the dump exists and that every keyed row has our
 * solution beside it. It does not, and cannot, prove the comparison was read:
 * that stays a person's step, recorded in errata.json when it finds anything.
 *
 * A chapter whose book prints no answers at all (Amines) has nothing to check,
 * and passes.
 */
export type BookAnswerRow = { ref: string; our_solution?: string | null };

export function crossCheckProblem(bookAnswerCount: number, dump: BookAnswerRow[] | null): string | null {
  if (bookAnswerCount === 0) return null;
  if (!dump) {
    return (
      `the book prints ${bookAnswerCount} answer(s) for this chapter but the cross-check dump does not exist. ` +
      `Run dump-book-answers.ts, compare each row, record errors in errata.json, then flip.`
    );
  }
  if (dump.length < bookAnswerCount) {
    return `the cross-check dump holds ${dump.length} of ${bookAnswerCount} keyed row(s); re-run dump-book-answers.ts.`;
  }
  const empty = dump.filter((r) => !(r.our_solution ?? "").trim()).map((r) => r.ref);
  if (empty.length) {
    return `${empty.length} keyed row(s) have no solution of ours to compare: ${empty.slice(0, 6).join(", ")}${empty.length > 6 ? " ..." : ""}. Apply solutions, re-dump, cross-check.`;
  }
  return null;
}
