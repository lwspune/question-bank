/**
 * Reading the committed review artifacts into review verdicts. Pure — no I/O.
 *
 * The artifacts (each pipeline's `data` dir: `<id>.crosscheck.json` and
 * `<id>.mcq-verify.json`) are the
 * only machine-readable record of review work done before migration 0074. They
 * hold what an AGENT concluded at the time, which is not always what was finally
 * adjudicated — so anything ambiguous is escalated to an explicit override
 * rather than guessed. See tests/reviews-artifacts.test.ts.
 */
import type { ReviewVerdict } from "./types";

export type ArtifactKind = "crosscheck" | "mcq-verify" | "errata";

export type VerdictResolution =
  | { kind: "verdict"; verdict: ReviewVerdict }
  | { kind: "needs_override"; reason?: string }
  | { kind: "unknown"; raw: string };

/**
 * Cross-check verdicts as written by the answer-key-diff agents.
 *
 * OUR-ANSWER-WRONG is deliberately absent: it records that our answer was judged
 * wrong, not what followed. The one real instance (NCERT Ex 7.9 Q9) was later
 * OVERTURNED — our (A) is right and the printed key is wrong — so mapping it
 * mechanically would invert the record.
 */
const CROSSCHECK_MAP: Record<string, ReviewVerdict> = {
  AGREE: "confirmed",
  "BOOK-WRONG": "defect_preserved",
  "BOOK-KEY-WRONG": "defect_preserved",
  "CANT-READ-KEY": "unverifiable",
  "NO-BOOK-ANSWER": "unverifiable",
  "BOTH-DEFENSIBLE": "unverifiable",
};

const NEEDS_ADJUDICATION = new Set(["OUR-ANSWER-WRONG"]);

export function resolveCrosscheckVerdict(raw: string): VerdictResolution {
  const key = String(raw ?? "").trim().toUpperCase();
  if (NEEDS_ADJUDICATION.has(key)) return { kind: "needs_override" };
  const verdict = CROSSCHECK_MAP[key];
  if (verdict) return { kind: "verdict", verdict };
  return { kind: "unknown", raw: String(raw ?? "") };
}

/** "(c)" / " d. " / "b" → "C" / "D" / "B"; anything not a bare A-D → null. */
export function normalizeOptionLabel(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/[()\s.]/g, "").toUpperCase();
  return /^[A-D]$/.test(cleaned) ? cleaned : null;
}

/**
 * An mcq-verify row confirms only when the blind derivation still matches the
 * LIVE stored key. A disagreement is never auto-mapped: it means either the key
 * was fixed after the artifact was written, or the question is defective and the
 * official key was deliberately retained. Both occur in this bank.
 */
export function resolveMcqVerdict(input: {
  derivedAnswer: string | null | undefined;
  liveCorrectLabel: string | null | undefined;
}): VerdictResolution {
  const derived = normalizeOptionLabel(input.derivedAnswer);
  const live = normalizeOptionLabel(input.liveCorrectLabel);
  if (!derived) return { kind: "needs_override", reason: "no readable derived answer" };
  if (!live) return { kind: "needs_override", reason: "no readable live key" };
  if (derived === live) return { kind: "verdict", verdict: "confirmed" };
  return { kind: "needs_override", reason: `derived ${derived} vs live ${live}` };
}

const KIND_SUFFIX: Record<ArtifactKind, string> = {
  crosscheck: "answer-key-crosscheck",
  "mcq-verify": "blind-mcq-verify",
  errata: "errata",
};

/** Run label that traces a row back to the file it came from. */
export function artifactRunLabel(pipeline: string, artifactId: string, kind: ArtifactKind): string {
  return `backfill:${pipeline}:${artifactId}:${KIND_SUFFIX[kind]}`;
}

/**
 * Run label for a pass emitting reviews AS IT RUNS (an ingestion pipeline's
 * mark-mcq-verify / apply-errata step), as opposed to the backfill's
 * reconstruction of an old artifact. Deliberately a different label from
 * `artifactRunLabel` for the same chapter: they are separate passes, and sharing
 * a label would let the dedupe constraint drop one of them.
 */
export function liveRunLabel(pipeline: string, artifactId: string, kind: ArtifactKind): string {
  return `${pipeline}:${artifactId}:${KIND_SUFFIX[kind]}`;
}

/** Stable key for an override entry. */
export function overrideKey(pipeline: string, artifactId: string, ref: string): string {
  return `${pipeline}/${artifactId}::${ref}`;
}

/**
 * Questions given MORE THAN ONE verdict inside a single run.
 *
 * The dedupe constraint is `(question_id, run_label, reviewed_content_hash)`, so
 * two artifact rows describing the same question in the same run collapse to one
 * — and if their verdicts differ, whichever reached the database first silently
 * wins. That happened on the first backfill run: NCERT `Ex 7.8 Q13-22` sit in
 * two overlapping agent batches of one cross-check, one saying the key wasn't on
 * its page (unverifiable) and the other having found it under the old numbering
 * and matched it (confirmed). Readdir order decided, and it discarded the
 * better-evidenced verdict.
 *
 * A disagreement between two runs is NOT a conflict — that is real history, and
 * both rows belong. Only a disagreement WITHIN one run is unresolvable data.
 */
export function findVerdictConflicts(
  rows: readonly { questionId: string; runLabel: string; verdict: string; ref: string }[]
): { questionId: string; runLabel: string; ref: string; verdicts: string[] }[] {
  const groups = new Map<string, { questionId: string; runLabel: string; ref: string; verdicts: Set<string> }>();
  for (const row of rows) {
    const key = `${row.questionId}||${row.runLabel}`;
    const group = groups.get(key);
    if (group) group.verdicts.add(row.verdict);
    else
      groups.set(key, {
        questionId: row.questionId,
        runLabel: row.runLabel,
        ref: row.ref,
        verdicts: new Set([row.verdict]),
      });
  }
  return [...groups.values()]
    .filter((g) => g.verdicts.size > 1)
    .map((g) => ({ questionId: g.questionId, runLabel: g.runLabel, ref: g.ref, verdicts: [...g.verdicts] }));
}

export const ARTIFACT_METHOD: Record<ArtifactKind, "textbook_answer_key" | "blind_rederivation"> = {
  crosscheck: "textbook_answer_key",
  "mcq-verify": "blind_rederivation",
  errata: "textbook_answer_key",
};

/**
 * An `errata.json` entry is a human-adjudicated book defect: the bracket says
 * either the printed KEY is wrong (our answer stands) or the question / the
 * book's own printed solution is defective and we preserve and explain it.
 * Either way we changed nothing of ours, so it is `defect_preserved` and never a
 * corrective verdict. The bracket prefix is validated by apply-errata.ts, so an
 * entry that does not carry one is malformed rather than a different verdict.
 */
export function resolveErratumVerdict(bracket: string): VerdictResolution {
  const text = String(bracket ?? "").trimStart();
  if (!text.startsWith("[Textbook")) return { kind: "unknown", raw: text.slice(0, 60) };
  return { kind: "verdict", verdict: "defect_preserved" };
}
