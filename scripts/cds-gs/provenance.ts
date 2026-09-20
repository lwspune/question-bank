/**
 * What a CDS General Knowledge row says about WHERE ITS ANSWER CAME FROM.
 *
 * Pure. Spec: tests/cds-gs-provenance.test.ts.
 *
 * This corpus used to have exactly one answer story — there is no published key,
 * so every answer is the product of two independent blind derivations — and
 * flip-public.ts stamped that sentence onto all 2,280 rows. CDS (II) 2026 broke
 * the uniformity: UPSC published a provisional key for that sitting, so its
 * answers are key-backed and the old clause would be a FALSE claim about them,
 * in the one direction that matters. Telling a student an answer is a derivation
 * when it is official understates what we have; telling them it is official when
 * it is a derivation overstates it, and this corpus must never do the second.
 * Both are wrong, and a single hardcoded clause guarantees one of them.
 *
 * So the clause is chosen per paper, from the config fact that decides it —
 * whether that paper has an `answerKey` — rather than from a list of paper ids
 * that a future ingest would have to remember to update.
 */

/** The nineteen papers with no published key: every answer is LLM-derived. */
export const DERIVED_CLAUSE =
  " [No official answer key is published for this paper. The answer and solution here were " +
  "derived independently by two blind passes and, where those disagreed, adjudicated by hand " +
  "against the printed page.]";

/**
 * CDS (II) 2026, the one sitting UPSC published a key for.
 *
 * It names the blind derivation too, and deliberately: the derivation is why
 * this paper's option order is trustworthy, and a reader comparing it with the
 * other nineteen should be able to see that the two are not the same claim.
 */
export const KEYED_CLAUSE =
  " [Answers are from the official UPSC provisional answer key for this sitting, cross-checked " +
  "against an independent blind derivation made before the key was opened.]";

/** Every clause this corpus has ever stamped — used to detect an already-stamped row. */
const ALL_MARKERS = ["No official answer key", "official UPSC provisional answer key"];

export function provenanceClause(hasAnswerKey: boolean): string {
  return hasAnswerKey ? KEYED_CLAUSE : DERIVED_CLAUSE;
}

export function derivedModel(hasAnswerKey: boolean): string {
  return hasAnswerKey
    ? "official UPSC provisional key (blind derivation scored against it)"
    : "claude-opus-5 (two independent blind passes)";
}

/**
 * Append the right clause to a note, unless one is already there.
 *
 * Idempotent across BOTH clauses, not just its own: a re-run must not append the
 * keyed clause to a row already carrying the derived one, which would publish
 * two contradictory provenance statements on the same question.
 */
export function stampNote(existing: string | null, hasAnswerKey: boolean): string {
  const note = existing ?? "";
  if (ALL_MARKERS.some((m) => note.includes(m))) return note;
  return `${note}${provenanceClause(hasAnswerKey)}`;
}
