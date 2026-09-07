/**
 * MHT-CET sittings for the mock builder — 42 real papers, up to TWO mocks each.
 *
 * SITTING IDENTITY MOVED TO `src/lib/mocks/mhtcetSittings.ts` (2026-09-06).
 * The MHT-CET Maths book needs the same source_file -> sitting answer at REQUEST
 * time, and `src/` cannot import from `scripts/` (this tree reaches for
 * `node:fs`). Rather than keep a second copy of 42 rows — the drift this repo
 * has already paid for — the identity lives in `src/` and this file adds what
 * only the mock builder needs: `hold`, and the guard below.
 *
 * WHAT STAYED: the guarantee that the 13 April-2025 sittings agree with
 * `scripts/mhtcet/config.ts`, which is what the ingestion pipeline stamps into
 * `questions.source_file`. That used to be structural (they were DERIVED from
 * it); it is now an explicit throw in `deriveMhtCetSittings()` plus the standing
 * assertion in tests/mock-mhtcet-sittings.test.ts. A renamed booklet there still
 * fails loudly here rather than leaving a mock silently empty.
 *
 * WHY SOME PAPERS ARE HELD: a mock is the real paper or it is nothing. Both
 * blueprints declare HARD counts, so a short sitting throws in
 * validatePaperRows. Unlike NEET's 180-vs-200, a short MHT-CET paper is not a
 * layout variant — it is questions MISSING, and a soft count would ship a
 * fragment as "the real paper". Two causes, and the distinction matters:
 *
 *   - "withheld PRIVATE"  a flawed question we deliberately took out of the
 *                         public bank. IRRECOVERABLE without un-withdrawing it.
 *   - "absent"            rows not in the bank at all (never ingested, or
 *                         absorbed by cross-shift content_hash dedup).
 *                         CLOSABLE by a future ingest.
 *
 * A hold is an ASSERTION, not a mute: the builder attempts every paper and flags
 * a hold whose paper now reconstructs, so closing a corpus hole surfaces as a
 * prompt to delete the line rather than as silence.
 */
import { SHIFTS } from "../mhtcet/config";
import {
  deriveMhtCetSittingIdentities,
  type MhtCetSittingIdentity,
} from "../../src/lib/mocks/mhtcetSittings";

/** Which of a sitting's two papers is held, and why. */
export type MhtCetHold = { maths?: string; phyChem?: string };

export type MhtCetSitting = MhtCetSittingIdentity & { hold?: MhtCetHold };

/** Reconstruction shortfalls, keyed by sitting. Mock-only — a book prints what
 *  the bank holds and has no notion of a paper being short. */
const HOLDS: Record<string, MhtCetHold> = {
  "2025-apr-25-s1": { maths: "49/50 — 1 question withheld PRIVATE (flawed)", phyChem: "99/100 — 1 question absent from the bank" },
  "2025-apr-22-s2": { phyChem: "98/100 — 2 questions absent from the bank" },
  "2025-apr-20-s2": { maths: "48/50 — 2 questions withheld PRIVATE (flawed)" },
  "2025-apr-20-s1": { phyChem: "99/100 — 1 question absent from the bank" },
  "2025-apr-19-s1": { maths: "49/50 — 1 question withheld PRIVATE (flawed)", phyChem: "99/100 — 1 question withheld PRIVATE (flawed)" },
  "2024-may-14-s2": { phyChem: "99/100 — 1 question withheld PRIVATE (flawed)" },
  "2024-may-11-s2": { phyChem: "99/100 — 1 question absent from the bank" },
  "2024-may-09-s1": { maths: "49/50 — 1 question withheld PRIVATE (flawed)" },
  "2023-may-15-s2": { phyChem: "98/100 — 2 questions absent from the bank" },
  "2023-may-15-s1": { phyChem: "98/100 — 2 questions withheld PRIVATE (flawed)" },
  "2023-may-10-s2": { maths: "49/50 — 1 question absent from the bank" },
  "2023-may-10-s1": { phyChem: "98/100 — 2 questions absent from the bank" },
  "2023-may-09-s2": { maths: "49/50 — 1 question withheld PRIVATE (flawed)", phyChem: "99/100 — 1 question absent from the bank" },
  "2023-may-04-s2": { phyChem: "99/100 — 1 question absent from the bank" },
  "2023-may-03-s2": { maths: "49/50 — 1 question absent from the bank" },
  "2023-may-02-s2": { phyChem: "97/100 — 3 questions absent from the bank" },
  "2022": { maths: "48/50 — 2 questions absent from the bank" },};

const withHold = (s: MhtCetSittingIdentity): MhtCetSitting =>
  HOLDS[s.key] ? { ...s, hold: HOLDS[s.key] } : { ...s };

/**
 * The 29 sittings with no ingestion config anywhere in the repo (2021-2024).
 * They came in through the generic /upload path years earlier; a repo-wide
 * search finds no config for them, so their labels can only be hand-written.
 */
export const MHT_CET_SITTINGS: MhtCetSitting[] = deriveMhtCetSittingIdentities()
  .filter((s) => !(s.key in SHIFTS))
  .map(withHold);

/**
 * Every MHT-CET sitting, newest first, with holds attached.
 *
 * The identity registry enforces its own consistency (duplicate keys, duplicate
 * source files, a merged label that is also a sitting). This adds the two checks
 * that only make sense here: that the April-2025 entries still match the
 * ingestion config, and that no hold names a sitting that does not exist — a
 * stale hold is a silent no-op, which is how a shippable paper stays held.
 */
export function deriveMhtCetSittings(): MhtCetSitting[] {
  const all = deriveMhtCetSittingIdentities();
  const byKey = new Map(all.map((s) => [s.key, s]));

  for (const [key, shift] of Object.entries(SHIFTS)) {
    const s = byKey.get(key);
    if (!s) {
      throw new Error(
        `scripts/mhtcet/config.ts declares shift "${key}", which the sitting ` +
          `registry does not know — its mock would be silently missing`
      );
    }
    if (s.sourceFile !== shift.sourceFile) {
      throw new Error(
        `shift "${key}" stamps source_file "${shift.sourceFile}" but the ` +
          `registry expects "${s.sourceFile}" — its mock would be silently empty`
      );
    }
    if (s.year !== shift.pyqYear || s.label !== shift.pyqNote) {
      throw new Error(
        `shift "${key}" is labelled "${shift.pyqNote}" (${shift.pyqYear}) but ` +
          `the registry says "${s.label}" (${s.year})`
      );
    }
  }

  for (const key of Object.keys(HOLDS)) {
    if (!byKey.has(key)) throw new Error(`HOLDS names unknown sitting "${key}"`);
  }

  return all.map(withHold);
}

export { mhtCetMockSlug, mhtCetMockTitle } from "../../src/lib/mocks/reconstruct";
