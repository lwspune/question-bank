/**
 * Dedup hash for the IPMAT corpus — context-aware, unlike the shared helper.
 *
 * WHY THIS EXISTS. `contentHash(question, options, answer)` in
 * src/lib/upload/hash.ts deliberately excludes CONTEXT. That is right for a
 * corpus where the stem carries the question, and wrong for this one, because a
 * MATCH-LIST question has a bare directive for a stem and the real question in
 * the context.
 *
 * JIPMAT 2024 VA Q29 and Q33 are the proof, and they are not hypothetical:
 *
 *   stem     "Choose the correct answer from the options given below :"   (both)
 *   options  "(A) - (I), (B) - (II), …" x4 permutations                   (both)
 *   answer   D                                                           (both)
 *   context  parts of speech for the word "all"   |   four idioms      (DIFFERENT)
 *
 * Two entirely different questions, one digest. `commitStaged` dedups by UPSERT
 * on the unique index over (org_id, exam_id, content_hash), so a collision does
 * not raise — one row silently replaces the other, the inserted count comes back
 * short, and nothing says why. `scripts/ipmat/preflight.ts` caught it before the
 * load; this module is the fix.
 *
 * DELIBERATELY NOT a change to the shared helper. Re-defining `contentHash`
 * would change the digest of every one of the ~72k rows already in the bank, so
 * the next re-ingest of any corpus would duplicate rather than dedup. Whether
 * other corpora carry the same latent collision is a separate question, logged
 * as a backfill candidate rather than fixed here in passing.
 *
 * Namespaced with an "IPMAT" prefix so a row hashed by this scheme can never
 * look already-present to the shared one, or vice versa.
 *
 * Spec: tests/ipmat-hash.test.ts.
 */
import { createHash } from "node:crypto";
import { numericContentHash } from "../../src/lib/upload/hash";

export type HashInput = {
  format: "mcq" | "numeric";
  text: string;
  context: string | null;
  /** Option TEXTS, in any order — the digest is order-insensitive. */
  options: string[];
  /** The correct option's label, e.g. "C". Ignored for numeric. */
  answer: string;
};

/** Same normalisation as the shared helper: collapse whitespace, lower-case. */
function norm(s: string): string {
  return s.replace(/\s+/g, " ").trim().toLowerCase();
}

export function ipmatContentHash(input: HashInput): string {
  // A numeric row goes to the shared helper, which is ALREADY context-aware
  // (`NUMERIC\n<ctx>\n<q>`). Re-implementing it here would risk the two
  // disagreeing about the same row.
  if (input.format === "numeric") {
    return numericContentHash(input.text, input.context);
  }

  const q = norm(input.text);
  const ctx = input.context ? norm(input.context) : "";
  // Sorted, so a shuffled option set is the same question — matching the
  // shared helper's behaviour rather than inventing a different rule.
  const opts = input.options.map(norm).sort();
  const ans = input.answer.trim().toUpperCase();

  return createHash("sha256")
    .update(`IPMAT\n${ctx}\n${q}\n${opts.join("\n")}\n${ans}`)
    .digest("hex");
}
