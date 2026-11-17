/**
 * Which rows of an NCERT chapter must carry a derived-answer stamp, and whether
 * the bank holds them all stamped. Shared by stamp-provenance.ts (which writes the
 * stamp) and flip-public.ts (which refuses to publish without it), so the two
 * cannot disagree about the rule. 2026-11-17, SUGGESTIONS.md 2026-09-09: the State
 * Board lane refused an unstamped derived answer at publish; this lane only had
 * the stamp script, and stamping was forgotten on 28 of 48 cross-checked chapters.
 *
 * The rule (stamp-provenance.ts's header has the measured why):
 *   - a book that prints NO answer key: every row except a worked example ("Eg ...")
 *   - a keyed book: exactly the rows the cross-check recorded as NO-KEY-ENTRY.
 * A worked example carries the book's own solution and is never stamped.
 */
export type CrossCheckRow = { ref: string; verdict: string; note?: string };

export const DERIVED_MODEL = "claude-opus-5 (authored; NCERT key prints no answer for this question)";
export const DERIVED_MODEL_NO_KEY = "claude-opus-5 (authored; this NCERT book publishes no answer key)";

export function requiredStampRefs(input: {
  hasAnswerKey: boolean;
  questionRefs: string[];
  crosscheck: CrossCheckRow[] | null;
}): { refs: string[]; model: string } {
  if (!input.hasAnswerKey) {
    return { refs: input.questionRefs.filter((r) => !r.startsWith("Eg ")), model: DERIVED_MODEL_NO_KEY };
  }
  if (!input.crosscheck) {
    throw new Error(
      "no cross-check on disk (data/<id>.crosscheck.json). Run the answer-key cross-check first: " +
        "without it there is no evidence of which answers the book leaves unconfirmed."
    );
  }
  const solved = input.crosscheck.filter((r) => r.verdict === "NO-KEY-ENTRY" && r.ref.startsWith("Eg "));
  if (solved.length) {
    throw new Error(
      `the cross-check records ${solved.length} worked example(s) as NO-KEY-ENTRY (${solved.map((r) => r.ref).join(", ")}). ` +
        "A worked example carries the book's own solution and must not be stamped; fix the cross-check output."
    );
  }
  return { refs: input.crosscheck.filter((r) => r.verdict === "NO-KEY-ENTRY").map((r) => r.ref), model: DERIVED_MODEL };
}

/** The required rows the bank holds WITHOUT a stamp, as a refusal message; null when none. */
export function unstampedProblem(
  required: string[],
  rows: { question_number: string | null; derived_model: string | null }[]
): string | null {
  const byRef = new Map(rows.map((r) => [r.question_number ?? "", r.derived_model]));
  const present = required.filter((ref) => byRef.has(ref));
  const missing = present.filter((ref) => !byRef.get(ref));
  if (!missing.length) return null;
  return (
    `${missing.length} of ${present.length} derived answer(s) carry no provenance stamp: ` +
    `${missing.slice(0, 6).join(", ")}${missing.length > 6 ? " ..." : ""}`
  );
}
