/**
 * The PUBLISH decision for an IPMAT row — pure core, so the rule is spec'd
 * rather than buried in a CLI that only runs once.
 *
 * SHIP RULE: a row goes PUBLIC iff it carries an answer, OR it is a DECLARED
 * grace question.
 *
 * WHY GRACE IS AN EXPLICIT ALLOWANCE AND NOT "unkeyed is fine". IPMAT Indore
 * 2024 MCQ Q7 was cancelled by the exam — it has four printed options and no
 * correct one, and is loaded keyless on purpose so the 2024 mock reconstructs
 * at its true 90 questions. `scripts/mocks/build.ts` reads only PUBLIC rows, so
 * holding it back would silently produce an 89-question paper that fails its
 * own count check. Publishing a keyless row is precedented: 32 PUBLIC rows in
 * the bank already have zero correct options.
 *
 * But "unkeyed ⇒ publish" would be the wrong rule, because it cannot tell a
 * CANCELLED question from one whose key we simply failed to ingest. So the
 * allowance keys on the sitting registry's DECLARED grace list — the same
 * shape the CDS gates use for a declared source-duplicate, where the point is
 * that the declaration is made in advance and in one place.
 */

/** The fields of a bank row this decision reads. */
export type PublishCandidate = {
  questionNumber: string | null;
  sourceFile: string | null;
  /** `"numeric"` rows answer via `numeric_answer`; everything else via options. */
  questionFormat: string | null;
  numericAnswer: number | null;
  hasCorrectOption: boolean;
};

export type PublishVerdict =
  | { publish: true; reason: "answered" | "declared-grace" }
  | { publish: false; reason: "unanswered" };

/** True when the row carries an answer of the kind its format uses. */
export function isAnswered(row: PublishCandidate): boolean {
  if (row.questionFormat === "numeric") return row.numericAnswer !== null;
  return row.hasCorrectOption;
}

/**
 * `isGrace` is injected rather than imported so this core stays free of the
 * sitting registry — the caller passes `isGrace` from scripts/mocks/ipmatSittings,
 * which is the ONE place a cancelled question is declared.
 */
export function publishVerdict(
  row: PublishCandidate,
  isDeclaredGrace: (sourceFile: string | undefined, questionNumber: string | null) => boolean
): PublishVerdict {
  if (isAnswered(row)) return { publish: true, reason: "answered" };
  if (isDeclaredGrace(row.sourceFile ?? undefined, row.questionNumber)) {
    return { publish: true, reason: "declared-grace" };
  }
  return { publish: false, reason: "unanswered" };
}
