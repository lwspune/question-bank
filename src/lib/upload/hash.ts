import { createHash } from "node:crypto";

const norm = (s: string) => s.trim().replace(/\s+/g, " ");

export function contentHash(
  question: string,
  options: string[],
  answer: string
): string {
  const q = norm(question);
  const opts = options.map(norm).sort();
  const ans = answer.trim().toUpperCase();
  return createHash("sha256")
    .update(`${q}\n${opts.join("\n")}\n${ans}`)
    .digest("hex");
}

/**
 * Dedup hash for a SUBJECTIVE (free-response) question. Subjective questions
 * carry no options and their answer lives in `solution`, so the MCQ hash
 * (text + options + answer letter) doesn't apply.
 *
 * Design constraints:
 *  - **Stable across answer backfill** — the model answer (`solution`) is NOT
 *    part of the hash, so filling it in later doesn't change the id / orphan
 *    the row.
 *  - **Context-aware** — for set-based questions the shared instruction lives
 *    in `context` and is the only disambiguator between siblings that have the
 *    same bare sub-item text ("p ∧ q" under "Negate:" vs under "Simplify:").
 *  - **Namespaced** — the `SUBJECTIVE\n` prefix guarantees a subjective hash
 *    can never collide with an MCQ hash for the same stem.
 */
export function subjectiveContentHash(
  question: string,
  context: string | null
): string {
  const q = norm(question);
  const ctx = context ? norm(context) : "";
  return createHash("sha256")
    .update(`SUBJECTIVE\n${ctx}\n${q}`)
    .digest("hex");
}
